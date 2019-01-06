import React from "react";

function SubTopics({main, handleSubSubmit, handleChange }) {
   
  return (
    <React-Fragment>
      <form id={main} onSubmit={handleSubSubmit}>
        <div className="form-group">
          <label htmlFor="sub">Alt Konu Adı</label>
          <input type="text" id="sub" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Açıklama</label>
          <input type="text" id="description" onChange={handleChange} />
        </div>
        <button className="btn"  >Alt Konu Ekle</button>
      </form>
    </React-Fragment>
  );
}

export default SubTopics;
