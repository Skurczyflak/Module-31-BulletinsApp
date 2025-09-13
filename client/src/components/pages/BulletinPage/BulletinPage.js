import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBulletinByIdRequest, getBulletin, getRequest } from '../../../redux/bulletinRedux';

import ProductInfo from '../../common/BulletinInfo/BulletinInfo';

const BulletinPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const request = useSelector(getRequest);
    useEffect(() => {
        dispatch(getBulletinByIdRequest(id));
    },[id, dispatch]);
    const bulletin = useSelector(getBulletin);

    if(request.pending) return <h1>Loading...</h1>;
    else if(request.error) return <h1>{request.error}</h1>;
    else if(!request.success) return <h1>Success</h1>;
    else if(request.success)
    return(
    <>
        <ProductInfo parms={bulletin} />
    </>
    )
};

export default BulletinPage;
