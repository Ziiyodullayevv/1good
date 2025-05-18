import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const API_URL = 'https://673841334eb22e24fca75190.mockapi.io/api/v1/developers';

type Developer = {
  id: string;
  name: string;
  role: string;
  level: string;
  location: string;
  salary: string;
  avatar: string;
};

const fetchDeveloperById = async (id: string): Promise<Developer> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error('Serverdan maʼlumot olishda xatolik');
  }
  return res.json();
};

export default function TalentProfilePage() {
  const { slug } = useParams();

  const id = slug?.split('-').pop();
  if (!id) return <div className='text-center text-red-500'>Noto‘g‘ri URL</div>;

  const {
    data: developer,
    isLoading,
    isError,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ['developer', id],
    queryFn: () => fetchDeveloperById(id),
  });

  if (isLoading) {
    return (
      <div className='text-center py-20 text-muted-foreground text-lg'>
        Yuklanmoqda...
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500 py-20'>
        Xatolik: {(error as Error).message}
      </div>
    );
  }

  if (!developer) {
    return (
      <div className='text-center text-red-500 py-20'>Developer topilmadi</div>
    );
  }

  return (
    <div className='min-h-screen py-10 sm:py-20'>
      <div className='section-container space-y-10'>
        {/* Header Card */}
        <Card className='p-8'>
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Avatar */}
            <div className='flex justify-center items-center'>
              <Avatar className='w-full h-[300px]'>
                <AvatarImage src={developer.avatar} alt={developer.name} />
                <AvatarFallback>{developer.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold'>{developer.name}</h2>
              <p className='text-muted-foreground text-lg'>{developer.role}</p>

              <div className='flex flex-wrap gap-2'>
                <Badge>{developer.level}</Badge>
                <Badge>{developer.location}</Badge>
                <Badge>{developer.salary}</Badge>
              </div>

              <p className='text-sm text-muted-foreground'>
                Tajribali developer haqida qisqacha maʼlumot yoki biografiya shu
                yerda yoziladi.
              </p>

              <button className='px-4 py-2 bg-black text-white rounded hover:opacity-90'>
                Aloqa qilish
              </button>
            </div>
          </div>
        </Card>

        {/* Projects */}
        <section>
          <h3 className='text-xl font-semibold mb-4'>Projects</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className='space-y-2 pt-4'>
                  <div className='text-yellow-500'>★★★★★</div>
                  <h4 className='font-semibold'>Project Title</h4>
                  <p className='text-sm text-muted-foreground'>
                    Frontend, Backend
                  </p>
                  <div className='flex items-center gap-2 mt-2'>
                    <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                    <span className='text-sm text-muted-foreground'>
                      Client Name
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground'>Date</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h3 className='text-xl font-semibold mb-4'>Reviews</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className='space-y-2 pt-4'>
                  <h4 className='font-semibold'>Yaxshi ishlangan loyiha</h4>
                  <p className='text-sm text-muted-foreground'>
                    Tez, sifatli va tartibli ish
                  </p>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                    <span className='text-sm text-muted-foreground'>
                      Reviewer Name
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground'>Sana</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
