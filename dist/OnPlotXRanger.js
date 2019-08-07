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

      var _this$props = _this.props,
          width = _this$props.width,
          minX = _this$props.minX,
          maxX = _this$props.maxX,
          startX = _this$props.startX;
      var startDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, startX);
      _this.offsetStartDomX = startDomX - ev.clientX;

      _this.setState({
        dragged: "left"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightHandleDragStart", function (ev) {
      _this.handleDragStart(ev);

      var _this$props2 = _this.props,
          width = _this$props2.width,
          minX = _this$props2.minX,
          maxX = _this$props2.maxX,
          endX = _this$props2.endX;
      var endDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, endX);
      _this.offsetEndDomX = endDomX - ev.clientX;

      _this.setState({
        dragged: "right"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMainHandleDragStart", function (ev) {
      _this.handleDragStart(ev);

      var _this$props3 = _this.props,
          width = _this$props3.width,
          minX = _this$props3.minX,
          maxX = _this$props3.maxX,
          startX = _this$props3.startX,
          endX = _this$props3.endX;
      var startDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, startX);
      _this.offsetStartDomX = startDomX - ev.clientX;
      _this.diffX = endX - startX;

      _this.setState({
        dragged: "main"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeftHandleDragging", function (ev) {
      _this.handleDragging(ev);

      var _this$props4 = _this.props,
          updatingHandler = _this$props4.updatingHandler,
          endX = _this$props4.endX;

      var _assertThisInitialize = _assertThisInitialized(_this),
          offsetStartDomX = _assertThisInitialize.offsetStartDomX;

      var _this$props5 = _this.props,
          width = _this$props5.width,
          minX = _this$props5.minX,
          maxX = _this$props5.maxX;
      var newStartX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, ev.clientX + offsetStartDomX);
      newStartX = _this.snapStartX(newStartX, minX, endX);
      updatingHandler(newStartX, endX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightHandleDragging", function (ev) {
      _this.handleDragging(ev);

      var _this$props6 = _this.props,
          updatingHandler = _this$props6.updatingHandler,
          startX = _this$props6.startX;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          offsetEndDomX = _assertThisInitialize2.offsetEndDomX;

      var _this$props7 = _this.props,
          width = _this$props7.width,
          minX = _this$props7.minX,
          maxX = _this$props7.maxX;
      var newEndX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, ev.clientX + offsetEndDomX);
      newEndX = _this.snapEndX(newEndX, startX, maxX);
      updatingHandler(startX, newEndX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMainHandleDragging", function (ev) {
      _this.handleDragging(ev);

      var _this$props8 = _this.props,
          updatingHandler = _this$props8.updatingHandler,
          endX = _this$props8.endX;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          offsetStartDomX = _assertThisInitialize3.offsetStartDomX,
          diffX = _assertThisInitialize3.diffX;

      var _this$props9 = _this.props,
          width = _this$props9.width,
          minX = _this$props9.minX,
          maxX = _this$props9.maxX;
      var newStartX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, ev.clientX + offsetStartDomX);
      var newEndX = newStartX + diffX;
      updatingHandler(newStartX, newEndX);
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
          var _this$props10 = _this.props,
              updateHandler = _this$props10.updateHandler,
              startX = _this$props10.startX,
              endX = _this$props10.endX;
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
      var _this$props11 = this.props,
          minX = _this$props11.minX,
          maxX = _this$props11.maxX,
          width = _this$props11.width,
          height = _this$props11.height,
          startX = _this$props11.startX,
          endX = _this$props11.endX,
          showHandle = _this$props11.showHandle;
      var dragged = this.state.dragged; // Calculate positions

      var x0, x1;
      x0 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, startX);
      x1 = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, endX); // Create elements

      var leftHandleElem = null;
      var rightHandleElem = null;
      var mainHandleElem = null;
      var documentInteractionElem = null; // Left handle

      if (showHandle) {
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
          onMouseDown: this.handleRightHandleDragStart
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
          onMouseDown: this.handleRightHandleDragStart
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
          onMouseDown: this.handleRightHandleDragStart
        }));
      }

      var mainWidth = Math.max(1, x1 - x0);
      mainHandleElem = _react.default.createElement("div", {
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
    }
  }, {
    key: "handleDragging",
    value: function handleDragging(ev) {
      ev.stopPropagation();
      ev.preventDefault();
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
  updatingHandler: _propTypes.default.func,
  updateHandler: _propTypes.default.func,
  clickHandler: _propTypes.default.func
};
var _default = OnPlotXRanger;
exports.default = _default;