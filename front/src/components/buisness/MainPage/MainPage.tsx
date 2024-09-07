// import { useGetCatsQuery } from "../../../redux/cats/catsApi";
// import Loading from "../../ui/Loading/Loading";
import styles from "./MainPage.module.css";

function MainPage() {
  // const { data: cats, isLoading, error } = useGetCatsQuery("");
  return (
    // isLoading ? <Loading/> :
    <div className={styles.mainpage__container}>
      <p>MainPage</p>
    </div>
  );
}

export default MainPage;
