"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _plotUtils = require("plot-utils");

var _DragOverlay = _interopRequireDefault(require("./DragOverlay"));

require("./OnPlotXRanger.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SIDE_HANDLE_WIDTH = 7;
var SIDE_HANDLE_HEIGHT = 50;

var OnPlotXRanger =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OnPlotXRanger, _PureComponent);

  function OnPlotXRanger(props) {
    var _this;

    _classCallCheck(this, OnPlotXRanger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OnPlotXRanger).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleLeftHandleDragStart", function (ev) {
      _this.handleDragStart(ev);

      _this.setState({
        dragged: "left"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightHandleDragStart", function (ev) {
      _this.handleDragStart(ev);

      _this.setState({
        dragged: "right"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMainHandleDragStart", function (ev) {
      _this.handleDragStart(ev);

      _this.setState({
        dragged: "main"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeftHandleDragging", function (ev) {
      var initialDragX = _this.snapshot.initialDragX;
      var _this$props = _this.props,
          updateStartXHandler = _this$props.updateStartXHandler,
          startX = _this$props.startX,
          endX = _this$props.endX,
          minX = _this$props.minX,
          maxX = _this$props.maxX;

      var curDragX = _this.handleDragging(ev);

      var newStartX = curDragX - initialDragX + startX;
      newStartX = _this.snapStartX(newStartX, minX, endX);
      updateStartXHandler(newStartX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightHandleDragging", function (ev) {
      var _this$snapshot = _this.snapshot,
          startX = _this$snapshot.startX,
          endX = _this$snapshot.endX,
          maxX = _this$snapshot.maxX,
          initialDragX = _this$snapshot.initialDragX;
      var updateEndXHandler = _this.props.updateEndXHandler;

      var curDragX = _this.handleDragging(ev);

      var newEndX = curDragX - initialDragX + endX;
      newEndX = _this.snapEndX(newEndX, startX, maxX);
      updateEndXHandler(newEndX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMainHandleDragging", function (ev) {
      var _this$snapshot2 = _this.snapshot,
          startX = _this$snapshot2.startX,
          endX = _this$snapshot2.endX,
          minX = _this$snapshot2.minX,
          maxX = _this$snapshot2.maxX,
          initialDragX = _this$snapshot2.initialDragX;
      var _this$props2 = _this.props,
          updateStartXHandler = _this$props2.updateStartXHandler,
          updateEndXHandler = _this$props2.updateEndXHandler;

      var curDragX = _this.handleDragging(ev);

      var deltaX = curDragX - initialDragX;
      deltaX = Math.max(Math.min(deltaX, maxX - endX), minX - startX);
      updateStartXHandler(startX + deltaX);
      updateEndXHandler(endX + deltaX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      _this.setState({
        dragged: null
      }); // If it is a click, flip range


      if (ev.timeStamp - _this.lastClickTimeStamp < 100) {
        var clickHandler = _this.props.clickHandler;
        clickHandler();
      } // If it is not a click, update report drag end
      else {
          var _this$props3 = _this.props,
              updateHandler = _this$props3.updateHandler,
              startX = _this$props3.startX,
              endX = _this$props3.endX;
          updateHandler(startX, endX);
        }
    });

    _this.ref = _react.default.createRef();
    _this.state = {
      dragged: null
    };
    _this.lastClickTimeStamp = null;
    _this.snapshot = {};
    return _this;
  }

  _createClass(OnPlotXRanger, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          minX = _this$props4.minX,
          maxX = _this$props4.maxX,
          width = _this$props4.width,
          height = _this$props4.height,
          startX = _this$props4.startX,
          endX = _this$props4.endX,
          showHandle = _this$props4.showHandle;
      var dragged = this.state.dragged; // Calculate positions

      var x0, x1;
      x0 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, startX);
      x1 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, endX); // Create elements

      var leftHandleElem = null;
      var rightHandleElem = null;
      var mainHandleElem = null;
      var documentInteractionElem = null; // Left handle

      if (x0 >= 0 && x0 <= width) {
        leftHandleElem = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x0 - SIDE_HANDLE_WIDTH / 2,
            top: (height - SIDE_HANDLE_HEIGHT) / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT,
            zIndex: 99
          },
          className: "leftHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }), _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x0,
            top: height / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT / 2,
            zIndex: 100
          },
          className: "leftHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }), _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x0,
            top: height / 2 - SIDE_HANDLE_HEIGHT / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT / 2,
            zIndex: 98
          },
          className: "leftHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }));
      }

      if (x1 >= 0 && x1 <= width) {
        rightHandleElem = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x1,
            top: height / 2 - SIDE_HANDLE_HEIGHT / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT,
            zIndex: 99
          },
          className: "rightHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }), _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x1 - SIDE_HANDLE_WIDTH / 2,
            top: height / 2 - SIDE_HANDLE_HEIGHT / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT / 2,
            zIndex: 100
          },
          className: "rightHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }), _react.default.createElement("div", {
          style: {
            position: "absolute",
            left: x1 - SIDE_HANDLE_WIDTH / 2,
            top: height / 2,
            width: SIDE_HANDLE_WIDTH / 2,
            height: SIDE_HANDLE_HEIGHT / 2,
            zIndex: 98
          },
          className: "rightHandle",
          onMouseDown: this.handleLeftHandleDragStart
        }));
      }

      var mainWidth = Math.max(1, x1 - x0);

      if (!(x0 > width || 0 > x1)) {
        mainHandleElem = _react.default.createElement("div", {
          ref: this.ref,
          style: {
            position: "absolute",
            left: x0,
            top: 0,
            width: mainWidth,
            height: height
          },
          className: "mainHandle",
          onMouseDown: this.handleMainHandleDragStart
        });
      }

      switch (dragged) {
        case "left":
          documentInteractionElem = _react.default.createElement(_DragOverlay.default, {
            mouseMoveHandler: this.handleLeftHandleDragging,
            mouseUpHandler: this.handleDragEnd,
            cursor: "w-resize"
          });
          break;

        case "right":
          documentInteractionElem = _react.default.createElement(_DragOverlay.default, {
            mouseMoveHandler: this.handleRightHandleDragging,
            mouseUpHandler: this.handleDragEnd,
            cursor: "e-resize"
          });
          break;

        case "main":
          documentInteractionElem = _react.default.createElement(_DragOverlay.default, {
            mouseMoveHandler: this.handleMainHandleDragging,
            mouseUpHandler: this.handleDragEnd,
            cursor: "ew-resize"
          });
          break;

        default:
          break;
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        style: {
          overflow: "hidden",
          position: "relative",
          height: height,
          width: width,
          top: 0,
          left: 0
        }
      }, mainHandleElem, leftHandleElem, rightHandleElem), documentInteractionElem);
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.lastClickTimeStamp = ev.timeStamp;
      var _this$props5 = this.props,
          width = _this$props5.width,
          minX = _this$props5.minX,
          maxX = _this$props5.maxX,
          startX = _this$props5.startX,
          endX = _this$props5.endX;
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
  minX: _propTypes.default.number.isRequired,
  maxX: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  startX: _propTypes.default.number.isRequired,
  endX: _propTypes.default.number.isRequired,
  snap: _propTypes.default.number.isRequired,
  showHandle: _propTypes.default.bool.isRequired,
  updatingHandler: _propTypes.default.func.isRequired,
  updateHandler: _propTypes.default.func.isRequired,
  clickHandler: _propTypes.default.func.isRequired
};
var _default = OnPlotXRanger;
exports.default = _default;