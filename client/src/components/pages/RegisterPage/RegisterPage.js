
import styles from './RegisterPage.module.css';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { API_URL } from '../../../config';

import AlertFieldset from '../../common/AlertFieldset/AlertFieldset';
import ProgressBox from '../../common/ProgressBox/ProgressBox';

const RegisterPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [imgSrc, setImgSrc] = useState(null);

    const [status, setStatus] = useState(null); // null, 'success', 'error', 'loading', 'serverError', 'clientError'

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgSrc(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const submitHandle = e => {

        e.preventDefault();

        const fd = new FormData();

        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);

        setStatus('loading');
        fetch(`${API_URL}/auth/register`, { method: 'POST', body: fd})
        .then(res => {
            if(res.status === 201){
                setStatus('success');
                setLogin('');
                setPassword('');
                setPhone('');
                setAvatar('');
                setImgSrc(null);
            }else if(res.status === 400){
                setStatus('clientError');
            }else if(res.status === 409){
                setStatus('loginExists');
            }else{
                setStatus('serverError');
            }
        }).catch(err => {
            setStatus('serverError');
        })

    }

    return(
    <form className={styles.root} onSubmit={submitHandle}>
        <fieldset className={styles.wrapper}>
            
            {status === 'success' && <AlertFieldset type="success" header="Success!">
                <p>You have successfully registered.</p>
                <p>You can now log in.</p>
            </AlertFieldset>}

            {status === 'serverError' && <AlertFieldset type="error" header="Something went wrong!">
                <p>Unexpected error occurred.</p>
                <p>Please try again.</p>
            </AlertFieldset>}

            {status === 'clientError' && <AlertFieldset type="error" header="No enough data!">
                <p>Please fill in all the fields.</p>
            </AlertFieldset>}
            
            { status === 'loginExists' && <AlertFieldset type="warning" header="Login already exists!">
                <p>Please choose another login.</p>
            </AlertFieldset>}

            { status === 'loading' && <ProgressBox /> }

            <fieldset className={styles.group}>
                <legend>Register</legend>
                <fieldset className={styles.inputGroup}>
                <label>
                    <span>Login</span>
                    <input name="login" id="login" className={styles.input} type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
                </label>
                <label>
                    <span>Password</span>
                    <input name="password" id="password" className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'/>
                </label>
                <label>
                    <span>Phone</span>
                    <input name="phone" id="phone" className={styles.input} type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <Button type="submit" variant="submit" >Login</Button>
                </fieldset>
                <fieldset className={`${styles.inputGroup} ${styles.avatar}`}>
                    <label>
                        <span>Avatar</span>
                        <input type="file" id="fileInput" accept=".jpg, .jpeg, .png" onChange={handleFileChange}  />
                    </label>
                    { imgSrc && <img src={imgSrc} alt="preview" />}
                </fieldset>
            </fieldset>
        </fieldset>
    </form>
    )
};

export default RegisterPage;
