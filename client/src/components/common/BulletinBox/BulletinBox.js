import { SOCKET_URL } from '../../../config'
import styles from './BulletinBox.module.css';
import { Link } from 'react-router-dom';

const BulletinBox = ({bulletin}) => {
  const {title, image, location, _id} = bulletin;
  return(
  <div className={styles.root}>
    <div className={styles.imageContainer}>
      <img src={`${SOCKET_URL}/uploads/${image}`} className={styles.image} alt={title}/>
    </div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.location}>{location}</p>
    <Link className={styles.readMore} to={`/bulletins/${_id}`}>Read More</Link>
  </div>
)};

export default BulletinBox;