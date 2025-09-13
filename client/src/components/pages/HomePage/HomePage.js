import { useSelector, useDispatch } from "react-redux";
import { getRequest, getBulletins, loadBulletinsRequest } from "../../../redux/bulletinRedux";
import { useEffect } from "react";

import BulletinGrid from "../../common/BulletinGrid/BulletinGrid";
import SearchForm from "../../features/SearchForm/SearchForm";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBulletinsRequest()); 
    }, [dispatch]);

    const bulletins = useSelector(getBulletins);
    const request = useSelector(getRequest);

    if(request.pending) return <h1>Loading...</h1>;
    else if(request.error) return <h1>{request.error}</h1>;
    else if(!request.success) return <h1>Success</h1>;
    else if(request.success)return(
    <>
      <SearchForm />
      <BulletinGrid bulletins={bulletins} />
    </>
    )
};

export default HomePage;
