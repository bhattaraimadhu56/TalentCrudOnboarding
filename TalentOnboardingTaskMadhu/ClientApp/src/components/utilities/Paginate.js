import React from "react";
import { Label, Button } from "semantic-ui-react";
export const Paginate = ({ itemPerPage, totalItem, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Label>
      {pageNumbers.map(number => (
        <Label.Detail key={number}>
          <Button onClick={() => paginate(number)}>{number}</Button>
        </Label.Detail>
      ))}
    </Label>
  );
};
