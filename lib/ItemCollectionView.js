const Item = Mn.View.extend({
  template: _.template(require('./item.html')),
});

const ItemCollectionView = Mn.CollectionView.extend({
  childView: Item,
  url: 'https://instagram.com/tjdavenport2/media',
});

module.exports = ItemCollectionView;
