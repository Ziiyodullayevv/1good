import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { Building2, Star, Trophy, FileSignature, Users } from 'lucide-react';

const iconMap = {
  Building2: <Building2 className='size-10' />,
  Star: <Star className='size-10' />,
  FileSignature: <FileSignature className='size-10' />,
  Users: <Users className='size-10' />,
  Trophy: <Trophy className='size-10' />,
};

type BuildingItem = {
  id: string;
  iconType: keyof typeof iconMap;
  description: string;
};

export default function Building() {
  const { t } = useTranslation('about');
  const buildingData = t('buildingComp.buildingData', {
    returnObjects: true,
  }) as BuildingItem[];

  if (!Array.isArray(buildingData)) {
    console.warn('buildingData is not an array:', buildingData);
    return null;
  }

  return (
    <section className='py-10 sm:py-20'>
      <div className='section-container'>
        <SectionTitle
          className='max-w-[459px]'
          title={t('buildingComp.title')}
          description={t('buildingComp.subTitle')}
        />

        <div className='grid mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {buildingData.map(({ id, description, iconType }) => (
            <div key={id}>
              <span className='h-[40px] rounded-t-3xl w-full inline-block border border-b-transparent border-black'></span>
              <div className='px-5 text-center'>
                <div className='flex justify-center'>{iconMap[iconType]}</div>
                <p className='mt-5'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
