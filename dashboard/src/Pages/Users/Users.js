import React from 'react'
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
export default function Users(props) {
    

    //NOTA PARA PROBAR TAILDWIND AGREGUE RAPIDAMENTE EL LINK CDN AL HTML pero no iria a a quedar asi 
    //no te que hicieron uaconfiguracion especial de css que no pude ver bien coo usar
    
    return (
        <>

        <Card className='mt-3'>
             <Title className='text-green-600 text-center'> Table of Users  </Title>
              <Table >
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Fullname</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Country</TableHeaderCell>
                    <TableHeaderCell>Adress</TableHeaderCell>
                    <TableHeaderCell>Telefono</TableHeaderCell>
                    <TableHeaderCell>Admin</TableHeaderCell>
                    <TableHeaderCell>Active</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(item=>
                        (
                        <TableRow key={item.fullname}>
                            <TableCell>{item.fullname}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.country}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.tel}</TableCell>
                            <TableCell>{item.isAdmin===true?"True":"False"}</TableCell>
                            <TableCell> 
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
            
        </>
    )
}








