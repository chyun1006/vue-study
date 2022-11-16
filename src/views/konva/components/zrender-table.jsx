import { init, Rect, Text, Group } from "zrender/dist/zrender";
import Vue from "vue";
import utils from "./utils";
import "./zrender-table.less";

const cellFillBg = "#fafafa";
const minWidth = 50;

export default {
  props: {
    columns: Array,
    dataSource: Array,
  },
  mounted() {
    this.container = this.$refs["table-canvas"];
    this.zr = init(this.container, {
      width: 1000,
      height: 800,
    });
    console.log(this.zr);
    this._paintHeader();
    this._paintBody();
  },
  render() {
    const fixedColumn = utils.hasFixedCloumn(this.columns);
    console.log('fixedColumn',fixedColumn)
    return (
      <div class="canvas-table-container">
        <div class="table-canvas" ref="table-canvas"></div>
        <div class="left-fixed-column" ref="left-fixed-column-canvas"></div>
        <div class="right-fixed-column" ref="right-fixed-column-canvas"></div>
      </div>
    );
  },
  methods: {
    _paintHeader() {
      let startX = 0;
      this.columns.map(col => {
        const text = new Text({
          style: {
            text: col.title,
            fill: "#000",
            fontSize: 13,
            textAlign: "left",
          },
        });
        const cell = new Rect({
          style: {
            fill: cellFillBg,
          },
          textContent: text,
          shape: {
            x: startX,
            y: 0,
            width: col.width || minWidth,
            height: 50,
          },
          textConfig: {
            // position: "inside",
            position: "insideLeft",
          },
        });
        this.zr.add(cell);
        startX += col.width || minWidth;
      });
    },

    _paintBody() {
      console.log("---", this.$scopedSlots);
      let startY = 50;
      this.dataSource.forEach(item => {
        let startX = 0;
        const rowGroup = new Group();
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
                fill: cellFillBg,
              },
            });
          });
        });
        this.columns.forEach(col => {
          const content = item[col.dataIndex];
          const slot = this.$scopedSlots[col.dataIndex];

          console.log("slot", slot);
          const cell = new Rect({
            style: {
              fill: "#FFF",
            },
            textContent: new Text({
              style: {
                text: slot ? "" : content,
                fontSize: 12,
              },
            }),
            shape: {
              x: startX,
              y: startY,
              width: col.width || minWidth,
              height: 50,
            },
            textConfig: {
              position: "insideLeft",
            },
          });
          if (slot) {
            const vnode = slot({ text: content, record: item });
            this.createHTMLCell(vnode, {
              width: col.width || minWidth,
              height: 50,
              x: startX,
              y: startY,
            });
          }
          rowGroup.add(cell);
          startX += col.width || minWidth;
          this.zr.add(rowGroup);
        });
        startY = startY + 50;
      });
    },

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
      this.container.appendChild(htmlCell.$el);
    },
  },
};
