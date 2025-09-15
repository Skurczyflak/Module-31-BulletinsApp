import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBulletinByIdRequest, getBulletin, getRequest } from '../../../redux/bulletinRedux';
import ProgressBox from '../../common/ProgressBox/ProgressBox';
import BulletinForm from '../BulletinForm/BulletinForm';

const EditBulletin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const request = useSelector(getRequest);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getBulletinByIdRequest(id));
    },[id, dispatch]);

    const bulletin = useSelector(getBulletin);
    
    const handleSubmit = () => {
        console.log('Edit Bulletin');
        navigate('/');
    }
  if(request.pending) return <ProgressBox />;
  else if(request.error) return <h1>{request.error}</h1>;
  else if(!request.success) return <h1>No bulletin</h1>;
  else if(request.success)
  return(
    <BulletinForm action={handleSubmit} actionText="Edit Bulletin" {...bulletin} />
)};

export default EditBulletin;