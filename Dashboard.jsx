import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
const Dashboard = () => {
  const anvigate = useNavigate();
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status){
        localStorage.removeItem("valid")
        anvigate('/adminlogin')
      }
    })
}
 return (
    <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <Link 
                      to="/dashboard"
                      className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                    >
                                                                                                    15
  <span className="fs-5 fw-bolder d-none d-sm-inline">
                        Admin Dashboard
                      </span>
                    </Link>
                    <ul
                      className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                      id="menu"
                    >
                                <i className="fs-4 bi-power ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">Logout</span>
            </div></div><Outlet /></div>   </div></div>);
};

export default Dashboard
