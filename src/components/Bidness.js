import React from 'react';
import styled from 'styled-components';

const BidnessComp = styled.div`
width:80%;
padding:1em;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
}
`



const Bidness = (props) => {
    const {name, website,address, typeofbusiness, borough} = props.bidness
    const stringOutput = (list) =>{
        let boroughString = '';
        list.forEach(string => boroughString = boroughString +string+",");
        return boroughString.slice(0,-1)
    }
    return (
        <BidnessComp>
            <h3>
                {name}
            </h3>
            <h4>
                Category: <span>{stringOutput(typeofbusiness)}</span>
            </h4>
             <h5>
                 Borough(s): <span>{stringOutput(borough)}</span></h5> 
             <h6>
                 Address: {address}</h6>
             <h6>
                 Website: 
                <a href={website} target="_blank">
                    {website}
                </a>
             </h6>
        </BidnessComp>
    )
}

export default Bidness