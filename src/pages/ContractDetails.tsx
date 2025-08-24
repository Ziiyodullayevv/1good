import {
  Clock,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  MessageCircle,
  ArrowLeft,
  AlertCircle,
  Download,
  Shield,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton Component
function ContractDetailsSkeleton() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate(-1)}
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

      <div className='mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main */}
          <div className='lg:col-span-2 space-y-4'>
            <div className='bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <Skeleton className='h-8 w-3/4 mb-4' />
                <Skeleton className='h-8 w-24 rounded-full mb-6' />
                <div className='space-y-2 mb-6'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className='space-y-4'>
            <div className='bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden p-6'>
              <Skeleton className='w-16 h-16 rounded-full mb-4' />
              <Skeleton className='w-full h-12 rounded-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContractDetails() {
  const navigate = useNavigate();
  const { contractSlug } = useParams();

  const {
    data: contract,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['contract', contractSlug],
    queryFn: async () => {
      const res = await api.get('/contract/' + contractSlug);
      return res.data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} />;
      case 'active':
      case 'completed':
        return <CheckCircle size={18} />;
      case 'cancelled':
        return <XCircle size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'partial':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) =>
    dayjs(dateString).format('MMMM D, YYYY');

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  if (isLoading) return <ContractDetailsSkeleton />;
  if (isError || !contract) return <div>Error loading contract</div>;

  return (
    <div className='min-h-screen text-base bg-white rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <h1 className='text-xl font-semibold text-gray-900'>
              Contract Details
            </h1>
          </div>
        </div>
      </div>

      <div className='mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Main */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Info */}
            <div className='bg-gray-50 rounded-2xl border border-gray-100 p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                {contract?.scopeOfWork ?? 'No scope provided'}
              </h2>

              <div className='flex flex-wrap gap-3 mb-6'>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                    contract?.status ?? ''
                  )}`}
                >
                  {getStatusIcon(contract?.status ?? '')}
                  <span className='font-medium capitalize'>
                    {contract?.status ?? 'Unknown'}
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getPaymentStatusColor(
                    contract?.paymentStatus ?? ''
                  )}`}
                >
                  <DollarSign size={18} />
                  <span className='font-medium capitalize'>
                    {contract?.paymentStatus ?? 'Unknown'}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-green-100 rounded-lg'>
                    <DollarSign size={20} className='text-green-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Agreed Budget</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {contract?.agreedBudget
                        ? formatCurrency(contract.agreedBudget)
                        : '—'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-100 rounded-lg'>
                    <Calendar size={20} className='text-blue-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Deadline</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {contract?.agreedDeadline
                        ? formatDate(contract.agreedDeadline)
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            {contract?.terms && (
              <div className='bg-gray-50 rounded-2xl border border-gray-100 p-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-purple-100 rounded-lg'>
                    <Shield size={20} className='text-purple-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Terms & Conditions
                  </h3>
                </div>
                <div className='bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-purple-100'>
                  <p className='text-gray-700 leading-relaxed'>
                    {contract?.terms}
                  </p>
                </div>
              </div>
            )}

            {/* Attachments */}
            {contract?.attachments?.length > 0 && (
              <div className='bg-gray-50 rounded-2xl border border-gray-100 p-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-orange-100 rounded-lg'>
                    <FileText size={20} className='text-orange-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Attachments
                  </h3>
                </div>
                <div className='space-y-3'>
                  {contract.attachments.map((file: string, i: number) => (
                    <div
                      key={i}
                      className='flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200'
                    >
                      <div className='flex items-center gap-3'>
                        <FileText size={20} className='text-gray-500' />
                        <span className='text-gray-700'>{file}</span>
                      </div>
                      <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dispute */}
            {contract?.dispute && (
              <div className='bg-red-50 rounded-2xl border border-red-200 p-8'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-red-100 rounded-lg'>
                    <AlertCircle size={20} className='text-red-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-red-900'>
                    Dispute Status
                  </h3>
                </div>
                <div className='bg-white rounded-xl p-6 border border-red-200'>
                  <p className='text-red-700'>
                    {contract.dispute.resolved
                      ? 'This dispute has been resolved.'
                      : 'There is an active dispute for this contract.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-4'>
            {/* Client */}
            {contract?.clientId && (
              <div className='bg-gray-50 rounded-2xl border border-gray-100 p-6'>
                <h4 className='text-sm font-medium text-gray-600 mb-4'>
                  Client
                </h4>
                <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                    {contract?.clientId?.firstName?.[0] ?? '?'}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {contract?.clientId?.firstName ?? ''}{' '}
                      {contract?.clientId?.lastName ?? ''}
                    </h3>
                    <p className='text-sm text-gray-600'>
                      {contract?.clientId?.email ?? 'No email'}
                    </p>
                  </div>
                </div>
                <button className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center gap-2'>
                  <MessageCircle size={18} />
                  Message Client
                </button>
              </div>
            )}

            {/* Freelancer */}
            {contract?.freelancerId && (
              <div className='bg-gray-50 rounded-2xl border border-gray-100 p-6'>
                <h4 className='text-sm font-medium text-gray-600 mb-4'>
                  Freelancer
                </h4>
                <div className='flex border-b pb-6 items-center gap-4 mb-6'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                    {contract?.freelancerId?.firstName?.[0] ?? '?'}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {contract?.freelancerId?.firstName ?? ''}{' '}
                      {contract?.freelancerId?.lastName ?? ''}
                    </h3>
                    <p className='text-sm text-gray-600'>
                      {contract?.freelancerId?.email ?? 'No email'}
                    </p>
                  </div>
                </div>
                <button className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2'>
                  <MessageCircle size={18} />
                  Message Freelancer
                </button>
              </div>
            )}

            {/* Budget */}
            <div className='bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg'>
              <div className='flex items-center gap-3 mb-2'>
                <DollarSign size={24} />
                <h3 className='text-lg font-semibold'>Contract Value</h3>
              </div>
              <p className='text-3xl font-bold'>
                {contract?.agreedBudget
                  ? formatCurrency(contract.agreedBudget)
                  : '—'}
              </p>
              <p className='text-green-100 text-sm mt-1'>Total agreed amount</p>
            </div>

            {/* Timeline */}
            <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg'>
              <div className='flex items-center gap-3 mb-2'>
                <Calendar size={24} />
                <h3 className='text-lg font-semibold'>Timeline</h3>
              </div>
              <div className='space-y-2'>
                <div>
                  <p className='text-sm text-purple-100'>Created</p>
                  <p className='font-semibold'>
                    {contract?.createdAt ? formatDate(contract.createdAt) : '—'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-purple-100'>Deadline</p>
                  <p className='font-semibold'>
                    {contract?.agreedDeadline
                      ? formatDate(contract.agreedDeadline)
                      : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
