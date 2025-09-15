import Button from '../../common/Button/Button';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import styles from './Header.module.css';

const Header = () => { 
  const user = useSelector(getUser);
  return(
  <header className={styles.root}>
    <h2 className={styles.title}>BulletinApp</h2>
    <nav className={styles.navBtns}>
      <Button type="link" LinkTo="/">Home</Button>
      { user && <Button type="link" LinkTo="/bulletins/add">Add Bulletin</Button>}
      { !user && <Button type="link" LinkTo="/auth/login">Login</Button>}
      { !user && <Button type="link" LinkTo="/auth/register">Register</Button>}
      { user && <div className={styles.user}>{user.login}</div>}
      {<Button type="button">Logout</Button>}
    </nav>
  </header>
)};

export default Header;