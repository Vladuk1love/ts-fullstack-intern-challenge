import LikesPage from "../LikesPage/LikesPage";
import MainPage from "../MainPage/MainPage";
import styles from './Layout.module.css'

function Layout(props:{currPage:boolean}) {
  const token = localStorage.getItem("token");
  if(token){
    return <div>{!props.currPage ? <MainPage /> : <LikesPage currPage = {props.currPage} />}</div>;
  }else{
    return <><p className={styles.no_auth}>Авторизируйтесь, чтобы смотреть котиков</p></>
  }
}

export default Layout;
