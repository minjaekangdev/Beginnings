import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import debug from "sabio-debug";
//import friendsService from "../../services/friendsService";

const _logger = debug.extend("PersonFriend");

function Person(props) {
  const [friendData] = useState(props.person);
  const imageUrl = props.person.primaryImage[0].url;
  const navigate = useNavigate();
  const friendId = props.person.id;

  //console.log(props);

  const onLocalPersonClicked = (evt) => {
    evt.preventDefault();
    props.onPersonClicked(props.person, evt);
  };

  const onEditbuttonClicked = () => {
    const stateForTransport = { type: "FRIEND_DATA_VIEW", payload: friendData };
    //console.log(imageUrl);
    navigate(`/friends/${friendId}`, { state: stateForTransport });
    _logger(
      "Clicking this button should take the user to the edit friend form"
    );
  };

  return (
    <div className="col-4" style={{ padding: "2rem" }}>
      <div className="card" style={{ width: "26rem", height: "30rem" }}>
        <img
          className="card-img-top rounded-circle mx-auto d-block"
          src={imageUrl}
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
          <h5 className="card-title h3">{friendData.title}</h5>
          <p
            className="card-text h6 text-muted"
            style={{ margin: "3% 0 7% 0" }}
          >
            {friendData.summary}
          </p>
          {props.user.roles >= 1 ? (
            <>
              <button
                href="#!"
                onClick={onLocalPersonClicked}
                className="btn btn-primary"
                style={{ margin: "0 2% 2% 0" }}
              >
                Delete Friend
              </button>
              <button
                href="#!"
                onClick={onEditbuttonClicked}
                className="btn btn-warning"
                style={{ margin: "0 0 2% 0" }}
              >
                Edit Friend
              </button>{" "}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
  }),
};

export default React.memo(Person);

//need to send a state object with my navigate function when the edit button is clicked
