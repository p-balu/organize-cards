import React, { useRef } from "react";
import PropTypes from "prop-types";
import "../FileInput/FileInput.css";
const FileInput = ({
  name,
  onChange,
  className,
  children,
  accept,
  imagePreview,
  fileUrl,
  ...props
}) => {
  const fileInputField = useRef(null);

  const handleBrowseFile = () => {
    fileInputField.current.click();
  };
  console.log(imagePreview, fileUrl);
  return (
    <React.Fragment>
      {imagePreview == false ? (
        <section className="image-section">
          <p className="file-text">
            Drop your picture <br /> <br />
            or
          </p>
          <button
            type="button"
            onClick={handleBrowseFile}
            className="file-upload-button"
          >
            Choose File
          </button>
          <input
            type="file"
            className={className}
            name={name}
            id={name}
            ref={fileInputField}
            onChange={onChange}
            accept={accept}
          />
        </section>
      ) : (
        <>
          <img src={fileUrl} className="image-section" />
        </>
      )}
    </React.Fragment>
  );
};

FileInput.defaultProps = {
  className: "file-input",
  accept: ".jpeg, .png, .jpg",
  imagePreview: false,
  fileUrl: "",
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  accept: PropTypes.string,
  imagePreview: PropTypes.bool,
  fileUrl: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default FileInput;
