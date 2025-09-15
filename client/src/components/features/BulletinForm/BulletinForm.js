import React,{ useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './BulletinForm.module.css';
import { SOCKET_URL } from '../../../config';

const BulletinForm = (props) => {
  const [id] = useState(props.id || null);
  const [title, setTitle] = useState(props.title || null);
  const [content, setContent] = useState(props.content || null);
  const [price, setPrice] = useState(props.price || null);
  const [location, setLocation] = useState(props.location || null);
  const [image] = useState(props.image || null);
  const [dateOfPost] = useState(props.dateOfPost || new Date());
  const [imgSrc, setImgSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const submitHandle = (e) => {
    e.preventDefault();

    if (props.actionText === 'Edit Bulletin') props.action({id, title, content, price, location, image, dateOfPost});
    else props.action({title, content, price, location, image, dateOfPost});
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
            <input name="priceAdd" id="priceAdd" type="text" placeholder="Price..." value={price} onChange={(e) => setPrice(e.target.value)} />
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
            {imgSrc && <img src={imgSrc} alt={title} />}
            { image && <img src={`${SOCKET_URL}/uploads/${image}`} alt={title} />}
          </label>
          <Button type="submit" variant="submit">{props.actionText}</Button>
        </fieldset> 
      </fieldset>

    </form>
)};

export default BulletinForm;
