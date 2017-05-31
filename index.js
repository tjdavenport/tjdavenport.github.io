class DomPlane {
  constructor($el) {
    this.$el = $el;
  }
  get offset() {
    return this.$el.offset();
  }
  get centerPoint() {
    return {
      x: (this.$el.width() / 2),
      y: (this.$el.height() / 2),
    };
  }
  distanceFromCenter(x, y) {
    return {
      x: (this.centerPoint.x - x),
      y: (this.centerPoint.y - y),
    };
  }
}

class StaticDomPlane extends DomPlane {
  fillWindow() {
    this.$el.height($(window).height());
    this.$el.width($(window).width());
  }
  centerWithin(domPlane) {
    domPlane.setPosition(
      -(domPlane.centerPoint.x - this.centerPoint.x),
      -(domPlane.centerPoint.y - this.centerPoint.y)
    );
  } 
}

class AbsoluteDomPlane extends DomPlane {
  setPosition(x, y) {
    this.$el.css({
      left: `${x}px`,
      top: `${y}px`,
    });
  }
  shift(distX, distY) {
    this.setPosition(
      (this.offset.left + distX),
      (this.offset.top + distY)
    );
  }
}

const board = new AbsoluteDomPlane($('#app'));
const body = new StaticDomPlane($('body'));

body.fillWindow();
body.centerWithin(board);

body.$el.mousemove((event) => {
  const distance = body.distanceFromCenter(event.pageX, event.pageY);
  board.shift((distance.x / 15), (distance.y / 15));
});
