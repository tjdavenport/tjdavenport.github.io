const DomPlane = require('./lib/Planes');
const channel = require('./lib/channel');

const state = channel.request('state');
const board = new DomPlane.Absolute($('#app'), (event) => {
  channel.trigger('board:click', {
    x: event.offsetX,
    y: event.offsetY,
  });
});
const body = new DomPlane.Static($('body'));


body.fillWindow();
body.centerWithin(board);
board.setBounds(state.xbounds, state.ybounds);

let position = body.centerPoint;
let started = false;

setInterval(() => {
  if (!state.paused) {
    board.shift((state.position.x / 60), (state.position.y / 45));
  }
}, 5);

body.$el.mousemove((event) => {
  channel.trigger('change:state', { key: 'paused', value: false });
  channel.trigger('change:state', {
    key: 'position',
    value: body.distanceFromCenter(event.pageX, event.pageY),
  });
});

