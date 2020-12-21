import MaterialTable from "material-table";
import React from "rect";
import styled from "styled-components";
import MaterialTable from "material-table";

import { formatCurrency } from "./utils";

export default () => {
    const colData = [
        {
            title: "Name", field: "name"
        },
        {
            title: "Amount", field: "amount", render: rowData => <div>{formatCurrency(rowData.amount)}</div>
        }
    ];
    return (
        <MaterialTable
        columns={colData}
        data={props.tableData}
        options={{
            rowStyle: {
                fontSize: '12px',
            },
            pageSize: 10
        }}
        title="Investments">
        </MaterialTable>
    )

}