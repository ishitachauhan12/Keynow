import React from "react";
import { useState, useEffect } from "react";

const AuditDetails = () => {
  const [platformData, setPlatformData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlatformDetail = async () => {
      try {
        const response = await fetch(
          "http://0.0.0.0:8000/api/platform/detail?vendor=slack",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPlatformData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPlatformDetail();
  }, [token]);

  const handleInvoke = async (e) => {
    const token = localStorage.getItem("token");
    const email = e.target.value;
    console.log(e.target.value);
    const platform = "slack";

    const response = await fetch(
      `http://0.0.0.0:8000/api/platform/deactivateAccount?email=${email}&platform=slack`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    alert(result.message);
    console.log(result);
  };

  return (
    <div id="wrapper">
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <nav
            className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top"
            style={{ background: "var(--bs-cyan)" }}
          >
            <div className="container-fluid">
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
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Audit Details</p>
              </div>
              <div className="card-body">
                <div
                  className="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Flag Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platformData !== null
                        ? platformData.data.audits[0].flags.map((i) => (
                            <tr key={i.audit_id}>
                              <td>{i.account.email}</td>
                              <td>{i.type}</td>
                              <td>
                                <button
                                  id={i.account.email}
                                  value={i.account.email}
                                  onClick={(e) => handleInvoke(e)}
                                >
                                  Revoke Access
                                </button>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <strong>Email</strong>
                        </td>
                        <td>
                          <strong>Flag Type</strong>
                        </td>
                        <td>
                          <strong>Action</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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

export default AuditDetails;
