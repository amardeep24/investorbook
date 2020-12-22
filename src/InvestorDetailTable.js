import React, { useCallback, useEffect, useState } from "react";
import MaterialTable from "material-table";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import { useMutation, gql } from '@apollo/client';
import { tableIcons } from "./Icons";

import { formatCurrency } from "./utils";
import AddInvestment from "./AddInvestment";
import { GET_INVESTOR } from "./Investor";
import EditInvestment from "./EditInvestment";

const colData = [
    {
        title: "Id", field: "id", hidden: true
    },
    {
        title: "Name", field: "name",
    },
    {
        title: "Amount", field: "amount", render: rowData => <div>{formatCurrency(rowData.amount)}</div>
    }
];

const ADD_INVESTMENT = gql`
    mutation Add_Investment($amount: numeric!, $name: String!, $investor: Int!) {
    insert_investment(objects: {amount: $amount, company: {data: {name: $name}}, investor_id: $investor}) {
        returning {
        amount
            company {
                name
            }
        }
    }
    }
`;

const EDIT_INVESTMENT = gql`
    mutation Edit_Investment($id: Int!, $amount: numeric!) {
        update_investment_by_pk(pk_columns: {id: $id}, _set: {amount: $amount}){
            amount
        }
    }
`;

const DELETE_INVESTMENT = gql`
    mutation Delete_Investment_By_Pk($id: Int!) {
        delete_investment_by_pk(id: $id){
            id
        }
    }
`;

export default (props) => {
    const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false);
    const [isEditInvestmentOpen, setIsEditInvestmentOpen] = useState(false);

    const [newInvestment, setNewInvestment] = useState(null);
    const [updatedInvestment, setUpdatedInvestment] = useState(null);

    const [addInvestment] = useMutation(ADD_INVESTMENT, {
        refetchQueries: [
            { query: GET_INVESTOR, variables: { id: props.investor } }
        ]
    });

    const [editInvestment] = useMutation(EDIT_INVESTMENT, {
        refetchQueries: [
            { query: GET_INVESTOR, variables: { id: props.investor } }
        ]
    });

    const [deleteInvestment] = useMutation(DELETE_INVESTMENT, {
        refetchQueries: [
            { query: GET_INVESTOR, variables: { id: props.investor } }
        ]
    });

    useEffect(() => {
        if (newInvestment) {
            addInvestment({
                variables: {
                    investor: props.investor,
                    name: newInvestment.company,
                    amount: newInvestment.investment
                }
            });
        }
    }, [newInvestment, addInvestment,props.investor]);

    useEffect(() => {
        if (updatedInvestment) {
            editInvestment({
                variables: {
                    id: updatedInvestment.id,
                    amount: updatedInvestment.amount
                }
            });
        }
    }, [updatedInvestment, editInvestment]);

    const handleAddInvestmentClose = useCallback(() => {
        setIsAddInvestmentOpen(false);
    }, [setIsAddInvestmentOpen]);
    const handleEditInvestmentClose = useCallback(() => {
        setIsEditInvestmentOpen(false);
    }, [setIsEditInvestmentOpen]);
    const handleAddInvestmentSubmit = useCallback((investment) => {
        setIsAddInvestmentOpen(false);
        setNewInvestment(investment);
    }, [setIsAddInvestmentOpen, setNewInvestment]);
    const handleEditInvestmentSubmit = useCallback((investment) => {
        setIsEditInvestmentOpen(false);
        setUpdatedInvestment(investment);
    }, [setIsEditInvestmentOpen, setUpdatedInvestment]);
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
                        onClick: (event, rowData) => {
                            setIsEditInvestmentOpen(true);
                            console.log(rowData.id)
                            setUpdatedInvestment({
                                id: rowData.id,
                                name: rowData.name,
                                amount: rowData.amount,
                            });
                        }
                    },
                    {
                        icon: () => <Delete />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => deleteInvestment({ variables: { id: rowData.id } })
                    },
                    {
                        icon: () => <AddBox />,
                        tooltip: 'Add Investment',
                        isFreeAction: true,
                        onClick: (event) => setIsAddInvestmentOpen(true)
                    }
                ]}
                title="Investments">
            </MaterialTable>
            <AddInvestment
                open={isAddInvestmentOpen}
                onClose={handleAddInvestmentClose}
                onSubmit={handleAddInvestmentSubmit} />
            {updatedInvestment && <EditInvestment
                open={isEditInvestmentOpen}
                id={updatedInvestment.id}
                company={updatedInvestment.name}
                investment={updatedInvestment.amount}
                onClose={handleEditInvestmentClose}
                onSubmit={handleEditInvestmentSubmit} />}
        </>
    )

}