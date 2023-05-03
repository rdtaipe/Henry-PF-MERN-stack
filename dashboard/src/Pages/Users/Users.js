import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Badge,
  Title,
  Button,
  Icon,
} from "@tremor/react";

import { ToggleOff, ToggleOn, Done, Adjust } from "@mui/icons-material";

//import data from './data.json'
/* import './user.css' */

export default function Users(props) {
  const [users, setUsers] = useState();

  /*   const [isOn, setIsOn] = useState(false); */
  const [isAdmin, setIsAdmin] = useState(false);

  //no se como conseguir la url
  //let selector=useSelector();
  //let users=selector(state=>state.server)

  const loadUser = async () => {
    const res = await axios.get("http://localhost:5000/users");

    //await setUsers(res.data);
    // return res.data;
    let all = await res.data;
    setUsers(all);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleEnable = (status, id) => {
    console.log("cambio", status, id);
    // setIsOn(!isOn);
    if (status === "active") {
      //actualiza
      axios
        .put(`http://localhost:5000/users/${id}`, { status: "inactive" })
        .then(() => window.location.reload());
      //console.log("id del active :", id);
    } else if (status === "inactive" || status === "suspend") {
      //actualiza
      axios
        .put(`http://localhost:5000/users/${id}`, { status: "active" })
        .then(() => window.location.reload());
      //console.log("id del inactive :", id);
    }
  };

  //NOTA PARA PROBAR TAILDWIND AGREGUE RAPIDAMENTE EL LINK CDN AL HTML pero no iria a a quedar asi
  //no te que hicieron uaconfiguracion especial de css que no pude ver bien coo usar

  return (
    <>
      <div>
        <Card>
          <Title className="text-center"> Table of Users </Title>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Email verified</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Country</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Genre</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell className="text-center">
                  Enable User
                </TableHeaderCell>
                <TableHeaderCell className="text-center">Admin</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {item.email_verified === true
                        ? "verified"
                        : "Not verified"}
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.genre}</TableCell>

                    <TableCell>
                      {item.status === "active" ? (
                        <Badge color="emerald" icon={Done}>
                          {item.status}
                        </Badge>
                      ) : item.status === "suspended" ? (
                        <Badge color="red" icon={Adjust}>
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge color="red" icon={Adjust}>
                          {item.status}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleEnable(item.status, item._id)}
                        size="xl"
                        color="white"
                      >
                        {/* <Icon size='xl' icon={ToggleOn}color='green'  /> */}{" "}
                        {/* <Icon size='xl' icon={ToggleOff}  color='red'/> */}
                        {item.status === "active" ? (
                          <Icon size="xl" icon={ToggleOn} color="green" />
                        ) : (
                          <Icon size="xl" icon={ToggleOff} color="red" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick="" color="white" size="xl">
                        {isAdmin ? (
                          <Icon size="xl" icon={ToggleOn} color="green" />
                        ) : (
                          <Icon size="xl" icon={ToggleOff} color="red" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
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
