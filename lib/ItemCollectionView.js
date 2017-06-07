const Item = Mn.View.extend({
  template: _.template(require('./item.html')),
  attributes: {
    style: 'float:left;margin-left:10px;margin-top:10px;',
  },
});

const ItemCollectionView = Mn.CollectionView.extend({
  childView: Item,
  url: 'https://instagram.com/tjdavenport2/media',
});

module.exports = ItemCollectionView;
