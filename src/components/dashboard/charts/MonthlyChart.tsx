import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function MonthlyChart() {
  const [state] = useState({
    series: [
      {
        name: 'Actual',
        data: [45, 52, 38, 60, 55, 80], // Har oy uchun qiymatlar
      },
    ],
    options: {
      chart: {
        height: 250,
        type: 'bar' as const,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '70%',
        },
      },
      xaxis: {
        categories: ['Yan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Pastda ko‘rinadigan oy nomlari
      },
      colors: ['var(--v9)'],
      dataLabels: {
        enabled: false, // Raqamlar ustida chiqmasin
      },
    },
  });

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type='bar'
          height={250}
        />
      </div>
    </div>
  );
}

// Root rendering
import { createRoot } from 'react-dom/client';

const domContainer = document.querySelector('#app');
if (domContainer) {
  createRoot(domContainer).render(<MonthlyChart />);
}
