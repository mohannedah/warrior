import React, { useState } from "react";
import { MDBCol, MDBFormInline, MDBBtn, MDBIcon } from "mdbreact";

const SearchPage = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      keyword.trim();
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <MDBCol>
      <MDBFormInline onSubmit={onSubmit} className='md-form'>
        <input
          className='form-control form-control-sm ml-3 w-75'
          type='text'
          placeholder='Search'
          aria-label='Search'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <MDBIcon
          icon='search'
          className='mx-2'
          style={{ color: "white", cursor: "pointer" }}
          onClick={onSubmit}
        />
      </MDBFormInline>
    </MDBCol>
  );
};

export default SearchPage;
