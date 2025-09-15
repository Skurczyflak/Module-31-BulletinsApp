import BulletinForm from '../BulletinForm/BulletinForm';

const AddBulletin = () => {
    const handleSubmit = () => {
        console.log('Add Bulletin');
    }
    
  return(
    <BulletinForm action={handleSubmit} actionText="Add Bulletin" />
)};

export default AddBulletin;


//E:\Kursy_kodilla\Strony\React\react-blog-app\src\components\features