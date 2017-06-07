const planes = require('./lib/planes');
const channel = require('./lib/channel');
const ItemCollection = require('./lib/ItemCollection');
const ItemCollectionView = require('./lib/ItemCollectionView');

const state = channel.request('state');

const board = new planes.Absolute({
  id: 'board',
  template: _.template(require('./lib/board.html')),
  regions: {
    'items': '[data-region="items"]',
  },
  events: {
    'click'(e) {
      channel.trigger('board:click', {
        x: event.offsetX,
        y: event.offsetY,
      });
    },
  },
  onRender() {
    const items = new ItemCollection();
    const itemsView = new ItemCollectionView({
      collection: items,
    });

    items.fetch().then(() => {
      this.showChildView('items', itemsView);
    });
  },
});

const RootView = Mn.View.extend({
  regions: {
    'pane': '[data-region="pane"]',
    'board': '[data-region="board"]',
  },
  template: _.template(require('./lib/root-view.html')),
});

const pane = new planes.Static({
  template: _.noop,
  id: 'pane'
});

const app = new Mn.Application({
  region: '#app',
  onStart() {
    const root = new RootView();
    this.showView(root);
    root.showChildView('pane', pane);
    root.showChildView('board', board);

    pane.fillWindow();
    pane.centerWithin(board);
    board.setBounds(state.xbounds, state.ybounds);

    setInterval(() => {
      if (!state.paused) {
        board.shift((state.position.x / 60), (state.position.y / 45));
      }
    }, 5);
  },
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
