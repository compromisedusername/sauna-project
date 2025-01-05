import React from 'react';
import { RoleDto, UserForRoleDto } from '../../models/Role';

interface RoleDetailsProps {
  role: RoleDto;
  onClose: () => void;
}

const RoleDetails: React.FC<RoleDetailsProps> = ({ role, onClose }) => {
  return (
    <div>
      <h3>Role Details</h3>
      <p>Name: {role.name}</p>
      <p>Description: {role.description}</p>
      <h4>Users:</h4>
      {role.users.length > 0 ? (
        <ul>
          {role.users.map(user => (
            <li key={user.id}>
              {user.name} {user.surname} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users assigned to this role.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RoleDetails;
