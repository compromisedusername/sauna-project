

import React, { useState, useEffect } from 'react';
import api from '../../api/api';
interface RoleDto {

  id: number;
  description: string;
  name: string;
  users: UserForRoleDto[];
}

interface UserForRoleDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
}

const RolesList: React.FC = () => {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get<RoleDto[]>('/roles');
        setRoles(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p>Error fetching roles: {error}</p>;

  return (
    <div>
      <h2>Roles</h2>
      {roles.length === 0 ? (
        <p>No roles found.</p>
      ) : (
        <ul>
          {roles.map(role => (
            <li key={role.id}>
              Role Name: {role.name} - {role.description}
              <button onClick={() => setSelectedRole(role)}>Details</button>
            </li>
          ))}
        </ul>
      )}

      {selectedRole && (
        <RoleDetails role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </div>
  );
}

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

export default RolesList;
