import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { checking, getUsers, get_encheres, navigations, setPath } from '../../libs';
import { useDispatch, useSelector } from 'react-redux';



const SidebarContent = ({ menuItems }) => {
    const pathname = useLocation().pathname;
    const path = pathname.split("/")[1]
    const dispatch = useDispatch();
    const { host } = useSelector(state => state?.user)

    useEffect(() => {
        setPath(pathname)
    }, [pathname])

    useEffect(() => {
        dispatch(get_encheres({ hostID: host?._id }))
    }, [dispatch, host, pathname])


    useEffect(() => {
        dispatch(checking())

    }, [dispatch, pathname])

    useEffect(() => {
        dispatch(getUsers({ hostID: host?._id }))
    }, [dispatch, host])

    useEffect(() => {
        dispatch(get_encheres({ hostID: host?._id }))
    }, [dispatch, host])

    useEffect(() => {
        const menuItems = document.querySelectorAll(".menu-item.has-submenu");

        menuItems.forEach((item) => {
            const submenu = item.querySelector(".submenu");

            item.addEventListener("click", () => {

                menuItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("open");
                        const otherSubmenu = otherItem.querySelector(".submenu");
                        otherSubmenu.style.maxHeight = "0";
                    }
                });

                item.classList.toggle("open");
                if (item.classList.contains("open")) {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                } else {
                    submenu.style.maxHeight = "0";
                }

            });



        });
    }, []);


    function renderMenuItems(menuItems) {
        return menuItems.map((item, index) => {
            const hasSubMenu = item.subMenu && item.subMenu.length > 0;

            const menuItem = (
                <Link to={item.to} className={`akougnon ${item.to.split("/")[1] === path ? "active" : ""}`} key={index}>
                    <li key={index} className={`menu-item blank `} >
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <i className={item.icon} style={{ fontSize: "18px", marginRight: "10px" }} />
                            {item.name}
                        </div>
                        {hasSubMenu && <i className="ti ti-angle-right arrow"></i>}
                    </li>
                </Link>
            );

            if (hasSubMenu) {
                const subMenu = renderSubMenu(item.subMenu);
                return (
                    <li key={index} className="menu-item has-submenu">
                        {menuItem}
                        {subMenu}
                    </li>
                );
            }
            return menuItem;
        });
    }


    function renderSubMenu(subMenuItems) {
        return (
            <ul className='submenu'>
                {subMenuItems.map((item, index) => (
                    <Link to={item.to} style={{ background: "red", width: "100%" }}> <li key={index} className="submenu-item" >
                        {item.name}
                    </li></Link>
                ))}
            </ul>
        );
    }

    return <ul id="menu" className='menu'>{renderMenuItems(menuItems)}</ul>;

}


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-brand">
                <img src='assets/logo.jpeg' className='sidebar-logo' alt='logo' />
                {/* <span>meYere</span> */}
            </div>

            <div className="sidebar-main">
                <div className="sidebar-menu">
                    <SidebarContent menuItems={navigations} />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
