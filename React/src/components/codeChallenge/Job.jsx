import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function Job(props) {
  const [jobData] = useState(props);

  const aJob = props.currJob;
  const navigate = useNavigate();

  const [state, setState] = useState({
    isOpen: false,
  });

  const toggleModal = () => {
    setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };

  //console.log(aJob);

  const onEditClick = (e) => {
    e.preventDefault();
    const stateForTransport = { type: "JOB_DATA_VIEW", payload: jobData };
    navigate(`/jobs/${aJob.id}`, { state: stateForTransport });
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    props.onDeleteJobClick(aJob, e);
  };

  return (
    <React.Fragment>
      <div className="col-4" style={{ padding: "2rem" }}>
        <div className="card" style={{ width: "26rem", height: "30rem" }}>
          <img
            className="card-img-top rounded-circle mx-auto d-block"
            // src={job.techCompany.images[0].imageUrl}
            //placeholder image
            src={aJob.images[0].url}
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
              {aJob.pay}
            </h5>
            <p
              className="card-text h6 text-muted d-flex justify-content-center"
              style={{ margin: "3% 0 3% 0" }}
            >
              {aJob.title}
            </p>
            <p
              className="card-text h6 text-muted d-flex justify-content-center"
              style={{ margin: "0 0 7% 0" }}
            >
              {aJob.summary}
            </p>
            <div className="row d-flex justify-content-center">
              <div className="col-4">
                <button
                  href="#!"
                  className="btn btn-danger"
                  onClick={onDeleteClick}
                >
                  Delete Job
                </button>
              </div>
              <div className="col-4">
                <button
                  href="#!"
                  className="btn btn-warning"
                  onClick={onEditClick}
                >
                  Edit Job
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
            {aJob.title}{" "}
            <button className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
          </ModalHeader>
          <ModalBody>
            <h5>Company Id:</h5> <span>{aJob.id}</span>
            <h5>Description:</h5> <span>{aJob.description}</span>
            <h5>Summary:</h5> <span>{aJob.summary}</span>
            <h5>Slug:</h5>
            <span>{aJob.slug}</span>
            <h5>Status:</h5> <span>{aJob.statusId[0].name}</span>
            <h5>Tech Company:</h5>
            <span>
              {aJob.techCompanyId &&
                aJob.techCompanyId.map((co) => {
                  return (
                    <p key={Math.random()} style={{ marginBottom: "1%" }}>
                      {co.name}
                    </p>
                  );
                })}
            </span>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default Job;
