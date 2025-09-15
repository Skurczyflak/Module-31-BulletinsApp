import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRequest, getSearchBulletins, getSearchBulletinsRequest } from '../../../redux/bulletinRedux';
import { useEffect } from 'react';

import ProgressBox from '../../common/ProgressBox/ProgressBox';
import SearchForm from '../../features/SearchForm/SearchForm';
import BulletinGrid from '../../common/BulletinGrid/BulletinGrid';

const SearchResults = () => {
    const { searchPhrase } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSearchBulletinsRequest(searchPhrase));
    }, [searchPhrase, dispatch]);

    const bulletins = useSelector(getSearchBulletins);
    const request = useSelector(getRequest);

    if(request.pending) return <ProgressBox />;
    else if(request.error) return <>{request.error.message}</>;
    else if(!request.success) return <h1>No bulletins found</h1>;
    else if(request.success)return(
        <>
            <SearchForm>{searchPhrase}</SearchForm>
            <BulletinGrid bulletins={bulletins} />
        </>
    )
};

export default SearchResults;
