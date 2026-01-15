import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">PhishGuard</span>
          </div>
          <button
            onClick={() => navigate('/scanner')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            Launch Scanner
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48">
          <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="white">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
        <div className="max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            AI-Powered Security
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white leading-tight">
            Stop Phishing Attacks
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Before They Start</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced AI detection powered by BERT to protect you from malicious emails and suspicious URLs
          </p>
          <button
            onClick={() => navigate('/scanner')}
            className="bg-white text-blue-600 font-semibold py-4 px-10 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Scanning Now
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to stay protected</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0" style={{width: 'calc(100% - 12rem)', left: '6rem'}} />
            
            <div className="text-center group relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Input Content</h3>
              <p className="text-gray-600 text-lg">Paste email text or enter a suspicious URL</p>
            </div>
            <div className="text-center group relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600 text-lg">BERT model analyzes patterns instantly</p>
            </div>
            <div className="text-center group relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Get Results</h3>
              <p className="text-gray-600 text-lg">Receive detailed risk assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to stay secure</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Text Analysis</h3>
              <p className="text-gray-600">Advanced NLP to detect phishing patterns in email content</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">URL Scanning</h3>
              <p className="text-gray-600">Identify malicious links and suspicious domains</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Scan History</h3>
              <p className="text-gray-600">Track and review all your previous scans</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Detection</h3>
              <p className="text-gray-600">Instant results with high accuracy scores</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">BERT transformer model for accurate predictions</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Secure & Private</h3>
              <p className="text-gray-600">Your data is processed with privacy in mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-xl font-bold">PhishGuard</span>
          </div>
          <p className="text-gray-400 mb-2">© {new Date().getFullYear()} PhishGuard. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Powered by AI & Machine Learning</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
