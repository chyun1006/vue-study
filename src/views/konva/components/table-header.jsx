import config from "./config";

export default {
  props: {
    columns: Array,
  },
  render() {
    return (
      <div class="fixed-header">
        {this.columns.map(col => {
          return (
            <div
              class="header-table-cell"
              style={{
                height: `${config.headerHeight}px`,
                width: `${col.width || config.cellWidth}px`,
                backgroundColor: config.headerBackground,
              }}
            >
              {col.title}
            </div>
          );
        })}
      </div>
    );
  },
};
