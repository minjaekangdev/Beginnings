import React, { useEffect, useState } from "react";
import "../../styling/friendForm.css";
import friendsService from "../../services/friendsService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function FriendForm() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 0,
      imageTypeId: 1,
      imageUrl: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
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
    },
  });
  const [frndId, setFrndId] = useState(friendId);

  //console.log(state.payload);

  useEffect(() => {
    setFrndId(friendId);
    if (state?.type === "FRIEND_DATA_VIEW") {
      formik.values.title = state.payload.title;
      formik.values.bio = state.payload.bio;
      formik.values.summary = state.payload.summary;
      formik.values.headline = state.payload.headline;
      formik.values.slug = state.payload.slug;
      formik.values.statusId = state.payload.statusId[0].id;
      formik.values.imageTypeId = state.payload.primaryImage[0].typeId;
      formik.values.imageUrl = state.payload.primaryImage[0].url;
    }
  }, [friendId, state]);

  return (
    <React.Fragment>
      <div className="form-container">
        <h2>Add a Friend</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="title">Title</label>
              {formik.touched.title && formik.errors.title ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.title}]
                </span>
              ) : null}
              <input
                value={formik.values.title}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="bio">Bio</label>
              {formik.touched.bio && formik.errors.bio ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.bio}]
                </span>
              ) : null}
              <input
                value={formik.values.bio}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="bio"
                placeholder="Bio"
                name="bio"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="summary">Summary</label>
              {formik.touched.summary && formik.errors.summary ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.summary}]
                </span>
              ) : null}
              <input
                value={formik.values.summary}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="summary"
                placeholder="Summary"
                name="summary"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="headline">Headline</label>
              {formik.touched.headline && formik.errors.headline ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.headline}]
                </span>
              ) : null}
              <input
                value={formik.values.headline}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="headline"
                placeholder="Headline"
                name="headline"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="slug">Unique Slug Url</label>
              {formik.touched.slug && formik.errors.slug ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.slug}]
                </span>
              ) : null}
              <input
                value={formik.values.slug}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="slug"
                placeholder="https://..."
                name="slug"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="statusId">Status</label>
              {formik.touched.statusId && formik.errors.statusId ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.statusId}]
                </span>
              ) : null}
              <select
                value={formik.values.statusId}
                onChange={formik.handleChange}
                className="form-control"
                name="statusId"
                id="statusId"
                onBlur={formik.handleBlur}
              >
                <option value={2}>Not set</option>
                <option value={1}>Active</option>
                <option value={3}>Deleted</option>
                <option value={4}>Flagged</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="imageUrl">Primary Image Url</label>
              {formik.touched.imageUrl && formik.errors.imageUrl ? (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  [{formik.errors.imageUrl}]
                </span>
              ) : null}
              <input
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="https://..."
                name="imageUrl"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Add Friend
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default FriendForm;
