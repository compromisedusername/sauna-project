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
    <>
      <h2>Delete User ID: {userId}</h2>
      <p>Are you sure?</p>
      <button onClick={handleClick}>
        YES, DELETE user ID: {userId}
      </button>
      <button onClick={onClose}>NO, CLOSE</button>
    </>
  );
};
export default UserDelete;
