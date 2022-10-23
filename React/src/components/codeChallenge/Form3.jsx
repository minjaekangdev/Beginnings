import React from "react";
import { FieldArray, Field } from "formik";

function Form3(props) {
  return (
    <div className="row">
      <div className="form-group col-md-5 p-2 m-2">
        <div className="form-group col-md-12">
          <h5>Tags</h5>
          <FieldArray
            type="text"
            name="tags"
            className="form-control"
            render={(arrayHelpers) => (
              <div>
                {props.values.tags && props.values.tags.length > 0 ? (
                  props.values.tags.map((url, index) => (
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
                          name={`tags.${index}`}
                          className="form-control"
                          type="text"
                          placeholder="#JUSTDOIT"
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
                    Add a Tag
                  </button>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="form-group col-md-5 p-2 m-2">
        <div className="form-group col-md-12">
          <h5>Friend's Ids</h5>
          <FieldArray
            name="friends"
            className="form-control"
            render={(arrayHelpers) => (
              <div>
                {props.values.friends && props.values.friends.length > 0 ? (
                  props.values.friends.map((url, index) => (
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
                          name={`friends.${index}`}
                          className="form-control"
                          type="number"
                          placeholder="Must be a valid friend id"
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
                    Add a Friend Id
                  </button>
                )}
                {/* <div>
                    <button type="submit">Submit</button>
                  </div> */}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Form3;
