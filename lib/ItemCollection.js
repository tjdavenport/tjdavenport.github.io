const ItemCollection = Backbone.Collection.extend({
  url: 'https://igapi.ga/tjdavenport2/media/',
  parse(response) {
    return response.items;
  },
  sync(method, collection, options) {
    return Backbone.sync(method, collection, _.extend(options, {
      dataType: 'jsonp',
    }));
  },
});

module.exports = ItemCollection;
