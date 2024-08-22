
import React from 'react';
import { useTable } from 'react-table';

const ManagementTable = ({ mode, polygons, setPolygons, markers, setMarkers }) => {
  const data = mode === 'polygons' ? polygons : markers;

  const columns = React.useMemo(() => {
    if (mode === 'polygons') {
      return [
        { Header: 'Polygon Name', accessor: 'name' },
        { Header: 'Coordinates', accessor: 'path', Cell: ({ value }) => JSON.stringify(value) },
      ];
    } else {
      return [
        { Header: 'Marker Name', accessor: 'name' },
        { Header: 'Coordinate', accessor: 'latlng', Cell: ({ value }) => JSON.stringify(value) },
      ];
    }
  }, [mode]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleRowDelete = (index) => {
    if (mode === 'polygons') {
      setPolygons(polygons.filter((_, i) => i !== index));
    } else {
      setMarkers(markers.filter((_, i) => i !== index));
    }
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
              <td><button onClick={() => handleRowDelete(i)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ManagementTable;
