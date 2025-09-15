
import { useEffect } from "react";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const DeleteBulletin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if(process.env.NODE_ENV !== 'production'){
        const options = {
            method: 'DELETE',
        };
        fetch(`${API_URL}/bulletins/${id}`, options)
        .then(() => {
            navigate('/');
        });
    }else{
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };
        fetch(`${API_URL}/bulletins/${id}`, options)
        .then(() => {
            navigate('/');
        });
    }
    });

    return null;
};

export default DeleteBulletin;
