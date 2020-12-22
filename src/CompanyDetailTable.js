import React from "react";
import MaterialTable from "material-table";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';

import { formatCurrency } from "./utils";
import { tableIcons } from "./Icons";

const colData = [
    {
        title: "Name", field: "investor"
    },
    {
        title: "Amount", field: "amount", render: rowData => <div>{formatCurrency(rowData.amount)}</div>
    }
];

export default (props) => {
    return (
        <>
            <MaterialTable
                icons={tableIcons}
                columns={colData}
                data={props.tableData}
                options={{
                    rowStyle: {
                        fontSize: '12px',
                    },
                    pageSize: 10,
                    search: false,
                    actionsColumnIndex: -1,
                    toolbarButtonAlignment: "left"
                }}
                actions={[
                    {
                        icon: () => <Edit />,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => console.log(rowData.name)
                    },
                    {
                        icon: () => <Delete />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) =>  console.log(rowData.name)
                    },
                    {
                        icon: () => <AddBox />,
                        tooltip: 'Add Investment',
                        isFreeAction: true,
                        onClick: (event) =>  console.log(event)
                    }
                ]}
                title="Investors">
            </MaterialTable>
        </>
    )
}