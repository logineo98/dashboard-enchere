import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../libs'
import { Breadcrumb } from '../commons'

const Content = () => {
    return (
        <div className='container'>
            <Breadcrumb />
            <Routes>
                {
                    routes?.map((route, index) => {
                        return (
                            route.element && <Route key={index} path={route.path} exact={route.exact} element={<route.element />} />
                        )
                    })
                }
                {/* <Route path="/" element={<Navigate to={"dashboard"} replace />} /> */}
            </Routes>
        </div>
    )
}

export default Content
