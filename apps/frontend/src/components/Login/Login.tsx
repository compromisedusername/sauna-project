import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../api/api';
import './Login.css';
import PropTypes from 'prop-types';

type LoginResponse = {
  response: string;
  statusCode: number;
  jwtToken: string;
}
async function loginUser(credentials: {email: string; password: string}){
  try{

    const response = await api.post<LoginResponse>("/login", credentials);
    if(response.data && response.data.jwtToken){
    console.log(response.data)
      if(!response.data.jwtToken){throw new Error("Login failed. Try again")};
      return response.data.jwtToken;
    }

  }catch(error: any){
    console.error("Error during login: ", error.response?.data);
    throw new Error(`Login failed. ${error.response.data['response']} `);
  }
}


export default function Login( {setToken}: { setToken: (token: string)=>void},  ) {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
    try{
  e.preventDefault();
    const token = await loginUser({
      email, password
    });
    setToken(token!);
    navigate('/dashboard')
    }catch(err: any){
      setError(err.message);
    }
  }


  return(
    <>
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>


<div className="decide-log">
        <p>
          Don't have an account? <a onClick={() => navigate("/register")}>Register</a>
        </p>
        <p>
          Or <span onClick={ ()=> {setToken('guest');navigate('/dashboard')} } >Continue as Guest</span>
        </p>
      </div>



</>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
