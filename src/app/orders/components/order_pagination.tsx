import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

import { getOrderList } from "@/src/providers/api_provider";

 export default function OrderListPagination({ count, page, setPage, limit, setLimit }: { count: number, page: number , setPage: (page: number) => void, limit: number, setLimit: (limit: number) => void}) {
   let rows= [ 5, 10, 15, 20];


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 1500)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      rowsPerPageOptions={rows}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Items per page:" 
    />
  );
}

