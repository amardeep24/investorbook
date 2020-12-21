import React from "react";
import styled from "styled-components";

export default (props) => {
    const ErrorContainer = styled.div`
        color: red;
        background: #F9E8E8;
    `;
    return <ErrorContainer>
        <pre>
            {props.message}
        </pre>
    </ErrorContainer>
}
