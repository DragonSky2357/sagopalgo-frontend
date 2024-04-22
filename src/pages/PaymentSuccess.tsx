import React, { useEffect } from 'react'
import { instance } from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { paymentId } = useParams();
    
    const orderId = new URL(window.location.href).searchParams.get("orderId");
    const paymentKey = new URL(window.location.href).searchParams.get("paymentKey");
    const amount = new URL(window.location.href).searchParams.get("amount");
    
    useEffect(() => {
      instance
        .get(
            `/api/v1/payments/${paymentId}/toss/confirm?paymentKey=${paymentKey}&amount=${amount}&orderId=${orderId}`
        )
        .then((res) => {
          if (res.status === 200) {
              alert("결제 성공");
              navigate("/");
          }
        })
        .catch((err) => {
          navigate("/failed");
        });
    }, []);
  return (
    <></>
  )
}

export default PaymentSuccess