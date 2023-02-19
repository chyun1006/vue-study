import { Rect } from "zrender/dist/zrender";
import config from "../config";
function createDivider({ x, id, preCell, nextCell }, callback) {
  const divider = new Rect({
    zlevel: 100,
    id,
    style: {
      fill: "red",
    },
    shape: {
      x: x - 2,
      y: config.headerHeight / 3,
      width: 2,
      height: config.headerHeight / 3,
    },
  });
  divider.preCell = preCell;
  divider.nextCell = nextCell;
  divider.on("mouseover", () => {
    this.origin = Object.assign({}, divider.shape);
    divider.attr({
      cursor: "col-resize",
      shape: {
        x: this.origin.x - 2,
        width: this.origin.width + 4,
      },
    });
  });

  divider.on("mouseout", () => {
    divider.attr({
      shape: {
        x: this.origin.x,
        width: this.origin.width,
      },
    });
  });

  divider.on("mousedown", event => {
    const start = divider.shape.x;
    const startX = event.event.screenX;
    document.addEventListener("mousemove", mousemove);
    document.onmouseup = () => {
      document.removeEventListener("mousemove", mousemove);
    };
    const oldPreWidth = preCell.shape.width;
    const oldPreX = preCell.shape.x;

    const oldNextWidth = nextCell.shape.width;
    const oldNextX = nextCell.shape.x;

    function mousemove(e) {
      const diff = e.screenX - startX;
      const newX = start + diff;
      divider.attr({
        shape: {
          x: newX,
        },
      });

      callback.call(
        divider,
        { oldPreWidth, oldPreX },
        { oldNextWidth, oldNextX },
        diff
      );
    }
  });
  return divider;
}

export default createDivider;
