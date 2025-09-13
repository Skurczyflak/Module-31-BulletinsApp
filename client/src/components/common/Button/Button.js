import styles from './Button.module.css';
import { Link } from 'react-router-dom';
import {useState} from 'react';

const Button = ({ type, variant, LinkTo, children, onClick }) =>{ 
    const [typeOfBtn] = useState(type);
    if(typeOfBtn === 'link'){
        return(
        <Link to={LinkTo} className={`${styles.root} ${styles[variant]}`}>
            {children}
        </Link>
        )
    }else{
        return(
        <button type={variant} className={`${styles.root} ${styles[variant]}`} onClick={onClick}>
            {children}
        </button>
        )

    }
};

export default Button;