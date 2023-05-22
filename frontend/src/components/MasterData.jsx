import React from "react";
import {useState, useEffect} from "react"

const MasterData = () => {
  const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMarkInactive = async (eid) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://0.0.0.0:8000/api/employee/markInactive?eid=${eid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      alert(data.message)
      window.location.reload();
      console.log(data);
    };

    function handleInactive(e){
      e.preventDefault()
      console.log(e.target.id)
      handleMarkInactive(e.target.id)

    }
    useEffect(() => {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      setIsLoading(true);

      fetch(`http://0.0.0.0:8000/api/employee/list?page_no=${1}&page_size=${100}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch employee list');
        }
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
    },[]);


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
              <a className="nav-link active" href="master-data">
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
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Masterdata</p>
                <button><a href="/master-data-form">Add employee</a></button>
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
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      data!==null?data.list.map((i)=>(
                        <tr key={i.eid}>
                          <td>{i.eid}</td>
                          <td>{i.fullName}</td>
                          <td>{i.department}</td>
                          <td>{i.active?"active":"inactive"}</td>
                          <td><button id={i.eid} onClick={(e)=>handleInactive(e)}>mark inactive</button></td>
                        </tr>
                      )):null
                    }
                    </tbody>
                    <tfoot>
                      <tr>
                      <td>
                        <strong>Employee ID</strong>
                      </td>
                        <td>
                          <strong>Name</strong>
                        </td>
                        <td>
                          <strong>Department</strong>
                        </td>
                        <td>
                          <strong>Active</strong>
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
              <span>
                Keynow.live
              </span>
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

export default MasterData;
