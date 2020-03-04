import React from "react";
import orderBy from "lodash/orderBy";
import { Input } from "antd";
import { Empty, Spin } from "antd";

import { DialogItem } from "..";

import "./Dialogs.scss";

export default function Dialogs({
  items,
  userId,
  onSearch,
  inputValue,
  isLoading,
  currentDialogId
}) {
  const Search = Input.Search;

  return (
    <div className="dialogs">
      <div className="dialogs__search">
        <Search
          value={inputValue}
          onChange={e => {
            onSearch(e.target.value);
          }}
          placeholder="Поиск среди контактов"
        />
      </div>

      <div>
        {isLoading ? (
          <Spin tip="Загрузка диалогов" />
        ) : items ? (
          items.length > 0 ? (
            orderBy(items, ["created_at"], ["desc"]).map(item => {
              return (
                <DialogItem
                  key={item._id}
                  isMe={item.author._id === userId}
                  userId={userId}
                  currentDialogId={currentDialogId}
                  {...item}
                />
              );
            })
          ) : (
            <Empty description="Ничего не найдено" />
          )
        ) : null}
      </div>
    </div>
  );
}
