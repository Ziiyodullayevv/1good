import {
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import dayjs from 'dayjs';
import { SubmissionStepOneProps } from './types';
import SubmissionDetailsSkeleton from './SubmissionDetailsSkeleton';

export default function SubmissionStepOne({
  submission,
  submissionLoading,
  submissionError,
  freelancer,
  freelancerLoading,
  freelancerError,
  goNext,
}: SubmissionStepOneProps) {
  if (submissionLoading)
    return (
      <div>
        <SubmissionDetailsSkeleton />
      </div>
    );
  if (submissionError) return <div>Error loading submission</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} />;
      case 'approved':
        return <CheckCircle size={18} />;
      case 'rejected':
        return <XCircle size={18} />;
      default:
        return <DollarSign size={18} />;
    }
  };

  const formatDate = (dateString: string) =>
    dayjs(dateString).format('MMMM D, YYYY');
  const formatTime = (dateString: string) =>
    dayjs(dateString).format('hh:mm A');
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      <div className='mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Project Info */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {submission!.order.title}
                </h2>
                <div
                  className={`inline-flex text-base items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(submission!.status)}`}
                >
                  {getStatusIcon(submission!.status)}
                  <span className='font-medium capitalize'>
                    {submission!.status}
                  </span>
                </div>

                <p className='text-gray-700 leading-relaxed my-6'>
                  {submission!.order.description}
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-green-100 rounded-lg'>
                      <DollarSign size={20} className='text-green-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Byudjet</p>
                      <p className='text-lg font-bold text-gray-900'>
                        {formatCurrency(submission!.order.budget)}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                      <Calendar size={20} className='text-blue-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Muddat</p>
                      <p className='text-lg font-bold text-gray-900'>
                        {formatDate(submission!.order.deadline)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Message */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-indigo-100 rounded-lg'>
                    <MessageCircle size={20} className='text-indigo-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Freelancer Message:
                  </h3>
                </div>
                <div className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-indigo-100'>
                  <p className='text-gray-700 leading-relaxed'>
                    {submission!.message}
                  </p>
                </div>
                <div className='flex items-center justify-between mt-4 text-sm text-gray-500'>
                  <div className='flex items-center gap-4'>
                    <span>Sent: {formatDate(submission!.submittedAt)}</span>
                    <span>{formatTime(submission!.submittedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {submission!.status === 'pending' && (
              <div className='bg-v2 rounded-2xl border border-gray-100 p-6'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                  Action
                </h4>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <button
                    onClick={goNext}
                    className='flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center gap-2'
                  >
                    View Contract
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-4'>
            {/* Freelancer Profile */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-6'>
                {freelancerLoading ? (
                  <Skeleton className='h-64' />
                ) : freelancerError ? (
                  <p>Error loading freelancer data</p>
                ) : (
                  <>
                    <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                      <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                        {freelancer!.firstName[0]}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {freelancer!.firstName} {freelancer!.lastName}
                        </h3>
                      </div>
                    </div>

                    <div className='mb-6'>
                      <h4 className='text-sm font-medium text-gray-900 mb-3'>
                        Skills
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {freelancer!.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className='px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2'>
                      <MessageCircle size={18} />
                      Send Message
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Price Card */}
            <div className='bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg'>
              <div className='flex items-center gap-3 mb-2'>
                <DollarSign size={24} />
                <h3 className='text-lg font-semibold'>Offer Price</h3>
              </div>
              <p className='text-3xl font-bold'>
                {formatCurrency(submission!.price)}
              </p>
              <p className='text-green-100 text-sm mt-1'>Total project cost</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
