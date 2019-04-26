import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';

import OnPlotXRanger from "./lib";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {minX: 0,
                  maxX: 10000,
                  width: 1000,
                  height: 400,
                  startX: 100,
                  endX: 200,
                  globalMinX: 0,
                  globalMaxX: 10000,
                  snap: 1000,
                  topHandle: true,
                  };
  }
  
  render() {
    let { globalMinX,globalMaxX,
          minX,maxX,
          width,height,
          startX,endX,
          snap,
          topHandle
          } = this.state;
    return (
      <Fragment>
        <div>
          globalMinX: {globalMinX}
          <input type="range" min={0} max={5000} value={globalMinX} onChange={(ev)=>this.setState({globalMinX:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          globalMaxX: {globalMaxX}
          <input type="range" min={minX} max={10000} value={globalMaxX} onChange={(ev)=>this.setState({globalMaxX:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          minX: {minX}
          <input type="range" min={0} max={5000} value={minX} onChange={(ev)=>this.setState({minX:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          maxX: {maxX}
          <input type="range" min={minX} max={10000} value={maxX} onChange={(ev)=>this.setState({maxX:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          snap: {snap}
          <input type="range" min={10} max={200} step={10} value={snap} onChange={(ev)=>this.setState({snap:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          width: {width}
          <input type="range" min={100} max={1000} step={10} value={width} onChange={(ev)=>this.setState({width:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          height: {height}
          <input type="range" min={100} max={400} step={10} value={height} onChange={(ev)=>this.setState({height:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          startX: {startX}
          <input type="range" min={minX} max={endX} step={10} value={startX} onChange={(ev)=>this.setState({startX:Number.parseInt(ev.target.value)})}/>
        </div>
        <div>
          endX: {endX}
          <input type="range" min={startX} max={maxX} step={10} value={endX} onChange={(ev)=>this.setState({endX:Number.parseFloat(ev.target.value)})}/>
        </div>
        <div>
          topHandle:
          <button type="button" onClick={(ev)=>this.setState({topHandle:!topHandle})}>
            {String(topHandle)}
          </button>
        </div>
        <br/>
        <OnPlotXRanger  globalMinX={globalMinX}
                        globalMaxX={globalMaxX}
                        minX={minX}
                        maxX={maxX}
                        snap={snap}
                        width={width}
                        height={height}
                        startX={startX}
                        endX={endX}
                        topHandle={topHandle}
                        updateStartXHandler={this.handleUpdateStartX}
                        updateEndXHandler={this.handleUpdateEndX}
                        updateMinXHandler={this.handleUpdateMinX}
                        updateMaxXHandler={this.handleUpdateMaxX}
                        />
      </Fragment>
    );
  }
  
  handleUpdateStartX = (s)=>{
    this.setState({startX:s});
  }
  
  handleUpdateEndX = (e)=>{
    this.setState({endX:e});
  }
  
  handleUpdateMinX = (minX)=>{
    this.setState({minX:minX});
  }
  
  handleUpdateMaxX = (maxX)=>{
    this.setState({maxX:maxX});
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
