import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios";
import Payment from "../components/payment/Payment";

interface IPayment {
  id: number;
  itemId: number;
  itemName: string;
  price: string;
  username: string;
  url: string;
  paid: string;
}

export default function Checkout() {
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const { itemId } = useParams();

  useEffect(() => {
    instance.get(`/api/v1/payments/${itemId}`).then((response) => {
      setPayment(response.data);
    });
  }, []);

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <Grid container>
        <Grid
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box>
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href={`/auction`}
              sx={{ ml: "-8px" }}
            >
              Back to
            </Button>
          </Box>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: activeStep !== 0 ? "space-between" : "flex-end",
            marginTop: "40px",
            marginLeft: "30px",
            mb: "60px",
          }}
        >
          <Payment payment={payment} />
        </Box>
      </Grid>
    </Container>
  );
}
