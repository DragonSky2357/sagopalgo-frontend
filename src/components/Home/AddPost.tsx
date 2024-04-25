import { Box, Button, Fab, FormControl, MenuItem, Modal, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import dayjs, { Dayjs } from 'dayjs';
import { HttpStatusCode } from 'axios';
import { instance } from '../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddPost = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [startPrice, setStartPrice] = useState<string>("0");
  const [bidUnit, setBidUnit] = useState<string>("0");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().add(1, "day")
  );
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
    
    const handleDrop = (e: any) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);

        const formData = new FormData();
        formData.append("image", file);

        instance
          .post(`/api/v1/items/image/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // 멀티파트 폼 형식으로 요청을 보냅니다.
            },
          })
          .then((response:any) => {
            console.log(response.data);
            if (response.status === HttpStatusCode.Ok) {
              setImageUrl(response.data);
            }
          })
          .catch((error:any) => {
            console.error("Error uploading image:", error);
          });
      };

      reader.readAsDataURL(file);
    };

    const handleDragOver = (e: any) => {
      e.preventDefault();
    };

    const handleSubmit = () => {
        const requestData = {
          name,
          startPrice,
          bidUnit,
          startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
          category,
          url : imageUrl,
        };

        instance
          .post("/api/v1/items", requestData)
          .then((response) => {
            setOpenModal(false);
            window.location.reload();
          })
          .then((error) => {
            console.error("상품 등록 오류", error);
          });
    }
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "50px",
          right: "50px",
          zIndex: 1000, // Adjust z-index as needed
        }}
      >
        <Fab color="success" onClick={() => setOpenModal(true)}>
          <AddIcon />
        </Fab>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            height: "700px",
            maxheight: "700px",
            maxWidth: "500px",
          }}
        >
          <Box
            sx={{
              marginBottom: "30px",
              height: "300px",
              display: "flex",
              alignItems: "center", // 가로 정렬
              justifyContent: "center", // 세로 정렬
              flexDirection: "column",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!image && <AddIcon sx={{ fontSize: "60px" }} />}
            {image && (
              <Box sx={{ marginBottom: "20px" }}>
                <img
                  src={image}
                  alt="Dropped Image"
                  style={{
                    width: "500px",
                    height: "300px",
                    maxWidth: "500px",
                    maxHeight: "300px",
                  }}
                />
              </Box>
            )}
          </Box>

          <TextField
            label="상품명"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="시작가"
            variant="outlined"
            fullWidth
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            label="입찰 단위"
            variant="outlined"
            fullWidth
            type="number"
            value={bidUnit}
            onChange={(e) => setBidUnit(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <Box sx={{ display: "flex", marginBottom: "20px" }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ko-KR"
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="날짜 선택"
                  format="YYYY/MM/DD"
                  defaultValue={dayjs().add(1, "day")}
                  onChange={(date: Dayjs | null) => {
                    setStartDate(date);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <Select
                value={category}
                onChange={(e: SelectChangeEvent) => {
                  setCategory(e.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {category === "" && (
                  <MenuItem value="">
                    <em>카테고리</em>
                  </MenuItem>
                )}
                <MenuItem value={"가전제품"}>가전제품</MenuItem>
                <MenuItem value={"의류"}>의류</MenuItem>
                <MenuItem value={"가구"}>가구</MenuItem>
                <MenuItem value={"예술품"}>예술품</MenuItem>
                <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            sx={{ backgroundColor: "black", color: "white" }}
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            상품 등록
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddPost