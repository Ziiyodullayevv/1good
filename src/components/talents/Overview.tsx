import { Rate } from 'antd';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export default function Overview() {
  return (
    <div>
      {/* About part  */}
      <div className='my-5'>
        <h2 className='text-2xl font-semibold'>About</h2>
        <p>
          Experienced graphic designer specializing in branding and
          illustration. Passionate about creating visually appealing and
          effective designs that meet client needs. Proficient in Adobe Creative
          Suite and committed to delivering high-quality work on time.
        </p>
      </div>

      {/* Skills part  */}
      <div className='my-5 flex flex-col gap-3'>
        <h2 className='text-2xl font-semibold'>Skills</h2>
        <div className='flex flex-wrap gap-3'>
          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Graphic Design
          </span>

          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Branding
          </span>

          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Illustration
          </span>

          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Adobe Creative Suite
          </span>

          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Logo Design
          </span>

          <span className='bg-v2 px-3 py-1 rounded-full font-normal'>
            Visual Communication
          </span>
        </div>
      </div>

      {/* Client Reviews  */}

      <div className='my-5'>
        <h2 className='text-2xl font-semibold'>Client Reviews</h2>

        <div className='flex'>
          <div>
            <h3 className='text-3xl mt-5 font-bold'>4.8</h3>
            <div className='my-2'>
              <Rate className='!text-lg' disabled defaultValue={4} />
            </div>
            <p>25 reviews</p>
          </div>
        </div>

        {/*  Client Reviews Lists */}
        <div className='flex flex-col'>
          <div className='my-5'>
            <div className='flex gap-3 items-center'>
              <div className='w-12 h-12 bg-v2 overflow-hidden rounded-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                  alt=''
                />
              </div>
              <div>
                <h4 className='font-semibold'>Jamshid A.</h4>
                <p className='text-gray-500'>2 months ago</p>
              </div>
            </div>

            <div className='my-2'>
              <Rate className='!text-lg' disabled defaultValue={5} />
            </div>

            <p>
              Aisha delivered exceptional work, exceeding my expectations. Her
              creativity and attention to detail are commendable. I highly
              recommend her for any graphic design project.
            </p>

            <div className='flex gap-3 text-gray-500 my-5'>
              <div className='flex gap-2 items-center'>
                <ThumbsUp className='size-5' />
                <span>3</span>
              </div>

              <div className='flex items-center gap-3'>
                <ThumbsDown className='size-5' />
                <span>2</span>
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <div className='flex gap-3 items-center'>
              <div className='w-12 h-12 bg-v2 overflow-hidden rounded-full'>
                <img
                  className='h-full w-full object-cover'
                  src='https://enneagramtest.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F8yks3mvk%2Fproduction%2Ff11e5849429e0ee7daa6684e7d35e260487c8996-1999x1335.jpg%3Fw%3D850%26fm%3Dwebp&w=3840&q=75'
                  alt=''
                />
              </div>
              <div>
                <h4 className='font-semibold'>Nargiza S.</h4>
                <p className='text-gray-500'>4 months ago</p>
              </div>
            </div>

            <div className='my-2'>
              <Rate className='!text-lg' disabled defaultValue={5} />
            </div>

            <p>
              Aisha delivered exceptional work, exceeding my expectations. Her
              creativity and attention to detail are commendable. I highly
              recommend her for any graphic design project.
            </p>

            <div className='flex gap-3 text-gray-500 my-5'>
              <div className='flex gap-2 items-center'>
                <ThumbsUp className='size-5' />
                <span>3</span>
              </div>

              <div className='flex items-center gap-3'>
                <ThumbsDown className='size-5' />
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
