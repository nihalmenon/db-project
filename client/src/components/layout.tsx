import React from 'react'; 
import {Outlet} from 'react-router-dom';
import {  useTheme } from "@chakra-ui/react";

export const Layout = () =>{
    const theme = useTheme(); 
    return (
        <div className='layout' style={{backgroundColor: theme.colors.background, height:"200vh"}} >
            <Outlet />
        </div>
    )
};

export default Layout;