import { Cancel } from "@material-ui/icons";
import React, { useState } from "react";

export default function ImgPreview(props) {
  const [file, setFile] = useState(props.f);
  console.log(file);

  return (
    <div className="img-preview">
      {/* {file !== null && (
        <div> */}
      <img
        className="record-img"
        src={URL.createObjectURL(file)}
        alt="record-img"
      />
      <Cancel
        className="record-remove-img"
        onClick={() => {
          props.onDelete(props.id);
        }}
      />
      {/* </div>
      )} */}
    </div>
  );
}
