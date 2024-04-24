import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import uuid from "react-uuid";

interface IPayment {
  id: number;
  itemId: number;
  itemName: string;
  price: string;
  username: string;
  url: string;
  paid: string;
}

interface IReviewProps {
  payment: IPayment | null;
}

const payments = [
  { name: "카드사:", detail: "신한은행" },
  { name: "고객명:", detail: "김철수" },
  { name: "카드번호:", detail: "1111-2222-3333-4444" },
  { name: "유효기간:", detail: "04/2027" },
];


const Payment: React.FC<IReviewProps> = ({ payment }) => {
  const handlePayment = () => {
    const clientKey = process.env.REACT_APP_TOSS_PAYMENTS_CLIENT_KEY ?? "";
    const originUrl = process.env.REACT_APP_ORIGINAL_URL ?? "";

    loadTossPayments(clientKey).then((tossPayments:any) => {
      tossPayments
        .requestPayment("카드", {
          amount: parseInt(payment?.price ?? "0"),
          orderId: uuid(), // 대충 날짜를 조합하든가 uuid를 사용하는 방법도..
          orderName: payment?.itemName ?? "",
          customerName: payment?.username,
          successUrl: `${originUrl}/payments/${payment?.id}/toss/confirm`, // ${결제 성공 후 redirect할 url}
          failUrl: `${originUrl}/fail`, //  ${결제 실패한 경우 redirect할 url}
        })
        .catch(function (error: any) {
          if (error.code === "USER_CANCEL") {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        })
    })
  };

  return (
    <Stack spacing={1}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="경매번호" />
          <Typography variant="body2">{payment?.id}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="상품번호" />
          <Typography variant="body2">{payment?.itemId}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="상품명" />
          <Typography variant="body2">{payment?.itemName}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="낙찰가" />
          <Typography variant="body2">{payment?.price}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="낙찰자" />
          <Typography variant="body2">{payment?.username}</Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
          <Button variant="contained" onClick={handlePayment}>결제하기</Button>
        </div>
      </Stack>
    </Stack>
  );
};

export default Payment;