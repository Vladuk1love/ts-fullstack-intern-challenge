import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "./SingIn.module.css";
import { IUser } from "../../../interfaces/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useLoginUserMutation } from "../../../redux/user/userApi";
import Loading from "../../ui/Loading/Loading";

function SingIn() {
  const [login, { isLoading, error}] = useLoginUserMutation();

  const navigate = useNavigate();
  useLayoutEffect(() => {
    // до рендера компонента
    if (localStorage.getItem("token")?.length) {
      console.log("redirected");

      navigate("/");
    }
  }, [localStorage.getItem("token")]);

  if (error) {
    console.log(error);
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validate={(values) => {
        const errors: Omit<IUser, "name"> = { email: "", password: "" };

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
        if (errors.email === "" && errors.password === "") {
          return {};
        } else {
          return errors;
        }
      }}
      onSubmit={async (values) => {
        await login(values).then((response) => {
          if (response.data) {
            console.log("authorized");
            localStorage.setItem("token", response.data?.accessToken);
          }
          navigate("/");
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.singIn__form}>
          <h1>Вход</h1>
          <Field type="email" name="email" placeholder="имя" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="пароль" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Войти
          </button>
          <p>нет аккаунта?</p>
          <Link to="/registration">зарегистрируйтесь</Link>
        </Form>
      )}
    </Formik>
  );
}

export default SingIn;
