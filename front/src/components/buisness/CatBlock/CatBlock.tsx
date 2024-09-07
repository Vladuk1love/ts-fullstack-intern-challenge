import styles from './CatBlock.module.css'

interface ICatProps {
  id: string;
  url: string;
}

function CatBlock(props: ICatProps) {
  return (
    <div className={styles.cats_block__container}>
        <img src={props.url} alt={props.id}/>
    </div>
  
)}

export default CatBlock;
