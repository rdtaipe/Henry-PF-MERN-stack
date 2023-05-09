
import styled from 'styled-components'
import Loader from './Loader'

export default function Grid({style,children, childHeight,childWidth,className}) {
    
    const content = children.length > 0 ? children : <Loader/>

    return (
        <Container style={style} childHeight={childHeight} childWidth={childWidth} className={`min-h-[35rem] mt-6 place-items-center`}>
            {
            content
            }
            
        </Container>
    )
}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(${props => props.childWidth? props.childWidth+"px": '200px'}, 1fr));
grid-gap: 1rem;
grid-template-rows: auto;
justify-content: center;
align-items: flex-start;

& .card{
    height: ${props => props.childHeight? props.childHeight+"px": '260px'};
    max-width: 200px;
}
`