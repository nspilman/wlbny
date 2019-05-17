import React from 'react';
import styled from 'styled-components';

const ErrorComponent = (props) =>{
    return <div>
        <h1>{props.message}</h1>
    </div>
}


export default ErrorComponent