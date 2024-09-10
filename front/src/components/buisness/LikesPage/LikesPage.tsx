import { useEffect, useState } from "react";
import { useGetOnlyLikedCatsQuery } from "../../../redux/likes/likesApi";
import Loading from "../../ui/Loading/Loading";
import CatBlock from "../CatBlock/CatBlock";
import styles from "./LikesPage.module.css";

function LikesPage(props: {currPage:boolean}) {
  const { data: cats, isLoading, error, refetch } = useGetOnlyLikedCatsQuery("");
  const [catList, setCatList] = useState(cats || []);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    refetch()
    if (cats) {
      setCatList(cats);
    }
  }, [cats, props.currPage]);

  const handleLikeToggle = (catId: string) => {
    const catIndex = catList.findIndex((cat) => cat.imageID === catId);
    if (catIndex !== -1) {
      catList.splice(catIndex, 1); 
      setCatList([...catList]); 
    }
  };


  return isLoading ? (
    <Loading />
  ) : catList ? (
    <div className={styles.mainpage__container}>
      {catList.length && catList.length > 0 ? (
        catList.map((cat, index) => {
          return (
            <CatBlock
              id={cat.imageID}
              url={cat.url}
              liked={cat.liked}
              key={index}
              onLike={handleLikeToggle}
            />
          );
        })
      ) : (
        <p>Вам не нравится ни один котик :/</p>
      )}
    </div>
  ) : (
    <p>не удалось загрузить котиков</p>
  );
}

export default LikesPage;
