import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInState } from "../context/LoginState";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);
  useEffect(() => {
    setLoggedIn(true);
    navigate("/");
  });
  return <div>LoginSuccess</div>;
};

export default LoginSuccess;
