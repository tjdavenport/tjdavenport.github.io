const Pin = Mn.View.extend({

});

const PinCollection = Mn.CollectionView.extend({
  childView: Pin,
});

module.exports = PinCollection;
