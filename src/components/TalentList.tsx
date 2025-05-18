import { useNavigate } from 'react-router';
import { Badge } from './ui/badge';

const developers = [
  {
    id: 1,
    name: 'Житенко Татьяна',
    role: 'Веб-мастер',
    level: 'Middle',
    location: 'Удалённо',
    salary: '80 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Иванов Алексей',
    role: 'Фронтенд-разработчик',
    level: 'Junior',
    location: 'Удалённо',
    salary: '60 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: 3,
    name: 'Смирнова Елена',
    role: 'UI/UX дизайнер',
    level: 'Middle',
    location: 'Москва',
    salary: '90 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
  },
  {
    id: 4,
    name: 'Петров Дмитрий',
    role: 'Бэкенд-разработчик',
    level: 'Senior',
    location: 'Санкт-Петербург',
    salary: '120 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 5,
    name: 'Алексеева Марина',
    role: 'Full-stack разработчик',
    level: 'Middle',
    location: 'Удалённо',
    salary: '100 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
  },
  {
    id: 6,
    name: 'Кузнецов Николай',
    role: 'DevOps инженер',
    level: 'Senior',
    location: 'Казань',
    salary: '130 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
  },
  {
    id: 7,
    name: 'Васильева Ольга',
    role: 'Аналитик данных',
    level: 'Middle',
    location: 'Удалённо',
    salary: '85 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 8,
    name: 'Сидоров Павел',
    role: 'Тестировщик',
    level: 'Junior',
    location: 'Екатеринбург',
    salary: '55 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    id: 9,
    name: 'Морозова Ирина',
    role: 'Контент-менеджер',
    level: 'Middle',
    location: 'Новосибирск',
    salary: '70 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
  {
    id: 10,
    name: 'Григорьев Артём',
    role: 'iOS разработчик',
    level: 'Senior',
    location: 'Удалённо',
    salary: '140 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
  {
    id: 11,
    name: 'Мельникова Надежда',
    role: 'Android разработчик',
    level: 'Middle',
    location: 'Томск',
    salary: '95 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  {
    id: 12,
    name: 'Фёдоров Максим',
    role: 'Frontend-разработчик',
    level: 'Middle',
    location: 'Челябинск',
    salary: '85 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
  },
  {
    id: 13,
    name: 'Соколова Ксения',
    role: 'UX-исследователь',
    level: 'Middle',
    location: 'Москва',
    salary: '90 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    id: 14,
    name: 'Тарасов Денис',
    role: 'Machine Learning Engineer',
    level: 'Senior',
    location: 'Удалённо',
    salary: '150 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    id: 15,
    name: 'Виноградова Анна',
    role: 'Project Manager',
    level: 'Middle',
    location: 'Нижний Новгород',
    salary: '110 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    id: 16,
    name: 'Орлов Сергей',
    role: 'Системный администратор',
    level: 'Middle',
    location: 'Воронеж',
    salary: '75 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
  },
  {
    id: 17,
    name: 'Беляева Екатерина',
    role: 'SEO-специалист',
    level: 'Junior',
    location: 'Удалённо',
    salary: '60 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
  {
    id: 18,
    name: 'Сергеев Игорь',
    role: 'Продуктовый дизайнер',
    level: 'Middle',
    location: 'Сочи',
    salary: '100 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: 19,
    name: 'Данилова Алина',
    role: 'Технический писатель',
    level: 'Middle',
    location: 'Удалённо',
    salary: '70 000₽',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
  {
    id: 20,
    name: 'Романов Кирилл',
    role: 'Game Developer',
    level: 'Senior',
    location: 'Калининград',
    salary: '125 000₽',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
  },
];

export default function TalentList() {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/talent/${id}`);
  };
  return (
    <div className='mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      {developers.map(({ id, name, role, avatar, level, location, salary }) => (
        <div
          onClick={() => handleClick(id)}
          key={id}
          className='bg-white flex flex-col gap-40 rounded-xl p-5'
        >
          <div className='flex justify-between gap-3'>
            <div>
              <h3 className=' text-lg sm:text-2xl font-bold'>{name}</h3>
              <p className='text-sm sm:text-base'>{role}</p>
            </div>

            <div className='w-13 h-13 bg-v2 overflow-hidden rounded-full'>
              <img src={avatar} alt='image' />
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap gap-2'>
              <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-black font-normal text-sm sm:text-base'>
                <img className='' src='/talent-stars.svg' alt='image' />
                <span>{level}</span>
              </Badge>
              <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-black font-normal text-sm sm:text-base'>
                <img className='' src='/talent-location.svg' alt='image' />
                <span>{location}</span>
              </Badge>
            </div>
            <Badge className='bg-v2 flex justify-center items-center gap-1 rounded-full px-3 py-1 text-black font-normal text-sm sm:text-base'>
              <img className='' src='/talent-salary.svg' alt='image' />
              <span>{salary}</span>
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
