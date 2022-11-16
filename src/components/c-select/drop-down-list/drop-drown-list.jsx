import VScroll from "../../virtual-scroll/index";
import "./drop-drown-list.less";

const showCount = 10;
const itemHeight = 30;
export default {
  data() {
    return {
      showItems: [],
      filteredDataSource: [],
    };
  },
  props: {
    dataSource: Array,
  },
  watch: {
    dataSource(newv) {
      if (newv) this.initOptions();
    },
  },
  mounted() {
    this.initOptions();
  },
  render() {
    return (
      <div class="c-dropdown-wrapper">
        <div class="c-select-dropdown-panel" ref="selectdroppanel">
          <VScroll
            dataList={this.filteredDataSource}
            itemHeight={itemHeight}
            showCount={8}
            onVscroll={this.onVscroll}
          >
            <ul class="c-select-dropdown-menu">
              {this.showItems.map(item => {
                return (
                  <li
                    class="c-select-dropdown-menu-item"
                    style={{ height: `${itemHeight}px` }}
                    onMousedown={() => this.itemSelect(item)}
                  >
                    {this.$scopedSlots?.selectOption(item) || item.name}
                  </li>
                );
              })}
            </ul>
          </VScroll>
        </div>
      </div>
    );
  },

  methods: {
    initOptions() {
      this.filteredDataSource = this.dataSource?.slice(0); // clone数据
      this.getShowOptions(0, showCount);
    },

    getShowOptions(startIndex = 0, endIndex = showCount) {
      this.showItems = this.filteredDataSource.slice(startIndex, endIndex);
    },

    onVscroll(startIndex, endIndex) {
      this.getShowOptions(startIndex, endIndex);
    },

    itemSelect(value) {
      this.closeDropdown();
      this.$emit("itemSelect", value);
    },

    closeDropdown() {
      this.$refs.selectdroppanel.style.display = "none";
    },

    filterOptions(indexArr) {
      this.showItems = this.dataSource.filter((_, index) =>
        indexArr.includes(index)
      );
      this.filteredDataSource = this.showItems;
    },
  },
};
