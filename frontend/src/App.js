import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/frontrnd/Home';
import Rentals from './components/frontrnd/Rentals';
import Author from './components/frontrnd/Author';
import City from './components/frontrnd/City';
import Category from './components/frontrnd/Category';
import RentalDetail from './components/frontrnd/RentalDetail';
import Subcat from './components/frontrnd/Subcat';
import Contact from './components/frontrnd/Contact';
import FAQ from './components/frontrnd/FAQ';
import About from './components/frontrnd/About';
import Main from './components/frontrnd/Main';
import Search from './components/frontrnd/Search';
import Login from './components/frontrnd/auth/Login';
import Register from './components/frontrnd/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute'; 

axios.defaults.baseURL='http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {  
  return (
    <div className="App" >
      <BrowserRouter>   
        <Switch> 
          <Route exact path="/" >
              <Main cmp={Home} />
          </Route>
          <Route exact path="/rentals" >
              <Main cmp={Rentals} />
          </Route>
          <Route exact path="/category/:cat" >
              <Main cmp={Category} />
          </Route>
          <Route path="/subcat/:cat/:sub" >
              <Main cmp={Subcat} />
          </Route>
          <Route path="/rentaldetail/:pid" >
              <Main cmp={RentalDetail} />
          </Route>
          <Route path="/author/:aid" >
              <Main cmp={Author} />
          </Route>
          <Route path="/location/:city/:pro" >
              <Main cmp={City} />
          </Route>
          <Route path="/search/:city/:sub/:key" >
              <Main cmp={Search} />
          </Route>
          <Route path="/about" >
              <Main cmp={About} />
          </Route>
          <Route path="/contact" >
              <Main cmp={Contact} />
          </Route>
          <Route path="/faq" >
              <Main cmp={FAQ} />
          </Route>
          
          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */} 

          <Route path="/login">
            {localStorage.getItem('auth_token')? <Redirect to='/' /> : <Main cmp={Login} />}
          </Route>
          <Route path="/register">
            {localStorage.getItem('auth_token')? <Redirect to='/' /> : <Main cmp={Register} />}
          </Route>

          {/* <Route path="/admin" name="Admin" render={(props)=> <Master {...props} />  } /> */}
          <AdminPrivateRoute path="/admin" name="Admin" />
        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;
