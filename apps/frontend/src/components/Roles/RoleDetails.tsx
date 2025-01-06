import React from "react";
import {useTranslation}from 'react-i18next'
import { RoleDto, UserForRoleDto } from "../../models/Role";

interface RoleDetailsProps {
  role: RoleDto;
  onClose: () => void;
}

const RoleDetails: React.FC<RoleDetailsProps> = ({ role, onClose }) => {

const {t} = useTranslation<'pl'|'en'>();
  return (
    <div className="container">
      <h3 className="title">
{//@ts-ignore
            t('details')}
      </h3>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="header-cell">
 {//@ts-ignore
               t('name')}

            </th>
            <th className="header-cell">
 {//@ts-ignore
               t('desc')}

            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-cell">{role.name}</td>
            <td className="table-cell">{role.description}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">
        {//@ts-ignore
            t('users')}
        :</h4>
      {role.users?.length > 0 ? (
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-row">
              <th className="header-cell">
{//@ts-ignore
            t('name')}

              </th>
              <th className="header-cell">
{//@ts-ignore
            t('surname')}
              </th>
              <th className="header-cell">Email</th>
            </tr>
          </thead>
          <tbody>
            {role.users.map((user) => (
              <tr key={user.id} className="row">
                <td className="table-cell">{user.name}</td>
                <td className="tabel-cell">{user.surname}</td>
                <td className="table-cell">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">
{//@ts-ignore
            t('nodata')}
          </p>
      )}
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default RoleDetails;
