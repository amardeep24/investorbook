import React from 'react'
import { useQuery, gql } from '@apollo/client';

import Error from "./Error";
import CompanyTable from "./CompanyTable";


const GET_COMPANIES = gql`
    query Get_Companies {
        company(limit: 100) {
            id
            name
            investments {
                investor {
                    name
                }
            }
        }
    }`;

export default () => {
    const {data, loading, error} = useQuery(GET_COMPANIES);
    if (loading) return <p>Loading...</p>;
    if(error) return <Error message={error.message}/>
    console.log(data.company);
    const tableData = data.company.map(({id, name, investments}) => {
        return {
            id,
            name,
            investors: investments.map(({investor}) => investor.name).join(", ")
        };
    });
    return (
        <CompanyTable tableData={tableData}/>
    );
}