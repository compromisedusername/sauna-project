import React from "react";
import api from "./../../api/api";
import { useNavigate } from "react-router-dom";

interface DeleteRoleProps {
    roleId: number;
    onClose: () => void;
    setRoles: () => void;
}

const DeleteRole: React.FC<DeleteRoleProps> = ({
    roleId,
    onClose,
    setRoles
}) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await api.delete(`/role/${roleId}`);
            setRoles();
            onClose();
            navigate("/admin/roles");
        } catch (error: any) {
            console.error(`Error deleting role: ${error.message}`);
        }
    };

    return (
    <div className='container'>
            <h2 className='title'>Delete Role for ID: {roleId}</h2>
            <p className='title-sure'>Are you sure?</p>
            <button className='delete-button' onClick={handleClick}>
                DELETE
            </button>
            <button className='back-button' onClick={onClose}>Close</button>
        </div>
    );
};

export default DeleteRole;
