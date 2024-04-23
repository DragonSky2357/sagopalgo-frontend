import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInState } from "../context/LoginState";

const LogoutSuccess = () => {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);

  useEffect(() => {
    setLoggedIn(false);
    navigate("/");
  });
  return <div>LogoutSuccess</div>;
};

export default LogoutSuccess;
