import { useNavigate } from "react-router-dom";
import api from './../../api/api'
import {useTranslation}from 'react-i18next'
export default function Logout({ setToken }: any) {
  const navigate = useNavigate();
const {t} = useTranslation<'pl'|'en'>();


async function logoutUser(){
    try{
     const response = await api.get('/logout');
      console.log("Logout", response.data)
    }catch(error: any){
      console.error("Error during register", error.response?.data)
      throw new Error(`Logout failed. ${error.response.data['response']} `)
    }
  }

  return (
    <div className='container'>
        {" "}
        <button className='action-button' onClick={() => {setToken(""); logoutUser(); navigate("/dashboard")}}>
        {// @ts-ignore
          t('logout')}
          </button>
    </div>
  );
}
