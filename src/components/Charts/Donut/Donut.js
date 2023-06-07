import { useEffect, useRef, useState } from 'react';
import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from 'chart.js';

import CardBasic from '../../Cards/Basic';
import { useSelector } from 'react-redux';
import { selectSelectedNode } from '../../../redux/selectedNodeSlice';

let AprovadosReprovadosCancelados = require('../../../constants/materias_aprovados_reprovados_cancelados.json');

const ChartDonut = () => {
  const selectedNode = useSelector(selectSelectedNode);
  const chartRef = useRef(null);
  const [pieChart, setPieChart] = useState(null);

  const createChart = (chartContext, labels, data) => {
    const myPieChart = new Chart(chartContext, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#1cc88a', '#e11b1e', '#e7e42e'],
            hoverBackgroundColor: ['#17a673', '#9e0c0e', '#8b9b13'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
            hoverOffset: 3,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
    setPieChart(myPieChart);
  };

  useEffect(() => {
    if (pieChart && selectedNode) {
      console.log(selectedNode);
      const labels = ['Aprovados', 'Reprovados', 'Cancelados'];
      let data = [];
      AprovadosReprovadosCancelados.resultset[0].forEach((item)=>{
        if(item[0] === selectedNode.title){
          data = [item[1], item[2], item[3]];
        }
      });
      pieChart.data.labels = labels;
      pieChart.data.datasets = [
        {
          data: data,
          backgroundColor: ['#1cc88a', '#e11b1e', '#e7e42e'],
          hoverBackgroundColor: ['#17a673', '#9e0c0e', '#8b9b13'],
          hoverBorderColor: 'rgba(234, 236, 244, 1)',
          hoverOffset: 3,
        },
      ];
      pieChart.update();
    }
  }, [selectedNode]);

  useEffect(() => {
    if (chartRef) {
      const myPieChart = chartRef.current.getContext('2d');
      Chart.register(DoughnutController, ArcElement, Legend, Tooltip);
      createChart(myPieChart, ['Direct', 'Referral', 'Social'], [55, 30, 15]);
    }
  }, []);

  return (
    <CardBasic title='Donut Chart'>
      <div className='chart-pie pt-4'>
        <canvas id='myPieChart' ref={chartRef}></canvas>
      </div>
      <hr />
      Styling for the donut chart can be found in the{' '}
      <code>/Components/Charts/Donut/index.js</code> file.
    </CardBasic>
  );
};

export default ChartDonut;
