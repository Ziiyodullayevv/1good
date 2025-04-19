import { Link } from 'react-router';

export default function Logo() {
  return (
    <Link to={'/'}>
      <span className='font-bold font-montserrat text-4xl'>1good</span>
    </Link>
  );
}
declare module './Carousel' {
  const Carousel: React.FC;
  export default Carousel;
}
