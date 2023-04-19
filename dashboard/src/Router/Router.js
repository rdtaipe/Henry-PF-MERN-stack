
import{createBrowserRouter,useNavigate} from 'react-router-dom'


import Dashboard from '../Pages/Dashboard/Dashboard'
import Products from '../Pages/Products/Products'
import Users from '../Pages/Users/Users.js'
import Sales from '../Pages/Sales/Sales'
import Employees from '../Pages/Employees/Employees.js'
import Roles from '../Pages/Roles/Roles.js'
import Permissions from '../Pages/Permissions/Permissions.js'
import App from '../App/App.js';

export default createBrowserRouter([
    // defauld rute
    {
      path: '/',
      element:<App/> ,
      children: [
        {
          path: '/dashboard',
          element:<Dashboard /> ,
          children: []
        },{
          path: '/products',
          element:<Products /> ,
          children: []
        },{
          path: '/users',
          element:<Users /> ,
        },{
          path: '/sales',
          element:<Sales /> ,
        },{
          path: '/employees',
          element:<Employees /> ,
        },{
          path: '/roles',
          element:<Roles /> ,
        },{
          path: '/permissions',
          element:<Permissions /> ,
        }
      ]
    },
    
    
    ]);
  
  
  