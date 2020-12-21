import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";

export default () => {
    const Header = styled.header`
        text-align: left;
        padding: 20px 0px 20px 20px;
    `
    return (
        <Header>
           <img src={logo}/>
        </Header>
    )
}