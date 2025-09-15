import React,{ useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './BulletinForm.module.css';
import { SOCKET_URL } from '../../../config';

const BulletinForm = (props) => {
  const [id] = useState(props.id || '');
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(props.image || '');
  const [dateOfPost] = useState(props.dateOfPost || new Date());
  const [imgSrc, setImgSrc] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const submitHandle = (e) => {
    e.preventDefault();
    
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('dateOfPost', dateOfPost);
    if (props.actionText === 'Add Bulletin'){
      fd.append('image', image);
      props.action(fd);
    }else{ 
      fd.append('id', id);
      if(image) fd.append('image', image);
      props.action(fd);
    }
  }

  return(
    <form className={styles.root} onSubmit={submitHandle}>
      <fieldset className={styles.group}>
        <legend>{props.actionText}</legend>
        <fieldset>
          <label>
            <span>Title</span>
            <input name="titleAdd" id="titleAdd" type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            <span>Price</span>
            <input name="priceAdd" id="priceAdd" type="number" placeholder="Price..." value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label>
            <span>Location</span>
            <input name="locationAdd" id="locationAdd" type="text" placeholder="Location..." value={location} onChange={(e) => setLocation(e.target.value)}  />
          </label>
          <label>
            <span>Content</span>
            <textarea name="contentAdd" id="contentAdd" type="text" placeholder="Content goes here..." value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
        </fieldset>
        <fieldset className={styles.fileInput}>
          <label>
            <span>Image</span>
            <input type="file" id="fileInput" accept=".jpg, .jpeg, .png" onChange={handleFileChange}  />
          </label>
            {imgSrc && <img src={imgSrc} alt={title} />}
            {image && !imgSrc && <img src={`${SOCKET_URL}/uploads/${image}`} alt={title} />}
          <Button type="submit" variant="submit">{props.actionText}</Button>
        </fieldset> 
      </fieldset>

    </form>
)};

export default BulletinForm;
