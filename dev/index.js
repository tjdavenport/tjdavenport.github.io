const planes = require('../lib/planes');
const channel = require('../lib/channel');
const ItemCollection = require('../lib/ItemCollection');
const ItemCollectionView = require('../lib/ItemCollectionView');

const state = channel.request('state');
const items = new ItemCollection();

let shiftX = -0.25;
let shiftY = -0.25;
let multi = 1;

const board = new planes.Absolute({
  id: 'board',
  template: _.template(require('../lib/board.html')),
  regions: {
    'items': '[data-region="items"]',
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
  template: _.template(require('../lib/root-view.html')),
});

const pane = new planes.Static({
  events: {
    'click [data-action="multi"]'(e) {
      multi += 9;
      $(e.target).text(multi + 'x');

      if (multi > 40) {
        $(e.target).text('???');
      }
    }
  },
  template: _.template(require('../lib/pane.html')),
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
    board.setBounds(state.xbounds, state.ybounds);

    board.on('touch-top', () => {
      shiftY = -0.25;
    });

    board.on('touch-right', () => {
      shiftX = 0.25;
    });

    board.on('touch-bottom', () => {
      shiftY = 0.25;
    });

    board.on('touch-left', () => {
      shiftX = -0.25;
    });

    setInterval(() => {
      if (!state.paused) {
        board.shift((shiftX * multi), (shiftY * multi));
      }
    }, 5);
  },
});

items.fetch().then(() => {
  app.start();
});

$('html, body').on('touchmove', (e) => { 
   e.preventDefault(); 
});
