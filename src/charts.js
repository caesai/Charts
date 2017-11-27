import React from 'react';
import ReactDOM from 'react-dom';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

import './scss/react-vis.scss';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const lowData = [];
const highData = [];

export class Charts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      coords: []
    }
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    return fetch('http://localhost:3000/charts',{
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/javascript'
      }
    })
    .then(checkHttpStatus)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      for (let i = 0; i < json.time.length; i++){
        lowData.push(
          Object.assign({x: json.time[i]}, {y: json.low[i]})
        )
        highData.push(
          Object.assign({x: json.time[i]}, {y: json.high[i]})
        )
      }
      this.setState({
        loaded: true,
        low: lowData,
        high: highData
      });
    })
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        {this.state.loaded ?
          <XYPlot
            width={600}
            height={400}>
            <LineSeries color={'red'}  data={this.state.low}/>
            <LineSeries color={'green'}  data={this.state.high}/>
            <XAxis />
            <YAxis />
          </XYPlot> : null }
      </div>
    )
  }
}

ReactDOM.render(<Charts />, document.getElementById('charts'));
