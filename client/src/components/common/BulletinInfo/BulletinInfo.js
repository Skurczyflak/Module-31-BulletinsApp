import styles from './BulletinInfo.module.css';
import { SOCKET_URL } from '../../../config';

import Button from '../Button/Button';

const BulletinInfo = ({parms}) => {
    console.log(parms);
    const { title,content, dateOfPost, image, location, price, _id } = parms;
    const { login, avatar, phone } = parms.sellerId;

    const date = new Date(dateOfPost).toLocaleString();

    return(
    <section aria-label='Product Information' className={styles.root}>
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img src={`${SOCKET_URL}/uploads/${image}`} className={styles.image} alt={title}/>
            </div>
            <div className={styles.bulletinContainer}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.content}>
                    <span>Description:</span> {content}
                </p>
                <div className={styles.bulletin}>
                    <div className={styles.info}>
                    <p className={styles.date}>
                        <span>Posted:</span> {date}
                    </p>
                    <p className={styles.location}>
                        <span>Location:</span> {location}
                    </p>
                    <p className={styles.price}>
                        <span>Price:</span> ${price}
                    </p>
                    </div>
                    <div className={styles.seller}>
                        <div className={styles.avatarContainer}>
                            <img src={`${SOCKET_URL}/uploads/${avatar}`} alt={login} className={styles.avatar} />
                        </div>
                        <p>{login}</p>
                        <p>{phone}</p>
                    </div>
                </div>
                {/* Only when user is logged in */}
                {<div className={styles.btns}>
                    <Button type={'link'} LinkTo={`/bulletins/edit/${_id}`}>Edit</Button>
                    <Button type={'button'} variant={'remove'}>Remove</Button>
                </div>}
            </div>
        </div>
    </section>
    )
};

export default BulletinInfo;
