import Head from 'next/head';

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>ExpenX – Profile</title>
      </Head>

      <header className="bg-sunshade p-6 pb-10 text-white shadow-md">
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <div className="flex-1 px-4 -mt-4">
        <div className="bg-white rounded-[32px] p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">ExpenX User</h2>
              <p className="text-gray-400 text-sm">expenx@example.com</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <button className="w-full text-left p-4 bg-gray-50 rounded-2xl font-semibold text-gray-700 active:bg-gray-100 transition-colors">Currency: USD ($)</button>
            <button className="w-full text-left p-4 bg-gray-50 rounded-2xl font-semibold text-gray-700 active:bg-gray-100 transition-colors">Export Data (CSV)</button>
            <button className="w-full text-left p-4 bg-gray-50 rounded-2xl font-semibold text-valentine active:bg-valentine/10 transition-colors">Clear All Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}
