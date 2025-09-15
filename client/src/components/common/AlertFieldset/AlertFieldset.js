
import styles from './AlertFieldset.module.css';

const AlertFieldset = ({type, header, children}) => {

    return(
        <fieldset className={`${styles.root} ${styles[type]}`}>
            <legend>{header}</legend>
            {children}
        </fieldset>
    )
};

export default AlertFieldset;
