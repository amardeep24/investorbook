import React, { } from "react";
import MaterialTable from "material-table";
import styled from "styled-components";

import { tableIcons } from "./Icons";

export default (props) => {
    const TableContainer = styled.div`
        max-width: 100%
    `;
    const WrappedRow = styled.div`
        word-break: break-all;
    `
    return (
        <TableContainer>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    {
                        title: "Name", field: "name", render: rowData => <div>
                            <img src={rowData.photo_thumbnail} />
                            {rowData.name}
                        </div>
                    },
                    {
                        title: "Investments", field: "investments", render: rowData =>
                            <WrappedRow>
                                {rowData.investments}
                            </WrappedRow>
                    },
                ]}
                data={props.tableData}
                onRowClick={row => props.showInvestmentDetail(row)}
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