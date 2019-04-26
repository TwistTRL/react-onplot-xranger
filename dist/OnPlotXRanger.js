"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plotUtils = require("plot-utils");

var _DragOverlay = require("./DragOverlay");

var _DragOverlay2 = _interopRequireDefault(_DragOverlay);

require("./OnPlotXRanger.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Components

// CSS


var SIDE_HANDLE_WIDTH = 7;
var TOP_HANDLE_HEIGHT = 7;

var OnPlotXRanger = function (_PureComponent) {
  _inherits(OnPlotXRanger, _PureComponent);

  function OnPlotXRanger(props) {
    _classCallCheck(this, OnPlotXRanger);

    var _this = _possibleConstructorReturn(this, (OnPlotXRanger.__proto__ || Object.getPrototypeOf(OnPlotXRanger)).call(this, props));

    _this.handleLeftHandleDragStart = function (ev) {
      _this.handleDragStart(ev);
      _this.setState({ dragged: "left" });
    };

    _this.handleRightHandleDragStart = function (ev) {
      _this.handleDragStart(ev);
      _this.setState({ dragged: "right" });
    };

    _this.handleMainHandleDragStart = function (ev) {
      _this.handleDragStart(ev);
      _this.setState({ dragged: "main" });
    };

    _this.handleLeftHandleDragging = function (ev) {
      var _this$snapshot = _this.snapshot,
          startX = _this$snapshot.startX,
          endX = _this$snapshot.endX,
          minX = _this$snapshot.minX,
          initialDragX = _this$snapshot.initialDragX;
      var updateStartXHandler = _this.props.updateStartXHandler;

      var curDragX = _this.handleDragging(ev);
      var newStartX = curDragX - initialDragX + startX;
      newStartX = _this.snapStartX(newStartX, minX, endX);
      updateStartXHandler(newStartX);
    };

    _this.handleRightHandleDragging = function (ev) {
      var _this$snapshot2 = _this.snapshot,
          startX = _this$snapshot2.startX,
          endX = _this$snapshot2.endX,
          maxX = _this$snapshot2.maxX,
          initialDragX = _this$snapshot2.initialDragX;
      var updateEndXHandler = _this.props.updateEndXHandler;

      var curDragX = _this.handleDragging(ev);
      var newEndX = curDragX - initialDragX + endX;
      newEndX = _this.snapEndX(newEndX, startX, maxX);
      updateEndXHandler(newEndX);
    };

    _this.handleMainHandleDragging = function (ev) {
      var _this$snapshot3 = _this.snapshot,
          startX = _this$snapshot3.startX,
          endX = _this$snapshot3.endX,
          minX = _this$snapshot3.minX,
          maxX = _this$snapshot3.maxX,
          initialDragX = _this$snapshot3.initialDragX;
      var _this$props = _this.props,
          updateStartXHandler = _this$props.updateStartXHandler,
          updateEndXHandler = _this$props.updateEndXHandler;

      var curDragX = _this.handleDragging(ev);
      var deltaX = curDragX - initialDragX;
      deltaX = Math.max(Math.min(deltaX, maxX - endX), minX - startX);
      updateStartXHandler(startX + deltaX);
      updateEndXHandler(endX + deltaX);
    };

    _this.handleDragEndAsClick = function (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      _this.setState({ dragged: null });
      // If it is a click, flip range
      if (ev.timeStamp - _this.lastClickTimeStamp < 100) {
        var _this$props2 = _this.props,
            updateMinXHandler = _this$props2.updateMinXHandler,
            updateMaxXHandler = _this$props2.updateMaxXHandler,
            startX = _this$props2.startX,
            endX = _this$props2.endX,
            minX = _this$props2.minX,
            maxX = _this$props2.maxX,
            globalMinX = _this$props2.globalMinX,
            globalMaxX = _this$props2.globalMaxX;

        if (startX === minX && endX === maxX) {
          updateMinXHandler(globalMinX);
          updateMaxXHandler(globalMaxX);
        } else {
          updateMinXHandler(startX);
          updateMaxXHandler(endX);
        }
      }
    };

    _this.ref = _react2.default.createRef();
    _this.state = { dragged: null };
    _this.lastClickTimeStamp = null;
    _this.snapshot = {};
    return _this;
  }

  _createClass(OnPlotXRanger, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          minX = _props.minX,
          maxX = _props.maxX,
          width = _props.width,
          height = _props.height,
          startX = _props.startX,
          endX = _props.endX,
          topHandle = _props.topHandle;
      var dragged = this.state.dragged;
      // Calculate positions

      var x0 = void 0,
          x1 = void 0;
      x0 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, startX);
      x1 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, endX);
      // Create elements
      var leftHandleElem = null;
      var rightHandleElem = null;
      var mainHandleElem = null;
      var documentInteractionElem = null;
      var top = topHandle ? TOP_HANDLE_HEIGHT : 0;
      // Left handle
      if (x0 >= 0 && x0 <= width) {
        leftHandleElem = _react2.default.createElement("div", { style: { position: "absolute",
            left: x0,
            top: top,
            width: SIDE_HANDLE_WIDTH,
            height: height - top },
          className: "leftHandle",
          onMouseDown: this.handleLeftHandleDragStart
        });
      }
      if (x1 >= 0 && x1 <= width) {
        rightHandleElem = _react2.default.createElement("div", { style: { position: "absolute",
            left: x1,
            marginLeft: -SIDE_HANDLE_WIDTH,
            top: top,
            width: SIDE_HANDLE_WIDTH,
            height: height - top },
          className: "rightHandle",
          onMouseDown: this.handleRightHandleDragStart
        });
      }
      var mainLeft = Math.min(x0, x1 - SIDE_HANDLE_WIDTH);
      var mainRight = Math.max(x1, x0 + SIDE_HANDLE_WIDTH);
      var mainWidth = mainRight - mainLeft;
      if (!(x0 > width || 0 > x1)) {
        mainHandleElem = _react2.default.createElement("div", { style: { position: "absolute",
            left: mainLeft,
            top: 0,
            width: mainWidth,
            height: height },
          className: "mainHandle",
          onMouseDown: this.handleMainHandleDragStart
        });
      }

      switch (dragged) {
        case "left":
          documentInteractionElem = _react2.default.createElement(_DragOverlay2.default, { mouseMoveHandler: this.handleLeftHandleDragging, mouseUpHandler: this.handleDragEndAsClick, cursor: "w-resize" });
          break;
        case "right":
          documentInteractionElem = _react2.default.createElement(_DragOverlay2.default, { mouseMoveHandler: this.handleRightHandleDragging, mouseUpHandler: this.handleDragEndAsClick, cursor: "e-resize" });
          break;
        case "main":
          documentInteractionElem = _react2.default.createElement(_DragOverlay2.default, { mouseMoveHandler: this.handleMainHandleDragging, mouseUpHandler: this.handleDragEndAsClick, cursor: "ew-resize" });
          break;
        default:
          break;
      }

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { ref: this.ref, style: { overflow: "hidden", position: "relative", height: height, width: width, top: 0, left: 0 } },
          mainHandleElem,
          leftHandleElem,
          rightHandleElem
        ),
        documentInteractionElem
      );
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.lastClickTimeStamp = ev.timeStamp;
      var _props2 = this.props,
          width = _props2.width,
          minX = _props2.minX,
          maxX = _props2.maxX,
          startX = _props2.startX,
          endX = _props2.endX;
      var snapshot = this.snapshot;

      var referenceFrame = this.ref.current.getBoundingClientRect();
      snapshot.referenceFrame = referenceFrame;
      snapshot.width = width;
      snapshot.minX = minX;
      snapshot.maxX = maxX;
      snapshot.startX = startX;
      snapshot.endX = endX;
      snapshot.initialDragX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, ev.clientX - referenceFrame.left);
    }
  }, {
    key: "handleDragging",
    value: function handleDragging(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var snapshot = this.snapshot;
      var width = snapshot.width,
          minX = snapshot.minX,
          maxX = snapshot.maxX,
          referenceFrame = snapshot.referenceFrame;

      var curDragX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, ev.clientX - referenceFrame.left);
      return curDragX;
    }
  }, {
    key: "snapStartX",
    value: function snapStartX(newStartX, minX, endX) {
      var snap = this.props.snap;

      newStartX = Math.max(Math.min(newStartX, endX), minX);
      var snappedStartX = Math.round(newStartX / snap) * snap;
      if (snappedStartX >= endX) {
        snappedStartX = snappedStartX - snap;
      }
      if (snappedStartX <= minX) {
        snappedStartX = snappedStartX + snap;
      }
      var d0 = Math.abs(newStartX - minX);
      var d1 = Math.abs(snappedStartX - newStartX);
      var d2 = Math.abs(newStartX - (endX - snap));
      var minDist = Math.min(d0, d1, d2);
      if (d0 === minDist) {
        return minX;
      }
      if (d1 === minDist) {
        return snappedStartX;
      }
      if (d2 === minDist) {
        return endX - snap;
      }
      return snappedStartX;
    }
  }, {
    key: "snapEndX",
    value: function snapEndX(newEndX, startX, maxX) {
      var snap = this.props.snap;

      newEndX = Math.max(Math.min(newEndX, maxX), startX);
      var snappedEndX = Math.round(newEndX / snap) * snap;
      if (snappedEndX >= maxX) {
        snappedEndX = snappedEndX - snap;
      }
      if (snappedEndX <= startX) {
        snappedEndX = snappedEndX + snap;
      }
      var d0 = Math.abs(newEndX - (startX + snap));
      var d1 = Math.abs(snappedEndX - newEndX);
      var d2 = Math.abs(newEndX - maxX);
      var minDist = Math.min(d0, d1, d2);
      if (d0 === minDist) {
        return startX + snap;
      }
      if (d1 === minDist) {
        return snappedEndX;
      }
      if (d2 === minDist) {
        return maxX;
      }
      return snappedEndX;
    }
  }]);

  return OnPlotXRanger;
}(_react.PureComponent);

OnPlotXRanger.propTypes = {
  globalMinX: _propTypes2.default.number.isRequired,
  globalMaxX: _propTypes2.default.number.isRequired,
  minX: _propTypes2.default.number.isRequired,
  maxX: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  startX: _propTypes2.default.number.isRequired,
  endX: _propTypes2.default.number.isRequired,
  snap: _propTypes2.default.number.isRequired,
  topHandle: _propTypes2.default.bool.isRequired,
  updateStartXHandler: _propTypes2.default.func.isRequired,
  updateEndXHandler: _propTypes2.default.func.isRequired,
  updateMinXHandler: _propTypes2.default.func.isRequired,
  updateMaxXHandler: _propTypes2.default.func.isRequired
};

exports.default = OnPlotXRanger;