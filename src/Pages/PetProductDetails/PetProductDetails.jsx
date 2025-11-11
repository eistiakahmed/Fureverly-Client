import React from 'react';
import { useLoaderData } from 'react-router';

const PetProductDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return <div></div>;
};

export default PetProductDetails;
