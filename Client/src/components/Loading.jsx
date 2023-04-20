import React from 'react'
import styled from 'styled-components'

export default function Loading({styled,color}) {
    

    return (
            <Container style={styled}>
            <Circle style={{color:color}}></Circle>
            <Circle style={{color:color}}></Circle>
            <Circle style={{color:color}}></Circle>
            <style>
           {`@keyframes pulse {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: .25;
              transform: scale(.75);
            }
          }
           `}

            </style>
            </Container>
    )
}


const Container = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

`
const Circle = styled.div` 

@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}

width: 20px;
height: 20px;
border-radius: 50%;
background-color: black;
  
&:nth-child(1) {
    animation: pulse  .4s ease 0s infinite alternate;
    }
&:nth-child(2) {
    animation: pulse  .4s ease .2s infinite alternate;
    }
&:nth-child(3) {
    animation: pulse  .4s ease .4s infinite alternate;
    }
`
  
