import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import AdminAccess from '../components/admin/Protected/AdminAccess';
import Adduser from '../components/admin/Adduser';
import AllUsers from '../components/admin/AllUsers';
import EditUser from '../components/admin/EditUser';
import Categories from '../components/admin/Categories';
import EditCat from '../components/admin/EditCat';
import EditSubcat from '../components/admin/EditSubcat';
import AddCategory from '../components/admin/AddCategory';
import AddSubCat from '../components/admin/AddSubCat';
import AllRentals from '../components/admin/AllRentals';
import AddRentals from '../components/admin/AddRentals';
import Locations from '../components/admin/Locations';
import AddCity from '../components/admin/AddCity';
import AddProvince from '../components/admin/AddProvince';
import EditRental from '../components/admin/EditRental';
import EditMyRental from '../components/admin/EditMyRental';
import EditProfile from '../components/admin/EditProfile';
 
const routes = [
    //Pages Acessible by All who are logged in
    {path: '/admin', exact:true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name: 'Dashboard', component: Dashboard},
    {path: '/admin/profile', exact:true, name: 'Profile', component: Profile},
    {path: '/admin/addrentals', exact:true, name: 'AddRentals', component: AddRentals},
    {path: '/admin/editmyrental/:pid', exact:true, name: 'EditMyRental', component: EditMyRental},
    {path: '/admin/editprofile', exact:true, name: 'EditProfile', component: EditProfile},
 
    //Pages Accessible by Only Admin
    {path: '/admin/adduser', exact:true, name: 'AdminAccess', cmp:Adduser, component: AdminAccess},
    {path: '/admin/allusers', exact:true, name: 'AdminAccess', cmp:AllUsers, component: AdminAccess},
    {path: '/admin/edituser/:uid', exact:true, name: 'AdminAccess', cmp:EditUser, component: AdminAccess},
    {path: '/admin/categories', exact:true, name: 'AdminAccess', cmp:Categories, component: AdminAccess},
    {path: '/admin/editcat/:cid', exact:true, name: 'AdminAccess', cmp:EditCat, component: AdminAccess},
    {path: '/admin/editsubcat/:cid', exact:true, name: 'AdminAccess', cmp:EditSubcat, component: AdminAccess},
    {path: '/admin/addcategory', exact:true, name: 'AdminAccess', cmp:AddCategory, component: AdminAccess},
    {path: '/admin/addsubcat', exact:true, name: 'AdminAccess', cmp:AddSubCat, component: AdminAccess},
    {path: '/admin/allrentals', exact:true, name: 'AdminAccess', cmp:AllRentals, component: AdminAccess},
    {path: '/admin/locations', exact:true, name: 'AdminAccess', cmp:Locations, component: AdminAccess},
    {path: '/admin/addcity', exact:true, name: 'AdminAccess', cmp:AddCity, component: AdminAccess},
    {path: '/admin/addprovince', exact:true, name: 'AdminAccess', cmp:AddProvince, component: AdminAccess},
    {path: '/admin/editrental/:pid', exact:true, name: 'AdminAccess', cmp:EditRental, component: AdminAccess},
];
 
export default routes;