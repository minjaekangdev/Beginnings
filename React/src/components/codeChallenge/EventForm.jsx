import React from "react";
import { Field, ErrorMessage } from "formik";
import { right } from "@popperjs/core";

function EventForm() {
  return (
    <React.Fragment>
      <div className="modal-body">
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
            Title
            {
              <ErrorMessage
                name="name"
                component="span"
                className="text-danger"
                style={{ float: right }}
              />
            }
          </label>
          <div className="col-sm-10">
            <Field
              name="name"
              className="form-control title-input"
              placeholder="Taylor Swift in Concert"
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="headline" className="col-sm-2 col-form-label">
            Headline
            <ErrorMessage
              name="headline"
              component="span"
              className="text-danger"
              style={{ float: right }}
            />
          </label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="headline"
              className="form-control headline-input"
              placeholder="Folklore Stadium Tour"
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description
            <ErrorMessage
              name="description"
              component="span"
              className="text-danger"
              style={{ float: right }}
            />
          </label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="description"
              className="form-control desc-input"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, facere."
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="summary" className="col-sm-2 col-form-label">
            Summary
            <ErrorMessage
              name="summary"
              component="span"
              className="text-danger"
              style={{ float: right }}
            />
          </label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="summary"
              className="form-control summary-input"
              placeholder="This is the Folklore Tour Summary"
            />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="slug" className="col col-form-label">
            Slug
            <ErrorMessage
              name="slug"
              component="span"
              className="text-danger"
              style={{ float: right }}
            />
          </label>
          <div className="form-group col-md-10">
            <Field type="text" name="slug" className="form-control" />
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "2%" }}>
          <label htmlFor="statusId" className="col-sm-2 col-form-label">
            Status Id
          </label>
          <div className="col-sm-10">
            <Field
              id="statusId"
              className="form-select"
              component="select"
              name="statusId"
            >
              <option value={2}>Not Set</option>
              <option value={1}>Active</option>
              <option value={3}>Deleted</option>
              <option value={4}>Flagged</option>
            </Field>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventForm;
