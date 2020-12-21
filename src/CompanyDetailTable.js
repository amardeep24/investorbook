import React from "react";
import MaterialTable from "material-table";
import { formatCurrency } from "./utils";

import { tableIcons } from "./Icons";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";

export default (props) => {
    const colData = [
        {
            title: "Name", field: "investor"
        },
        {
            title: "Amount", field: "amount", render: rowData => <div>{formatCurrency(rowData.amount)}</div>
        }
    ];
    return (
        <>
            <IconButton aria-label="back">
                <Link to="/companies"><ArrowBackIos /></Link>
            </IconButton>
            <MaterialTable
                icons={tableIcons}
                columns={colData}
                data={props.tableData}
                options={{
                    rowStyle: {
                        fontSize: '12px',
                    },
                    pageSize: 10
                }}
                title="Investors">
            </MaterialTable>
        </>
    )
}