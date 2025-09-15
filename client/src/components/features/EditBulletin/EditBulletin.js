import { API_URL } from '../../../config';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBulletinByIdRequest, getBulletin, getRequest } from '../../../redux/bulletinRedux';
import ProgressBox from '../../common/ProgressBox/ProgressBox';
import BulletinForm from '../BulletinForm/BulletinForm';

const EditBulletin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const request = useSelector(getRequest);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBulletinByIdRequest(id));
    },[id, dispatch]);

    const bulletin = useSelector(getBulletin);
    
    const handleSubmit = bulletin => {
        setStatus('loading');
        fetch(`${API_URL}/bulletins/${id}`, {method: 'PUT', body: bulletin})
        .then(res => {
            if(res.status === 200){
                setStatus('success');
            }else if(res.status === 400) setStatus('clientError');
            else setStatus('serverError');
        }).catch(err => setStatus(`serverError ${err}`));
        if(process.env.NODE_ENV === 'development') console.log(status)
        navigate('/');
    }
  if(request.pending) return <ProgressBox />;
  else if(request.error) return <>{request.error.message}</>;
  else if(!request.success) return <h1>No bulletin</h1>;
  else if(request.success)
  return(
    <BulletinForm action={handleSubmit} actionText="Edit Bulletin" {...bulletin} />
)};

export default EditBulletin;