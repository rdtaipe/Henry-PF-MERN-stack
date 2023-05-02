
 import React,{useEffect, useState} from 'react'
 import axios from 'axios';
 import {useSelector}from 'react-redux'
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,Badge, Title,
  Button,Icon
} from "@tremor/react";
import { CheckIcon } from "@heroicons/react/outline";
import { PencilIcon,MinusCircleIcon } from "@heroicons/react/solid";
import {Link} from 'react-router-dom'



import data from './data.json'
/* import './user.css' */

export default  function Users(props) {
const [users,setUsers]=useState([]);

//no se como conseguir la url
//let selector=useSelector();
//let users=selector(state=>state.server)


 const loadUser=async()=>{
    const res= await axios.get('http://localhost:5000/users');  

    //await setUsers(res.data);
   // return res.data;
   let all=await res.data;
   setUsers(all);

 }   
    
  
  useEffect(()=>{
    loadUser();
   },[]) 

/* 


    fullName: { type: String, },
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    password: { type: String, },
    genre: { type: String, },
    country: { type: String, },
    address: { type: String, },
    postal: { type: String, },
    sub: { type: String, required: true, unique: true },
    picture: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    role: {
      type: String, required: true,
      enum: ['admin', 'user'],
      default: 'user'
    },




//////////
  {

   "_id": "644990ce5402ef846423b117",
    "fullName": "Maximo Guzman",
    "name": "Maximo",
    "email": "siyofuertu@gmail.com",
    "email_verified": true,
    "sub": "google-oauth2|100371452612897113506",
    "picture": "https://lh3.googleusercontent.com/a/AGNmyxZ_N2HbBM046YbE1QM3JHga3Uf5bxMoSmiHcnSN=s96-c",
    "phone": "",
    "location": "",
    "role": "user",
    "status": "active"

    //////////////
    "_id": "6441a1c4677a8b26e0e2dd8b",
    "email": "rejcoob@gmail.com",
    "name": "Jacobo",
    "sub": "google-oauth2|118093711230624684802",
    "picture": "https://lh3.googleusercontent.com/a/AGNmyxYiIl03_HIuOPYg0mtfdLxxGVNjG_GnxCZ0PX9r=s96-c",
    "phone": "+51973395235",
    "location": "Arequipa",
    "role": "user",
    "status": "active",
    "genre": "Masculino",
    "country": "Peru",
    "address": "Calle los juanetes 1234",
    "email_verified": true,
    "postal": "04014"
  },

*/

    //NOTA PARA PROBAR TAILDWIND AGREGUE RAPIDAMENTE EL LINK CDN AL HTML pero no iria a a quedar asi 
    //no te que hicieron uaconfiguracion especial de css que no pude ver bien coo usar
    
    return (
        <>
     
        <div >
         <Card >
          <Title className='text-center'> Table of Users  </Title> 
        
            
             <Link to='/formUser'>
              <Button className='boton' size='lg' >Add user</Button>
             </Link>
   
         <Table>
             <TableHead>
                <TableRow >
                    <TableHeaderCell >Name</TableHeaderCell>
                    <TableHeaderCell >Email</TableHeaderCell>
                    <TableHeaderCell >Email verified</TableHeaderCell>
                    <TableHeaderCell >Phone</TableHeaderCell>
                    <TableHeaderCell >Country</TableHeaderCell>
                    <TableHeaderCell >Role</TableHeaderCell>
                    <TableHeaderCell >Genre</TableHeaderCell>
                    <TableHeaderCell >Status</TableHeaderCell>
                    <TableHeaderCell className='text-center' >Action</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>


                  {
                    users&& users.map(item=>
                        (
                        <TableRow key={item._id}>
                            <TableCell >{item.name}</TableCell>
                            <TableCell >{item.email}</TableCell>
                            <TableCell >{
                               item.email_verified===true?"verified":"Not verified"
                              }</TableCell>
                            <TableCell >{item.phone}</TableCell>
                            <TableCell >{item.country}</TableCell>
                            <TableCell >{item.role}</TableCell>
                            <TableCell >{item.genre}</TableCell>
                            
                            <TableCell > 
                            {
                             item.status==="active"? <Badge color="emerald" icon={CheckIcon}>
                              {item.status}
                            </Badge> : (item.status==="suspended")?<Badge color="orange" icon={CheckIcon}>
                              {item.status}
                            </Badge>:
                            <Badge color="red" icon={CheckIcon}>
                              {item.status}
                            </Badge>
                            }
                            </TableCell>

                            <TableCell>
                                <Button color='white' >
                                  <Icon size="lg" icon={PencilIcon} color='orange' />
                                </Button>
                                <Button color='white' >
                                  <Icon size="lg" icon={MinusCircleIcon} color='red' />
                                </Button>

                            </TableCell>
                        </TableRow>
                        )
                    ) 
                }
            </TableBody>
             </Table>
        </Card>

    </div>
            
        </>
    )
}








/*  import React from 'react'
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,Badge, Title
} from "@tremor/react";
import { CheckIcon } from "@heroicons/react/outline";

import data from './data.json'
import './user.css'

export default function Users(props) {
    

    //NOTA PARA PROBAR TAILDWIND AGREGUE RAPIDAMENTE EL LINK CDN AL HTML pero no iria a a quedar asi 
    //no te que hicieron uaconfiguracion especial de css que no pude ver bien coo usar
    
    return (
        <>
     
        <div className='container'>
         <Card className='user-card'>
          <Title className='title'> Table of Users  </Title> 
         <Table className='table'>
 
            <TableHead>
                <TableRow className='table-row'>
                    <TableHeaderCell className='table-cell'>Fullname</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Email</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Country</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Adress</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Telefono</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Admin</TableHeaderCell>
                    <TableHeaderCell className='table-cell'>Active</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(item=>
                        (
                        <TableRow className='table-row'key={item.fullname}>
                            <TableCell className='table-cell'>{item.fullname}</TableCell>
                            <TableCell className='table-cell'>{item.email}</TableCell>
                            <TableCell className='table-cell'>{item.country}</TableCell>
                            <TableCell className='table-cell'>{item.address}</TableCell>
                            <TableCell className='table-cell'>{item.tel}</TableCell>
                            <TableCell className='table-cell'>{item.isAdmin===true?"True":"False"}</TableCell>
                            <TableCell className='table-cell'> 
                            {
                             item.active===true? <Badge color="emerald" icon={CheckIcon}>
                              {item.active}
                            </Badge> :
                            <Badge color="red" icon={CheckIcon}>
                              {item.active}
                            </Badge>
                            }
                            </TableCell>
                        </TableRow>
                        )
                      
                    )
                }
            </TableBody>
             </Table>
        </Card>

    </div>
            
        </>
    )
} */








