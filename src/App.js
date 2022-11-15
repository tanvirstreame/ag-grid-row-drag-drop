import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ]);

  const [columnDefs] = useState([
    { field: 'make', rowDrag: true },
    { field: 'model' },
    { field: 'price' }
  ])

  const onRowDragEnter = (e) => {
    console.log("onRowDragEnter", e);
  }
  const onRowDragEnd = (e) => {
    console.log("onRowDragEnd", e);
  }
  const onRowDragMove = (event) => {
    console.log("onRowDragMove", event);
    var movingNode = event.node;
    var overNode = event.overNode;
    var rowNeedsToMove = movingNode !== overNode;
    let immutableStore = [...rowData];
    if (rowNeedsToMove) {
      var movingData = movingNode?.data;
      var overData = overNode?.data;
      var fromIndex = immutableStore.indexOf(movingData);
      var toIndex = immutableStore.indexOf(overData);
      var newStore = immutableStore.slice();
      moveInArray(newStore, fromIndex, toIndex);
      setRowData(newStore)
    }
    function moveInArray(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  }
  const onRowDragLeave = (e) => {
    console.log("onRowDragLeave", e);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        onRowDragEnter={onRowDragEnter}
        onRowDragEnd={onRowDragEnd}
        onRowDragMove={onRowDragMove}
        onRowDragLeave={onRowDragLeave}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  );
};

export default App;
