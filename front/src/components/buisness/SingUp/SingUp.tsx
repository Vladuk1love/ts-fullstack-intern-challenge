import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "./SingUp.module.css";
import { IUser } from "../../../interfaces/user.interface";
import { useRegisterUserMutation } from "../../../redux/user/userApi";
import Loading from "../../ui/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

function SingUp() {
  const [register, {data, isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();
  if (error) {
    alert(error);
  }

  useLayoutEffect(() => { // до рендера компонента
    if (localStorage.getItem("token")?.length) {
      console.log('redirected');
      navigate("/");
    }
  }, [localStorage.getItem("token")]);

  return isLoading ? (
    <Loading />
  ) : (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validate={(values) => {
        const errors: IUser = { name: "", email: "", password: "" };
        if (!values.name) {
          errors.name = "Поле имя обязательно!";
        }
        if (!values.email) {
          errors.email = "Поле email обязательно!";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Некорректный email!";
        }
        if (values.password.length < 6) {
          errors.password = "Минимальная длина - 6 символов";
        } else if (!values.password) {
          errors.password = "Поле пароль обязательно!";
        }
        if (
          errors.name === "" &&
          errors.email === "" &&
          errors.password === ""
        ) {
          return {};
        } else {
          return errors;
        }
      }}
      onSubmit={async (values) => {
        await register(values).then((response) => {
          if (response.data) {
            console.log('authorized');
            localStorage.setItem("token", response.data?.accessToken);
          }
          navigate("/")
        }).catch((err) => {alert(err)})
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.singUp__form}>
          <h1>Регистрация</h1>
          <Field type="text" name="name" placeholder="имя" />
          <ErrorMessage name="name" component="div" />
          <Field type="email" name="email" placeholder="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Зарегистрироваться
          </button>
          <p>есть аккаунт?</p>
          <Link to="/login">войти</Link>
        </Form>
      )}
    </Formik>
  );
}

export default SingUp;
