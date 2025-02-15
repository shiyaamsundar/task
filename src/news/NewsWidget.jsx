import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "@mui/material";
import HeaderBar from "./HeaderBar";
import { navBarHeading } from "./constants";
import NewsMiniCard from "./NewsMiniCard";
import NewsCard from "./newsCard";
import NewsCategories from "./NewsCategories";
import SearchBar from "./SearchBar";
import {
  useGetNewsCategoryDataQuery,
  useGetNewsDataQuery,
  useGetNewsSearchDataQuery,
} from "../state/news/newsApiSlice";

const SearchComponent = ({ query, setQuery }) => (
  <Box sx={{ width: "50%", margin: "0 auto" }}>
    <SearchBar query={query} setQuery={setQuery} />
  </Box>
);

const CategoryComponent = ({ selectedCard, setSelectedCard }) => (
  <NewsCategories
    selectedCard={selectedCard}
    setSelectedCard={setSelectedCard}
  />
);

const NewsWidget = () => {
  const { data: newsData } = useGetNewsDataQuery(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState();
  const location = useLocation().pathname;
  console.log(location);
  const [query, setQuery] = useState(null);
  const [newFeedDatas, setNewFeedDatas] = useState(null);
  const { data: newsDataCategory } = useGetNewsCategoryDataQuery(selectedCard, {
    skip: !selectedCard,
  });
  const { data: newsDataSearch } = useGetNewsSearchDataQuery(
    { query },
    { skip: !query }
  );
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => setPage(value);
  const isLocationHome = location == "/news";
  useEffect(() => {
    setNewFeedDatas(null);
    if (query) {
      setNewFeedDatas(newsDataSearch);
    } else if (selectedCard) {
      setNewFeedDatas(newsDataCategory);
    }
  }, [query, selectedCard, newsDataSearch, newsDataCategory]);

  const paginatedArticles = newFeedDatas?.articles?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    if (isLocationHome) {
      setNewFeedDatas(null);
      setSelectedCategory(null);
    }
  }, [location]);

  return (
    <>
      <HeaderBar heading={navBarHeading} navigateTo={() => navigate("/news")} />
      <FormControl fullWidth sx={{ mt: 5, mb: 5 }}>
        <InputLabel id="search-type-label">Search By</InputLabel>
        <Select
          labelId="search-type-label"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setNewFeedDatas(null);
            navigate(`/news/${e.target.value}`);
          }}
          label="Search By"
        >
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="search">Search Term</MenuItem>
        </Select>
      </FormControl>
      {selectedCategory === "category" && (
        <CategoryComponent
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )}
      {selectedCategory === "search" && (
        <SearchComponent query={query} setQuery={setQuery} />
      )}
      {!selectedCategory && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {newsData?.articles.map((article, index) => (
            <NewsMiniCard key={index} article={article} />
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {paginatedArticles?.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </Box>
      {!isLocationHome && (
        <Pagination
          count={Math.ceil(newFeedDatas?.articles?.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
      )}
    </>
  );
};

export default NewsWidget;
