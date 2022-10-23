import React from "react";

function EventCard(props) {
  const onViewMoreClick = (e) => {
    e.preventDefault();
    props.onViewMoreClick(props.event, e);
  };

  const onEditClick = (e) => {
    e.preventDefault();
    props.onEditClick(props.event, e);
  };

  return (
    <div className="card m-2 w-100 h-100">
      <div style={{ paddingBottom: "2%" }}>
        <div className="card-body">
          <h5>{props.event.headline}</h5>
          <p>{props.event.metaData.dateStart}</p>
          <p>{props.event.description}</p>
        </div>
        <div className="row">
          <div className="col-6">
            <button className="btn btn-light" onClick={onViewMoreClick}>
              View More
            </button>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-warning" onClick={onEditClick}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
