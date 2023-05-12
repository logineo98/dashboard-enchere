import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../libs'
import Card from './Card'

const Breadcrumb = () => {

    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => route.path === pathname)
        return currentRoute ? currentRoute.name : false
    }

    const getBreadcrumbs = (location) => {
        const breadcrumbs = []
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`
            const routeName = getRouteName(currentPathname, routes)
            routeName &&
                breadcrumbs.push({
                    pathname: currentPathname,
                    name: routeName,
                    active: index + 1 === array.length ? true : false,
                })
            return currentPathname
        })
        return breadcrumbs
    }

    const currentLocation = useLocation().pathname
    const breadcrumbs = getBreadcrumbs(currentLocation)
    const split = currentLocation.split("/");
    // const path = split[split?.length - 1]


    // const title = path.toUpperCase()?.split("-")
    const path = split?.length <= 2 ? split[split?.length - 1] : split[split?.length - 2]


    return (
        <Card>
            <div className="breadcrumb">
                <div className='breadcrumb-title'>
                    <div className='breadcrumb-title-logo-container'>
                        <i className='ti ti-home' style={{ fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} />
                    </div>

                    <div className='breadcrumb-title-label' >{path.toUpperCase()}</div>
                    {/* <div className='breadcrumb-title-label' >{title?.map(t => t + " ")}</div> */}
                </div>

                <div className='breadcrumb-link'>
                    <i className='ti ti-home' />
                    {path !== "dashboard" && <Link to="/dashboard">Tableau de bord</Link>}
                    {breadcrumbs.map((breadcrumb, index) => {
                        return (
                            <Link  {...(breadcrumb.active ? { active: true } : { to: breadcrumb.pathname })} key={index} style={{ color: breadcrumb.active ? "blue" : "" }}>
                                /{breadcrumb?.name?.toLowerCase()}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </Card>
    )
}

export default Breadcrumb
