import React from 'react';
import styled from 'styled-components';

const StyledStringInput = styled.input`
width:600px;
`

const StringInput = (props) =>{
    return(
        <StyledStringInput placeholder="Search a Bidness by Name or Category" onChange = {(e)=>props.update(e.target.value)}></StyledStringInput>
    )
}

export default StringInput