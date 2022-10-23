import React from "react";
import { ErrorMessage, Field } from "formik";

function Form1() {
  return (
    <React.Fragment>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="nameInput">Name</label>
          <ErrorMessage
            name="name"
            component="span"
            className="text-danger m-2"
          />
          <Field
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="profile">Profile</label>
          <ErrorMessage
            name="profile"
            component="span"
            className="text-danger m-2"
          />
          <Field
            type="text"
            className="form-control"
            placeholder="Profile"
            name="profile"
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="summary">Summary</label>
          <ErrorMessage
            name="summary"
            component="span"
            className="text-danger m-2"
          />
          <Field
            type="text"
            className="form-control"
            placeholder="Summary goes here"
            name="summary"
          />
        </div>
      </div>
      <div className="form-group col-md-12">
        <label htmlFor="headline">Headline</label>
        <ErrorMessage
          name="headline"
          component="span"
          className="text-danger m-2"
        />
        <Field
          type="text"
          className="form-control"
          name="headline"
          placeholder="Headline goes here"
        />
      </div>
      <div className="form-group col-md-12">
        <label htmlFor="contactInformation">Contact Information</label>
        <ErrorMessage
          name="contactInformation"
          component="span"
          className="text-danger m-2"
        />
        <Field
          type="contactInformation"
          className="form-control"
          placeholder="example@email.com"
          name="contactInformation"
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="slug">Slug</label>
          <ErrorMessage
            name="slug"
            component="span"
            className="text-danger m-2"
          />
          <Field
            type="text"
            className="form-control"
            name="slug"
            placeholder="Unique slug id here"
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="statusId">Status</label>
          <Field className="form-select" component="select" name="statusId">
            <option value={2}>Not Set</option>
            <option value={1}>Active</option>
            <option value={3}>Deleted</option>
            <option value={4}>Flagged</option>
          </Field>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Form1;
