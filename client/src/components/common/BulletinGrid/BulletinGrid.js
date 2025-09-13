import BulletinBox from "../BulletinBox/BulletinBox";
import styles from './BulletinGrid.module.css';

const BulletinGrid = ({bulletins}) => {
    return(
      <div className={styles.root}>
        {bulletins.map((bulletin)=>{
          return <BulletinBox key={bulletin._id} bulletin={bulletin} />
        })}
      </div>
    )
};

export default BulletinGrid;
