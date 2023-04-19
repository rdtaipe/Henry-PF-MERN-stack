import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import {Button} from '../../Components/Button'

const urls = {
    default: "/products/",
    getModule: "/dev/mudules/product",
    getAll: "/products/",
    getById: "/products/",
    create: "/products/",
    update: "/products/",
    delete: "/products/",
    clone: "/products/"
}

export default function Products(props) {
    const dispatch = useDispatch()

    const actions = useSelector(state => state.actions)
    const {top,width} = useSelector(state => state.sidebar)
    const {get,url} = useSelector(state => state.server)
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ])
    const [rows, setRows] = useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ]
    )



    useEffect(()=>{
        get(url+"dev/module/product").then(res=>{
            var data= res.data
            var columns = data.map((item,index)=>{
                return {
                    field: item.key,
                    headerName: item.key,
                    type: item.type,
                    width: item.type==="number"?50:150,
                    editable: true,
                }
            })
            var id = {

                field: '_id',
                headerName: 'ID',
                width: 90
            }
            columns.unshift(id)
            setColumns(columns)
        })
        get(url+"products").then(res=>{
            var data= res.data
            var rows = data.map((item,index)=>{
                return {
                    id: index,
                    ...item
                }
            }
            )
            setRows(rows)
        })
   

    },[])


    return (
        <Container>
            <Box sx={{ height: window.innerHeight - top, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    // disableRowSelectionOnClick
                    //get changes
                    onSelectionModelChange={(newSelection) => {
                        console.log(newSelection)
                    }}

                />
            </Box>

        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: transparent

`

