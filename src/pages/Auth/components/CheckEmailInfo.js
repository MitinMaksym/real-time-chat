import React, { useEffect, useState } from "react";
import { Result, Button, Spin } from "antd";
import { Block } from "../../../components";
import userApi from "../../../utils/api/user";
import { Link } from "react-router-dom";

let renderTextInfo = ({ verified, hash, loading, error }) => {
  if (hash) {
    if (verified) {
      return {
        status: "success",
        title: "Готово!",
        message: "Ваш аккаунт успешно подтвержден",
        extra: [
          <Link to="/signin" key="123">
            <Button type="primary">Ввойти в аккаунт</Button>
          </Link>
        ]
      };
    } else if (error) {
      return {
        status: "error",
        title: "Ошибка",
        message: "Неудалось подтвердить аккаунт "
      };
    }
  } else {
    return {
      status: "success",
      title: "Регистрация прошла успешно!",
      message: "Ссылка для подтверждения аккаунта отправлена на почту"
    };
  }
};

export default function CheckEmailInfo(props) {
  const hash = props.location.search.split("?hash=")[1];

  let [verified, setVerified] = useState(null);
  let [loading, setIsLoading] = useState(false);
  let [error, setError] = useState(false);

  let info = renderTextInfo({ verified, hash, loading, error });
  useEffect(() => {
    if (hash) {
      userApi
        .verifyHash(hash)
        .then(async data => {
          setIsLoading(true);
          if (data.status === "success") {
            setVerified(true);
            setIsLoading(false);
          }
        })
        .catch(err => {
          setError(true);
          setIsLoading(false);
        });
    }
  }, [hash]);
  if (loading || !info) {
    return <Spin />;
  }
  return (
    <Block>
      <Result
        status={info.status}
        extra={info.extra}
        title={info.title}
        subTitle={info.message}
      />
    </Block>
  );
}
