import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Avatar, Box } from "@mui/material";
import { instance } from "../utils/axios";
import SuccessAuctionPost from "../components/SuccessAuctionPost";

interface IPost {
  id: number;
  itemName: string;
  price: string;
  url: string;
  paid: string;
}

export default function AuctionPage() {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  useEffect(() => {
    instance.get(`/api/v1/payments`).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <Container style={{ maxWidth: "1400px" }}>
      <Box sx={{ width: "100%", height: "100px" }}></Box>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <SuccessAuctionPost key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
}
