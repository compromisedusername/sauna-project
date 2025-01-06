import api from "../../api/api";
import {useTranslation}from 'react-i18next'
const DeleteSauna = ({
  saunaId,
  onClose,
  setSaunas,
}: {
  saunaId: number;
  onClose: () => void;
  setSaunas: () => void;
}) => {
const {t} = useTranslation<'pl'|'en'>();
  const handleClick = async () => {
    if (saunaId) {
      try {
        await api.delete(`/sauna/${saunaId}`);
        onClose();
        setSaunas();
      } catch (error: any) {
        console.error(`Error deleting reservation: ${error.message}`);
      }
    }
  };

  return (
    <div className='container'>
      <h2 className = 'title'>
 {//@ts-ignore
            t('delete-sauna')}
        ID: {saunaId}</h2>
      <p className='title-sure'>
 {//@ts-ignore
            t('sure')}

      </p>
      <button className='delete-button' onClick={handleClick}>
 {//@ts-ignore
            t('delete')}
        sauna ID: {saunaId}</button>
      <button className='back-button' onClick={onClose}>
 {//@ts-ignore
            t('close')}
      </button>
    </div>
  );
};
export default DeleteSauna;
