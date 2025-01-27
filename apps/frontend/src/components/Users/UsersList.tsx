import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import UserDelete from "./UserDelete";
import { UserDto, UsersResponsePaginated } from "../../models/User";
import UserDetails from "./UserDetails";


import {useTranslation}from 'react-i18next'
const UsersList: React.FC = () => {
 const {t} = useTranslation<'pl'|'en'>();
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
      <h2 className="title">
{//@ts-ignore
               t('users')}

      </h2>
      <div className="actions">
        <button
          className="back-button"
          onClick={() => {
            navigate("/admin/");
          }}
        >
          {//@ts-ignore
               t('goback')}
        </button>
        <button
          className="add-button"
          onClick={() => {
            navigate(`/admin/user/add`);
          }}
        >
           {//@ts-ignore
            t('adduser')}
        </button>
      </div>
      {users.length === 0 ? (
        <p>
 {//@ts-ignore
            t('nodata')}

        </p>
      ) : (
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-row">
              <th className="table-header-cell">ID</th>
              <th className="table-header-cell">
{//@ts-ignore
               t('name')}

                </th>
              <th className="table-header-cell">
{//@ts-ignore
               t('surname')}

                </th>
              <th className="table-header-cell">
{//@ts-ignore
               t('actions')}

                </th>
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
                     {//@ts-ignore
            t('details')}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      setDeletedUserId(user.id);
                      setSelectedUser(null);
                    }}
                  >
                     {//@ts-ignore
            t('delete')}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      navigate(`/admin/user/${user.id}/edit`);
                    }}
                  >
                     {//@ts-ignore
            t('edit')}
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
           {//@ts-ignore
            t('prev')} {//@ts-ignore
            t('page')}
        </button>
        <span className="form-label">
           {//@ts-ignore
            t('page')}{" "}

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
           {//@ts-ignore
            t('next')}
           {//@ts-ignore
            t('page')}
        </button>
        <span className="form-label">
           {//@ts-ignore
            t('pagesize')}
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
