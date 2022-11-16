function calcCanvasWidthByColumns(columns) {
  console.log(columns);
}

function hasFixedCloumn(columns) {
  const fixedColumns = columns.filter(col => col.fixed);
  return fixedColumns;
}

export default { calcCanvasWidthByColumns, hasFixedCloumn };
