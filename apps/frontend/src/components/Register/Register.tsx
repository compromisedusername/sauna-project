import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import api from './../../api/api';
import './Register.css';
import PropTypes from 'prop-types';

type RegisterResponse = {
  response: string;
  statusCode: number;
  jwtToken: string;
}
async function registerUser(credentials: {email: string; password: string; name: string; surname: string;}){
  try{
      console.log(credentials)
    const response = await api.post<RegisterResponse>("/register", credentials);
    if(response.data && response.data.jwtToken){
    console.log(response.data)
      return response.data.jwtToken;
    }

  }catch(error: any){
    console.error("Error during register: ", error.response?.data);
    throw new Error(`Register failed. ${error.response.data['response']} `);
  }
}


export default function Register( {setToken}: any,  ) {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
    try{
  e.preventDefault();
    const token = await registerUser({
      email, password, name, surname
    });
    setToken(token);
    }catch(err: any){
      setError(err.message);
    }
  }


  return( <>
    <div className="register-wrapper">
      <h1>Register</h1>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          <p>Surname</p>
          <input type="text" onChange={e => setSurname(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
<div className="decide-log">
        <p>
          Already have an account? <a onClick={() => navigate("/login")}>Login</a>
        </p>
        <p>
          Or <span onClick={ () => {setToken(""); navigate("/dashboard")}} >Continue as Guest</span>
        </p>
      </div>

</>

  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};
