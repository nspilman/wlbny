import React from 'react';
import styled from 'styled-components';

const StyledSelectInput = styled.select`
width:600px;
`

const SelectInput = (props) =>{
    return props.options.length > 0 ? (
        <StyledSelectInput value = {props.currentVal} onChange = {(e)=>props.update(e.target.value)}>
        <option value=''>filter by {props.title}</option>
            {props.options.map(option => { 
                return <option key={option}>{option}</option>
            })}
        </StyledSelectInput>
    ) : <div></div>
}


export default SelectInput