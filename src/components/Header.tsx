import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Box, Menu, MenuItem, Modal } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../context/LoginState";

interface HeaderProps {
  title: string;
}

//const BASE_URL = process.env.REACT_APP_BASE_URL || "http://sagopalgo-elb-1738527234.ap-northeast-2.elb.amazonaws.com";


const onKakaoLogin = () => {
  window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/kakao`;
};

const onNaverLogin = () => {
  window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`;
};

const onGoogleLogin = () => {
  window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
};

export default function Header(props: HeaderProps) {
  const { title } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(loggedInState);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/logoutsuccess");
  };

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) {
      alert("로그인을 먼저 해주세요");
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLoggedIn]);


  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            {title}
          </Link>
        </Typography>

        {isLoggedIn ? (
          <Box>
            <Button onClick={handleClick}>{`환영합니다`}</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/auction");
                }}
              >
                낙찰 내역
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            Login
          </Button>
        )}
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
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              minWidth: 500,
              maxWidth: 500,
              minHeight: 300,
              maxHeight: 300,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              소셜 로그인
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "25vh", // 화면 전체 높이
              }}
            >
              <Box>
                <Button onClick={onKakaoLogin}>
                  <img
                    src={require("../assets/logos/kakao-logo.png")}
                    width={100}
                    height={100}
                    alt="카카오 로그인"
                  />
                </Button>
                <Typography sx={{ fontSize: "20px" }}>kakao 로그인</Typography>
              </Box>

              <Box>
                <Button onClick={onNaverLogin}>
                  <img
                    src={require("../assets/logos/naver-logo.png")}
                    width={100}
                    height={100}
                    alt="카카오 로그인"
                  />
                </Button>
                <Typography sx={{ fontSize: "20px" }}>Naver 로그인</Typography>
              </Box>

              <Box>
                <Button onClick={onGoogleLogin}>
                  <img
                    src={require("../assets/logos/google-logo.png")}
                    width={100}
                    height={100}
                    alt="카카오 로그인"
                  />
                </Button>
                <Typography sx={{ fontSize: "20px" }}>Google 로그인</Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Toolbar>
    </React.Fragment>
  );
}
