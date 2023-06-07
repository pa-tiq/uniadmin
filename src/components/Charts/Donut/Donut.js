import { useEffect, useRef } from 'react';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';

import CardBasic from '../../Cards/Basic';
import { useSelector } from 'react-redux';
import { selectSelectedNode } from '../../../redux/selectedNodeSlice';

let data = require('../../../constants/materias_aprovados_reprovados_cancelados.json')

const ChartDonut = () => {
  const selectedNode = useSelector(selectSelectedNode);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef) {
      const myPieChart = chartRef.current.getContext('2d');
      Chart.register(DoughnutController, ArcElement, Legend, Tooltip);

      new Chart(myPieChart, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Referral', 'Social'],
          datasets: [
            {
              data: [55, 30, 15],
              // backgroundColor: ['#4e73df', '#1cc88a', '#e11b1e', '#36b9cc'],
              // hoverBackgroundColor: ['#2e59d9', '#17a673', '#9e0c0e' ,'#2c9faf'],
              backgroundColor: ['#1cc88a', '#e11b1e', '#e7e42e'],
              hoverBackgroundColor: ['#17a673', '#9e0c0e' ,'#8b9b13'],
              hoverBorderColor: 'rgba(234, 236, 244, 1)',
              hoverOffset: 3
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
