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
  get bottomRightPoint() {
    return {
      x: this.$el.width(),
      y: this.$el.height(),
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
    domPlane.setPositionX(-(domPlane.centerPoint.x - this.centerPoint.x));
    domPlane.setPositionY(-(domPlane.centerPoint.y - this.centerPoint.y));
  } 
}

class AbsoluteDomPlane extends DomPlane {
  setBounds(x, y) {
    this.useBounds = true;
    this.boundLeft = x;
    this.boundRight = -(this.$el.width() - ($(window).width() - x));
    this.boundTop = -(this.$el.height() - ($(window).height() - y));
    this.boundBottom = y;
  }
  setPositionX(x) {
    this.$el.css({
      left: `${x}px`,
    });
  }
  setPositionY(y) {
    this.$el.css({
      top: `${y}px`,
    });
  }
  shift(distX, distY) {
    const newX = (this.offset.left + distX);
    const newY = (this.offset.top + distY)

    if (this.useBounds) {
      if ((newX <= this.boundLeft) && (newX >= this.boundRight)) {
        this.setPositionX(newX);
      }
      if ((newY <= this.boundBottom) && (newY >= this.boundTop)) {
        this.setPositionY(newY);
      }
    } else {
      this.setPositionX(newX);
      this.setPositionY(newY);
    }
  }
}

const board = new AbsoluteDomPlane($('#app'));
const body = new StaticDomPlane($('body'));

body.fillWindow();
body.centerWithin(board);
board.setBounds(200, 200);

let position = body.centerPoint;
let started = false;

setInterval(() => {
  if (started) {
    board.shift((position.x / 60), (position.y / 45));
  }
}, 5);

body.$el.mousemove((event) => {
  started = true;
  position = body.distanceFromCenter(event.pageX, event.pageY);
});

//board.$el.mouseleave(() => { started = false });
