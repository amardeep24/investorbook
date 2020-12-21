import React, { } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";
import {Link} from "react-router-dom";

import { tableIcons } from "./Icons";

export default (props) => {
    const TableContainer = styled.div`
        max-width: 100%
    `;
    const WrappedRow = styled.div`
        word-break: break-all;
    `
    const RowItem = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    `
    return (
        <TableContainer>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    {
                        title: "Name", field: "name", render: rowData =>
                        <RowItem to={`company/${rowData.id}`}>{rowData.name}</RowItem>
                    },
                    {
                        title: "Investors", field: "investors", render: rowData =>
                            <WrappedRow>
                                {rowData.investors}
                            </WrappedRow>
                    },
                ]}
                data={props.tableData}
                options={{
                    rowStyle: {
                        fontSize: '12px',
                    },
                    pageSize: 10
                }}
                title="Companies">
            </MaterialTable>
        </TableContainer>
    );
}