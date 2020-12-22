import React, {useState} from "react";
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
    const [open, setOpen] = useState(false);
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
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    {
                        icon: () => <Delete />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                    },
                    {
                        icon: () => <AddBox />,
                        tooltip: 'Add Investment',
                        isFreeAction: true,
                        onClick: (event) => setOpen(true)
                    }
                ]}
                title="Investors">
            </MaterialTable>
        </>
    )
}