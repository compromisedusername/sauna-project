import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import UserDelete from "./UserDelete";
import { UserDto, UsersResponsePaginated } from "../../models/User";
import UserDetails from "./UserDetails";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);

  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>("1");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<UsersResponsePaginated>(
          `/users/${currentPage}/${pageSize}`,
        );
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  const handleDeleteUser = (deletedUserId: number) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => deletedUserId !== user.id),
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setPageInput(String(currentPage + 1));
  };
  const handlePrevPage = () => {
    setCurrentPage((prevpPage) => prevpPage - 1);
    setPageInput(String(currentPage - 1));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };
  const handlePageInputBlurr = () => {
    if (pageInput) {
      setCurrentPage(Number(pageInput));
    } else {
      setPageInput(String(currentPage));
    }
  };
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) > 0 && Number(value) <= totalPages) {
      setPageInput(value);
    } else if (value === "") {
      setPageInput("");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Users</h2>
      <div className="actions">
        <button
          className="back-button"
          onClick={() => {
            navigate("/admin/");
          }}
        >
          Go back
        </button>
        <button
          className="add-button"
          onClick={() => {
            navigate(`/admin/user/add`);
          }}
        >
          Add new user
        </button>
      </div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-row">
              <th className="table-header-cell">ID</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Surname</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="table-cell">{user.id}</td>
                <td className="table-cell">{user.name}</td>
                <td className="table-cell">{user.surname}</td>
                <td className="table-cell">
                  <button
                    className="action-button"
                    onClick={() => {
                      if (selectedUser?.id && user.id === selectedUser!.id) {
                        setSelectedUser(null);
                        return;
                      }
                      setSelectedUser(user);
                    }}
                  >
                    Details
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      setDeletedUserId(user.id);
                      setSelectedUser(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      navigate(`/admin/user/${user.id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deletedUserId && (
        <UserDelete
          userId={deletedUserId}
          onClose={() => setDeletedUserId(null)}
          setUsers={() => handleDeleteUser(deletedUserId)}
        />
      )}
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <div className="add-form">
        <button
          className="action-button"
          onClick={() => handlePrevPage()}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="form-label">
          Page{" "}
          <input
            type="number"
            className="input"
            value={pageInput}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlurr}
            style={{ width: "50px" }}
          />{" "}
          of {totalPages}
        </span>
        <button
          className="action-button"
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
        <span className="form-label">
          Page Size:
          <select
            className="select"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "60px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </span>
      </div>
    </div>
  );
};

export default UsersList;
