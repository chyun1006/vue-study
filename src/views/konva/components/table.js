import Konva from "konva";
const minWidth = 80;
export default {
  props: {
    columns: Array,
    dataSource: Array,
  },
  mounted() {
    const container = this.$refs["table-container"];
    this.stage = new Konva.Stage({
      container: container,
      width: 500,
      height: 500,
    });
    this.layer = new Konva.Layer();

    this._paintHeader();
    this._paintTableBody();
  },
  render() {
    return <div ref="table-container"></div>;
  },
  methods: {
    _paintHeader() {
      console.log("---", this.columns);
      let statrX = 0;
      this.columns.map(col => {
        const rect = new Konva.Rect({
          x: statrX,
          y: 0,
          width: col.width || minWidth,
          height: 50,
          fill: "#eee",
          // stroke: 'black',
          // strokeWidth: 5
        });

        const text = new Konva.Text({
          x: statrX,
          y: 20,
          text: col.title,
        });
        statrX += col.width || minWidth;
        this.layer.add(rect);
        this.layer.add(text);
      });
      this.stage.add(this.layer);
    },

    _paintTableBody() {
      let startY = 50;
      // let self = this;
      this.dataSource.forEach((item, index) => {
        let statrX = 0;
        const row = new Konva.Group({
          x: 0,
          y: startY,
          height: 50,
          width: 500,
          name: `row-${index}`,
          // fill:'red'
        });

        row.on("mouseover", function () {
          console.log("gropp", this);
          // this.children.forEach(cell => {
          //   cell.fill("#eee");
          // });
          // self.layer.draw();
        });

        this.columns.forEach(col => {
          const cell = new Konva.Rect({
            x: statrX,
            y: startY,
            width: col.width || minWidth,
            height: 50,
          });

          const content = item[col.dataIndex];
          const cellContent = new Konva.Text({
            x: statrX,
            y: 0,
            text: content,
          });
          // cell.textxxx = content;
          statrX += col.width || minWidth;
          row.add(cell);
          row.add(cellContent);
        });
        this.layer.add(row);
        startY += 50;
      });

      this.stage.add(this.layer);
    },
  },
};
