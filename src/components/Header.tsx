import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Box, Menu, MenuItem, Modal } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

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
  const [cookies] = useCookies();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function removeCookie(cookieName: string) {
    // 현재 시간을 얻어와서 1일 전으로 설정
    var expires = new Date();
    expires.setHours(expires.getHours() - 24);

    // 쿠키의 만료일을 이전으로 설정하여 쿠키를 제거
    document.cookie =
      cookieName + "=; expires=" + expires.toUTCString() + "; path=/";
  }

  const handleLogout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    removeCookie("USER");
    navigate("/");
  };
  
  useEffect(() => {
    if (!(cookies["accessToken"])) {
      alert("로그인을 먼저 해주세요");
      setOpen(true);
    }
  }, []);
  
  useEffect(() => {
    if (cookies.accessToken) setUser(true);
  });

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
        <IconButton>
          <SearchIcon />
        </IconButton>

        {user ? (
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
                입찰 내역
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
