import { API_URL } from '../../../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BulletinForm from '../BulletinForm/BulletinForm';

const AddBulletin = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

    const handleSubmit = bulletin => {
        setStatus('loading');
        fetch(`${API_URL}/bulletins`, {method: 'POST', body: bulletin})
        .then(res => {
            if(res.status === 201){
                setStatus('success');
            }else if(res.status === 400) setStatus('clientError');
            else setStatus('serverError');
        })
        .catch(err => setStatus(`serverError ${err}`));
        if(process.env.NODE_ENV === 'development') console.log(status)
        navigate('/');
    }
  
  return(
    <BulletinForm action={handleSubmit} actionText="Add Bulletin" />
)};

export default AddBulletin;