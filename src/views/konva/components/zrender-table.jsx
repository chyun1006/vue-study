import { init, Rect, Text, Group } from "zrender/dist/zrender";
import Vue from "vue";
import utils from "./utils";
import config from "./config";
import geoHelper from "./geometry-helper/index";
console.log(geoHelper);
export default {
  props: {
    columns: Array,
    dataSource: Array,
    cellSlot: Object,
  },
  watch: {
    dataSource() {
      this._initCanvas();
      if (!this.isPainted) this.drawBody();
      else this._diffUpdateCanvas();
    },
  },
  mounted() {
    if (this.dataSource.length) {
      this._initCanvas();
      this.drawHeader();
      this.drawBody();
    }
  },
  render() {
    console.log("inner table render");
    return (
      <div class="canvas-table-wrapper">
        <div class="canvas-container" ref="canvas-container"></div>
      </div>
    );
  },
  methods: {
    _initCanvas() {
      if (!this.zr) {
        this.tableCanvasRef = this.$refs["canvas-container"];
        // 计算宽度
        this.canvasWidth = utils.calcWidthByColumns(this.columns);
        this.zr = init(this.tableCanvasRef, {
          width: this.canvasWidth,
          height: this.$parent.maxHeight - config.rowHeight,
        });
      }
    },

    /**
     * 绘制表头
     * @param {*} columns 表头列
     * @param {*} position 位置
     * @param {*} offsetX 初始偏移量
     */
    _drawHeaderGroup(columns, position, offsetX) {
      let startX = 0;
      const group = new Group({
        id: `header-group-${position}`,
        x: offsetX,
        y: 0,
      });
      columns.forEach((col, colIndex) => {
        const text = new Text({
          style: {
            text: col.title,
            fill: "#000",
            fontSize: 13,
            textAlign: "left",
          },
        });
        const cell = new Rect({
          id: `header-cell-${position}-${colIndex}`,
          style: {
            fill: colIndex % 2 == 0 ? "YELLOW" : "PINK",
          },
          _cellInfo: { colIndex },
          textContent: text,
          shape: {
            x: startX,
            y: 0,
            width: col.width || config.cellWidth,
            height: config.headerHeight,
          },
          textConfig: {
            position: "insideLeft",
          },
        });

        // 绘制拖拽手柄
        if (colIndex > 0) {
          const self = this;
          const _preCell = group._children.find(
            c => c.id == `header-cell-${position}-${colIndex - 1}`
          );
          const _nextCell = cell;
          const divider = new geoHelper.Divider(
            {
              x: startX,
              id: `header-divider-${position}-${colIndex - 1}`,
              preCell: _preCell,
              nextCell: _nextCell,
            },
            function ({ oldPreWidth }, { oldNextWidth, oldNextX }, diff) {
              const { preCell, nextCell } = this;

              self._scaleTableBodyCellWidth(
                preCell,
                nextCell,
                position,
                { oldPreWidth },
                { oldNextWidth, oldNextX },
                diff
              );
              preCell?.attr({
                shape: {
                  width: oldPreWidth + diff,
                },
              });
              nextCell?.attr({
                shape: {
                  x: oldNextX + diff,
                  width: oldNextWidth - diff,
                },
              });
            }
          );
          group.add(divider);
        }

        group.add(cell);
        startX += col.width || config.cellWidth;
      });
      this.headerGroup.add(group);
    },

    /**
     * 表格body中指定单元格的缩放
     * @param {*} preCell
     * @param {*} nextCell
     * @param {*} position
     * @param {*} param3
     * @param {*} param4
     * @param {*} diff
     */
    _scaleTableBodyCellWidth(
      preCell,
      nextCell,
      position,
      { oldPreWidth },
      { oldNextWidth, oldNextX },
      diff
    ) {
      const tableBody = this.bodyGroup._children.find(
        h => h.id == `body-group-${position}`
      );
      const preCellIndex = preCell._cellInfo.colIndex;
      const nextCellIndex = nextCell._cellInfo.colIndex;
      tableBody._children.forEach(row => {
        row._children.forEach(col => {
          const [, , , colI] = col.id.split("-");
          if (colI == preCellIndex) {
            col?.attr({
              shape: {
                width: oldPreWidth + diff,
              },
            });
          }
          if (colI == nextCellIndex) {
            col?.attr({
              shape: {
                x: oldNextX + diff,
                width: oldNextWidth - diff,
              },
            });
          }
        });
      });
    },

    // 绘制table body
    drawBody() {
      this.headerGroup = new Group({ id: "header-group", x: 0, y: 0 });
      this.bodyGroup = new Group({
        id: "body-group",
        x: 0,
        y: config.headerHeight,
      });

      const { leftColumnsFixed, rightColumnsFixed, nomalColumns } =
        utils.getFixedCloumn(this.columns);

      const rcWidth = utils.calcWidthByColumns(rightColumnsFixed);
      const lcWidth = utils.calcWidthByColumns(leftColumnsFixed);
      this._drawTableGroup("center", nomalColumns, lcWidth, rcWidth);
      this._drawTableGroup("left", leftColumnsFixed, lcWidth, rcWidth);
      this._drawTableGroup("right", rightColumnsFixed, lcWidth, rcWidth);
      this._drawShadowBox("left", lcWidth);
      this._drawShadowBox("right", this.tableCanvasRef.offsetWidth - rcWidth);
      this.zr.add(this.bodyGroup);
      this.zr.add(this.headerGroup);
      console.log("this.zr", this.zr);
      this.isPainted = true;
    },

    /**
     * 绘制表格内容
     * @param {*} fixedDirection 位置 left,center,right
     * @param {*} columns 列数据
     * @param {*} lcWidth 左列总宽度
     * @param {*} rcWidth 右列总宽度
     */
    _drawTableGroup(postion = "center", columns, lcWidth, rcWidth) {
      let startY = 0;
      let offsetX = 0;

      if (postion == "right")
        offsetX = this.tableCanvasRef.offsetWidth - rcWidth;
      else if (postion == "center") offsetX = lcWidth;

      const group = new Group({
        id: `body-group-${postion}`,
        x: offsetX,
        y: 0,
      });
      // 绘制表头
      this._drawHeaderGroup(columns, postion, offsetX);

      // 绘制表格内容
      this.dataSource.forEach((item, rowIndex) => {
        let startX = 0;
        this._drawTableBorder(startY);
        const rowGroup = this._createRow(startX, startY);
        rowGroup.rowIndex = rowIndex;
        group.add(rowGroup);
        const rowStyle = this.$parent?.rowStyle({
          row: item,
          rowIndex: rowGroup.rowIndex,
        });

        columns.forEach((col, cellIndex) => {
          const content = item[col.dataIndex];
          const cellSlot = this.cellSlot[col.dataIndex];
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
                fill: rowStyle?.backgroundColor || "#FFF",
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

      this.bodyGroup.add(group);
    },

    _drawTableBorder() {
      // console.log("---y---", y);
    },

    // 绘制阴影
    _drawShadowBox(direction, offsetX) {
      const rect = new Rect({
        id: `box-shadow-rect-${direction}`,
        zlevel: 100,
        shape: {
          x: offsetX,
          y: 0,
          width: 1,
          height: this.$parent.maxHeight,
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
    },

    // 更新表格值
    _diffUpdateCanvas() {
      const canvasGroups = this.zr.painter.storage._roots.find(
        g => g.id == "body-group"
      );
      canvasGroups._children.forEach(g => {
        this._updateGroupTable(g);
      });
    },

    _updateGroupTable(tableGroup) {
      let startY = this.$parent.startIndex * config.rowHeight;

      tableGroup._children.map((row, index) => {
        row.rowIndex = index + this.$parent.startIndex;
        const rowStyle = this.$parent?.rowStyle({
          row: this.dataSource[index],
          rowIndex: row.rowIndex,
        });
        row.attr({
          y: startY,
        });
        if (rowStyle) console.log("rowStyle", tableGroup);
        row._children.map(cell => {
          // 拿到更新之前的值，和现在的只进行对比，如果不一样则更新
          const cellInfo = cell._cellInfo;
          const oldV = cell._textContent.style.text;
          const newV = this.dataSource[cellInfo.rowIndex][cellInfo.colName];
          if (oldV != newV) {
            cell.attr({
              style: {
                fill: rowStyle?.backgroundColor || "#FFF",
              },
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
    },

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
        console.log("mouseover", this);
        // this._children.forEach(row => {
        //   row.attr({
        //     style: {
        //       fill: config.hoverColor,
        //     },
        //   });
        // });
        this.eachChild(e => {
          e.attr({
            style: {
              fill: config.hoverColor,
            },
          });
        });
      });
      return rowGroup;
    },

    // 偏移表格
    translateCanvas({ x, y }) {
      const root = this.zr.painter.storage._roots;
      if (x) {
        const bodyGroup = root.find(g => g.id == "body-group");
        const headerGroup = root.find(g => g.id == "header-group");

        const centerBody = bodyGroup._children.find(
          g => g.id == "body-group-center"
        );
        const centerHeader = headerGroup._children.find(
          g => g.id == "header-group-center"
        );
        centerBody.attr({ x: centerBody.x + x });
        centerHeader.attr({ x: centerHeader.x + x });
      } else {
        const group = root.find(g => g.id == "body-group");
        group.attr({ y });
      }
    },

    // 创建slot 插槽单元格
    createHTMLCell(vnode, { width, height, x, y }) {
      const Com = Vue.extend({
        render() {
          return (
            <div
              class="html-cell"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${x}px`,
                top: `${y}px`,
              }}
              onMouseover={this}
            >
              {vnode}
            </div>
          );
        },
      });
      const htmlCellCom = new Com();
      const htmlCell = htmlCellCom.$mount();
      this.tableCanvasRef.appendChild(htmlCell.$el);
    },
  },
};
