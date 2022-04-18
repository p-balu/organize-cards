import React, { useState, useEffect } from "react";
import FileInput from "../components/FileInput/FileInput";
import "../assests/stylesheets/Add.css";
import Information from "./Information";
const Add = () => {
  const [fileUrl, setFileUrl] = useState({});
  const [file, setFile] = useState({});
  const [imagePreview, setImagePreview] = useState(false);
  const [imageBytes, setImageBytes] = useState("");
  const [extractedData, setExtractedData] = useState({});

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    setImagePreview(true);
  };

  //checks if the file object is empty or not
  const isEmpty = (object) => {
    for (const property in object) {
      return false;
    }
    return true;
  };

  // image needs to be converted to base64 bytes format before calling an api
  useEffect(() => {
    console.log("useEffect entered", file);
    if (!isEmpty(file)) {
      const reader = new FileReader();
      reader.onload = function () {
        let base64result = reader.result.split(",")[1];
        setImageBytes(base64result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  //api for the extracting the infomration from the image will be done here
  const handleExtract = (event) => {
    event.preventDefault();
    console.log("Extract image information");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        filebytes: imageBytes,
      }),
    };
    console.log(imageBytes);
    fetch("http://127.0.0.1:8000/extract-info", request)
      .then((res) => res.json())
      .then((data) => {
        setExtractedData(data);
      });
  };
  const handelClear = (event) => {
    event.preventDefault();
    setFile({});
    setFileUrl("");
    setImagePreview(false);
    setImageBytes("");
    console.log("clear image");
  };
  return (
    <div className="add-container">
      <h2 className="section1-header">Upload Card</h2>
      <FileInput
        name="file"
        onChange={handleFileChange}
        imagePreview={imagePreview}
        fileUrl={fileUrl}
      />
      <div className="button-container">
        <button onClick={handelClear} className="button-5">
          Clear
        </button>
        <button onClick={handleExtract} className="button-6">
          Extract Info
        </button>
      </div>
      <h2 className="section1-header">Extracted Information</h2>
      <Information extractedData={extractedData} image={fileUrl} />
    </div>
  );
};
export default Add;
