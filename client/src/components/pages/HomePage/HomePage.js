import { useSelector, useDispatch } from "react-redux";
import { getRequest, getBulletins, loadBulletinsRequest } from "../../../redux/bulletinRedux";
import { useEffect } from "react";

import BulletinGrid from "../../common/BulletinGrid/BulletinGrid";
import SearchForm from "../../features/SearchForm/SearchForm";
import ProgressBox from "../../common/ProgressBox/ProgressBox";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBulletinsRequest()); 
    }, [dispatch]);

    const bulletins = useSelector(getBulletins);
    const request = useSelector(getRequest);

    if(request.pending) return <ProgressBox />;
    else if(request.error) return <>{request.error.message}</>;
    else if(!request.success) return <h1>No bulletins</h1>;
    else if(request.success)return(
    <>
      <SearchForm />
      <BulletinGrid bulletins={bulletins} />
    </>
    )
};

export default HomePage;
