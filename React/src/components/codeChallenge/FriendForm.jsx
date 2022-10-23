import React, { useEffect, useState } from "react";
import "../../styling/friendForm.css";
import friendsService from "../../services/friendsService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

function FriendForm() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 0,
    imageTypeId: 1,
    imageUrl: "",
    skills: [],
  });
  const [frndId, setFrndId] = useState(friendId);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(50, "Must be less than 50 characters.")
      .required("Required"),
    bio: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    summary: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    headline: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    slug: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    imageUrl: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .required("Required"),
  });
  const onSubmitClick = (values) => {
    //console.log(values);
    if (frndId === undefined) {
      var onAddSuccess = (response) => {
        //console.log('successfully added friend!', response)
        toast.success("Successfully added a new friend :)");
        setFrndId(() => {
          return response;
        });
        navigate("/friends");
      };
      var onAddError = () => {
        //console.log('error adding friend', error)
        toast.success("An error occured..");
      };
      //console.log(formData);
      friendsService.addFriend(values).then(onAddSuccess).catch(onAddError);
    } else {
      var onUpdateSuccess = () => {
        toast.success("Successfully updated your friend :)");
        //console.log("update success!", response);
        navigate("/friends");
      };
      var onUpdateError = (error) => {
        toast.error("An error occured..");
        console.log("update error", error);
      };
      friendsService
        .updateFriend(values, frndId)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    }
  };

  //console.log(state.payload);

  useEffect(() => {
    console.log(friendId);
    setFrndId(friendId);
    if (state?.type === "FRIEND_DATA_VIEW") {
      setFormData((prevState) => {
        const pd = { ...prevState };

        pd.title = state.payload.title;
        pd.bio = state.payload.bio;
        pd.summary = state.payload.summary;
        pd.headline = state.payload.headline;
        pd.slug = state.payload.slug;
        pd.statusId = state.payload.statusId[0].id;
        pd.imageTypeId = state.payload.primaryImage[0].typeId;
        pd.imageUrl = state.payload.primaryImage[0].url;
        pd.skills =
          state.payload.skills &&
          state.payload.skills.map((skill) => {
            return skill.name;
          });

        return pd;
      });
    }
  }, [friendId, state]);

  return (
    <React.Fragment>
      <div className="form-container">
        <h2>Add a Friend</h2>
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          onSubmit={onSubmitClick}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="title">
                    Title
                    <ErrorMessage
                      name="title"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="bio">
                    Bio
                    <ErrorMessage
                      name="bio"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Bio"
                    name="bio"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="summary">
                    Summary
                    <ErrorMessage
                      name="summary"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Summary"
                    name="summary"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="headline">
                    Headline
                    <ErrorMessage
                      name="headline"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Headline"
                    name="headline"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="slug">
                    Unique Slug Url
                    <ErrorMessage
                      name="slug"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    name="slug"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="statusId">Status</label>
                  <Field
                    component="select"
                    className="form-select"
                    name="statusId"
                  >
                    <option value={2}>Not set</option>
                    <option value={1}>Active</option>
                    <option value={3}>Deleted</option>
                    <option value={4}>Flagged</option>
                  </Field>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="imageUrl">
                    Primary Image Url
                    <ErrorMessage
                      name="imageUrl"
                      component="span"
                      className="text-danger m-2"
                    />
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    name="imageUrl"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Skills</label>
                  <FieldArray
                    type="text"
                    name="skills"
                    className="form-control"
                    render={(arrayHelpers) => (
                      <div>
                        {values.skills && values.skills.length > 0 ? (
                          values.skills.map((url, index) => (
                            <div
                              key={index}
                              style={{
                                border: "1px solid lightgrey",
                                borderRadius: "2%",
                              }}
                              className="m-2 p-2"
                            >
                              <div className="form-row">
                                <Field
                                  name={`skills.${index}`}
                                  className="form-control"
                                  type="text"
                                  placeholder="HTML"
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-warning m-2"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-success m-2"
                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                              >
                                Add
                              </button>
                            </div>
                          ))
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => arrayHelpers.push("")}
                          >
                            {/* show this when user has removed all friends from the list */}
                            Add a Skill
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ float: "right" }}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default FriendForm;
