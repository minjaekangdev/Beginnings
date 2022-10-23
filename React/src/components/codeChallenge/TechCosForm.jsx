import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import companiesService from "../../services/companiesService";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import Form1 from "../codeChallenge/Form1";
import Form2 from "../codeChallenge/Form2";
import Form3 from "../codeChallenge/Form3";
import Loki from "react-loki";
import * as Yup from "yup";

function TechCosForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: 1,
    images: [],
    urls: [],
    tags: [],
    friends: [],
  });
  const params = useParams();
  const [updateId] = useState(params.coId);
  const [finalStep, setFinalStep] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Required"),
    profile: Yup.string().min(2).max(100).required("Required"),
    summary: Yup.string().min(2).max(100).required("Required"),
    headline: Yup.string().min(2).max(100).required("Required"),
    contactInformation: Yup.string().email().required("Required"),
    slug: Yup.string().min(2).max(100).required("Required"),
  });

  useEffect(() => {
    if (updateId !== undefined) {
      var onGetCoSuccess = (response) => {
        const responseData = response.data.item;
        setFormData((prevState) => {
          const pd = { ...prevState };
          pd.name = responseData.name;
          pd.profile = responseData.profile;
          pd.summary = responseData.summary;
          pd.headline = responseData.headline;
          pd.contactInformation = responseData.contactInformation;
          pd.slug = responseData.slug;
          pd.statusId = responseData.statusId[0].id;
          pd.images =
            responseData.images &&
            responseData.images.map((image) => {
              return {
                imageTypeId: image.typeId,
                imageUrl: image.url,
              };
            });
          pd.urls = responseData.urls
            ? responseData.urls.map((url) => {
                return url.url;
              })
            : [];
          pd.tags = responseData.tags
            ? responseData.tags.map((tag) => {
                return tag.tag;
              })
            : [];
          pd.friends = responseData.friends
            ? responseData.friends.map((friend) => {
                return friend.id;
              })
            : [];
          return pd;
        });
      };
      var onGetCoError = (error) => {
        console.log(error);
      };
      companiesService
        .getCoById(updateId)
        .then(onGetCoSuccess)
        .catch(onGetCoError);
    }
  }, []);

  const onSubmitClick = (values) => {
    const submitData = values;
    //console.log(values);

    if (finalStep === true) {
      if (!updateId) {
        var onAddCoSuccess = () => {
          toast.success("Successfully added company");
          navigate("/techcompanies");
          //console.log(response);
        };
        var onAddCoError = (error) => {
          toast.error("An error occured trying to add company");
          console.log(error);
        };
        //console.log(submitData);
        companiesService
          .addCompany(submitData)
          .then(onAddCoSuccess)
          .catch(onAddCoError);
      } else {
        var onUpdateSuccess = () => {
          //console.log(response);
          toast.success("Successfully updated company");
          navigate("/techcompanies");
        };
        var onUpdateError = (error) => {
          console.log(error);
          toast.error("An error occurred trying to update the company");
        };
        companiesService
          .updateCompany(updateId, submitData)
          .then(onUpdateSuccess)
          .catch(onUpdateError);
      }
    }
  };

  const steps = (values) => [
    {
      label: "Step 1",
      component: <Form1 />,
    },
    {
      label: "Step 2",
      component: <Form2 values={values} />,
    },
    {
      label: "Step 3",
      component: <Form3 values={values} />,
    },
  ];

  return (
    <div
      className="container-fluid m-5 p-5 col-7"
      style={{ border: "1px solid lightgrey", borderRadius: "3%" }}
    >
      <h3>Add a Company</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmitClick}
      >
        {({ values }) => (
          <div className="container">
            <Form>
              <Loki
                steps={steps(values)}
                renderActions={({
                  isComplete,
                  cantBack,
                  isInFinalStep,
                  backHandler,
                  nextHandler,
                }) => {
                  return (
                    <React.Fragment>
                      <div className="button-group" style={{ float: "right" }}>
                        <button
                          type="button"
                          className="btn btn-secondary mb-2"
                          style={{ marginRight: "5px" }}
                          onClick={backHandler}
                          disabled={cantBack || isComplete}
                        >
                          {`Back`}
                        </button>
                        {isInFinalStep ? (
                          <button
                            type="submit"
                            className="btn btn-primary mb-2"
                            disabled={isComplete}
                            onClick={nextHandler}
                          >
                            Finish
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary mb-2"
                            onClick={
                              !values.name ||
                              !values.profile ||
                              !values.summary ||
                              !values.headline ||
                              !values.contactInformation ||
                              !values.slug
                                ? null
                                : nextHandler
                            }
                            disabled={isComplete}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }}
                onFinish={() => {
                  setFinalStep(true);
                }}
              />
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default TechCosForm;
