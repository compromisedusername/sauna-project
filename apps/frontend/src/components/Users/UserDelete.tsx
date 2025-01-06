import api from "../../api/api";

const UserDelete = ({
  userId,
  onClose,
  setUsers,
}: {
  userId: number;
  onClose: () => void;
  setUsers: () => void;
}) => {
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
      <h2 className='title'>Delete User ID: {userId}</h2>
      <p className='title-sure'>Are you sure?</p>
      <button className='delete-button' onClick={handleClick}>
        YES, DELETE user ID: {userId}
      </button>
      <button className ='back-button'onClick={onClose}>NO, CLOSE</button>
    </div>
  );
};
export default UserDelete;
