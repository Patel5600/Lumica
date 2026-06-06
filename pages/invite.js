import Head from 'next/head';

export default function Budget() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>ExpenX – Budget</title>
      </Head>

      <header className="bg-sunshade p-6 pb-10 text-white shadow-md">
        <h1 className="text-xl font-bold">Budget</h1>
      </header>

      <div className="flex-1 px-4 -mt-4">
        <div className="bg-white rounded-[32px] p-8 shadow-sm text-center">
          <div className="w-20 h-20 bg-ube/10 rounded-full flex items-center justify-center text-ube mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v-1" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Budget Tracking</h2>
          <p className="text-gray-400 text-sm">Set monthly limits for your categories and stay on track. (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
