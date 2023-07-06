import React, { useState } from "react";
import '../../assets/style/SearchBar.css';
import axios from "axios";

const SearchBar = () => {
  const [district, setDistrict] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/search-apartment?district=${district}&number_room=${numRooms}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log("Error:", error);
    }
    setDistrict("");
    setNumRooms("");
  };
  
  
  return (
    <div className="s01">
      <form onSubmit={handleSearch}>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input
              id="search"
              type="text"
              placeholder="Bạn muốn chọn quận nào?"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="input-field second-wrap">
            <input
              id="location"
              type="text"
              placeholder="Bao nhiêu phòng"
              value={numRooms}
              onChange={(e) => setNumRooms(e.target.value)}
            />
          </div>
          <div className="input-field third-wrap">
            <button className="btn-search" type="submit">
              Tìm kiếm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
