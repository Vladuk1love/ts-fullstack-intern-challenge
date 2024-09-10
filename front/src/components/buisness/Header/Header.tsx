import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useGetMeQuery } from "../../../redux/user/userApi";
import person from "../../../assets/person_13924070.png";
import { Dispatch } from "react";

interface IHeaderProps {
  currPage: boolean;
  setCurrPage: Dispatch<React.SetStateAction<boolean>>;
}

function Header(props: IHeaderProps) {
  const token = localStorage.getItem("token");
  const { data, error } = useGetMeQuery("");
  if (error) {
    console.log(error);
  }
  
  return (
    <div className={styles.header__container}>
      <div className={styles.navigation_bar}>
        <div
          className={
            !props.currPage
              ? styles.navigation_bar__page_setter__active
              : styles.navigation_bar__page_setter
          }
          onClick={() => props.setCurrPage(false)}
        >
          <p>Все котики</p>
        </div>
        <div
          className={
            props.currPage
              ? styles.navigation_bar__page_setter__active
              : styles.navigation_bar__page_setter
          }
          onClick={() => props.setCurrPage(true)}
        >
          <p>Любимые котики</p>
        </div>
      </div>
      {token ? (
        <div className={styles.authorized_user}>
          <p>{data?.name}</p>
          <img src={person} width={"30px"} height={"30px"} alt="" />
        </div>
      ) : (
        <div className={styles.authorization}>
          <Link to={"/login"}>
            <button className={styles.authorization__login_button}>Вход</button>
          </Link>
          <Link to={"/registration"}>
            <button>Регистрация</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
