import {
  Clock,
  DollarSign,
  Send,
  CheckCircle,
  XCircle,
  Calendar,
  MessageCircle,
  ArrowLeft,
  Check,
  X,
} from 'lucide-react';
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton Component
function SubmissionDetailsSkeleton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={goBack}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <div>
              <Skeleton className='h-6 w-48' />
            </div>
          </div>
        </div>
      </div>

      <div className=' mx-auto px-6 py-8'>
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
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-10 w-10 rounded-lg' />
                    <div className='space-y-1'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-5 w-16' />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-10 w-10 rounded-lg' />
                    <div className='space-y-1'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-5 w-20' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Message */}
            <div className='bg-gray-50 rounded-2xl overflow-hidden'>
              <div className='p-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <Skeleton className='h-10 w-10 rounded-lg' />
                  <Skeleton className='h-6 w-48' />
                </div>
                <div className='bg-gradient-to-r bg-white rounded-xl p-6'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-4'>
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-3 w-20' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='bg-v2 rounded-2xl border border-gray-100 p-6'>
              <Skeleton className='h-5 w-16 mb-4' />
              <div className='flex flex-col sm:flex-row gap-4'>
                <Skeleton className='flex-1 h-12 rounded-xl' />
                <Skeleton className='flex-1 h-12 rounded-xl' />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-4'>
            {/* Freelancer Profile */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-6'>
                <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                  <Skeleton className='w-16 h-16 rounded-full' />
                  <div className='flex-1'>
                    <Skeleton className='h-5 w-32 mb-1' />
                  </div>
                </div>

                {/* Skills */}
                <div className='mb-6'>
                  <Skeleton className='h-4 w-12 mb-3' />
                  <div className='flex flex-wrap gap-2'>
                    <Skeleton className='h-6 w-16 rounded-full' />
                    <Skeleton className='h-6 w-20 rounded-full' />
                    <Skeleton className='h-6 w-14 rounded-full' />
                    <Skeleton className='h-6 w-18 rounded-full' />
                    <Skeleton className='h-6 w-22 rounded-full' />
                  </div>
                </div>

                {/* Message Button */}
                <Skeleton className='w-full h-12 rounded-xl' />
              </div>
            </div>

            {/* Price Card */}
            <div className='bg-gradient-to-br from-v2 to-emerald-v2 rounded-2xl p-6 text-white shadow-lg'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-6 h-6 bg-white rounded' />
                <div className='h-5 w-20 bg-white rounded' />
              </div>
              <div className='h-8 w-24 bg-white rounded mb-1' />
              <div className='h-3 w-28 bg-white rounded' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubmissionDetails() {
  // const [submissionStatus, setSubmissionStatus] = useState('pending');
  const navigate = useNavigate();
  const { submissionSlug } = useParams();

  // 🟢 Submissionni olish
  const {
    data: submission,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['submission', submissionSlug],
    queryFn: async () => {
      const res = await api.get('/submission/' + submissionSlug);
      return res.data;
    },
  });

  // 🟢 Freelancer ma'lumotlarini olish
  const {
    data: freelancer,
    isLoading: freelancerLoading,
    isError: freelancerError,
  } = useQuery({
    enabled: !!submission?.freelancer?._id,
    queryKey: ['user', submission?.freelancer?._id],
    queryFn: async () => {
      const res = await api.get('/user/' + submission.freelancer._id);
      return res.data;
    },
  });

  // Helper funksiyalar
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
        return <Send size={18} />;
    }
  };

  // const handleAccept = () => {
  //   setSubmissionStatus('approved');
  //   console.log('Submission accepted');
  // };

  // const handleReject = () => {
  //   setSubmissionStatus('rejected');
  // };

  // 🟢 Sana va Summa formatlash (faqat inglizcha)
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMMM D, YYYY');
    // Example: September 30, 2025
  };

  const formatTime = (dateString: string) => {
    return dayjs(dateString).format('hh:mm A');
    // Example: 05:29 AM
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
    // Example: $1,000
  };

  const goBack = () => {
    navigate(-1);
  };

  // Loading state - show skeleton
  if (isLoading) {
    return <SubmissionDetailsSkeleton />;
  }

  if (isError) return <div>Error loading submission</div>;

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={goBack}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>
                Taklif tafsilotlari
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className=' mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Project Info */}
            <div className='bg-v2 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {submission.order.title}
                </h2>
                <div
                  className={`inline-flex text-base items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                    submission.status
                  )}`}
                >
                  {getStatusIcon(submission.status)}
                  <span className='font-medium capitalize'>
                    {submission.status}
                  </span>
                </div>

                <p className='text-gray-700 leading-relaxed my-6'>
                  {submission.order.description}
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-green-100 rounded-lg'>
                      <DollarSign size={20} className='text-green-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Byudjet</p>
                      <p className='text-lg font-bold text-gray-900'>
                        {formatCurrency(submission.order.budget)}
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
                        {formatDate(submission.order.deadline)}
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
                <div className='bg-gradient-to-r from-gray-50 to-blue-50  rounded-xl p-6 border border-indigo-100'>
                  <p className='text-gray-700 leading-relaxed'>
                    {submission.message}
                  </p>
                </div>
                <div className='flex items-center justify-between mt-4 text-sm text-gray-500'>
                  <div className='flex items-center gap-4'>
                    <span>Sent: {formatDate(submission.submittedAt)}</span>
                    <span>{formatTime(submission.submittedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {submission.status === 'pending' && (
              <div className='bg-v2 rounded-2xl border border-gray-100 p-6'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                  Actions
                </h4>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <button
                    // onClick={handleAccept}
                    className='flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center gap-2'
                  >
                    <Check size={20} />
                    Accept Submission
                  </button>
                  <button
                    // onClick={handleReject}
                    className='flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2'
                  >
                    <X size={20} />
                    Reject Submission
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
                  <>
                    <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                      <Skeleton className='w-16 h-16 rounded-full' />
                      <div className='flex-1'>
                        <Skeleton className='h-5 w-32 mb-1' />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className='mb-6'>
                      <Skeleton className='h-4 w-12 mb-3' />
                      <div className='flex flex-wrap gap-2'>
                        <Skeleton className='h-6 w-16 rounded-full' />
                        <Skeleton className='h-6 w-20 rounded-full' />
                        <Skeleton className='h-6 w-14 rounded-full' />
                        <Skeleton className='h-6 w-18 rounded-full' />
                      </div>
                    </div>

                    {/* Message Button */}
                    <Skeleton className='w-full h-12 rounded-xl' />
                  </>
                ) : freelancerError ? (
                  <p>Error loading freelancer data</p>
                ) : (
                  <>
                    <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                      <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                        {freelancer.firstName[0]}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {freelancer.firstName} {freelancer.lastName}
                        </h3>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className='mb-6'>
                      <h4 className='text-sm font-medium text-gray-900 mb-3'>
                        Skills
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {freelancer.skills?.map(
                          (skill: string, index: number) => (
                            <span
                              key={index}
                              className='px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200'
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Message Button */}
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
                {formatCurrency(submission.price)}
              </p>
              <p className='text-green-100 text-sm mt-1'>Total project cost</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
