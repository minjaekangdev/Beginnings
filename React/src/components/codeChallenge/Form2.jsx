import React from "react";
import { FieldArray, Field } from "formik";

function Form2(props) {
  return (
    <div className="row">
      <div className="form-group col-md-5 p-2 m-2">
        <h5>Company Images</h5>
        <FieldArray
          type="text"
          name="images"
          className="form-control"
          placeholder="Separate by spaces"
          render={(arrayHelpers) => (
            <div>
              {props.values.images && props.values.images.length > 0 ? (
                props.values.images.map((image, index) => (
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
                        placeholder="1234"
                        type="number"
                      />
                    </div>
                    <label>Image Url</label>
                    <Field
                      name={`images[${index}].imageUrl`}
                      className="form-control"
                      placeholder="https://..."
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
      <div className="form-group col-md-5 p-2 m-2">
        <div className="form-group col-md-12">
          <h5>Urls</h5>
          <FieldArray
            type="text"
            name="urls"
            className="form-control"
            render={(arrayHelpers) => (
              <div>
                {props.values.urls && props.values.urls.length > 0 ? (
                  props.values.urls.map((url, index) => (
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
                          name={`urls.${index}`}
                          className="form-control"
                          type="text"
                          placeholder="https://..."
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
                    Add a Url
                  </button>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Form2;
