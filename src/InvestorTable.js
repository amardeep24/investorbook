import React, { } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";
import {Link} from "react-router-dom";

import { tableIcons } from "./Icons";

const TableContainer = styled.div`
max-width: 100%
`;
const WrappedRow = styled.div`
word-break: break-all;
`

export default (props) => {
    return (
        <TableContainer>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    {
                        title: "Name", field: "name", render: rowData => <Link to={`/investor/${rowData.id}`}>
                            <img src={rowData.photo_thumbnail} />
                            {rowData.name}
                        </Link>
                    },
                    {
                        title: "Investments", field: "investments", render: rowData =>
                            <WrappedRow>
                                {rowData.investments}
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
                title="Investors"
            />
        </TableContainer>
    );
}