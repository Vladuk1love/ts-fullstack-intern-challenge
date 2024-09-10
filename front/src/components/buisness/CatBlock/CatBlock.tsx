import { useEffect, useState } from "react";
import styles from "./CatBlock.module.css";
import {
  useDeleteLikeMutation,
  usePutLikeMutation,
} from "../../../redux/likes/likesApi";

interface ICatProps {
  id: string;
  url: string;
  liked: boolean;
  onLike: (catId: string) => void;
}

function CatBlock(props: ICatProps) {
  const [heart, setHeart] = useState(props.liked ? "#ff0000" : "none");
  const [putLike, { error: putError }] = usePutLikeMutation();
  const [deleteLike, {error: deleteError }] =
    useDeleteLikeMutation();

  async function handleLike() {
    if ( heart === "#ff0000") {
      setHeart("none");
      await deleteLike({
        imageID: props.id,
      });
    } else {
      setHeart("#ff0000");
      await putLike({
        imageID: props.id,
      });
    }
  }

  useEffect(() => {
    if (putError || deleteError) {
      deleteError ? console.log(deleteError) : console.log(putError);
    }
  }, [putError, deleteError]);

  return (
    <div
      className={styles.cats_block__container}
      onMouseEnter={() => {
        heart !== "#ff0000" && setHeart("#ff6666");
      }}
      onMouseLeave={() => heart !== "#ff0000" && setHeart("none")}
      onClick={handleLike}
    >
      <img src={props.url} width={"300px"} height={"300px"} alt={props.id} />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ff0000"
        width="45px"
        height="45px"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            fill={heart}
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
}

export default CatBlock;
