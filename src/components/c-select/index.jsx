import Vue from "vue";
import DwopdownList from "./drop-down-list/drop-drown-list";
import "./style.less";

export default {
  data() {
    return {
      value: "",
      selectData: null,
      dropDownOptions: [],
      innerPlaceholder: this.placeholder,
    };
  },
  props: {
    options: Array, // 数据源
    // 选中值取哪个属性
    valueProp: {
      type: String,
      default: "id",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 多选还是单选
    mode: String,
    // replaceField: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       id: "id",
    //       text: "text",
    //     };
    //   },
    // },
    // 是否可搜索
    showSearch: Boolean,
    // 过滤函数
    filterOption: [Boolean, Function],
  },
  model: {
    value: "value",
    event: "select",
  },
  watch: {
    options(value) {
      if (value.length) {
        this.initOptions();
      }
    },
  },
  render() {
    return (
      <div
        class="c-select-wrapper"
        ref="searchwrapper"
        onMousedown={this.onFocus}
      >
        <div class="show-selected-container" ref="showselctedcontainer">
          {this.selectData
            ? this.$scopedSlots?.selectOption(this.selectData)
            : ""}
        </div>
        <input
          type="text"
          ref="searchInput"
          class="my-input"
          placeholder={this.innerPlaceholder}
          readonly={this.readonly}
          onInput={this.onInput}
          onBlur={this.onBlur}
        />
      </div>
    );
  },

  mounted() {
    this.initOptions();
  },

  methods: {
    initOptions() {
      this._cloneOptions = JSON.parse(JSON.stringify(this.options));
      this._createVNode(this.options);
      this.dropDownOptions = this.options;
    },
    _mountPanel() {
      let self = this;
      const panelExtend = Vue.extend({
        render(h) {
          return h(DwopdownList, {
            props: {
              dataSource: self.dropDownOptions,
            },
            on: {
              itemSelect: self.itemSelect,
            },
            scopedSlots: {
              selectOption: item => self.$scopedSlots?.selectOption(item),
            },
          });
        },
      });

      this.dropdownComponent = new panelExtend();
      this.panelEl = this.dropdownComponent.$mount();
      document.body.appendChild(this.panelEl.$el);
      this._calcPanelWidth();
      this._isPanelMounted = true;
    },

    itemSelect(data) {
      this.selectData = data;
      this.$emit("select", data[this.valueProp], data);
      this._setInputPlaceHolderOpacity(1);
      this.innerPlaceholder = "";
      this.$refs.searchInput.value = "";
      this.dropdownComponent.$children[0].initOptions();
    },

    _calcPanelWidth() {
      const searchInputEle = this.$refs.searchwrapper;
      const { offsetLeft, offsetTop, offsetWidth } = searchInputEle;

      this.panelEl.$el.children[0].setAttribute(
        "style",
        `left: ${offsetLeft}px; top: ${
          offsetTop + 36
        }px; width: ${offsetWidth}px`
      );
    },

    _setInputPlaceHolderOpacity(opacity) {
      this.$refs.showselctedcontainer.setAttribute(
        "style",
        `opacity: ${opacity}`
      );
    },

    _setInputFocus() {
      this.$refs.searchInput.focus();
    },

    onBlur() {
      this._setInputPlaceHolderOpacity(1);
      this.dropdownComponent.$children[0].closeDropdown();
    },

    onFocus() {
      console.log("onMouseDown");
      if (this.selectData) {
        this._setInputPlaceHolderOpacity(0.3);
        this._setInputFocus();
        this.innerPlaceholder = "";
      }

      if (this._isPanelMounted) {
        this._calcPanelWidth();
        return;
      }
      this._mountPanel();
    },

    onInput(e) {
      const keyword = e.target.value;
      this._setInputPlaceHolderOpacity(0);
      if (keyword) {
        const indexArr = this._filterOptionsByKeyword(keyword);
        this.dropdownComponent.$children[0].filterOptions(indexArr);
      } else {
        this.dropdownComponent.$children[0].initOptions();
      }
    },

    _createVNode(options) {
      this.optionVNodes = options.map(item => {
        return this.$scopedSlots.selectOption(item);
      });
    },

    _closeDropdown() {},

    _filterOptionsByKeyword(keyword) {
      let indexArr = [];
      this.optionVNodes.forEach((value, index) => {
        if (this.filterOption(keyword, value)) indexArr.push(index);
      });
      return indexArr;
    },
  },
};
