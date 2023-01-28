import { init, Rect, Text, Group } from "zrender/dist/zrender";
import utils from "./utils";
import config from "./config";

export default class FastTable {
  constructor(options = {}) {
    this.container = options.container;
    this.maxHeight = options.maxHeight;
    this.options = options;
    this.columns = options.columns;
    this.dataSource = options.dataSource
    this._initCanvas();
    this.drawHeader();
    this.drawBody();
  }

  _initCanvas() {
    if (!this.zr) {
      this.canvasWidth = utils.calcWidthByColumns(this.columns);
      this.zr = init(this.container, {
        width: this.canvasWidth,
        height: this.maxHeight - config.rowHeight,
      });
    }
  }

  drawHeader() {}

  drawBody() {
    this.canvasGroup = new Group({ id: "canvas-group", x: 0, y: 0 });
    const { leftColumnsFixed, rightColumnsFixed, nomalColumns } =
      utils.getFixedCloumn(this.columns);

    const rcWidth = utils.calcWidthByColumns(rightColumnsFixed);
    const lcWidth = utils.calcWidthByColumns(leftColumnsFixed);
    this._drawTable("center", nomalColumns, lcWidth, rcWidth);
    this._drawTable("left", leftColumnsFixed, lcWidth, rcWidth);
    this._drawTable("right", rightColumnsFixed, lcWidth, rcWidth);
    this._drawShadowBox("left", lcWidth);
    this._drawShadowBox("right", this.container.offsetWidth - rcWidth);
    this.zr.add(this.canvasGroup);
    console.log("this.zr", this.zr);
    this.isPainted = true;
  }

  /**
   * 绘制表格内容
   * @param {*} fixedDirection 位置
   * @param {*} columns 列
   * @param {*} lcWidth 左列总宽度
   * @param {*} rcWidth 右列总宽度
   */
  _drawTable(postion = "center", columns, lcWidth, rcWidth) {
    let startY = 0;
    let offsetX = 0;

    if (postion == "right") offsetX = this.container.offsetWidth - rcWidth;
    else if (postion == "center") offsetX = lcWidth;

    const tableGroup = new Group({
      id: `${postion}-group`,
      x: offsetX,
      y: 0,
    });

    this.dataSource.forEach((item, rowIndex) => {
      let startX = 0;
    //   this._drawTableBorder(startY);
      const rowGroup = this._createRow(startX, startY);
      tableGroup.add(rowGroup);
      columns.forEach((col, cellIndex) => {
        const content = item[col.dataIndex];
        const cellSlot = null;
        if (cellSlot) {
          const vnode = cellSlot({ text: content, record: item });
          this.createHTMLCell(vnode, {
            width: col.width || config.cellWidth,
            height: config.rowHeight,
            x: startX,
            y: startY,
          });
        } else {
          const cell = new Rect({
            id: `cell-${col.dataIndex}-${rowIndex}-${cellIndex}`,
            _cellInfo: { rowIndex, cellIndex, colName: col.dataIndex },
            style: {
              fill: "#FFF",
            },
            textContent: new Text({
              style: {
                text: content,
                fontSize: 12,
              },
            }),
            shape: {
              x: startX,
              y: 0,
              width: col.width || config.cellWidth,
              height: config.rowHeight,
            },
            textConfig: {
              position: "insideLeft",
            },
          });
          rowGroup.add(cell);
        }
        startX += col.width || config.cellWidth;
      });
      startY = startY + config.rowHeight;
    });
    this.canvasGroup.add(tableGroup);
  }

  // 绘制阴影
  _drawShadowBox(direction, offsetX) {
    const rect = new Rect({
      id: `box-shadow-rect-${direction}`,
      zlevel: 100,
      shape: {
        x: offsetX,
        y: 0,
        width: 1,
        height: this.maxHeight,
      },
      style: {
        fill: "#fff",
        shadowBlur: 6,
        shadowColor: "#999",
        shadowOffsetX: direction == "left" ? 3 : -3,
        shadowOffsetY: 0,
      },
    });
    this.zr.add(rect);
  }

  // 更新表格值
  _diffUpdateCanvas() {
    const canvasGroups = this.zr.painter.storage._roots.find(g => g.isGroup);
    canvasGroups._children.forEach(g => {
      this._updateGroupTable(g);
    });
  }

  _updateGroupTable(tableGroup) {
    let startY = this.$parent.startIndex * config.rowHeight;
    tableGroup._children.map(row => {
      row.attr({
        y: startY,
      });
      row._children.map(cell => {
        // 拿到更新之前的值，和现在的只进行对比，如果不一样则更新
        const cellInfo = cell._cellInfo;
        const oldV = cell._textContent.style.text;
        const newV = this.dataSource[cellInfo.rowIndex][cellInfo.colName];
        if (oldV != newV) {
          cell.attr({
            textContent: new Text({
              style: {
                text: newV,
                fontSize: 12,
              },
            }),
          });
        }
      });
      startY = startY + config.rowHeight;
    });
  }

  // 创建行
  _createRow(x, y) {
    const rowGroup = new Group({
      x,
      y,
    });
    rowGroup.on("mouseout", function () {
      this.eachChild(e => {
        e.attr({
          style: {
            fill: "#fff",
          },
        });
      });
    });
    rowGroup.on("mouseover", function () {
      this.eachChild(e => {
        e.attr({
          style: {
            fill: config.hoverColor,
          },
        });
      });
    });
    return rowGroup;
  }

  translateCanvas({ x, y }) {
    const root = this.zr.painter.storage._roots;
    if (x) {
      const canvasGroup = root.find(g => g.id == "canvas-group");
      const g = canvasGroup._children.find(g => g.id == "center-group");
      g.attr({ x: g.x + x });
    } else {
      const group = root.find(g => g.id == "canvas-group");
      group.attr({ y });
    }
    console.log("this.ze", this.zr);
  }
}
