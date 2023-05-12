import React from 'react'
import { Content, Navbar, Sidebar } from '../components'
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {

    return (
        <div className='layout'>
            <input type="checkbox" name="sidebar-toggle" id="sidebar-toggle" />

            <Sidebar />
            <div className='main-content'>
                <Navbar />

                <main>
                    <Content />
                </main>
            </div >

            <label htmlFor="sidebar-toggle" className="body-label"></label>
        </div>
    )
}

export default Layout
