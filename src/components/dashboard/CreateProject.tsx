import { forwardRef, useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { FilePenLine, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { MultiSelect, frameworks } from '@/components/ui/multi-select';
import { DatePickerDemo } from '../ui/date-picker';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormData } from '@/lib/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import ShimmerText from '../ui/shimmerText';
import { GeneralTooltip } from '../ui/generalTooltip';
import api from '../../lib/axios';

interface Props {
  buttonText: string;
  initialData?: ProjectFormData & { id: string };
}

const CreateProject = forwardRef<HTMLButtonElement, Props>(
  ({ buttonText, initialData }, ref) => {
    const isEdit = Boolean(initialData);
    const [isOpen, setIsOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ProjectFormData>({
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: initialData?.title || '',
        budget: initialData?.budget || 0,
        description: initialData?.description || '',
        summary: initialData?.summary || '',
        deadline: initialData?.deadline ? new Date(initialData.deadline) : undefined,
        skillsRequired: initialData?.skillsRequired
          ? Array.isArray(initialData.skillsRequired)
            ? initialData.skillsRequired.map((skill) => {
                if (typeof skill === 'string') {
                  return skill;
                } else if (typeof skill === 'object' && skill !== null && 'value' in skill) {
                  return (skill as { value: string }).value;
                }
                return '';
              }).filter(skill => skill !== '')
            : []
          : [],
      },
    });

    // Edit rejimida MultiSelect uchun default qiymatlarni yuklash
    useEffect(() => {
      if (isEdit && isOpen && initialData) {
        // Ensure skillsRequired is properly formatted as string array
        const processedSkills = Array.isArray(initialData.skillsRequired)
          ? initialData.skillsRequired.map((skill) => {
              if (typeof skill === 'string') {
                return skill;
              } else if (typeof skill === 'object' && skill !== null && 'value' in skill) {
                return (skill as { value: string }).value;
              }
              return '';
            }).filter(skill => skill !== '')
          : [];

        // Debug log to check processed skills
        console.log('Processed skills for edit:', processedSkills);

        reset({
          title: initialData.title || '',
          budget: initialData.budget || 0,
          description: initialData.description || '',
          summary: initialData.summary || '',
          skillsRequired: processedSkills,
          deadline: initialData.deadline
            ? new Date(initialData.deadline)
            : undefined,
        });
      }
    }, [isEdit, isOpen, initialData, reset]);

    const notify = (type: 'success' | 'error') =>
      messageApi.open({
        type,
        content: isEdit ? 'Project updated!' : 'Project created!',
      });

    const mutation = useMutation({
      mutationFn: async (data: ProjectFormData) => {
        const url = isEdit ? `/order/${initialData!.id}` : '/order';
        const payload = {
          ...data,
          skillsRequired: data.skillsRequired.map((skill) =>
            typeof skill === 'object' && skill !== null && 'value' in skill
              ? (skill as { value: string }).value
              : skill
          ),
          deadline: data.deadline ? data.deadline.toISOString() : null,
        };

        if (isEdit) {
          return api.put(url, payload).then((res) => res.data);
        }
        return api.post(url, payload).then((res) => res.data);
      },
      onSuccess: () => {
        notify('success');
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        reset();
        setIsOpen(false);
      },
      onError: () => {
        notify('error');
      },
    });

    const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
      mutation.mutate(data);
    };

    return (
      <>
        {contextHolder}
        {isEdit ? (
          <GeneralTooltip content='Edit'>
            <button
              ref={ref}
              onClick={() => setIsOpen(true)}
              className='bg-v9 flex justify-center items-center text-white h-8 w-8 p-0.5 rounded-full'
            >
              <FilePenLine className='w-4 h-4' />
            </button>
          </GeneralTooltip>
        ) : (
          <button
            ref={ref}
            onClick={() => setIsOpen(true)}
            className='bg-v9 px-4 h-10 rounded-lg text-white'
          >
            {buttonText}
          </button>
        )}

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='relative z-[999]'
        >
          <DialogBackdrop className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
          <div className='fixed inset-0 z-[999] w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <DialogPanel className='w-full font-poppins max-w-2xl bg-white rounded-2xl p-8 relative'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='absolute top-4 right-4 p-2 rounded-full hover:bg-v2'
                >
                  <X />
                </button>

                <DialogTitle className='text-2xl font-medium mb-4'>
                  {isEdit ? 'Edit Project' : 'Create New Project'}
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  {[
                    { name: 'title', label: 'Project Title', type: 'text' },
                    { name: 'budget', label: 'Budget', type: 'number' },
                    {
                      name: 'description',
                      label: 'Description',
                      type: 'textarea',
                    },
                    { name: 'summary', label: 'Summary', type: 'textarea' },
                  ].map((f) => (
                    <div key={f.name}>
                      <Label htmlFor={f.name}>{f.label}</Label>
                      {f.type === 'textarea' ? (
                        <Textarea
                          id={f.name}
                          {...register(f.name as keyof ProjectFormData)}
                          className='bg-v2 shadow-none h-24 mt-2'
                        />
                      ) : (
                        <Input
                          id={f.name}
                          type={f.type}
                          {...register(
                            f.name as keyof ProjectFormData,
                            f.type === 'number'
                              ? { valueAsNumber: true }
                              : undefined
                          )}
                          className='bg-v2 shadow-none mt-2 h-10'
                        />
                      )}
                      {errors[f.name as keyof ProjectFormData] && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors[f.name as keyof ProjectFormData]?.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <Label htmlFor='deadline'>Deadline</Label>
                    <Controller
                      name='deadline'
                      control={control}
                      render={({ field }) => (
                        <DatePickerDemo
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.deadline && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='skills'>Skills</Label>
                    <Controller
                      name='skillsRequired'
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          options={frameworks}
                          selected={field.value || []}
                          onChange={field.onChange}
                          className='mt-2 h-10 w-full'
                        />
                      )}
                    />
                    {errors.skillsRequired && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.skillsRequired.message}
                      </p>
                    )}
                  </div>

                  <button
                    type='submit'
                    disabled={mutation.isPending}
                    className='bg-v9 w-full text-base h-10 text-white font-medium rounded-md relative'
                  >
                    {mutation.isPending ? (
                      <ShimmerText
                        text={isEdit ? 'Updating...' : 'Submitting...'}
                      />
                    ) : isEdit ? (
                      'Update Project'
                    ) : (
                      'Submit Project'
                    )}
                  </button>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
);

CreateProject.displayName = 'CreateProject';
export default CreateProject;
