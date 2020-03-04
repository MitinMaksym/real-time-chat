export default ({ isAuth, errors, values }) => {
  const rules = {
    email: value => {
      if (!value) {
        errors.email = "Введите почту";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Неправильный адресс почты";
      }
    },
    password: value => {
      if (!value) {
        errors.password = "Введите пароль";
      } else if (value.length < 6) {
        !isAuth && (errors.password = "Слишком лёгкий пароль");
      }
    },
    password_2: value => {
      if (value !== values.password) {
        errors.password_2 = "Пароли не совпадают";
      }
    },
    fullname: value => {
      if (!value) {
        errors.fullname = "Введите ваше имя";
      } else if (value.length < 4) {
        errors.fullname = "Имя должно содержать не меньше 4 символов";
      }
    }
  };

  Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};
