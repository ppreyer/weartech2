import React, { Component } from 'react'
import "./overview.css"
import BarChart from '../barchart/barchart';
import DB from '../../../utils/DB'

const chart1 = {
  labels: ["Cushion", "Shoe", "Bed"],
  datasets: [
    {
      label: "Sensor Totals",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [4,8,9]
    }
  ],
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
};

const chart2 = {
  labels: ["Institutions"],
  datasets: [
    {
      label: "Number of Institutions",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [1,2,3]
    }
  ],
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
};

const chart3 = {
  labels: ["Shoe", "Cushion", "Bed"],
  datasets: [
    {
      label: "# of Data Collected",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [2,1,3]
    }
  ],
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
};

class OverView extends Component {
  state = {
    institution: this.props.institution,
    chart1: {},
    chart2: {},
    chart3: {},
    chart4: {}
  };


  chart1 = () => {
    let arr = [];
    DB.getBeds()
      .then(res => arr.push(res.data.length));
    DB.getShoes()
      .then(res => arr.push(res.data.length));
    DB.getCushions()
      .then(res => arr.push(res.data.length));
    chart1.datasets[0].data = arr
    this.setState({chart1: chart1})
  };

  chart2 = () => {
    DB.getInstitutions()
      .then(res => chart2.datasets[0].data.splice(0, 1, res.data.length))
    this.setState({chart2: chart2})
  };

  chart3 = () => {
    let arr = [];
    DB.getCushionData()
      .then(res => arr.push(res.data.length));
    DB.getBedData()
      .then(res => arr.push(res.data.length));
    DB.getShoeData()
      .then(res => arr.push(res.data.length));
    chart3.datasets[0].data = arr
    this.setState({chart3: chart3})
  };

  componentDidMount() {
    this.chart1();
    this.chart2();
    this.chart3();
  }

  render() {
    if (!this.props.show) { return null; }

    return (
      <div className={this.props.container}>
        {this.chart1 ? (<div id="chart1">
          <BarChart data={this.state.chart1}/>
        </div>) : (<h1 id="chart1">No Data</h1>)}
        {this.chart2 ? (<div id="chart2">
          <BarChart data={this.state.chart2}/>
        </div>) : (<h1 id="chart2">No Data</h1>)}
        {this.chart3 ? (<div id="chart3">
          <BarChart data={this.state.chart3}/>
        </div>) : (<h1 id="chart3">No Data</h1>)}
        {this.chart4 ? (<div id="chart4">
          <BarChart data={this.state.chart4}/>
        </div>) : (<h1 id="chart4">No Data</h1>)}
      </div>
    )
  }
}

export default OverView