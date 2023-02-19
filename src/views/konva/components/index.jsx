import ZTable from "./zrender-table";
import "./zrender-table.less";
import utils from "./utils";
import config from "./config";
import XScrollbar from "./x-scrollbar";
import YScrollbar from "./y-scrollbar";
// import TableHeader from "./table-header";

export default {
  data() {
    return {
      isShadowBox: false,
      sliceData: [],
    };
  },
  props: {
    columns: Array, // 列
    dataSource: Array, // 数据源
    maxHeight: Number, // 最大高度
    /**
     * 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
     *
     */
    rowStyle: Function,
    /**
     * 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
     *
     */
    cellStyle: Function,
    stripe: Boolean, //是否为斑马纹 table
  },
  watch: {
    dataSource(newV) {
      if (newV.length && !this.isMounted) this._getListByOffsetTop(0);
      else {
        this._getListByOffsetTop(this.scrollY);
      }
    },
  },
  mounted() {
    this.tableCanvas = this.$refs["table-canvas"];
    this.xScrollEle = this.$refs["x-scroll"].$el;
    this.sumWidth = utils.calcWidthByColumns(this.columns);
    this.$nextTick(() => {
      this.isMounted = true;

      this.yScrollEle = this.$refs["y-scroll"].$el;
      this.scrollHeight = this.yScrollEle.scrollHeight;
      console.log(" this.scrollHeight", this.$refs["y-scroll"]);
    });
  },
  render() {
    return (
      <div
        style={{
          position: "relative",
          maxHeight: `${this.maxHeight}px`,
          overflow: "hidden",
        }}
      >
        {/* <TableHeader columns={this.columns}></TableHeader> */}
        <div class="canvas-table-container" onMousewheel={this.onMousewheel}>
          <ZTable
            columns={this.columns}
            dataSource={this.sliceData}
            cellSlot={this.$scopedSlots}
            ref="table-canvas"
          ></ZTable>
          <YScrollbar
            ref="y-scroll"
            height={
              this.dataSource.length * config.rowHeight - config.headerHeight
            }
            onScroll={this.onScrollY}
          ></YScrollbar>
        </div>
        <XScrollbar
          ref="x-scroll"
          width={this.sumWidth}
          onScroll={this.onScrollX}
        ></XScrollbar>
      </div>
    );
  },

  methods: {
    onScrollX(e) {
      this.latestLeft = this.latestLeft ? this.latestLeft : 0;
      let scrollLeft = e.target.scrollLeft;
      const deltaX = this.latestLeft - scrollLeft;
      this.tableCanvas.translateCanvas({ x: deltaX });
      this.latestLeft = scrollLeft;
    },

    onScrollY(e) {
      this.scrollY = e.target.scrollTop;
      this.tableCanvas.translateCanvas({ y: -this.scrollY });
      this._getListByOffsetTop(this.scrollY);
    },

    onMousewheel(e) {
      const { deltaY, wheelDelta } = e;
      this.scrollY = this.scrollY ? this.scrollY : 0;
      this.scrollY = this.scrollY + deltaY;
      if (this.scrollY < 0) this.scrollY = 0;
      if (this.scrollY > this.scrollHeight - 410)
        this.scrollY = this.scrollHeight - 410;
      if (wheelDelta > 0) {
        //向上
        // console.log("滚动方向", "向上", this.scrollY);
      } else {
        // console.log("滚动方向", "向下", this.scrollY);
      }

      this.tableCanvas.translateCanvas({ y: -this.scrollY });
      this.setScroll({ y: this.scrollY });
      this._getListByOffsetTop(this.scrollY);
    },

    _getListByOffsetTop(offsetTop) {
      const startIndex = Math.floor(offsetTop / config.rowHeight);
      this.startIndex = startIndex;
      const count = Math.ceil(this.maxHeight / config.rowHeight);
      const endIndex = startIndex + count;
      // console.log('索引范围',startIndex,endIndex)
      this.sliceData = this.dataSource.slice(startIndex, endIndex);
    },

    setScroll({ x, y }) {
      if (y != undefined) {
        this.yScrollEle.scrollTop = y;
      } else {
        this.xScrollEle.scrollLeft = x;
      }
    },
  },
};
