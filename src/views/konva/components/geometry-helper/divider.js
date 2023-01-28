import { Rect } from "zrender/dist/zrender";
import config from "../config";
function createDivider({ x, id,cell },callback) {
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
    document.onmouseup =  ()=> {
      document.removeEventListener("mousemove", mousemove);
    };

    function mousemove(e) {
      const diff = e.screenX - startX;
      const newX = start + diff
      divider.attr({
        shape: {
          x: newX,
        },
      });
      const oldW  = cell.shape.width
      const newW  = oldW + diff
      callback(oldW,newW,diff)
    }
  });
  return divider;
}

export default createDivider;
