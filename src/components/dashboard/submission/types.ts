// 🔹 Submission interfeysi
export interface Submission {
  _id: string;
  order: {
    _id: string;
    title: string;
    description: string;
    budget: number;
    deadline: string; // ISO string
  };
  message: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  price: number;
  submittedAt: string; // ISO string
  freelancer?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

// 🔹 Freelancer interfeysi
export interface Freelancer {
  _id: string;
  firstName: string;
  lastName: string;
  skills?: string[];
}

// 🔹 Step 1 Props
export interface SubmissionStepOneProps {
  submission?: Submission;
  submissionLoading?: boolean;
  submissionError?: boolean;
  freelancer?: Freelancer;
  freelancerLoading?: boolean;
  freelancerError?: boolean;
  goNext?: () => void;
}

// 🔹 Step 2 Props (agar keyingi step uchun ham kerak bo‘lsa)
export interface SubmissionStepTwoProps {
  submission?: Submission;
  submissionLoading?: boolean;
  submissionError?: boolean;
  freelancer?: Freelancer;
  freelancerLoading?: boolean;
  freelancerError?: boolean;
  goNext?: () => void;
  goBack?: () => void;
}

// 🔹 Umumiy StepProps tipi
export type StepProps = SubmissionStepOneProps & SubmissionStepTwoProps;
