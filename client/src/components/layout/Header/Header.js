import Button from '../../common/Button/Button';

import styles from './Header.module.css';

const Header = () => { 
  return(
  <header className={styles.root}>
    <h2 className={styles.title}>BulletinApp</h2>
    <nav className={styles.navBtns}>
      <Button type="link" LinkTo="/">Home</Button>
      <Button type="link" LinkTo="/auth/login">Login</Button>
      <Button type="link" LinkTo="/auth/register">Register</Button>
    </nav>
  </header>
)};

export default Header;