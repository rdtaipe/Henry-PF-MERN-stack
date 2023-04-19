import React,{useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

// import TableModel from '../../Components/TableModel/TableModel'

export default function Sales(props) {
    const dispatch = useDispatch()
    
    return (
        <Container>
         
          {/* <TableModel url={server.url} {...server}/> */}

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: cent


`
