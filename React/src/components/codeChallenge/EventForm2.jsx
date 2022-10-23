import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../../styling/map.css";

function EventForm2(props) {
  const [libraries] = useState(["places"]);
  const [autocomplete, setAutoComplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries,
  });

  const onLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    props.values.metaData.location.address =
      autocomplete.getPlace().formatted_address;
    props.values.metaData.location.zipCode =
      autocomplete.getPlace().address_components[
        autocomplete.getPlace().address_components.length - 1
      ].long_name;

    props.values.metaData.location.latitude = autocomplete
      .getPlace()
      .geometry.location.lat();
    props.values.metaData.location.longitude = autocomplete
      .getPlace()
      .geometry.location.lng();
  };

  return isLoaded ? (
    <React.Fragment>
      <div className="modal-body">
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <div className="form-group col-md-6">
            <label htmlFor="dateStart">
              Start Date{" "}
              <ErrorMessage
                name="metaData.dateStart"
                component="span"
                className="text-danger"
              />
            </label>
            <Field
              type="date"
              className="form-control modal-start-date"
              name="metaData.dateStart"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dateEnd">
              End Date{" "}
              <ErrorMessage
                name="metaData.dateEnd"
                component="span"
                className="text-danger"
              />
            </label>
            <Field
              type="date"
              className="form-control modal-end-date"
              name="metaData.dateEnd"
            />
          </div>
          <div className="form-group col-md-2" style={{ margin: "auto" }}></div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <div className="form-group col-md-7">
            <label htmlFor="address">
              Address{" "}
              <ErrorMessage
                name="metaData.location.address"
                component="span"
                className="text-danger"
              />
            </label>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Field
                type="text"
                className="form-control"
                name="metaData.location.address"
              />
            </Autocomplete>
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="zipCode">Zipcode</label>
            <Field
              type="text"
              className="form-control modal-zipcode"
              name="metaData.location.zipCode"
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="latitude" className="col-sm-2 col-form-label">
            Latitutde
            <ErrorMessage
              name="metaData.location.latitude"
              component="span"
              className="text-danger"
              style={{ float: "right" }}
            />
          </label>
          <div className="col-sm-10">
            <Field
              name="metaData.location.latitude"
              className="form-control title-input"
              placeholder="Latitude Coordinates in degrees"
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="longitude" className="col-sm-2 col-form-label">
            Longitude
            <ErrorMessage
              name="metaData.location.longitude"
              component="span"
              className="text-danger"
              style={{ float: "right" }}
            />
          </label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="metaData.location.longitude"
              className="form-control headline-input"
              placeholder="Longitude Coordinates in degrees"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <></>
  );
}

export default EventForm2;
