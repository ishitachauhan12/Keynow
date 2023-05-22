import React from "react";
import { useState, useEffect } from "react";

const Vendors = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gdata, setGdata] = useState(null);
  const [slackdata, setSlackData] = useState(null);
  const [googledata, setGoogleData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    console.log(token);
    setIsLoading(true);

    fetch("http://0.0.0.0:8000/api/platform/detail?vendor=slack", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch platform data");
        }
      })
      .then((data) => {
        setSlackData(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    fetch("http://0.0.0.0:8000/api/platform/detail?vendor=google", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch platform data");
        }
      })
      .then((data) => {
        setGoogleData(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  async function handleSuspendAll(id) {
    try {
      const response = await fetch(
        `http://0.0.0.0:8000/api/audit/suspendAll?audit_id=${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();
      alert(result.message);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const AuditDataComponent = () => {
    console.log(token);
    setIsLoading(true);

    fetch("http://0.0.0.0:8000/api/audit/call?vendor=slack", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch audit data");
        }
      })
      .then((data) => {
        setData(data);
        alert(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    fetch("http://0.0.0.0:8000/api/audit/call?vendor=google", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch audit data");
        }
      })
      .then((data) => {
        setGdata(data);
        alert(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <div id="wrapper">
      <nav
        className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
        style={{ background: "var(--bs-indigo)" }}
      >
        <div className="container-fluid d-flex flex-column p-0">
          <a
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            href="#"
          >
            <div className="sidebar-brand-text mx-3">
              <span>KeyNOW</span>
            </div>
          </a>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa fa-dashboard"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <a className="nav-link" href="master-data">
                <i className="fas fa-table"></i>
                <span>Masterdata</span>
              </a>
              <a className="nav-link active" href="vendors">
                <i className="fas fa-business-time"></i>
                <span>Vendors</span>
              </a>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <i className="fa fa-user"></i>
                <span>Logout</span>
              </a>
            </li>
            <li className="nav-item"></li>
          </ul>
          <div className="text-center d-none d-md-inline">
            <button
              className="btn rounded-circle border-0"
              id="sidebarToggle"
              type="button"
            ></button>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <nav
            className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top"
            style={{ background: "var(--bs-cyan)" }}
          >
            <div className="container-fluid">
              <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    className="bg-light form-control border-0 small"
                    type="text"
                    placeholder="Search for ..."
                  />
                  <button
                    className="btn btn-primary py-0"
                    type="button"
                    style={{ background: "var(--bs-purple)" }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <ul className="navbar-nav flex-nowrap ms-auto">
                <li className="nav-item dropdown d-sm-none no-arrow">
                  <a
                    className="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="#"
                  >
                    <i className="fas fa-search"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="me-auto navbar-search w-100">
                      <div className="input-group">
                        <input
                          className="bg-light form-control border-0 small"
                          type="text"
                          placeholder="Search for ..."
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary py-0"
                            type="button"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                    ></a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                      <h6 className="dropdown-header">alerts center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="bg-primary icon-circle">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 12, 2019
                          </span>
                          <p>A new monthly report is ready to download!</p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="bg-success icon-circle">
                            <i className="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 7, 2019
                          </span>
                          <p>$290.29 has been deposited into your account!</p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="me-3">
                          <div className="bg-warning icon-circle">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span className="small text-gray-500">
                            December 2, 2019
                          </span>
                          <p>
                            Spending Alert: We've noticed unusually high
                            spending for your account.
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Show All Alerts
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                    ></a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                      <h6 className="dropdown-header">alerts center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatars/avatar4.jpeg"
                          />
                          <div className="bg-success status-indicator"></div>
                        </div>
                        <div className="fw-bold">
                          <div className="text-truncate">
                            <span>
                              Hi there! I am wondering if you can help me with a
                              problem I've been having.
                            </span>
                          </div>
                          <p className="small text-gray-500 mb-0">
                            Emily Fowler - 58m
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatars/avatar2.jpeg"
                          />
                          <div className="status-indicator"></div>
                        </div>
                        <div className="fw-bold">
                          <div className="text-truncate">
                            <span>
                              I have the photos that you ordered last month!
                            </span>
                          </div>
                          <p className="small text-gray-500 mb-0">
                            Jae Chun - 1d
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatars/avatar3.jpeg"
                          />
                          <div className="bg-warning status-indicator"></div>
                        </div>
                        <div className="fw-bold">
                          <div className="text-truncate">
                            <span>
                              Last month's report looks great, I am very happy
                              with the progress so far, keep up the good work!
                            </span>
                          </div>
                          <p className="small text-gray-500 mb-0">
                            Morgan Alvarez - 2d
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image me-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatars/avatar5.jpeg"
                          />
                          <div className="bg-success status-indicator"></div>
                        </div>
                        <div className="fw-bold">
                          <div className="text-truncate">
                            <span>
                              Am I a good boy? The reason I ask is because
                              someone told me that people say this to all dogs,
                              even if they aren't good...
                            </span>
                          </div>
                          <p className="small text-gray-500 mb-0">
                            Chicken the Dog · 2w
                          </p>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Show All Alerts
                      </a>
                    </div>
                  </div>
                  <div
                    className="shadow dropdown-list dropdown-menu dropdown-menu-end"
                    aria-labelledby="alertsDropdown"
                  ></div>
                </li>
                <div className="d-none d-sm-block topbar-divider"></div>
                <li className="nav-item dropdown no-arrow">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                    >
                      <span className="d-none d-lg-inline me-2 text-gray-600 small">
                        email_address
                      </span>
                    </a>
                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Activity log
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            <div className="card shadow">
              <div className="card-header py-3"></div>
              {/*<div className="card-body">
                <div
                  className="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>email</th>
                        <th>Master-data entry</th>
                        <th>Active</th>
                        <th>Deleted</th>
                        <th>Updated at</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>some@email.com</td>
                        <td>some@email.com</td>
                        <td>True</td>
                        <td>False</td>
                        <td>2008/11/28</td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>some@email.com</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                          2009/10/09
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>--</td>
                        <td>False</td>
                        <td>False</td>
                        <td>
                          2009/01/12
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>some@email.com</td>
                        <td>False</td>
                        <td>False</td>
                        <td>
                          2012/10/13
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>--</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                          2011/06/07
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>--</td>
                        <td>False</td>
                        <td>False</td>
                        <td>
                          2012/12/02
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          some@email.com
                          <br />
                        </td>
                        <td>some@email.com</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                          2011/05/03
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>some@email.com</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                          2011/12/12
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>some@email.com</td>
                        <td>True</td>
                        <td>False</td>
                        <td>
                          2011/12/06
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>some@email.com</td>
                        <td>--</td>
                        <td>False</td>
                        <td>True</td>
                        <td>
                          2012/03/29
                          <br />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <strong>email</strong>
                        </td>
                        <td>
                          <strong>Master-data entry</strong>
                        </td>
                        <td>
                          <strong>Active</strong>
                        </td>
                        <td>
                          <strong>Deleted</strong>
                        </td>
                        <td>
                          <strong>Updated at</strong>
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-6 align-self-center">
                    <p
                      id="dataTable_info"
                      className="dataTables_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 27
                    </p>
                  </div>
                  <div className="col-md-6">
                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <hr />
                <hr />
              </div>*/}
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Slack Audits</p>
                  <button onClick={AuditDataComponent}>Audit</button>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable-1"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr>
                          <th>Invoked at</th>
                          <th>STALE_USERS</th>
                          <th>INACTIVE</th>
                          <th>NOT_FOUND_IN_MASTER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slackdata !== null
                          ? slackdata.data.audits.map((i) => (
                              <tr>
                                <td>
                                  {i.timestamp.substr(0, 10)}(
                                  {i.timestamp.substr(11, 8)})
                                </td>
                                <td>0</td>
                                <td>{i.inactiveFlags}</td>
                                <td>{i.notFoundFlags}</td>
                                <a
                                  href="/audit-details"
                                  style={{ margin: "20" }}
                                >
                                  view
                                </a>
                                <button
                                  id={i.id}
                                  onClick={(e) => handleSuspendAll(i.id)}
                                >
                                  Deactive all
                                </button>
                              </tr>
                            ))
                          : null}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <strong>Invoked at</strong>
                          </td>
                          <td>
                            <strong>STALE_USERS</strong>
                          </td>
                          <td>
                            <strong>Active</strong>
                            <strong>INACTIVE</strong>
                          </td>
                          <td>
                            <strong>NOT_FOUND_IN_MASTER</strong>
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <br />
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 fw-bold">Google Audits</p>
                  <button onClick={AuditDataComponent}>Audit</button>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable-1"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr>
                          <th>Invoked at</th>
                          <th>STALE_USERS</th>
                          <th>INACTIVE</th>
                          <th>NOT_FOUND_IN_MASTER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googledata !== null
                          ? googledata.data.audits.map((i) => (
                              <tr>
                                <td>
                                  {i.timestamp.substr(0, 10)}(
                                  {i.timestamp.substr(11, 8)})
                                </td>
                                <td>0</td>
                                <td>{i.inactiveFlags}</td>
                                <td>{i.notFoundFlags}</td>
                                <a
                                  href="/audit-details"
                                  style={{ margin: "20" }}
                                >
                                  view
                                </a>
                                <button
                                  id={i.id}
                                  onClick={(e) => handleSuspendAll(i.id)}
                                >
                                  Deactive all
                                </button>
                              </tr>
                            ))
                          : null}
                      </tbody>

                      <tfoot>
                        <tr>
                          <td>
                            <strong>Invoked at</strong>
                          </td>
                          <td>
                            <strong>STALE_USERS</strong>
                          </td>
                          <td>
                            <strong>Active</strong>
                            <strong>INACTIVE</strong>
                          </td>
                          <td>
                            <strong>NOT_FOUND_IN_MASTER</strong>
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright">
              <span>Keynow.live</span>
            </div>
          </div>
        </footer>
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Vendors;
