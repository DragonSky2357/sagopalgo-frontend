import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { instance } from "../utils/axios";
import { useLocation } from "react-router-dom";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

interface IPost {
  id: number;
  name: string;
  startPrice: number;
  bidCount: number;
  bidUnit: number;
  startDate: string; // 또는 Date로 변경해야 할 수도 있습니다.
  deadline: string; // 또는 Date로 변경해야 할 수도 있습니다.
  highestPrice: number;
  category: string;
  username: string;
  status: string;
  viewCount: number;
  url: string;
}
const columns = [
  { id: "id", label: "경매번호" },
  { id: "name", label: "상품명" },
  { id: "bidCount", label: "입찰수" },
  { id: "bidUnit", label: "입찰단위" },
  { id: "startPrice", label: "시작가" },
  { id: "highestPrice", label: "최고가" },
  { id: "category", label: "카테고리" },
  { id: "username", label: "판매자" },
];

const ItemPage = () => {
  const location = useLocation();
  const itemId = location.pathname.split("/")[2];
  const [price, setPrice] = useState<number>(0);
  const [time, setTime] = useState<string>();
  const [post, setPost] = useState<IPost | null>();
  const [bid, setBid] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const BASE_URL = process.env.REACT_APP_SSE_URL;

  
  useEffect(() => {
    instance.get(`/api/v1/items/${itemId}`).then((response) => {
      setPost(response.data);
      setPrice(response.data["highestPrice"]);
    });
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(decreaseRemainingTime, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const url = `http://localhost:8081/api/v1/item/subscribe/${itemId}`
    //const url = BASE_URL+`/api/v1/item/subscribe/${itemId}`;
    const eventSource = new EventSource(url, {
      withCredentials:true
    });

    console.log(url);
    eventSource.addEventListener("itemUpdate", (event) => {
      setPrice(event.data);
      console.log(event.data);
    })

    eventSource.onmessage = (event) => {
      console.log(event.data);
      setData(event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  function decreaseRemainingTime() {
    const sixPM = new Date();
    sixPM.setHours(18, 0, 0, 0);

    const currentTime = new Date();
    const remainingMilliseconds = sixPM.getTime() - currentTime.getTime();

    if (remainingMilliseconds <= 0) {
      setTime("0");
      return;
    }

    const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setTime(formattedTime);
  }

  const handleBidButton = () => {
    instance
      .post(`/api/v1/items/${itemId}/bid`, {
        price: bid,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("입찰 성공");
          //window.location.reload();
        } 
      })
      .catch((e) => {
        const response = e.response;
        if (response.status === 400) {
          alert(response.data["message"]);
        }
      });
  };

  return (
    <Container sx={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          height: "600px",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            margin: "0px 30px 30px 30px",
          }}
        >
          <img
            src={post?.url}
            alt="이미지 설명"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "32px" }}>
              {data}
              현재가 : {price.toLocaleString("ko-KR")}원
            </Typography>
            <Typography
              sx={{ fontSize: "20px", color: "white", backgroundColor: "blue" }}
            >
              {time === "0" ? "경매 종료" : `남은시간 : ${time}`}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "70%",
              marginTop: "20px",
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell variant="head">{columns[0].label}</TableCell>
                  <TableCell>{post?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[1].label}</TableCell>
                  <TableCell>{post?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[2].label}</TableCell>
                  <TableCell>{post?.bidCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[3].label}</TableCell>
                  <TableCell>{post?.bidUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[4].label}</TableCell>
                  <TableCell>{post?.startPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[5].label}</TableCell>
                  <TableCell>{post?.highestPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[6].label}</TableCell>
                  <TableCell>{post?.category}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">{columns[7].label}</TableCell>
                  <TableCell>{post?.username}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                fontSize: "20px",
                "&:hover": {
                  backgroundColor: "black !important", // Preventing transparency on hover
                },
              }}
              onClick={() => setOpen(true)}
            >
              입찰하기
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  입찰 금액
                </Typography>
                <TextField
                  label="입찰 단위"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(parseInt(e.target.value))}
                  sx={{ marginBottom: "20px" }}
                />
                <Button
                  sx={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "20px",
                    "&:hover": {
                      backgroundColor: "grey", // Preventing transparency on hover
                    },
                  }}
                  onClick={handleBidButton}
                >
                  입찰
                </Button>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ItemPage;
