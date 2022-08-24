import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination  } from 'react-table';
import { GlobalFilter } from '../GlobalFilter';


const axios = require('axios').default;

const url = 'http://localhost:5000/users'

const tableColumn = [
    {
        Header: 'FirstName',
        accessor: 'firstName'
    },
    {
        Header: 'LastName',
        accessor: 'lastName'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Address',
        accessor: 'address'
    },
]

export const BasicTable = () => {
    const [users,setUsers] = useState([])
      const columns = useMemo( ()=> tableColumn, [])
      const data = useMemo(()=> users, [users])

      const { getTableProps, getTableBodyProps, headerGroups, prepareRow, state, setGlobalFilter,page,nextPage,previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize } =
    useTable({
      columns,
      data,
      
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    );
     useEffect( ()=>{
       const fetchUsers = async()=>{
        try{
           const {data} = await axios.get(url)
           setUsers(data)
        }
        catch(error){
            console.log(error)
        }
      
       }
       fetchUsers()
     }, [])

     const {globalFilter, pageIndex, pageSize} = state
  return (
    <div className='p-24 text-center shadow-md w-full'>
        <GlobalFilter  filter={globalFilter} setFilter={setGlobalFilter}/>
        <br /> <br />
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' {...getTableProps()}/>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='border border-green-300 py-3 px-6' {...column.getHeaderProps(column.getSortByToggleProps())}> {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? ' 🔽': ' 🔼'): ''}
                </th>
              ))}
              
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='border border-green-400 py-4 px-6' {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <div>
          <span className='my-4'>
              Page{''}
              <strong>
                  {pageIndex + 1} of {pageOptions.length}
              </strong> {''}
          </span>
          <span>
              ! Go to page: {''}
              <input type="number" defaultValue={pageIndex + 1}
              onChange={e=>{
                  const PageNumber = e.target.value ? Number(e.target.value) -1 : 0
                  gotoPage(PageNumber)
                  
              }} 
              style={{width: '50px'}}/>
          </span>
          <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
              {
                  [5,10,15].map(pageSize=>(
                      <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                      </option>
                  ))
              }

          </select>
          <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
          <button onClick={()=> gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </div>
  )
}
