import { useState } from 'react';
import { Input } from '../ui/input';
import OrderList from './OrderList';

export default function Order() {
  const [filters, setFilters] = useState({
    min: 0,
    max: 1000000,
    limit: 10,
    page: 1,
  });

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : Number(value),
    }));
  };

  return (
    <section className='py-10 bg-v2'>
      <div className='section-container'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between'>
            <h2 className='text-2xl font-semibold'>Order List</h2>
            <div className='flex gap-2 sm:gap-5'>
              <div>
                <Input
                  onChange={handlePriceChange}
                  placeholder='Min price'
                  type='number'
                  name='min'
                  className='h-9 bg-white'
                />
              </div>

              <div>
                <Input
                  onChange={handlePriceChange}
                  placeholder='Max price'
                  type='number'
                  name='max'
                  className='h-9 bg-white'
                />
              </div>
            </div>
          </div>
        </div>
        <OrderList filters={filters} />
      </div>
    </section>
  );
}
