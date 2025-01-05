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
    <>
      <h2>Delete Sauna for ID: {saunaId}</h2>
      <p>Are you sure?</p>
      <button onClick={handleClick}> YES, DELETE sauna ID: {saunaId}</button>
      <button onClick={onClose}>NO, CLOSE</button>
    </>
  );
};
export default DeleteSauna;
