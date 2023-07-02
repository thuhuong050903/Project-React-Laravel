import React, { useContext, useEffect, useState, useRef } from "react";
import '../../assets/style/SearchBar.css'

const SearchBar = () => {
    return(
        <div className="s01">
      <form>
       
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input id="search" type="text" placeholder="Bạn muốn chọn quận nào?" />
          </div>
          <div className="input-field second-wrap">
            <input id="location" type="text" placeholder="Bao nhiêu phòng" />
          </div>
          <div className="input-field third-wrap">
            <button className="btn-search" type="button">Tìm kiếm</button>
          </div>
        </div>
      </form>
    </div>
  );
    
}

export default SearchBar;