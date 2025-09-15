import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBulletinByIdRequest, getBulletin, getRequest } from '../../../redux/bulletinRedux';

import ProgressBox from '../../common/ProgressBox/ProgressBox';
import ProductInfo from '../../common/BulletinInfo/BulletinInfo';

const BulletinPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const request = useSelector(getRequest);

    useEffect(() => {
        dispatch(getBulletinByIdRequest(id));
    },[id, dispatch]);

    const bulletin = useSelector(getBulletin);

    if(request.pending) return <ProgressBox />;
    else if(request.error) return <>{request.error.message}</>;
    else if(!request.success) return <h1>No bulletin</h1>;
    else if(request.success)
    return(
    <>
        <ProductInfo parms={bulletin} />
    </>
    )
};

export default BulletinPage;
