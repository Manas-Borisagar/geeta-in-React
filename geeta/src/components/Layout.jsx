import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
    return (
        <>
            <Header />
            {/* <Outlet /> is a placeholder from react-router-dom. 
        It renders whichever child route is currently active.
        (e.g., <Home />, <About />, etc.)
      */}
            <Outlet />
        </>
    );
}

export default Layout;