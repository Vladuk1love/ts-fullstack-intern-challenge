import { useGetCatsQuery } from "../../../redux/cats/catsApi";
import Loading from "../../ui/Loading/Loading";
import CatBlock from "../CatBlock/CatBlock";
import styles from "./MainPage.module.css";

function MainPage() {
  const { data: cats, isLoading, error } = useGetCatsQuery("");
  if (error) {
    console.log(error);
  }
  
  
  return isLoading ? (
    <Loading />
  ) : cats && (
    <div className={styles.mainpage__container}>
      {cats.map((catItem) => {
        return(
          <CatBlock url={catItem.url} id={catItem.id} liked = {catItem.liked} key={catItem.id}/>
        )
      })}
    </div>
  );
}

export default MainPage;
