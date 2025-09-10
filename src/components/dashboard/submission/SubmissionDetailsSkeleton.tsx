import { Skeleton } from '@/components/ui/skeleton';

export default function SubmissionDetailsSkeleton() {
  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      <div className='mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Project Info */}
            <div className='bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <Skeleton className='h-8 w-3/4 mb-4' />
                <Skeleton className='h-8 w-24 rounded-full mb-6' />

                <div className='space-y-2 mb-6'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100'>
                  <Skeleton className='h-10 w-full rounded-lg' />
                  <Skeleton className='h-10 w-full rounded-lg' />
                </div>
              </div>
            </div>

            {/* Submission Message */}
            <div className='bg-gray-50 rounded-2xl overflow-hidden'>
              <div className='p-8'>
                <Skeleton className='h-6 w-48 mb-4' />
                <div className='bg-white rounded-xl p-6'>
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-full mb-2' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='bg-v2 rounded-2xl border border-gray-100 p-6'>
              <Skeleton className='h-5 w-16 mb-4' />
              <Skeleton className='h-12 w-full rounded-xl' />
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-4'>
            {/* Freelancer Profile */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-6'>
                <Skeleton className='w-16 h-16 rounded-full mb-4' />
                <Skeleton className='h-5 w-32 mb-2' />
                <Skeleton className='h-6 w-full rounded-xl' />
              </div>
            </div>

            {/* Price Card */}
            <div className='bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg'>
              <Skeleton className='h-8 w-24 mb-2' />
              <Skeleton className='h-10 w-full rounded-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
