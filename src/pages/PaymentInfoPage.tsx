import { Box, Button, Chip, Container, Modal, Paper, Table, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { instance } from '../utils/axios';

interface IPaymentInfo{
  id: number;
  itemId: number;
  itemName: string;
  price: number;
  username: string;
  paid: boolean;
  paidAt: string;
  method: string;
  orderId: string;
  provider: string;
  receipt: string;
  url: string;
}

const columns = [
  { id: "orderId", label: "주문번호" },
  { id: "id", label: "경매번호" },
  { id: "itemId", label: "상품번호" },
  { id: "itemName", label: "상품명" },
  { id: "price", label: "가격" },
  { id: "isPaid", label: "결제여부" },
  { id: "paidAt", label: "결제일" },
  { id: "provider", label: "결제업체" },
  { id: "username", label: "결제유저" },
];
  
const PaymentInfoPage = () => {
  const { paymentId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo | null>(null);

  useEffect(() => {
    setLoading(true);
    instance.get(`/api/v1/payments/${paymentId}`).then((response) => {
      setPaymentInfo(response.data);
    });
    setLoading(false);
  }, []);
  return (
    <Container sx={{ padding: "30px" }}>
      {loading ? (
        <div>loading</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "600px",
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              margin: "0px 30px 30px 30px",
            }}
          >
            <img
              src={paymentInfo?.url}
              alt="이미지 설명"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "100%",
                marginTop: "20px",
              }}
            >
              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell variant="head">{columns[0].label}</TableCell>
                    <TableCell>{paymentInfo?.orderId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[1].label}</TableCell>
                    <TableCell>{paymentInfo?.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[2].label}</TableCell>
                    <TableCell>{paymentInfo?.itemId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[3].label}</TableCell>
                    <TableCell>{paymentInfo?.itemName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[4].label}</TableCell>
                    <TableCell>{paymentInfo?.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[5].label}</TableCell>
                    <TableCell>
                      {paymentInfo?.paid ? (
                        <Chip label="승인" color="success" variant="filled" />
                      ) : (
                        <Chip label="미승인" color="error" variant="filled" />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[6].label}</TableCell>
                    <TableCell>{paymentInfo?.paidAt.split("T")[0]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[7].label}</TableCell>
                    <TableCell>{paymentInfo?.provider}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">{columns[8].label}</TableCell>
                    <TableCell>{paymentInfo?.username}</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PaymentInfoPage;