import api from "../../api/api";

const DeleteSauna = ({
  saunaId,
  onClose,
  setSaunas,
}: {
  saunaId: number;
  onClose: () => void;
  setSaunas: () => void;
}) => {
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
      <h2 className = 'title'>Delete Sauna for ID: {saunaId}</h2>
      <p className='title-sure'>Are you sure?</p>
      <button className='delete-button' onClick={handleClick}> YES, DELETE sauna ID: {saunaId}</button>
      <button className='back-button' onClick={onClose}>NO, CLOSE</button>
    </div>
  );
};
export default DeleteSauna;
