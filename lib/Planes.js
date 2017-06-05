const Plane = Mn.View.extend({
  getOffset() {
    return this.$el.offset();
  },
  getCenterPoint() {
    return {
      x: (this.$el.width() / 2),
      y: (this.$el.height() / 2),
    };
  },
  getBottomRightPoint() {
    return {
      x: this.$el.width(),
      y: this.$el.height(),
    };
  },
  distanceFromCenter(x, y) {
    return {
      x: (this.getCenterPoint().x - x),
      y: (this.getCenterPoint().y - y),
    };
  },
});

const Static = Plane.extend({
  /**
   * make this fillEl()
   */
  fillWindow() {
    this.$el.height($(window).height());
    this.$el.width($(window).width());
  },
  centerWithin(domPlane) {
    domPlane.setPositionX(-(domPlane.getCenterPoint().x - this.getCenterPoint().x));
    domPlane.setPositionY(-(domPlane.getCenterPoint().y - this.getCenterPoint().y));
  },
});

const Absolute = Plane.extend({
  setBounds(x, y) {
    this.useBounds = true;
    this.boundLeft = x;
    this.boundRight = -(this.$el.width() - ($(window).width() - x));
    this.boundTop = -(this.$el.height() - ($(window).height() - y));
    this.boundBottom = y;
  },
  setPositionX(x) {
    this.$el.css({
      left: `${x}px`,
    });
  },
  setPositionY(y) {
    this.$el.css({
      top: `${y}px`,
    });
  },
  shift(distX, distY) {
    const newX = (this.getOffset().left + distX);
    const newY = (this.getOffset().top + distY)

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
  },
});

module.exports = { Static, Absolute };
