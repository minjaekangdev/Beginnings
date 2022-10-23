import React, { useState } from "react";
import toastr from "toastr";
import productService from "./services/productService";

function Product() {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
    cost: 0,
  });

  const onFormFieldChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;

    setFormData((prevState) => {
      const pd = { ...prevState };
      if (name !== "cost") {
        pd[name] = value;
      } else {
        pd[name] = parseInt(value);
      }
      return pd;
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const onPostSuccess = (response) => {
      const id = response.data.item;
      toastr.success(`Successfully created entity. ID: ${id}`);
    };
    const onPostError = (error) => {
      toastr.error("An error occurred");
      console.log(error);
    };

    productService.addProduct(formData).then(onPostSuccess).catch(onPostError);
  };

  return (
    <React.Fragment>
      <section className="vh-100">
        <div className="d-flex align-items-center h-100">
          <div className="container">
            <div className="row d-flex justify-content-center h-100 ">
              <div className="col-6">
                <div
                  className="form-container shadow p-3"
                  style={{
                    borderRadius: "25px",
                  }}
                >
                  <div className="form-group p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      product entity form
                    </h2>
                    <form style={{ padding: "2%" }}>
                      <div className="form-outline mb-4">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          onChange={onFormFieldChange}
                          placeholder="Product Name"
                          value={formData.name}
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="manufacturer" className="form-label">
                          Manufacturer
                        </label>
                        <input
                          onChange={onFormFieldChange}
                          placeholder="Product Manufacturer"
                          value={formData.manufacturer}
                          type="text"
                          className="form-control form-control-lg"
                          name="manufacturer"
                          id="manufacturer"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          onChange={onFormFieldChange}
                          placeholder="Product Description"
                          value={formData.description}
                          type="text"
                          className="form-control form-control-lg"
                          name="description"
                          id="description"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="cost" className="form-label">
                          Cost
                        </label>
                        <input
                          onChange={onFormFieldChange}
                          value={formData.cost}
                          type="number"
                          className="form-control form-control-lg"
                          name="cost"
                          id="cost"
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          onClick={onSubmitClick}
                          type="submit"
                          className="btn-lg btn-primary mt-5"
                          id="submitButton"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Product;

//743568101
//1671488680
