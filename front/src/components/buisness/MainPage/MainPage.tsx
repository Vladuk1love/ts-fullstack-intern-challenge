import { useEffect, useState } from "react";
import { useGetCatsQuery } from "../../../redux/cats/catsApi";
import Loading from "../../ui/Loading/Loading";
import CatBlock from "../CatBlock/CatBlock";
import styles from "./MainPage.module.css";

function MainPage() {
  const { data: cats, isLoading, refetch } = useGetCatsQuery("");
  const [catList, setCatList] = useState(cats || []);
  const [needMore, setNeedMore] = useState(false);
//  const [num, setNum] = useState(0)
  useEffect(() => {
    if (cats) {
      setCatList((prevCatList) => {
        const newCats = cats.filter(
          (cat) => !prevCatList.some((prevCat) => prevCat.id === cat.id)
        );
        return [...prevCatList, ...newCats];
      });
    }
  }, [cats]);

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200
    ) {
      setNeedMore(true);
      await refetch().then(() => {
        setNeedMore(false);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [needMore]);

  const handleLikeToggle = (catId: string) => {
    const cat = catList.find((cat: { id: string }) => cat.id === catId);
    if (cat) {
      cat.liked = true;
      setCatList([...catList]);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    catList && (
      <div className={styles.mainpage__container}>
        {catList.map((catItem) => {
          return (
            <CatBlock
              url={catItem.url}
              id={catItem.id}
              liked={catItem.liked}
              key={catItem.id}
              onLike={handleLikeToggle}
            />
          );
        })}
        {needMore && (
          <p className={styles.inf_scroll_loading}>Загружаем ещё котиков...</p>
        )}
      </div>
    )
  );
}

export default MainPage;
