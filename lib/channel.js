const tjdavenport = Backbone.Radio.channel('tjdavenport');
const state = {
  paused: true,
  speed: { x: 60, y: 45 },
  position: { x: 0, y: 0 },
  ybounds: 100,
  xbounds: 100,
};

tjdavenport.on('change:state', (opts) => {
  tjdavenport.trigger(`change:state:${opts.key}`, opts.value);
  state[opts.key] = opts.value;
});
tjdavenport.reply('state', state);

module.exports = tjdavenport;
