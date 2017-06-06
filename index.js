const planes = require('./lib/planes');
const channel = require('./lib/channel');

const state = channel.request('state');
const app = new Mn.Application({
  region: '#app',
  board: new planes.Absolute({
    id: 'board',
    template: _.template(require('./lib/board.html')),
    events: {
      'click'(e) {
        channel.trigger('board:click', {
          x: event.offsetX,
          y: event.offsetY,
        });
      },
    }
  }),
  pane: new planes.Static({
    template: _.noop,
    id: 'pane'
  }),
  onStart() {
    const root = new this.options.RootView();
    this.showView(root);
    root.showChildView('pane', this.options.pane);
    root.showChildView('board', this.options.board);

    this.options.pane.fillWindow();
    this.options.pane.centerWithin(this.options.board);
    this.options.board.setBounds(state.xbounds, state.ybounds);

    setInterval(() => {
      if (!state.paused) {
        this.options.board.shift((state.position.x / 60), (state.position.y / 45));
      }
    }, 5);
  },
  RootView: Mn.View.extend({
    regions: {
      'pane': '[data-region="pane"]',
      'board': '[data-region="board"]',
    },
    template: _.template(require('./lib/root-view.html')),
  }),
});

app.start();


$('body').mousemove((e) => {
  channel.trigger('change:state', { key: 'paused', value: false });
  channel.trigger('change:state', {
    key: 'position',
    value: { 
      x: ($('body').width() / 2) -e.pageX, 
      y: ($('body').height() / 2) -e.pageY,
    }
  });
});
