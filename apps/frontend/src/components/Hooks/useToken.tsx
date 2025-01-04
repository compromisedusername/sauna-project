import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString: string =localStorage.getItem('token')!;
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
