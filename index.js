const planes = require('./lib/planes');
const channel = require('./lib/channel');

const state = channel.request('state');
const board = new planes.Absolute({
  el: '#app',
  events: {
    'click'(e) {
      channel.trigger('board:click', {
        x: event.offsetX,
        y: event.offsetY,
      });
    },
  }
});
const body = new planes.Static({
  el: 'body',
});


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

