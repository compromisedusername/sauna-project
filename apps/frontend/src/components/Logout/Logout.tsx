import { useNavigate } from "react-router-dom";
import api from './../../api/api'
export default function Logout({ setToken }: any) {
  const navigate = useNavigate();


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
        <button className='action-button' onClick={() => {setToken(""); logoutUser(); navigate("/dashboard")}}> LOGOUT</button>
    </div>
  );
}
