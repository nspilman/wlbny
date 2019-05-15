import React from 'react';
import styled from 'styled-components';

const StyledSelectInput = styled.select`
width:600px;
@media (max-width: 768px) {
    width:400px;
`

const ErrorComponent = (props) =>{
    return <div>
        <h1>{props.message}</h1>
    </div>
}


export default ErrorComponent