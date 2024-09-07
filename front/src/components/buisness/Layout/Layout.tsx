import LikesPage from "../LikesPage/LikesPage";
import MainPage from "../MainPage/MainPage";


function Layout(props:{currPage:boolean}) {
  return <div>{!props.currPage ? <MainPage /> : <LikesPage />}</div>;
}

export default Layout;
