import SubmissionSteps from './SubmissionSteps';
import SubmissionStepOne from './SubmissionStepOne';
import SubmissionStepTwo from './SubmissionStepTwo';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Submission, Freelancer } from './types';

export default function SubmissionDetails() {
  const { submissionSlug } = useParams<{ submissionSlug: string }>();

  // Submissionni olish
  const {
    data: submission,
    isLoading: submissionLoading,
    isError: submissionError,
  } = useQuery<Submission>({
    queryKey: ['submission', submissionSlug],
    queryFn: async () => {
      const res = await api.get('/submission/' + submissionSlug);
      return res.data;
    },
  });

  // Freelancer ma'lumotlarini olish
  const {
    data: freelancer,
    isLoading: freelancerLoading,
    isError: freelancerError,
  } = useQuery<Freelancer>({
    enabled: !!submission?.freelancer?._id,
    queryKey: ['user', submission?.freelancer?._id],
    queryFn: async () => {
      const res = await api.get('/user/' + submission!.freelancer!._id);
      return res.data;
    },
  });

  console.log(submission, freelancer);
  return (
    <SubmissionSteps
      steps={[
        <SubmissionStepOne
          submission={submission}
          submissionLoading={submissionLoading}
          submissionError={submissionError}
          freelancer={freelancer}
          freelancerLoading={freelancerLoading}
          freelancerError={freelancerError}
        />,
        <SubmissionStepTwo
          submission={submission}
          submissionLoading={submissionLoading}
          submissionError={submissionError}
          freelancer={freelancer}
          freelancerLoading={freelancerLoading}
          freelancerError={freelancerError}
        />,
      ]}
      sharedProps={{}}
    />
  );
}
