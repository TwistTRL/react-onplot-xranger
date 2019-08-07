import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {toDomXCoord_Linear,
        fromDomXCoord_Linear} from "plot-utils";
// Components
import DragOverlay from "./DragOverlay";
// CSS
import "./OnPlotXRanger.css";

const SIDE_HANDLE_WIDTH = 7;
const SIDE_HANDLE_HEIGHT = 50;
class OnPlotXRanger extends PureComponent {
  constructor(props){
    super(props);
    this.ref = React.createRef();
    this.state = {dragged:null};
    this.lastClickTimeStamp = null;
    this.snapshot = {};
  }
  
  render() {
    let { minX,maxX,
          width,height,
          startX,endX,
          showHandle
          } = this.props;
    let {dragged} = this.state;
    // Calculate positions
    let x0,x1;
    x0 = toDomXCoord_Linear(width,minX,maxX,startX);
    x1 = toDomXCoord_Linear(width,minX,maxX,endX);
    // Create elements
    let leftHandleElem = null;
    let rightHandleElem = null;
    let mainHandleElem = null;
    let documentInteractionElem = null;
    // Left handle
    if (x0>=0 && x0<=width) {
      leftHandleElem = (
        <>
          <div  style={{position:"absolute",
                        left:x0-SIDE_HANDLE_WIDTH/2,
                        top:(height-SIDE_HANDLE_HEIGHT)/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT,
                        zIndex:99}}
                className="leftHandle"
                onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
          <div  style={{position:"absolute",
                        left:x0,
                        top:height/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT/2,
                        zIndex:100}}
                className="leftHandle"
                onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
          <div  style={{position:"absolute",
                        left:x0,
                        top:height/2-SIDE_HANDLE_HEIGHT/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT/2,
                        zIndex:98}}
                className="leftHandle"
                onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
        </>
        );
    }
    if ( x1>=0 && x1<=width ) {
      rightHandleElem = (
        <>
          <div  style={{position:"absolute",
                        left:x1,
                        top:height/2-SIDE_HANDLE_HEIGHT/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT,
                        zIndex:99}}
              className="rightHandle"
              onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
          <div  style={{position:"absolute",
                        left:x1-SIDE_HANDLE_WIDTH/2,
                        top:height/2-SIDE_HANDLE_HEIGHT/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT/2,
                        zIndex:100}}
                className="rightHandle"
                onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
          <div  style={{position:"absolute",
                        left:x1-SIDE_HANDLE_WIDTH/2,
                        top:height/2,
                        width:SIDE_HANDLE_WIDTH/2,
                        height:SIDE_HANDLE_HEIGHT/2,
                        zIndex:98}}
                className="rightHandle"
                onMouseDown={this.handleLeftHandleDragStart}
              >
          </div>
        </>
        );
    }
    let mainWidth = Math.max(1,x1-x0);
    if ( !(x0>width || 0>x1) ) {
      mainHandleElem = (
        <div  ref={this.ref}
              style={{position:"absolute",
                      left:x0,
                      top:0,
                      width:mainWidth,
                      height:height}}
              className="mainHandle"
              onMouseDown={this.handleMainHandleDragStart}
              >
         </div>
         );
    }
    
    switch (dragged) {
      case "left":
        documentInteractionElem = <DragOverlay mouseMoveHandler={this.handleLeftHandleDragging} mouseUpHandler={this.handleDragEnd} cursor="w-resize"/>;
        break;
      case "right":
        documentInteractionElem = <DragOverlay mouseMoveHandler={this.handleRightHandleDragging} mouseUpHandler={this.handleDragEnd} cursor="e-resize"/>;
        break;
      case "main":
        documentInteractionElem = <DragOverlay mouseMoveHandler={this.handleMainHandleDragging} mouseUpHandler={this.handleDragEnd} cursor="ew-resize"/>;
        break;
      default:
        break;
    }
    
    return (
      <>
        <div  style={{overflow:"hidden",position:"relative",height:height,width:width,top:0,left:0}}>
          {mainHandleElem}
          {leftHandleElem}
          {rightHandleElem}
        </div>
        {documentInteractionElem}
      </>
    );
  }
  
