import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";

export default function MedicineCategory(props) {
  var counter = 1;
  const [categories, setCategories] = useState([
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "3", name: "Category 3" },
  ]);

  const handleDeleteButton = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
  };

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Medicine Categories</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Categories List{" "}
                      <Link to="/addcategory" className="btn btn-primary btn-sm float-right">
                        Add new Category
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category) => {
                            return (
                              <tr key={category.id}>
                                <td>{counter++}</td>
                                <td>{category.name}</td>
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updatecategory">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "category_obj",
                                            JSON.stringify(category)
                                          );
                                        }}>
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteButton(category.id);
                                      }}
                                      className="btn btn-link btn-danger">
                                      <i className="la la-times"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
