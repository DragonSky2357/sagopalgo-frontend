import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GavelIcon from "@mui/icons-material/Gavel";
import { useNavigate } from "react-router-dom";
import AuctionStatus from "./post/AuctionStatus";

interface MainPostProps {
  post: {
    id: number;
    name: string;
    highestPrice: number;
    bidCount: number;
    status: string;
    url: string;
    username: string;
    viewCount: number;
  };
}

export default function MainPost(props: MainPostProps) {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={3}>
      <CardActionArea
        onClick={() => {
          navigate(`/item/${post.id}`);
        }}
      >
        <Card>
          <AuctionStatus status={post.status} />
          <CardMedia
            component="img"
            sx={{
              width: 320,
              height: 240,
              objectFit: "cover",
            }}
            image={post.url}
            alt={post.name}
          />
          <CardContent>
            <Box>
              <Typography component="h2" variant="h6">
                {post.name}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", paddingTop: "10px" }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                // src="https://wimg.mk.co.kr/meet/neds/2022/06/image_readtop_2022_556367_16561184505086722.jpeg"
              />
              <Typography sx={{ paddingLeft: "10px" }}>
                {post.username}
              </Typography>
            </Box>

            <Box sx={{ display: "flex",justifyContent:"space-between",paddingTop:"20px" }}>
              <Box >
                <Typography>최고가 : {post.highestPrice}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VisibilityIcon /> {post.viewCount}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <GavelIcon />
                  {post.bidCount}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
