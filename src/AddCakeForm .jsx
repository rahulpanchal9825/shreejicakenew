import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.string()
    .matches(/^\d+$/, "Price must be a number")
    .required("Price is required"),
  //   weight: Yup.string().required("Weight is required"),
});

const AddCakeForm = () => {
  const [data, setData] = useState([]);

  const data3 = data?.categoryProducts || [];
  const transformedCategories = Object.keys(data3).map((category) => ({
    label: category, // Keep category as it is
    value: category,
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cakenewback1.vercel.app/api/all-p"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mt-4">
      <div className="form-container">
        <h2 className="text-center">Add Cake</h2>
        <Formik
          initialValues={{
            title: "",
            category: "",
            price: "",
            img: "",

          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const fetchData = async () => {
              try {
                const response = await axios.post(
                  "https://cakenewback1.vercel.app/api/add-product",
                  values
                );

                const result = response.data;
                fetchData();
                console.log("fdfd", result);
                if (result?.message) {
                  toast.success(result?.message);
                  window.location.reload()
                }
                setData(result);
              } catch (err) {
                toast.error(err?.response?.data?.message);
                console.error("ererer",err?.response?.data?.message);
              }
            };

            fetchData();
            resetForm();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              {/* Title Field */}
              <div className="form-group">
                <label>Title</label>
                <Field
                  name="title"
                  className="form-control"
                  placeholder="Enter Cake Title"
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              {/* Category (Creatable Select) */}
              <div className="form-group">
                <label>Category</label>
                <CreatableSelect
                  options={transformedCategories}
                  onChange={(selectedOption) =>
                    setFieldValue("category", selectedOption?.value || "")
                  }
                  placeholder="Select or create category"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error"
                />
              </div>

              {/* Price Field */}
              <div className="form-group">
                <label>Price</label>
                <Field
                  name="price"
                  className="form-control"
                  placeholder="Enter Price"
                />
                <ErrorMessage name="price" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>image</label>
                <Field
                  name="img"
                  className="form-control"
                  placeholder="Enter Url Image"
                />
                <ErrorMessage name="img" component="div" className="error" />
              </div>

              {/* Weight Field */}
              {/* <div className="form-group">
                <label>Weight</label>
                <Field name="weight" className="form-control" placeholder="Enter Weight" />
                <ErrorMessage name="weight" component="div" className="error" />
              </div> */}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCakeForm;
