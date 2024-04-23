import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSuccess = () => {
    const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("Login", "success");
        navigate("/");
    })
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess