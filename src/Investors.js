import React from 'react'
import { useQuery, gql } from '@apollo/client';

import Error from "./Error";
import InvestorTable from "./InvestorTable";

// Example of a component that uses apollo-client to fetch data.

const GET_INVESTORS = gql`
  query GetInvestors {
    investor(limit: 100) {
      id
      name
      photo_thumbnail
      investments{
        company{
          name
        }
      }
    }
  }
`;

export default () => {

  const { loading, error, data } = useQuery(GET_INVESTORS);

  if (loading) return <p>Loading...</p>;
  if(error) return <Error message={error.message}/>
  if (data.investor.length === 0) return <p>The database is empty!</p>
  const tableData = data.investor.map(({ id, name, photo_thumbnail, investments }) => {
    return {
      id,
      name,
      photo_thumbnail,
      investments: investments.map(({ company }) => company.name).join(", ")
    };
  });

  return <>
    <InvestorTable tableData={tableData} />
  </>
}