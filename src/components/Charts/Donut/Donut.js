import { useEffect, useRef } from 'react';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';

import CardBasic from '../../Cards/Basic';

const ChartDonut = () => {
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
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
              hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
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
