import React, { useEffect, useState } from "react";
import uploadServices from "../../services/uploadServices";
import Carousel from "react-bootstrap/Carousel";
import emailService from "../../services/emailService";
import { toast } from "react-toastify";

function Upload(props) {
  const [formData, setFormData] = useState(new FormData());
  const [imageUrls, setImageUrls] = useState([]);
  const [emailData, setEmailData] = useState({
    to: ["minjkang01@gmail.com"],
    bcc: "minjkang01@gmail.com",
    body: "Hey come join us!",
    name: "",
  });
  const [carouselImages, setCarouselImages] = useState(
    <Carousel.Item>
      <img
        src="https://image.shutterstock.com/image-vector/no-image-vector-symbol-missing-260nw-1310632172.jpg"
        alt=""
        style={{ objectFit: "contain", width: "800px", height: "500px" }}
        className="center"
      />
    </Carousel.Item>
  );

  const onSubmitClick = (e) => {
    e.preventDefault();
    var onUploadSuccess = (response) => {
      const responseArr = response.data.items;
      setCarouselImages(() => {
        return responseArr.map(mapArr);
      });
      setImageUrls(() => {
        return responseArr;
      });
      //console.log(responseArr);
    };
    var onUploadError = (error) => {
      console.log(error);
    };
    uploadServices.upload(formData).then(onUploadSuccess).catch(onUploadError);
    console.log(imageUrls);
  };

  const mapArr = (image) => {
    return (
      <Carousel.Item key={image}>
        <img
          src={image}
          alt=""
          style={{ objectFit: "contain", width: "800px", height: "500px" }}
          className="center"
        />
      </Carousel.Item>
    );
  };

  const onUploadFileSelected = (e) => {
    const filesArr = e.target.files;
    const form = formData;
    for (let index = 0; index < filesArr.length; index++) {
      setFormData(() => {
        console.log(index);
        form.append("file", filesArr[index]);
        return form;
      });
    }
  };

  useEffect(() => {
    setEmailData((prevState) => {
      const pd = { ...prevState };
      //pd.to = [props.user.email];
      pd.name = props.user.firstName;
      return pd;
    });
  }, [props.user]);

  const onEmailClick = (e) => {
    e.preventDefault();

    var onMessageSuccess = (response) => {
      toast.success("Email sent! Check your inbox");
      console.log(response);
    };
    var onMessageError = (error) => {
      toast.error("An error occurred...");
      console.log(error);
    };
    emailService
      .sendMessage(emailData)
      .then(onMessageSuccess)
      .catch(onMessageError);
  };
  return (
    <React.Fragment>
      <div className="container m-5">
        <form>
          <input
            multiple="multiple"
            type="file"
            accept="image/png, image/jpeg"
            name="imgUpload"
            id="imgUpload"
            onChange={onUploadFileSelected}
          />
          <button className="btn btn-primary" onClick={onSubmitClick}>
            Upload
          </button>
          <button className="btn btn-warning" onClick={onEmailClick}>
            Email me!
          </button>
        </form>
      </div>
      <div
        className="container m-5"
        style={{
          backgroundColor: "lightgrey",
          width: "800px",
          height: "500px",
        }}
      >
        <Carousel>{carouselImages}</Carousel>
      </div>
    </React.Fragment>
  );
}
export default Upload;

//formik
//don't use materialui
//use react strap
