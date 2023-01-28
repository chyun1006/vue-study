import config from "./config";

function calcWidthByColumns(columns) {
  const sum = columns.reduce((preV, currV) => {
    preV = preV + (currV.width || config.cellWidth);
    return preV;
  }, 0);
  return sum;
}

function getFixedCloumn(columns) {
  const rightColumnsFixed = [];
  const leftColumnsFixed = [];
  const nomalColumns = [];
  columns.forEach(col => {
    if (col.fixed == "right") rightColumnsFixed.push(col);
    else if (col.fixed == "left") leftColumnsFixed.push(col);
    else nomalColumns.push(col);
  });

  return {
    rightColumnsFixed,
    leftColumnsFixed,
    nomalColumns,
  };
}

export default { calcWidthByColumns, getFixedCloumn };