  handleDragStart(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.lastClickTimeStamp = ev.timeStamp;
    let { width,minX,
          maxX,startX,endX} = this.props;
    let {snapshot} = this;
    let referenceFrame = this.ref.current.getBoundingClientRect();
    snapshot.referenceFrame = referenceFrame;
    snapshot.width = width;
    snapshot.minX = minX;
    snapshot.maxX = maxX;
    snapshot.startX = startX;
    snapshot.endX = endX;
    snapshot.initialDragX = fromDomXCoord_Linear(width,minX,maxX,ev.clientX-referenceFrame.left);
  }
  handleLeftHandleDragStart = (ev)=>{
    this.handleDragStart(ev);
    this.setState({dragged:"left"});
  }
  handleRightHandleDragStart = (ev)=>{
    this.handleDragStart(ev);
    this.setState({dragged:"right"});
  }
  handleMainHandleDragStart = (ev)=>{
    this.handleDragStart(ev);
    this.setState({dragged:"main"});
  }
  
  handleDragging(ev){
    ev.stopPropagation();
    ev.preventDefault();
    let {snapshot} = this;
    let { width,minX,maxX,
          referenceFrame
          } = snapshot;
    let curDragX = fromDomXCoord_Linear(width,minX,maxX,ev.clientX-referenceFrame.left);
    return curDragX;
  }
  
  handleLeftHandleDragging = (ev)=>{
    let {initialDragX} = this.snapshot;
    let {updateStartXHandler,startX,endX,minX,maxX} = this.props;
    let curDragX = this.handleDragging(ev);
    let newStartX = curDragX -initialDragX + startX;
    newStartX = this.snapStartX(newStartX,minX,endX);
    updateStartXHandler(newStartX);
  }
  handleRightHandleDragging = (ev)=>{
    let { startX,endX,
          maxX,
          initialDragX} = this.snapshot;
    let {updateEndXHandler} = this.props;
    let curDragX = this.handleDragging(ev);
    let newEndX = curDragX -initialDragX + endX;
    newEndX = this.snapEndX(newEndX,startX,maxX);
    updateEndXHandler(newEndX);
  }
  handleMainHandleDragging = (ev)=>{
    let { startX,endX,
          minX,maxX,
          initialDragX} = this.snapshot;
    let {updateStartXHandler,updateEndXHandler} = this.props;
    let curDragX = this.handleDragging(ev);
    let deltaX = curDragX - initialDragX;
    deltaX = Math.max(Math.min(deltaX,maxX-endX),minX-startX);
    updateStartXHandler(startX+deltaX);
    updateEndXHandler(endX+deltaX);
  }
  
  handleDragEnd = (ev)=>{
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({dragged:null});
    // If it is a click, flip range
    if (ev.timeStamp - this.lastClickTimeStamp < 100){
      let {clickHandler} = this.props;
      clickHandler();
    }
    // If it is not a click, update report drag end
    else {
      let {updateHandler,startX,endX} = this.props;
      updateHandler(startX,endX);
    }
  }

  snapStartX(newStartX,minX,endX) {
    let {snap} = this.props;
    newStartX = Math.max(Math.min(newStartX,endX),minX);
    let snappedStartX = Math.round(newStartX/snap) * snap;
    if (snappedStartX>=endX) {
      snappedStartX = snappedStartX - snap;
    }
    if (snappedStartX<=minX) {
      snappedStartX = snappedStartX + snap;
    }
    let d0 = Math.abs(newStartX-minX);
    let d1 = Math.abs(snappedStartX-newStartX);
    let d2 = Math.abs(newStartX-(endX-snap));
    let minDist = Math.min(d0,d1,d2);
    if (d0 === minDist) {
      return minX;
    }
    if (d1 === minDist) {
      return snappedStartX;
    }
    if (d2 === minDist) {
      return endX-snap;
    }
    return snappedStartX;
  }
  
  snapEndX(newEndX,startX,maxX) {
    let {snap} = this.props;
    newEndX = Math.max(Math.min(newEndX,maxX),startX);
    let snappedEndX = Math.round(newEndX/snap) * snap;
    if (snappedEndX>=maxX) {
      snappedEndX = snappedEndX - snap;
    }
    if (snappedEndX<=startX) {
      snappedEndX = snappedEndX + snap;
    }
    let d0 = Math.abs(newEndX-(startX+snap));
    let d1 = Math.abs(snappedEndX-newEndX);
    let d2 = Math.abs(newEndX-maxX);
    let minDist = Math.min(d0,d1,d2);
    if (d0 === minDist) {
      return startX+snap;
    }
    if (d1 === minDist) {
      return snappedEndX;
    }
    if (d2 === minDist) {
      return maxX;
    }
    return snappedEndX;
  }
}

OnPlotXRanger.propTypes = {
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  startX: PropTypes.number.isRequired,
  endX: PropTypes.number.isRequired,
  snap: PropTypes.number.isRequired,
  showHandle: PropTypes.bool.isRequired,
  updatingHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default OnPlotXRanger;
