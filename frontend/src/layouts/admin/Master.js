import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';


import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
 
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import routes from '../../routes/routes';

export const Master = () => {
    useEffect(() => {
        document.title= "Portfolio | rentizee ";
    }, [])
    return ( 
        <div className="sb-nav-fixed"> 
            <Navbar />
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar />
            </div>
            <div id="layoutSidenav_content">
            <main>
                <Switch>
                    {routes.map((route, key)=> {
                        return(
                            route.component && (
                                <Route 
                                key={key}
                                path={route.path} 
                                exact={route.exact}
                                name={route.name}
                                // cmp={route.cmp}
                                render={(props) =>(
                                    <route.component {...props} cmp={route.cmp} />
                                )}
                                />
                            ) 
                         )
                    })

                    }
                    <Redirect from='/admin' to='/admin/dashboard'/>
                </Switch>
            </main>
                <Footer />
            </div>
        </div>
        </div>
    )
}

export default Master;
