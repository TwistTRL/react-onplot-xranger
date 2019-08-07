import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';

import OnPlotXRanger from "./lib";

const DATA_MIN_X = 0;
const DATA_MAX_X = 10000;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {minX: DATA_MIN_X,
                  maxX: DATA_MAX_X,
                  width: 1000,
                  height: 400,
                  startX: 100,
                  endX: 200,
                  snap: 1000,
                  showHandle: true,
                  };
  }
  
  render() {
    let { minX,maxX,
          width,height,
          startX,endX,
          snap,
          showHandle
          } = this.state;
    return (
      <>
        <fieldset>
          <legend>Props</legend>
          <div>
            minX:
            <input  type="range" min={0} max={5000} value={minX}
                    onChange={(ev)=>this.setState({minX:Number.parseInt(ev.target.value)})}/>
            {minX}
          </div>
          <div>
            maxX:
            <input  type="range" min={minX} max={10000} value={maxX}
                    onChange={(ev)=>this.setState({maxX:Number.parseInt(ev.target.value)})}/>
            {maxX}
          </div>
          <div>
            snap:
            <input  type="range" min={10} max={200} step={10} value={snap}
                    onChange={(ev)=>this.setState({snap:Number.parseInt(ev.target.value)})}/>
            {snap}
          </div>
          <div>
            width:
            <input  type="range" min={100} max={1000} step={10} value={width}
                    onChange={(ev)=>this.setState({width:Number.parseInt(ev.target.value)})}/>
            {width}
          </div>
          <div>
            height:
            <input  type="range" min={100} max={400} step={10} value={height}
                    onChange={(ev)=>this.setState({height:Number.parseInt(ev.target.value)})}/>
            {height}
          </div>
          <div>
            startX:
            <input  type="range" min={minX} max={endX} step={10} value={startX}
                    onChange={(ev)=>this.setState({startX:Number.parseInt(ev.target.value)})}/>
            {startX}
          </div>
          <div>
            endX:
            <input  type="range" min={startX} max={maxX} step={10} value={endX}
                    onChange={(ev)=>this.setState({endX:Number.parseFloat(ev.target.value)})}/>
            {endX}
          </div>
          <div>
            showHandle:
            <button type="button" onClick={(ev)=>this.setState({showHandle:!showHandle})}>
              {String(showHandle)}
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <OnPlotXRanger  minX={minX}
                          maxX={maxX}
                          snap={snap}
                          width={width}
                          height={height}
                          startX={startX}
                          endX={endX}
                          showHandle={showHandle}
                          updatingHandler={this.handleUpdating}
                          updateHandler={this.handleUpdate}
                          clickHandler={this.handleClick}
                          />
        </fieldset>
      </>
    );
  }
  
  handleUpdating = (startX,endX)=>{
    this.setState({startX,endX});
  }
  
  handleUpdate = (startX,endX)=>{
    this.setState({startX,endX});
  }
  
  handleClick = ()=>{
    let {minX,maxX,startX,endX} = this.state;
    if (startX===minX && endX===maxX) {
      this.setState({ minX:DATA_MIN_X,
                      maxX:DATA_MAX_X
                      });
    }
    else {
      this.setState({ minX:startX,
                      maxX:endX
                      });
    }
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
