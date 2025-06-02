import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

const WeeklyChart: React.FC = () => {
  const [state] = useState<ChartState>({
    series: [
      {
        name: 'Sales',
        data: [10, 15, 8, 3, 17, 5, 9],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: 'line',
        toolbar: {
          show: false,
        },
      },

      stroke: {
        width: 2,
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            fontSize: '14px',
            colors: '#666',
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#666666'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='line'
        height={250}
      />
    </div>
  );
};

export default WeeklyChart;
