import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import companiesService from "../../services/companiesService";
import jobsService from "../../services/jobsService";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

function JobsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    techCompanyId: 0,
    skills: [],
    jobImageUrl: "",
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(50, "Must be less than 50 characters.")
      .required("Required"),
    description: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    summary: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    pay: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
    slug: Yup.string()
      .min(2, "Must be at least 2 characters.")
      .max(100, "Must be less than 100 characters.")
      .required("Required"),
  });
  const [techCos, setTechCos] = useState({
    techCosArr: [],
    techCosOptions: [],
  });
  const params = useParams();
  const [updateId, setUpdateId] = useState(params.jobId);

  useEffect(() => {
    var onGetCompSuccess = (response) => {
      const responseArr = response.data.item.pagedItems;
      // console.log(responseArr);
      setTechCos((prevState) => {
        const pd = { ...prevState };
        pd.techCosArr = responseArr;
        pd.techCosOptions = responseArr.map((co) => {
          const companyId = parseInt(co.id);
          return (
            <option value={companyId} key={companyId}>
              {co.name}
            </option>
          );
        });
        return pd;
      });
    };
    var onGetCompError = (error) => {
      console.log(error);
    };

    companiesService
      .getCompanies(0, 100)
      .then(onGetCompSuccess)
      .catch(onGetCompError);

    if (updateId !== "new") {
      var onGetByIdSuccess = (response) => {
        setFormData((prevState) => {
          const pd = { ...prevState };

          const idData = response.data.item;
          pd.title = idData.title;
          pd.description = idData.description;
          pd.summary = idData.summary;
          pd.pay = idData.pay;
          pd.slug = idData.slug;
          pd.statusId = idData.statusId[0].id;
          pd.techCompanyId = idData.techCompanyId[0].id;
          pd.skills =
            idData.skills &&
            idData.skills.map((skill) => {
              return skill.name;
            });
          pd.images =
            idData.images &&
            idData.images.map((image) => {
              return {
                imageTypeId: image.typeId,
                imageUrl: image.url,
              };
            });
          //console.log(pd);
          return pd;
        });
      };
      var onGetByIdError = (error) => {
        console.log(error);
      };
      jobsService
        .getById(updateId)
        .then(onGetByIdSuccess)
        .catch(onGetByIdError);
    }
  }, []);
  const onSubmitClick = (values) => {
    if (!updateId || updateId === "new") {
      var onAddJobSuccess = (response) => {
        toastr.success("Successfully added job listing");
        setUpdateId(() => {
          return response;
        });
        navigate("/jobs");
      };
      var onAddJobError = (error) => {
        toastr.error("An error occurred..");
        console.log(error);
      };
      jobsService.addJob(values).then(onAddJobSuccess).catch(onAddJobError);
    } else {
      var onUpdateSucces = () => {
        //console.log(response);
        toastr.success("Successfully updated");
        navigate("/jobs");
      };
      var onUpdateError = (error) => {
        console.log(error);
        toastr.error("An error occurred while updating.. sorry");
      };
      jobsService
        .updateJob(updateId, values)
        .then(onUpdateSucces)
        .catch(onUpdateError);
    }
  };
  return (
    <React.Fragment>
      <div
        className="container-fluid m-5 p-5 col-7"
        style={{ border: "1px solid lightgrey", borderRadius: "3%" }}
      >
        <h3>Add a Job</h3>
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
                  <label htmlFor="titleInput">Title</label>
                  <ErrorMessage
                    name="title"
                    component="span"
                    className="text-danger m-2"
                  />
                  <Field
                    type="text"
                    className="form-control"
                    id="titleInput"
                    placeholder="Title"
                    name="title"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputState">Tech Cos</label>
                  <Field
                    id="techCompanyId"
                    className="form-control"
                    name="techCompanyId"
                    component="select"
                  >
                    <option disabled value={0}>
                      Select a company
                    </option>
                    {techCos.techCosOptions}
                  </Field>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="description">Description</label>
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-danger m-2"
                  />
                  <Field
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Description goes here"
                    name="description"
                  />
                </div>
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
                  id="summary"
                  name="summary"
                  placeholder="Summary goes here"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="pay">Pay</label>
                <ErrorMessage
                  name="pay"
                  component="span"
                  className="text-danger m-2"
                />
                <Field
                  type="text"
                  className="form-control"
                  id="pay"
                  placeholder="$40,000"
                  name="pay"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputCity">Slug</label>
                  <ErrorMessage
                    name="slug"
                    component="span"
                    className="text-danger m-2"
                  />
                  <Field
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    placeholder="Unique slug id here"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputState">Status</label>
                  <Field
                    id="statusId"
                    className="form-control"
                    component="select"
                    name="statusId"
                  >
                    <option disabled value={""}>
                      Select a status
                    </option>
                    <option value={2}>Not Set</option>
                    <option value={1}>Active</option>
                    <option value={3}>Deleted</option>
                    <option value={4}>Flagged</option>
                  </Field>
                </div>

                <div className="form-row">
                  <div className="form-group col-4">
                    <label>Job Skills</label>
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
                              Add a Job Skill
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Job Images</label>
                    <FieldArray
                      type="text"
                      name="images"
                      className="form-control"
                      placeholder="Separate by spaces"
                      render={(arrayHelpers) => (
                        <div>
                          {values.images && values.images.length > 0 ? (
                            values.images.map((image, index) => (
                              <div
                                key={index}
                                style={{
                                  border: "1px solid lightgrey",
                                  borderRadius: "2%",
                                }}
                                className="m-2 p-2"
                              >
                                <div className="form-row">
                                  <label>Image Type Id</label>
                                  <Field
                                    name={`images[${index}].imageTypeId`}
                                    className="form-control"
                                    type="number"
                                  />
                                </div>
                                <label>Image Url</label>
                                <Field
                                  name={`images[${index}].imageUrl`}
                                  className="form-control"
                                />
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
                              Add an Image
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ float: "right" }}
                >
                  Add/Update Job
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default JobsForm;
