import React,{ useMemo } from 'react'
import './InterviewTable.css'
import { useTable, useSortBy, useFilters } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
  
    return (
    <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search...`}
        className="filter-input"
      />
    );
  }

  const InterviewTable = ({ interviews }) => {
    const navigate = useNavigate();

    const handleRedirect = (id) => {
        navigate(`/interview/${id}`);
    };

    const columns = useMemo(() => [
      {
        Header: 'Company',
        accessor: 'companyName',
        disableFilters: false,
        Filter: DefaultColumnFilter, 
      },
      {
        Header: 'Profession',
        accessor: 'professionName',
        disableFilters: false,
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Type',
        accessor: 'type',
        disableFilters: false,
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Score',
        accessor: 'score',
        disableFilters: false,
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Opinion',
        accessor: 'opinion',
        disableFilters: true,
        disableSortBy: true, 
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Date',
        accessor: 'interviewDate',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: 'Actions',
        accessor: 'id', // Assuming you have an ID field to use for redirection
        Cell: ({ row }) => (
            <button onClick={() => handleRedirect(row.original.id)}>
                <FontAwesomeIcon icon={faInfoCircle} />
            </button>
        ),
        disableSortBy: true, // Disable sorting for the action column
        disableFilters: true, // Disable filtering for the action column
      },
    ], []);
  
    const data = useMemo(() => interviews, [interviews]);
  
    const defaultColumn = useMemo(() => ({
      Filter: DefaultColumnFilter,
    }), []);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      { columns, data, defaultColumn },
      useFilters,
      useSortBy,
    );
  
    return (
        <div className="table-container">
        <h2 className="table-title">Son Eklenen 10 Mülakat</h2>
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th"
                  >
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="tr">
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="td"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      );
  };

export default InterviewTable