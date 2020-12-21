import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import CompanyDetailTable from "./CompanyDetailTable";
import Error from "./Error";

const GET_COMPANY = gql`
    query Get_Company_By_Pk($id: Int!) {
        company_by_pk(id: $id) {   
            investments {
                amount
                investor {
                    name
                }
            }
        }
    }
`;
export default () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_COMPANY, {
        variables: {
            id
        }
    });
    if (error) return <Error />
    if (loading) return <p>Loading...</p>;
    const tableData = data.company_by_pk.investments.map(investment => {
        return {
            investor: investment.investor.name,
            amount: investment.amount
        }
    });
    console.log(tableData)
    return (
        <CompanyDetailTable tableData={tableData} />
    )
}