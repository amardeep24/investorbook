import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
color: red;
background: #F9E8E8;
`;

export default (props) => {
    return <ErrorContainer>
        <pre>
            {props.message}
        </pre>
    </ErrorContainer>
}
