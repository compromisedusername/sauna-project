import { useNavigate } from "react-router-dom";

export default function Logout({ setToken }: any) {
  const navigate = useNavigate();

  return (
    <>
      <p>
        {" "}
        <a onClick={() => {setToken("guest");navigate("/dashboard")}}> LOGOUT</a>
      </p>
    </>
  );
}
