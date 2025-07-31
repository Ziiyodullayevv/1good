import { Rate } from 'antd';

const reviews = [
  {
    rating: 4,
    title: 'Excellent Design',
    body: 'The UI was smooth and visually appealing.',
    reviewerName: 'John Doe',
    date: '2024-06-01',
    avatar:
      'https://i.pinimg.com/originals/ea/d9/e4/ead9e4ecab654861deec1977093d8c47.jpg',
  },
  {
    rating: 5,
    title: 'Fast Delivery',
    body: 'Project delivered on time and exceeded expectations.',
    reviewerName: 'Jane Smith',
    date: '2024-05-20',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    rating: 3,
    title: 'Good, but can improve',
    body: 'Some sections were not fully responsive.',
    reviewerName: 'Mike Brown',
    date: '2024-04-15',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    rating: 5,
    title: 'Highly Recommended!',
    body: 'The best experience I’ve had with a designer.',
    reviewerName: 'Sara Lee',
    date: '2024-03-10',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    rating: 4,
    title: 'Creative and Clean',
    body: 'Very creative layouts and clean code structure.',
    reviewerName: 'Ali Veli',
    date: '2024-02-05',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    rating: 4,
    title: 'Solid work',
    body: 'Good communication and reliable delivery.',
    reviewerName: 'Emily Rose',
    date: '2024-01-18',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

export default function Reviews() {
  return (
    <div className='container-auth my-7'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='border bg-v2/30 flex flex-col gap-5 rounded-lg border-gray-300 p-5'
          >
            <Rate className='!text-lg' disabled defaultValue={review.rating} />

            <div>
              <h3 className='text-xl font-medium'>{review.title}</h3>
              <p className='text-gray-500'>{review.body}</p>
            </div>

            <div className='flex gap-2 items-center'>
              <div className='w-10 h-10 overflow-hidden shrink-0 bg-gray-200 rounded-full'>
                <img
                  className='w-full h-full object-cover'
                  src={review.avatar}
                  alt={review.reviewerName}
                />
              </div>
              <div>
                <h4>{review.reviewerName}</h4>
                <time className='text-sm text-gray-500'>{review.date}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
