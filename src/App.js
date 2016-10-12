import React, { Component } from 'react';

import './App.css';
import './c3.min.css';
import C3Chart from 'react-c3js';

var update = require('react-addons-update');
var Button = require('react-bootstrap/lib/Button');



var Counter = React.createClass({
  
  render: function() {
    return (
      <div>
        <Button className="increment-count" bsStyle="primary" bsSize="large" onClick={this.props.increment}>
          Add One
        </Button>
      </div>
    )
  }
});


var Master = React.createClass({
  getInitialState: function() {
    return {
      data: {
        x: 'x',
        xFormat: '%m-%d',
        columns: [
          ['x', '01-01', '01-02', '01-03', '01-04', '01-05', '01-06'],
          ['daily', 5, 0, 10, 11, 5, 5]     
        ],
        types: {
          daily: 'bar'
        },
        labels:true
      },
      data2: {
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: [
          ['x', '2012-01-01', '2012-01-02', '2012-01-03', '2012-01-04', '2012-01-05', '2012-01-06'],
          ['all', 5, 5, 20, 31, 36, 41]
        ],
        types: {
          all: 'bar'
        },
        labels:true
      },
      legend: {
        hide: true
      },
      title1: {
        text: 'Daily'
      },
      title2: {
        text: 'Cumulative'
      },
      axis: {
        x: {
          type: 'timeseries',
          localtime: false,
          tick: {
            format: '%m-%d'
          }
        }
      }
    }
  },
  render: function() {
    return (
      <div>
        <Counter increment={this.increment} />
        <div className="chart-container-outer col-md-10 col-md-offset-1">
          <div className="col-md-6 col-sm-12 col-xs-12 chart-container">
            <C3Chart data={this.state.data} legend={this.state.legend} title={this.state.title1} axis={this.state.axis}/>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 chart-container">
            <C3Chart data={this.state.data2} legend={this.state.legend} title={this.state.title2} axis={this.state.axis}/>
          </div>
        </div>
      </div>
    )
  },
  increment: function() {
    var cols = this.state.data.columns;
    cols[1][cols[1].length - 1] += 1

    var cols2 = this.state.data2.columns;
    cols2[1][cols2[1].length - 1] += 1


    this.setState({
      data: update(this.state.data, {columns: {$set: cols}}),
      data2: update(this.state.data2, {columns: {$set: cols2}}),
    });
  }
});


class App extends Component {
  render() {
    return (
      <div className="App">
          <Master />
      </div>
    );
  }
}

export default App;
