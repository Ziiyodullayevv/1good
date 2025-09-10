import dayjs from 'dayjs';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { SubmissionStepTwoProps } from './types';
import { Skeleton } from '@/components/ui/skeleton'; // import qilamiz
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export default function SubmissionStepTwo({
  submission,
  submissionLoading,
  submissionError,
  freelancer,
  freelancerLoading,
  freelancerError,
}: SubmissionStepTwoProps) {
  const [agreements, setAgreements] = useState({
    reviewed: false,
    confirmed: false,
  });

  const navigate = useNavigate();

  const formatDate = (dateString: string) =>
    dayjs(dateString).format('MMMM D, YYYY');

  const handleCheckboxChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isConfirmed = agreements.reviewed && agreements.confirmed;

  // 🔹 Contract yuborish mutation
  const contractMutation = useMutation({
    mutationFn: async () => {
      if (!submission || !freelancer) throw new Error('Missing data');

      const payload = {
        orderId: submission?.order._id,
        clientId: freelancer._id,
        freelancerId: submission.freelancer?._id || '',
        agreedBudget: submission.price,
        agreedDeadline: submission.order.deadline,
        scopeOfWork: submission.order.description,
        terms: 'Ish tugagandan so‘ng to‘lov amalga oshiriladi',
        status: 'pending',
        paymentStatus: 'unpaid',
        attachments: [],
      };

      const res = await api.post('/contract', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Contract successfully created!');
      navigate('/dashboard/contract');
    },
    onError: () => {
      toast.error('Error creating contract');
    },
  });

  if (submissionLoading || freelancerLoading) {
    return <SubmissionStepTwoSkeleton />;
  }

  if (submissionError || freelancerError) {
    return (
      <p className='p-6 text-red-500'>{submissionError || freelancerError}</p>
    );
  }

  if (!submission || !freelancer) {
    return <p className='p-6'>No data available</p>;
  }

  return (
    <div className='w-full bg-white rounded-xl p-6'>
      {/* Title */}
      <h1 className='text-2xl font-bold text-gray-900 mb-2'>
        Review your contract
      </h1>
      <p className='text-gray-600 mb-6'>
        Please review the contract details below. Once you’re satisfied, both
        you and the freelancer must confirm to proceed.
      </p>

      {/* Project Details */}
      <section>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>
          Project Details
        </h2>
        <div className='divide-y border capitalize rounded-md'>
          <DetailRow label='Project Title' value={submission.order.title} />
          <DetailRow
            label='Freelancer'
            value={`${submission?.freelancer?.firstName} ${submission?.freelancer?.lastName}`}
          />
          <DetailRow
            label='Client'
            value={`${freelancer?.firstName} ${freelancer?.lastName}`}
          />
          <DetailRow label='Project Type' value={'Web Development'} />
          {/* <DetailRow
            label='Scope of Work'
            value={submission.order.description}
          /> */}
          <DetailRow
            label='Payment Terms'
            value={'Ish tugagandan so‘ng (upon completion)'}
          />
          <DetailRow
            label='Deadline'
            value={formatDate(submission.order.deadline)}
          />
        </div>
      </section>

      {/* Checkboxes */}
      <div className='mt-6 space-y-3'>
        <Checkbox
          checked={agreements.reviewed}
          onChange={() => handleCheckboxChange('reviewed')}
          label='I have reviewed and agree to the terms of this contract.'
        />
        <Checkbox
          checked={agreements.confirmed}
          onChange={() => handleCheckboxChange('confirmed')}
          label='I confirm that all project details are accurate.'
        />
      </div>

      {/* Buttons */}
      <div className='mt-8 flex gap-4'>
        <button
          disabled={!isConfirmed || contractMutation.status === 'pending'}
          onClick={() => {
            contractMutation.mutate();
          }}
          className='flex-1 px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white shadow hover:brightness-95 disabled:opacity-50'
        >
          {contractMutation.status === 'pending'
            ? 'Submitting...'
            : 'Confirm and Proceed'}
        </button>
        <button className='flex-1 px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300'>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* Skeleton Component */
function SubmissionStepTwoSkeleton() {
  return (
    <div className='w-full bg-white rounded-xl p-6 space-y-4'>
      <Skeleton className='h-8 w-3/4 mb-2' />
      <Skeleton className='h-4 w-1/2 mb-6' />
      <div className='divide-y border rounded-md'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='flex justify-between px-4 py-3'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-24' />
          </div>
        ))}
      </div>
      <div className='space-y-3 mt-6'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='flex gap-4 mt-6'>
        <Skeleton className='h-10 flex-1' />
        <Skeleton className='h-10 flex-1' />
      </div>
    </div>
  );
}

/* Reusable Row Component */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-start justify-between px-4 py-3'>
      <span className='text-sm font-medium text-blue-600'>{label}</span>
      <span className='text-sm text-gray-800'>{value}</span>
    </div>
  );
}

/* Reusable Checkbox Component */
function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className='flex items-center gap-2 text-gray-700'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
      />
      {label}
    </label>
  );
}
