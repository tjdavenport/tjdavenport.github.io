const planes = require('./lib/planes');
const channel = require('./lib/channel');
const ItemCollection = require('./lib/ItemCollection');
const ItemCollectionView = require('./lib/ItemCollectionView');

const state = channel.request('state');
const items = new ItemCollection();

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
    const itemsView = new ItemCollectionView({
      collection: items,
    });

    this.showChildView('items', itemsView);
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
  template: _.template(require('./lib/pane.html')),
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
    //pane.centerWithin(board);
    board.setBounds(state.xbounds, state.ybounds);

    setInterval(() => {
      if (!state.paused) {
        board.shift(-0.25, -0.25);
      }
    }, 5);
  },
});

items.fetch().then(() => {
  app.start();
});

