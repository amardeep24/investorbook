import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link } from "react-router-dom";
import styled from "styled-components";

import InvestorDetailTable from "./InvestorDetailTable";
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

export const GET_INVESTOR = gql`
    query Get_Companies($id: Int!) {
        investor_by_pk(id: $id) {
            investments {
                id
                amount
                company {
                    name
                }
            }
        }
    }
`

export default (props) => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_INVESTOR, {
        variables: {
            id
        }
    });
    if (error) return <Error />
    if (loading) return <p>Loading...</p>;
    const tableData = data.investor_by_pk.investments.map(investment => {
        return {
            id: investment.id,
            amount: investment.amount,
            name: investment.company.name
        }
    });
    return (
        <ViewContainer>
            <BackButton to="/investments"><ArrowBackIos /></BackButton>
            <TableContainer>
                <InvestorDetailTable investor={id} tableData={tableData} />
            </TableContainer>
        </ViewContainer>);
}