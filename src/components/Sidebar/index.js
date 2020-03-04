import React from "react";
import { Button, Icon, Modal, Select, Form, Input } from "antd";
import { Dialogs } from "../../containers";
const { Option } = Select;

let Sidebar = props => {
  let {
    isLoading,
    visible,
    modalText,
    showModal,
    handleCancel,
    handleOk,
    onInputSelect,
    onInputChange,
    users,
    onSearch,
    onAddNewMessage,
    partner,
    newMessageText,
    selectInputValue
  } = props;

  let options = users.map(user => (
    <Option key={user._id}>{user.fullname}</Option>
  ));
  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div>
          <Icon type="team" />
          <span>Список диалогов</span>
        </div>
        <Button onClick={showModal} type="link" shape="circle" icon="form" />
      </div>

      <div className="chat__sidebar-dialogs">
        <Dialogs userId="dfgf9e7079856ccaa8abeef5b" />
      </div>
      <div>
        <Modal
          title="Создать диалог"
          visible={visible}
          confirmLoading={isLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Закрыть
            </Button>,
            <Button
              disabled={!newMessageText}
              key="submit"
              type="primary"
              loading={isLoading}
              onClick={handleOk}
            >
              Создать
            </Button>
          ]}
        >
          <p>{modalText}</p>

          <Form className="add-dialog-form">
            <Form.Item label="Введите имя пользователя или E-Mail">
              <Select
                showSearch
                style={{ width: "100%" }}
                optionFilterProp="children"
                onChange={onInputChange}
                onSelect={onInputSelect}
                onSearch={onSearch}
                filterOption={false}
                placeholder="Имя пользователя или E-mail"
                value={selectInputValue}
              >
                {options}
              </Select>
            </Form.Item>
            {partner && (
              <Form.Item label="Введите текст сообщения">
                <Input.TextArea
                  onChange={onAddNewMessage}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={newMessageText}
                  placeholder="Текст сообщения..."
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default Sidebar;
