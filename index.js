const DomPlane = require('./lib/Planes');

const board = new DomPlane.Absolute($('#app'));
const body = new DomPlane.Static($('body'));

board.$el.click((event) => {
  console.log({ x: event.offsetX, y: event.offsetY });
});

body.fillWindow();
body.centerWithin(board);
board.setBounds(100, 100);

let position = body.centerPoint;
let started = false;

setInterval(() => {
  if (started) {
    board.shift((position.x / 60), (position.y / 45));
  }
}, 5);

body.$el.mousemove((event) => {
  started = true;
  position = body.distanceFromCenter(event.pageX, event.pageY);
});

