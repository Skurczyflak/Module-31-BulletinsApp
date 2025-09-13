
import styles from './SearchForm.module.css';
import Button from '../../common/Button/Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const navigate = useNavigate();
    const [searchPhrase, setSearchPhrase] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        navigate(`/search-results/${searchPhrase}`); 
        setSearchPhrase('')
    }

    return (
        <form className={styles.root} onSubmit={submitHandle}>
            <input name="search" id="search" className={styles.input} type="text" placeholder="Search..." value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)}/>
            <Button type="submit" variant="submit" >Search</Button>
        </form>
    );
};

export default SearchForm;