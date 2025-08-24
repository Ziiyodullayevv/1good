import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import TalentList from './TalentList';
import { useAuth } from '../../context/AuthContext';

export default function Talent() {
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    name: '',
    role: user?.role === 'client' ? 'freelancer' : 'client', // ✅ user roliga qarab qarama-qarshi rol
    sortOrder: '',
    limit: 10,
    page: 1,
  });

  // Debounced search
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        name: searchTerm,
        page: 1, // Search o'zgarganda 1-sahifaga qaytish
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSortOrderChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: value,
      page: 1,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className='py-10 bg-v2'>
      <div className='section-container'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between'>
            <h2 className='text-2xl capitalize font-semibold'>
              {user?.role === 'client' ? 'Find Freelancers' : 'Find Clients'}
            </h2>
            <div className='flex overflow-auto gap-2 sm:gap-5'>
              {/* ✅ Faqat sort order qoldi */}
              <Select
                onValueChange={handleSortOrderChange}
                value={filters.sortOrder}
              >
                <SelectTrigger className='shadow-none border !rounded-lg text-black min-w-[140px]'>
                  <SelectValue
                    className='placeholder:text-gray-500 text-base'
                    placeholder='Sort Order'
                  />
                </SelectTrigger>
                <SelectContent
                  className='font-poppins'
                  align='end'
                  side='bottom'
                >
                  <SelectItem value='asc'>Ascending</SelectItem>
                  <SelectItem value='desc'>Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Input */}
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            className='mt-5 h-12 shadow-none px-4 rounded-lg sm:rounded-xl bg-white border placeholder:text-gray-500 text-base'
            placeholder='Search by name...'
          />
        </div>

        {/* ✅ TalentList endi user roliga qarab filtrlanadi */}
        <TalentList filters={filters} />
      </div>
    </section>
  );
}
