import React from "react";
import { useState, useEffect } from "react";

const Index = () => {
  const [platforms, setPlatforms] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [audits, setAudits] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };
    async function fetchPlatforms() {
      try {
        const response = await fetch(
          "http://0.0.0.0:8000/api/platform/list?page_no=1&page_size=100",
          { headers }
        );
        const data = await response.json();
        setPlatforms(data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    }

    async function fetchAudits() {
      try {
        const response = await fetch(
          "http://0.0.0.0:8000/api/audit/audits?page_no=1&page_size=5",
          { headers }
        );
        const data = await response.json();
        setAudits(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAudits();
    fetchPlatforms();
  }, [token]);

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
              <a className="nav-link active" href="index.html">
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
              <a className="nav-link" href="vendors">
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
          <div className="text-center d-none d-md-inline"></div>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content" style={{ background: "var(--bs-gray-400)" }}>
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
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Dashboard</h3>
              <a
                className="btn btn-primary btn-sm d-none d-sm-inline-block"
                role="button"
                href="#"
                style={{ background: "var(--bs-purple)" }}
              >
                <i className="fas fa-book fa-sm text-white-50"></i>&nbsp;View
                Audits
              </a>
            </div>
            <div className="row">
              <div
                className="col-md-6 col-xl-3 mb-4"
                style={{ color: "var(--bs-pink)" }}
              >
                <div
                  className="card shadow border-start-primary py-2"
                  style={{
                    color: "var(--bs-pink)",
                    background: "var(--bs-gray-600)",
                  }}
                >
                  <div
                    className="card-body"
                    style={{ color: "var(--bs-purple)" }}
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                          <span style={{ color: "var(--bs-gray-200)" }}>
                            employees covered
                          </span>
                        </div>
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>5000</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user-tie fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div
                  className="card shadow border-start-success py-2"
                  style={{ background: "var(--bs-gray-600)" }}
                >
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-success fw-bold text-xs mb-1">
                          <span style={{ color: "var(--bs-success)" }}>
                            Total users across various platforms
                          </span>
                        </div>
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>15000</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-users fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div
                  className="card shadow border-start-info py-2"
                  style={{ background: "var(--bs-gray-600)" }}
                >
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-info fw-bold text-xs mb-1">
                          <span>background tasks</span>
                        </div>
                        <div className="row g-0 align-items-center">
                          <div className="col-auto">
                            <div className="text-dark fw-bold h5 mb-0 me-3">
                              <span>5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div
                  className="card shadow border-start-warning py-2"
                  style={{
                    background: "var(--bs-gray-600)",
                    color: "var(--bs-gray-700)",
                  }}
                >
                  <div className="card-body">
                    <div className="row align-items-center no-gutters">
                      <div className="col me-2">
                        <div className="text-uppercase text-warning fw-bold text-xs mb-1">
                          <span>service providers</span>
                        </div>
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>4</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-business-time fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-7 col-xl-8"
                style={{ color: "var(--bs-white)" }}
              >
                <div className="card shadow mb-4"></div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Platform</th>
                        <th>Recent Audit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platforms !== null
                        ? platforms.list.map((i) => (
                            <tr key={i.id}>
                              <td>{i.vendor}</td>
                              <td>
                                {i.timestamp !==
                                  undefined?.i.timestamp.substr(0, 10)}
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{ background: "var(--bs-gray-500)" }}
                  >
                    <h6 className="text-primary fw-bold m-0">Recent audits</h6>
                    <div className="dropdown no-arrow">
                      <button
                        className="btn btn-link btn-sm dropdown-toggle"
                        aria-expanded="false"
                        data-bs-toggle="dropdown"
                        type="button"
                      >
                        <i className="fas fa-ellipsis-v text-gray-400"></i>
                      </button>
                      <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                        <p className="text-center dropdown-header">
                          dropdown header:
                        </p>
                        <a className="dropdown-item" href="#">
                          &nbsp;Action
                        </a>
                        <a className="dropdown-item" href="#">
                          &nbsp;Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          &nbsp;Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="vstack">
                  <ul>
                    {audits !== null
                      ? audits.list.map((i) => (
                          <li key={i.id}>
                            {i.platform_id === 1 ? "Slack" : "Google"}( Flags
                            Found: {i.notFoundFlags + i.inactiveFlags})
                          </li>
                        ))
                      : null}
                    <button>
                      <a href="/vendors">view audit</a>
                    </button>
                  </ul>
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

export default Index;
