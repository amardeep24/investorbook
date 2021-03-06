import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link } from "react-router-dom";

import CompanyDetailTable from "./CompanyDetailTable";
import Error from "./Error";

const ViewContainer = styled.div`
    display: flex;
`;
const TableContainer = styled.div`
    width: 100%;
`;
const BackButton = styled(Link)`
    padding: 0 10px 0 10px;
`;
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
    return (
        <ViewContainer>
            <BackButton to="/companies"><ArrowBackIos /></BackButton>
            <TableContainer>
                <CompanyDetailTable tableData={tableData} />
            </TableContainer>
        </ViewContainer>
    )
}