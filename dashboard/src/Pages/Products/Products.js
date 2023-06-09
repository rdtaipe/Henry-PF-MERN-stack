import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import { DataGrid, GridCellModes, GridCellEditStopReasons, GridEventListener } from '@mui/x-data-grid';
import PropTypes, { number, object } from 'prop-types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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



const useFakeMutation = () => {
    return React.useCallback((user) => user);
};

function EditToolbar(props) {
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field } = selectedCellParams;
        if (cellMode === 'edit') {
            setCellModesModel({
                ...cellModesModel,
                [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
            });
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field } = selectedCellParams;
        setCellModesModel({
            ...cellModesModel,
            [id]: {
                ...cellModesModel[id],
                [field]: { mode: GridCellModes.View, ignoreModifications: true },
            },
        });
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            }}
        >
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                variant="outlined"
            >
                {cellMode === 'edit' ? 'Save' : 'Edit'}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={cellMode === 'view'}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Cancel
            </Button>

            <Button variant="contained" color="primary" sx={{ width: 200, margin: 2 }}>
                <Link to="/products/addproduct">add Product</Link>
            </Button>

        </Box>
    );
}

EditToolbar.propTypes = {
    cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
    cellModesModel: PropTypes.object.isRequired,
    selectedCellParams: PropTypes.shape({
        field: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    setCellModesModel: PropTypes.func.isRequired,
};
export default function Products(props) {
    const dispatch = useDispatch()

    const actions = useSelector(state => state.actions)
    const { top, width } = useSelector(state => state.sidebar)
    const { get, url, put } = useSelector(state => state.server)
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
    ]
    )

    const [selectedCellParams, setSelectedCellParams] = React.useState(null);
    const [cellModesModel, setCellModesModel] = React.useState({});


    const cellMode = React.useMemo(() => {
        if (!selectedCellParams) {
            return 'view';
        }
        const { id, field } = selectedCellParams;
        return cellModesModel[id]?.[field]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);


    const mutateRow = useFakeMutation();

    const [snackbar, setSnackbar] = React.useState(null);


    useEffect(() => {
        get(url + "dev/module/product").then(res => {
            var data = res.data
            var columns = data.map((item, index) => {
                return {
                    field: item.key,
                    headerName: item.key,
                    type: item.type,
                    width: item.type === "number" ? 50 : 150,
                    editable: true,
                }
            })
            var id = {

                field: '_id',
                headerName: 'ID',
                width: 90,
                editable:false
            }
            columns.unshift(id)
            setColumns(columns)
        })
        get(url + "products").then(res => {
            var data = res.data
            var rows = data.map((item, index) => {
                return {
                    id: index,
                    f: () => { console.log(item) },
                    ...item
                }
            }
            )
            setRows(rows)
        })


    }, [])



    const handleCellFocus = React.useCallback((event) => {

        const row = event.currentTarget.parentElement;
        const id = row.dataset.id;
        const field = event.currentTarget.dataset.field
        setSelectedCellParams({ id, field });
    }, []);
    const handleCellKeyDown = React.useCallback(
        (params, event) => {
            if (cellMode === 'edit') {
                // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
                event.defaultMuiPrevented = true;
            }
        },
        [cellMode],
    );





    const onCellKeyDown = (e) => {
    }
    const onCellMouseDown = (e) => {
        /* const inputs = {
            string: "value",
            number: "value",
            boolean: "checked",
            array: "value",
            object: "value"
        }
        console.log(e)
        const input = e.currentTarget.querySelector('input')

        if (input && columns && selectedCellParams) {
            const type = columns.filter((item) => item.field === selectedCellParams.field)[0].type

            if (type && input) {
                const attributes = input.attributes[inputs[type]]
                console.log(attributes.value)
            }
        } */

    }

    const processRowUpdate = React.useCallback(async (newRow) => {

        await put(`${url}products/${newRow._id}`, newRow)
        return (newRow)

    });

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

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
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    onCellKeyDown={handleCellKeyDown}
                    cellModesModel={cellModesModel}
                    onCellModesModelChange={(model) => setCellModesModel(model)}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            cellMode,
                            selectedCellParams,
                            setSelectedCellParams,
                            cellModesModel,
                            setCellModesModel,
                        },
                        cell: {
                            onFocus: handleCellFocus,
                            onKeyDown: onCellKeyDown,
                            onMouseDown: onCellMouseDown,

                        },
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

