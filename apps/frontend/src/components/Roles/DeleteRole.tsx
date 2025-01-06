import React from "react";
import {useTranslation}from 'react-i18next'
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

const {t} = useTranslation<'pl'|'en'>();
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
            <h2 className='title'>

                 {//@ts-ignore
               t('delete')}{" "}
                Role
               ID: {roleId}</h2>
            <p className='title-sure'>
 {//@ts-ignore
               t('sure')}

            </p>
            <button className='delete-button' onClick={handleClick}>
                 {//@ts-ignore
               t('delete')}
            </button>
            <button className='back-button' onClick={onClose}>
 {//@ts-ignore
               t('close')}
            </button>
        </div>
    );
};

export default DeleteRole;
