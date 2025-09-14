import { Link, useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen font-poppins flex items-center justify-center bg-white'>
      <div className='max-w-lg w-full px-6'>
        <div className='text-center space-y-8'>
          {/* Minimal 404 text */}
          <div className='space-y-2'>
            <h1 className='text-9xl font-extralight font-space-grotesk text-gray-900 tracking-tighter'>
              404
            </h1>
            <div className='w-12 h-px bg-gray-900 mx-auto'></div>
          </div>

          {/* Clean message */}
          <div className='space-y-4'>
            <h2 className='text-xl font-light text-gray-900 tracking-wide'>
              Page not found
            </h2>
            <p className='text-gray-500 font-light leading-relaxed max-w-sm mx-auto'>
              The requested page could not be located.
            </p>
          </div>

          {/* Minimal actions */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
            <Link
              to='/'
              className='group inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200'
            >
              Home
            </Link>

            <button
              onClick={() => navigate(-1)}
              className='group inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-200'
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
