import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import Footer from "../components/Footer";
import MainPostFilter from "../components/MainPostFilter";
import MainPost from "../components/MainPost";
import { Pagination, Stack } from "@mui/material";
import { instance } from "../utils/axios";
import AddPost from "../components/Home/AddPost";


const mainFeaturedPost = {
  title: "흥미진진한 거래, 가치 있는 소유물을 찾아보세요!",
  description: "당신이 원하는 것은 여기 있습니다, 오늘 경매에서 발견하세요!",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "main image description",
};

interface SelectedFilters {
  status: string;
  category: string;
}

interface SelectedFilterHighLow {
  name: string;
  order: string;
}

interface IPost {
  id: number;
  name: string;
  highestPrice: number;
  bidCount: number;
  status: string;
  url: string;
  username: string;
  viewCount: number;
}



export default function Home() {
  
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    status: "",
    category: "",
  });
  const [selectedFilterHighLow, setSelectedFilterHighLow] =
    useState<SelectedFilterHighLow>({
      name: "",
      order: "",
    });

  useEffect(() => {
    instance
      .get(`/api/v1/items`)
      .then((response) => {
        setPosts(response.data.content);
        setLoading(false);
      })
      .catch((e) => {
        const response = e.response;


      });
  }, []);

  useEffect(() => {
    if (loading) return;

    const queryString = Object.entries(selectedFilters)
      .filter(([key, value]) => value !== "") // 값이 비어있지 않은 필터만 선택
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");

    instance.get(`/api/v1/items/search?${queryString}`).then((response) => {
      setPosts(response.data.content);
      setPage(response.data.number);
      setTotalPage(response.data.totalPages);
    });
  }, [selectedFilters]);

  useEffect(() => {
    if (loading) return;
    const queryString = Object.entries(selectedFilterHighLow)
      .filter(([key, value]) => value !== "") // 값이 비어있지 않은 필터만 선택
      .map(([key, value]) => {
        return `${encodeURIComponent(key)},${encodeURIComponent(value)}`;
      })
      .join("&");

    instance
      .get(`/api/v1/items/search?sort=${queryString}`)
      .then((response) => {
        setPosts(response.data.content);
        setPage(response.data.number);
        setTotalPage(response.data.totalPages);
      });
  }, [selectedFilterHighLow]);

  const handleSearchChange = (search: string) => {
    instance.get(`/api/v1/items/search?name=${search}`).then((response) => {
      setPosts(response.data.content);
      setPage(response.data.number);
      setTotalPage(response.data.totalPages);
    });
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterHighLowChange = (filterName: string, value: string) => {
    setSelectedFilterHighLow({ name: "", order: "" });
    setSelectedFilterHighLow((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleChangePage = (page: number) => {
    const queryString = Object.entries(selectedFilters)
      .filter(([key, value]) => value !== "") // 값이 비어있지 않은 필터만 선택
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");
    
    instance
      .get(`/api/v1/items/search?${queryString}&page=${page - 1}`)
      .then((response) => {
        setPosts(response.data.content);
        setPage(response.data.number);
        setTotalPage(response.data.totalPages);
      });
  }
  return (
    <Container style={{ maxWidth: "1400px" }}>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <MainPostFilter
          onFilterChange={handleFilterChange}
          onFilterHightLowChange={handleFilterHighLowChange}
          onSearchChange={handleSearchChange}
        />
        <Grid container spacing={4}>
          {posts.length > 0 ? (
            posts.map((post, index) => <MainPost key={index} post={post} />)
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: "60vh",
                fontSize: "30px",
              }}
            >
              😅 경매중인 상품이 없네요 😅
            </div>
          )}
        </Grid>
        <Stack spacing={2} sx={{ alignItems: "center", paddingTop: "30px" }}>
          <Pagination
            onChange={(e, newPage) => handleChangePage(newPage)}
            size="large"
            count={totalPage}
            defaultPage={6}
            siblingCount={0}
            boundaryCount={2}
          />
        </Stack>
        <AddPost />
      </main>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </Container>
  );
}
