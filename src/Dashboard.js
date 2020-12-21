import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Tabs = styled.ul`
        margin:0;
        padding: 0;
        text-align: left;
        list-style-type: none;
    `;
const View = styled.li`
        margin:0 10px 0 10px;
        padding-bottom: 4px;
        display: inline;
        cursor: pointer;
        border-bottom: ${props => props.isSelected ? "solid 5px #3C3939" : "none"};
    `;
const HorizontalRule = styled.hr`
        margin-bottom: 2px;
    `;
const MenuItem = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`
export default (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <>
            <Tabs>
                {props.tabs.map((tab, i) =>
                    <View
                        isSelected={i === selectedTab}
                        key={tab.name}
                        onClick={() => setSelectedTab(i)}>
                        <MenuItem to={tab.link}>{tab.name}</MenuItem>
                    </View>)
                }
            </Tabs>
            <HorizontalRule />
            {props.render()}
        </>
    );
}
