import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { api_public, logout } from '../../libs';

const Navbar = () => {
    const location = useLocation().pathname
    const path = location.split("/")[1]

    const dispatch = useDispatch();
    const { host } = useSelector(state => state?.user)

    return (
        <header className='navbar'>
            <div className='navbar-left-items'>
                <div className="menu-toggle"><label htmlFor="sidebar-toggle"><i className='ti ti-menu' /></label></div>

                <div className="navbar-menus">
                    <Link to={"/articles"} className='navbar-menus-item' style={{ color: path === "articles" ? "tomato" : "black" }}>Articles</Link>
                    <Link to={"/clients"} className='navbar-menus-item' style={{ color: path === "clients" ? "tomato" : "black" }}>Clients</Link>
                    <Link to={"/administrateurs"} className='navbar-menus-item' style={{ color: path === "administrateurs" ? "tomato" : "black" }}>Administrateurs</Link>
                </div>
            </div>

            <div className='navbar-right-items'>

                {/* <div className="navbar-menus">
                    <i className='ti ti-bell' />
                    <i className='ti ti-calendar' />
                </div> */}

                <div className="navbar-profile-panel">
                    <div className="navbar-profile-img-box">
                        <img src={api_public + "/images/" + host?.image || "assets/avatar.png"} alt="" style={{ objectFit: "contain" }} />
                    </div>

                    <ul className="navigation-profile-card">
                        <Link to={"/administrateurs/profile-administrateur/" + host._id} style={{ textDecoration: "none", color: "inherit" }}><li><i className="ti ti-user"></i> Profile</li></Link>
                        <Link to={"/administrateurs/edition-administrateur/" + host?._id} style={{ textDecoration: "none", color: "inherit" }} > <li> <i className="ti ti-settings"></i> Modifier le compte</li></Link>
                        {/* <li><i className="ti ti-email"></i> Mes message</li> */}
                        {/* <li onClick={handleLockSidebar}><i className={`ti ti-${lockSidebar ? "lock" : "unlock"}`}></i> Verouiller la navigation</li> */}
                        <li onClick={() => dispatch(logout())}><i className="ti ti-layout-sidebar-left" ></i> Deconnexion</li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar
