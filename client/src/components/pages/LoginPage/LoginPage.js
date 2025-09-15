import { useState } from 'react';
import styles from './LoginPage.module.css';
import Button from '../../common/Button/Button';
import { API_URL } from '../../../config';

import AlertFieldset from '../../common/AlertFieldset/AlertFieldset';
import ProgressBox from '../../common/ProgressBox/ProgressBox';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandle = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        }

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
        .then(res =>{
            if (res.status === 200) {
                dispatch(logIn({login}));
                navigate('/');
            }
            else if(res.status === 400) setStatus('clientError');
            else setStatus('serverError');
        }).catch(err => setStatus('serverError'));
    }

    return(
    <form className={styles.root} onSubmit={submitHandle}>

            {status === 'serverError' && <AlertFieldset type="error" header="Something went wrong!">
                <p>Unexpected error occurred.</p>
                <p>Please try again.</p>
            </AlertFieldset>}

            {status === 'clientError' && <AlertFieldset type="error" header="Invalid data">
                <p>Login or password is incorrect.</p>
            </AlertFieldset>}
            
            { status === 'loading' && <ProgressBox /> }

        <fieldset className={styles.group}>
            <legend>Log in</legend>
            <label>
                <span>login</span>
                <input name="login" id="login" className={styles.input} type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} autoComplete='login'/>
            </label>
            <label>
                <span>Password</span>
                <input name="password" id="password" className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password'/>
            </label>
            <Button type="submit" variant="submit" >Login</Button>
        </fieldset>
    </form>
    )
};

export default LoginPage;
