import Banner from './Banner';
import CustomTable from './CustomTable';

const data = [
  {
    id: '1',
    title: 'Website Redesign for Local Bakery',
    clientName: 'Sarah Johnson',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
  {
    id: '2',
    title: 'Mobile App Development for Fitness Tracker',
    clientName: 'David Lee',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
  {
    id: '3',
    title: 'Content Marketing Strategy for E-commerce Store',
    clientName: 'Emily Chen',
    deadline: '2024-08-15',
    status: 'In Progress',
    action: 'View Details',
  },
];

export default function Contracts() {
  return (
    <div className='bg-white min-h-[calc(100vh-80px)] text-base rounded-xl overflow-hidden'>
      <Banner title='Contracts' />

      <div className='p-8'>
        <CustomTable data={data} />
      </div>
    </div>
  );
}
