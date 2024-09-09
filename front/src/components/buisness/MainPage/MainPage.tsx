import { useEffect, useState } from "react";
import { useGetCatsQuery } from "../../../redux/cats/catsApi";
import Loading from "../../ui/Loading/Loading";
import CatBlock from "../CatBlock/CatBlock";
import styles from "./MainPage.module.css";

function MainPage() {
  const { data: cats, isLoading, error } = useGetCatsQuery("");
  const [catList, setCatList] = useState(cats || []);

  useEffect(() => {
    if (cats) {
      setCatList(cats);
    }
  }, [cats]);

  const handleLikeToggle = (catId: string) => {
    const cat = catList.find((cat: { id: string }) => cat.id === catId);
    if (cat) {
      cat.liked = true; 
      setCatList([...catList]);
    }
  };
  
  
  return isLoading ? (
    <Loading />
  ) : catList && (
    <div className={styles.mainpage__container}>
      {catList.map((catItem) => {
        return(
          <CatBlock url={catItem.url} id={catItem.id} liked = {catItem.liked} key={catItem.id} onLike={handleLikeToggle}/>
        )
      })}
    </div>
  );
}

export default MainPage;
