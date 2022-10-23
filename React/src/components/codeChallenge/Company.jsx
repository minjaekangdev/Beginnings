import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/techcos.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function Company(props) {
  const company = props.co;
  const navigate = useNavigate();
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggleModal = () => {
    setState((prevState) => {
      // console.log(company);
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };
  const onDeleteClick = (e) => {
    e.preventDefault();
    props.onDeleteClick(company, e);
  };

  const onEditClick = (e) => {
    e.preventDefault();
    //console.log(props.co);
    navigate(`/techcompanies/${company.id}`);
  };
  return (
    <React.Fragment>
      <div className="col-4" style={{ padding: "2rem" }}>
        <div className="card" style={{ width: "26rem", height: "30rem" }}>
          <img
            className="card-img-top rounded-circle mx-auto d-block"
            src={company.images && company.images[0].url}
            //placeholder image
            //src={company.images[0].imageUrl}
            style={{
              objectFit: "cover",
              width: "50%",
              height: "50%",
              marginTop: "2%",
              border: "1px solid lightgrey",
            }}
            alt="Card img cap"
          />
          <div className="card-body" style={{ padding: "5%" }}>
            <h5 className="card-title h3 d-flex justify-content-center">
              {company.name}
            </h5>
            <p
              className="card-text h6 text-muted d-flex justify-content-center"
              style={{ margin: "3% 0 3% 0" }}
            >
              {company.headline}
            </p>
            <p
              className="card-text h6 text-muted d-flex justify-content-center"
              style={{ margin: "0 0 7% 0" }}
            >
              {company.summary}
            </p>
            <div className="row d-flex justify-content-center">
              <div className="col-4">
                <button
                  href="#!"
                  className="btn btn-danger"
                  onClick={onDeleteClick}
                >
                  Delete Co
                </button>
              </div>
              <div className="col-4">
                <button
                  href="#!"
                  className="btn btn-warning"
                  onClick={onEditClick}
                >
                  Edit Co
                </button>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-4">
                <button
                  href="#!"
                  onClick={toggleModal}
                  className="btn btn-light"
                  style={{ margin: "20% 0 0 0" }}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal">
        <Modal size="md" isOpen={state.isOpen}>
          <ModalHeader>
            {company.name}{" "}
            <button className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
          </ModalHeader>
          <ModalBody>
            <h5>Company Id:</h5> <span>{company.id}</span>
            <h5>Profile:</h5> <span>{company.profile}</span>
            <h5>Summary:</h5> <span>{company.summary}</span>
            <h5>Headline:</h5> <span>{company.headline}</span>
            <h5>Contact Information:</h5>
            <span>{company.contactInformation}</span>
            <h5>Slug:</h5>
            <span>{company.slug}</span>
            <h5>Status:</h5> <span>{company.statusId[0].name}</span>
            <h5>Urls:</h5>
            <span>
              {company.urls &&
                company.urls.map((url) => {
                  return (
                    <p key={Math.random()} style={{ marginBottom: "1%" }}>
                      {url.url}
                    </p>
                  );
                })}
            </span>
            <h5>Tags:</h5>
            <span>
              {company.tags &&
                company.tags.map((tag) => {
                  return (
                    <p key={Math.random()} style={{ marginBottom: "1%" }}>
                      {tag.tag}
                    </p>
                  );
                })}
            </span>
            <h5>Friends:</h5>
            <span>
              {company.friends &&
                company.friends.map((friend) => {
                  return (
                    <React.Fragment key={Math.random()}>
                      <p style={{ marginBottom: "1%" }}>
                        Friend's Skills:
                        {friend.skills.map((skill) => {
                          return skill.name + " ";
                        })}
                      </p>
                      <p>Friend Name: {friend.title}</p>
                      <p>Friend Id:{friend.id}</p>
                    </React.Fragment>
                  );
                })}
            </span>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default Company;
