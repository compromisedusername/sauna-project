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
        <>
            <h2>Delete Role for ID: {roleId}</h2>
            <p>Are you sure?</p>
            <button onClick={handleClick}>
                DELETE
            </button>
            <button onClick={onClose}>Close</button>
        </>
    );
};

export default DeleteRole;
