import UserDetails from "./UserDetails";
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import UserDelete from "./UserDelete";
import { DeleteDateColumn } from "typeorm";

interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  reservations: ReservationForUserDto[];
  role: RoleForUserDto;
}

interface ReservationForUserDto {
  id: number;
  dateFrom: string;
  dateTo: string;
  numberOfPeople: number;
}

interface RoleForUserDto {
  id: number;
  description: string;
  name: string;
}

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
        const response = await api.get<UserDto[]>("/users");
        setUsers(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  const handleDeleteUser = (deletedUserId: number) => {
    setUsers((prevUsers) =>
      prevUsers.filter((reservation) => deletedUserId !== reservation.id),
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevpPage) => prevpPage - 1);
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
    <div>
      <h2>Users</h2>
      <div>
        <button
          onClick={() => {
            navigate(`/admin/user/add`);
          }}
        >
          Add new user
        </button>
        <div>
          <button
            onClick={() => {
              navigate("/admin/");
            }}
          >
            Go back
          </button>
        </div>
      </div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              User ID: {user.id}, Name: {user.name} {user.surname}
              <button
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
                onClick={() => {
                  setDeletedUserId(user.id);
                  setSelectedUser(null);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/user/${user.id}/edit`);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
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

<div>
				<button onClick={() => handlePrevPage()} disabled={currentPage === 1}>
					Previous Page
				</button>
				<span>
					Page{" "}
					<input
						style={{ width: "50px" }}
						type="number"
						value={pageInput}
						onChange={handlePageInputChange}
						onBlur={handlePageInputBlurr}
					/>{" "}
					of {totalPages}
				</span>
				<button
					onClick={() => handleNextPage()}
					disabled={currentPage === totalPages}
				>
					Next Page
				</button>
				Page Size:
				<select
					style={{ width: "60px" }}
					value={pageSize}
					onChange={handlePageSizeChange}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
				<></>
			</div>



    </div>
  );
};

export default UsersList;
