import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {useDebouncedCallback } from "use-debounce";
import { instance } from "../utils/axios";
import { useNavigate } from "react-router-dom";

interface MainPostFilterProps {
  onFilterChange: (filterName: string, value: string) => void;
  onFilterHightLowChange: (filterName: string, value: string) => void;
}

interface ISearch {
  id: number;
  name: string;
  bidCount: number;
  highestPrice: number;
  status: string;
  url: string;
  username: string;
  viewCount: number;
}


const MainPostFilter: React.FC<MainPostFilterProps> = ({
  onFilterChange,
  onFilterHightLowChange
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<ISearch[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleSearchChange = (search: string) => {
    instance.get(`/api/v1/es/search?keyword=${search}`).then((response) => {
      console.log(response.data);
      setSearch(response.data);
    });
  };

  const searchTitle = useDebouncedCallback((value) => {
    handleSearchChange(value);
  }, 1000);

  const handleItemClick = (option: any) => {
    navigate(`/item/${option.id}`);
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", height: "100px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={status}
              onChange={(e: SelectChangeEvent) => {
                setStatus(e.target.value);
                onFilterChange("status", e.target.value);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {status === "" && (
                <MenuItem value="">
                  <em>경매상황</em>
                </MenuItem>
              )}
              <MenuItem value={"inprogress"}>경매중</MenuItem>
              <MenuItem value={"pending"}>경매전</MenuItem>
              <MenuItem value={"completed"}>경매종료</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={category}
              onChange={(e: SelectChangeEvent) => {
                setCategory(e.target.value);
                onFilterChange("category", e.target.value);
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

          <ButtonGroup
            variant="text"
            aria-label="Basic button group"
            sx={{ height: "40px" }}
          >
            <Button
              onClick={() => {
                onFilterHightLowChange("bidcount", "desc");
              }}
            >
              입찰 높은순
            </Button>
            <Button
              onClick={() => {
                onFilterHightLowChange("bidcount", "asc");
              }}
            >
              입찰 낮은순
            </Button>
            <Button
              onClick={() => {
                onFilterHightLowChange("highestprice", "desc");
              }}
            >
              가격 높은순
            </Button>
            <Button
              onClick={() => {
                onFilterHightLowChange("highestprice", "asc");
              }}
            >
              가격 낮은순
            </Button>
          </ButtonGroup>
        </Box>

        <Autocomplete
          sx={{ width: "500px" }}
          options={search}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(event, value) => handleItemClick(value)}
          getOptionLabel={(option: ISearch) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asynchronous"
              onChange={(e) => searchTitle(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default MainPostFilter;
