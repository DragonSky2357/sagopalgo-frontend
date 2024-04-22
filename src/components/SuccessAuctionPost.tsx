import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MainPostProps {
  post: {
    id: number;
    itemName: string;
    price: string;
    url: string;
    paid: string;
  };
}

const SuccessAuctionPost = (props: MainPostProps) => {
  const { post } = props;
  const navigate = useNavigate();

  const handlePaymentInfo = () => {
    if (post.paid) {
      navigate(`/payment-info/${post.id}`);
    }
  }
  return (
    <Grid item xs={12} md={3}>
      <CardActionArea onClick={handlePaymentInfo}>
        <Card>
          {!post.paid && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                fontSize: "1.5rem",
                zIndex: 1,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "green", // hover 시 배경색 변경
                    color: "#ffffff", // hover 시 텍스트 색 변경
                  },
                }}
                onClick={() => {
                  navigate(`/payment/${post.id}`);
                }}
              >
                지불하기
              </Button>
            </Box>
          )}
          <CardMedia
            component="img"
            sx={{
              width: 340,
              height: 300,
              objectFit: "cover",
            }}
            image={post.url}
            alt={post.itemName}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default SuccessAuctionPost;
