export default function TalentProfilePage() {
  return (
    <div className='bg-gray-100 min-h-screen py-10 sm:py-20'>
      {/* Header Card */}
      <div className='section-container'>
        <div className='bg-white rounded-2xl p-6 mb-10 grid grid-cols-2 gap-8'>
          {/* Image Placeholder */}
          <div className='w-full h-full bg-gray-200 rounded-md flex items-center justify-center'>
            <span className='text-gray-400 text-xl'>Image</span>
          </div>

          {/* Info Section */}
          <div className='flex-1 space-y-2'>
            <h2 className='text-3xl font-bold'>Full Name</h2>

            <div className='flex gap-2'>
              <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                Frontend
              </span>
              <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                Backend
              </span>
            </div>

            <h3 className='text-lg font-semibold text-gray-700'>
              Senior Frontend Developer
            </h3>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Label
                </label>
                <div className='mt-1 border rounded px-3 py-1 bg-gray-50'>
                  Value
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Label
                </label>
                <div className='mt-1 border rounded px-3 py-1 bg-gray-50'>
                  Value
                </div>
              </div>
            </div>

            <button className='mt-3 px-4 py-2 bg-black text-white rounded'>
              Button
            </button>

            <div>
              <label className='block text-sm font-medium text-gray-600 mt-3'>
                Title
              </label>
              <p className='text-gray-500 text-sm mt-1'>
                Answer the frequently asked question in a single sentence, a
                longish paragraph, or even a list.
              </p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <section className='mb-10'>
          <h3 className='text-lg font-semibold mb-4'>Projects</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='bg-white p-4 rounded shadow'>
                <div className='flex items-center gap-2 text-yellow-400 mb-2'>
                  {'★★★★★'}
                </div>
                <h4 className='font-semibold'>Task</h4>
                <p className='text-sm text-gray-600'>Tags: Frontend, Backend</p>
                <div className='flex items-center gap-2 mt-2'>
                  <div className='w-6 h-6 rounded-full bg-gray-300'></div>
                  <span className='text-sm text-gray-500'>Client Name</span>
                </div>
                <p className='text-xs text-gray-400'>Date</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h3 className='text-lg font-semibold mb-4'>Reviews</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='bg-white p-4 rounded shadow'>
                <h4 className='font-semibold'>Review title</h4>
                <p className='text-sm text-gray-600 mb-2'>Review body</p>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full bg-gray-300'></div>
                  <span className='text-sm text-gray-500'>Reviewer name</span>
                </div>
                <p className='text-xs text-gray-400'>Date</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
