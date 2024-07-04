import React from 'react';
import { Link } from 'react-router-dom';

interface Column {
  key: string;
  header: string;
  render: (item: any) => React.ReactNode;
};

interface CustomTableProps {
  columns: Column[];
  data: any[];
};

export const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={index % 2 == 0 ? 'even-row' : 'odd-row'}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.key !== "title" ?
                  column.render(item) :
                  <Link to={item.to} className='table-card-link'>
                    {column.render(item)}
                  </Link>
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};