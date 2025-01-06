import api from "../../api/api";

import {useTranslation}from 'react-i18next'

const UserDelete = ({
  userId,
  onClose,
  setUsers,
}: {
  userId: number;
  onClose: () => void;
  setUsers: () => void;
}) => {
const {t} = useTranslation<'pl'|'en'>();
  const handleClick = async () => {
    if (userId) {
      try {
        await api.delete(`/user/${userId}`);
        onClose();
        setUsers();
      } catch (error: any) {
        console.error(`Error deleting user: ${error.message}`);
      }
    }
  };

  return (
    <div className='container'>
      <h2 className='title'>
 {//@ts-ignore
            t('deleteuserquestion')}
        ID: {userId}</h2>
      <p className='title-sure'>
 {//@ts-ignore
            t('sure')}

      </p>
      <button className='delete-button' onClick={handleClick}>

{//@ts-ignore
            t('deleteuser')}
         ID: {userId}
      </button>
      <button className ='back-button'onClick={onClose}>
 {//@ts-ignore
            t('close')}

      </button>
    </div>
  );
};
export default UserDelete;
