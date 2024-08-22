import React, { useState } from 'react';
import { useTable } from 'react-table';

const ManagementTable = ({ mode, polygons, setPolygons, markers, setMarkers }) => {
  const [newItem, setNewItem] = useState({ name: '', latlng: '', path: [] });

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

  const handleAddItem = () => {
    if (mode === 'polygons') {
      const path = newItem.path.split(';').map(coord => {
        const [lat, lng] = coord.split(',').map(Number);
        return { lat, lng };
      });
      setPolygons([...polygons, { name: newItem.name, path }]);
    } else {
      const [lat, lng] = newItem.latlng.split(',').map(Number);
      setMarkers([...markers, { name: newItem.name, latlng: { lat, lng } }]);
    }
    setNewItem({ name: '', latlng: '', path: [] });
  };

  const handleRowDelete = (index) => {
    if (mode === 'polygons') {
      setPolygons(polygons.filter((_, i) => i !== index));
    } else {
      setMarkers(markers.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th>Actions</th>
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

      <div>
        <input
          type="text"
          placeholder={mode === 'polygons' ? 'Polygon Name' : 'Marker Name'}
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder={mode === 'polygons' ? 'Coordinates (lat,lng; lat,lng)' : 'Coordinate (lat,lng)'}
          value={mode === 'polygons' ? newItem.path : newItem.latlng}
          onChange={(e) => setNewItem(mode === 'polygons' ? { ...newItem, path: e.target.value } : { ...newItem, latlng: e.target.value })}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
};

export default ManagementTable;
