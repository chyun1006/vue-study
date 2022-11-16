import "./index.less";
import Node from "./node/node";
import { getIndexByOffsetHeight, getEndIndex } from "../utils.js";
export default {
  name: "virtual-scroll",
  data() {
    return {
      renderRows: [],
      translateY: 0,
      viewAreaHeight: 500,
    };
  },
  props: {
    height: Number,
    containerHeight: Number,
    dataSource: Array,
  },
  mounted() {
    const endIndex = getEndIndex(0, 0, this.dataSource, this.height);
    // console.log("endIndex", endIndex);
    this._sliceData(0, endIndex);
  },
  render() {
    return (
      <div
        class="scroll-container"
        style={{ height: `${this.height}px` }}
        onScroll={this.onScroll}
      >
                <div style={{position:'relative',top:0,left:0}}>zhiding</div>

        <div
          class="virtual-container"
          style={{ height: `${this.containerHeight}px` }}
        ></div>
        <div
          class="list-container"
          style={{ transform: `translateY(${this.translateY}px)` }}
        >
          {this.renderRows.map((row) => {
            return (
              <div
                class="list-item"
                key={row.id}
                style={{
                  height: `${row.height}px`,
                  width: `${row.width}px`,
                  borderbottom: "1px solid #eee",
                }}
              >
                {row.id}
                <a onClick={() => this.setTop(row)}>置顶</a>
                {row.nodes.map((node) => {
                  return (
                    <Node
                      height={node.height}
                      width={node.width}
                      top={node.top}
                      left={node.left}
                      key={node.id}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  methods: {
    onScroll(e) {
      const { scrollTop } = e.target;
      // console.log(getIndexByOffsetHeight(scrollTop, this.dataSource));
      const { index: startIndex, sumHeight } = getIndexByOffsetHeight(
        scrollTop,
        this.dataSource
      );
      const startItemHeight = this.dataSource[startIndex].height;
      /**
       * 渲染边界处元素的偏移量
       *  = 滚动条的便宜高度 - (从0->开始元素的高度和 - 开始元素的高度)
       *  */
      const renderOffset = scrollTop - (sumHeight - startItemHeight);
      // console.log("renderOffset", renderOffset, startIndex);
      const endIndex = getEndIndex(
        startItemHeight - renderOffset,
        startIndex,
        this.dataSource,
        this.height
      );
      console.log("startindex,endIndex", startIndex, endIndex);
      this._sliceData(startIndex, endIndex);
      this.translateY = scrollTop - renderOffset;
    },

    _sliceData(startIndex, endIndex) {
      this.renderRows = this.dataSource.slice(startIndex, endIndex + 1);
    },

    setTop(e) {
      console.log(e);
    },
  },
};
