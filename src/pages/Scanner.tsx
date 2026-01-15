import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, TrashIcon, LinkIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import type { ScanResult, HistoryItem } from "../types";

function isValidUrl(string: string) {
  const urlString = string.startsWith('http://') || string.startsWith('https://') ? string : 'http://' + string;
  try {
    new URL(urlString);
    return urlString.split('://')[1].includes('.');
  } catch (_) {
    return false;
  }
}

function Scanner() {
  const navigate = useNavigate();
  const [scanType, setScanType] = useState<'text' | 'url'>('text');
  const [emailText, setEmailText] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const clearHistoryData = async () => {
    try {
      await axios.post('http://localhost:8000/clear-history');
      setHistory([]);
    } catch (err) {
      setError("Failed to clear history");
    }
  };

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    if (scanType === 'text' && !emailText.trim()) {
      setError("Please enter email content");
      setLoading(false);
      return;
    }
    if (scanType === 'url' && (!urlInput.trim() || !isValidUrl(urlInput))) {
      setError("Please enter a valid URL");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (scanType === 'text') {
        response = await axios.post("http://localhost:8000/scan", {
          content_type: "text",
          text_content: emailText
        });
        setEmailText("");
      } else {
        let urlToSend = urlInput.startsWith('http') ? urlInput : 'http://' + urlInput;
        response = await axios.post("http://localhost:8000/scan", {
          content_type: "url",
          url: urlToSend
        });
        setUrlInput("");
      }
      
      if (response) {
        setResult(response.data);
        await fetchHistory();
      }
    } catch (error: any) {
      setError(axios.isAxiosError(error) && error.response?.data?.detail ? error.response.data.detail : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      high: "bg-red-50 border-red-200 text-red-700",
      medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
      low: "bg-green-50 border-green-200 text-green-700"
    };
    return colors[risk.toLowerCase() as keyof typeof colors] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  const getRiskIcon = (risk: string, size = "md") => {
    const sizes = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10", xl: "w-14 h-14" };
    const cls = sizes[size as keyof typeof sizes];

    if (risk.toLowerCase() === "high") {
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
    }
    if (risk.toLowerCase() === "medium") {
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
    return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">PhishGuard</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Security Scanner
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-3 leading-tight">Phishing Scanner</h1>
          <p className="text-xl text-gray-600">Analyze emails and URLs for potential threats</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scan Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Scan Content</h2>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setScanType("text")}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
                  scanType === "text" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <DocumentTextIcon className="w-5 h-5" />
                Text
              </button>
              <button
                onClick={() => setScanType("url")}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
                  scanType === "url" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <LinkIcon className="w-5 h-5" />
                URL
              </button>
            </div>

            {scanType === "text" ? (
              <textarea
                className="w-full h-48 p-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Paste suspicious email content..."
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter URL (e.g., example.com)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            )}

            <button
              onClick={handleScan}
              disabled={loading}
              className={`w-full mt-6 py-4 rounded-xl text-white font-semibold transition-all ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl text-center border border-red-200">
                {error}
              </div>
            )}

            {result && (
              <div className={`mt-6 p-6 rounded-xl border ${getRiskColor(result.risk_level)}`}>
                <div className="flex items-center justify-center gap-4 mb-6">
                  {getRiskIcon(result.risk_level, "xl")}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{result.risk_level} Risk</h3>
                    <div className="w-48 h-3 bg-white rounded-full overflow-hidden border border-current">
                      <div className="h-full bg-current transition-all" style={{ width: `${Math.round(result.confidence_score * 100)}%` }} />
                    </div>
                    <p className="text-sm mt-2 font-medium">{Math.round(result.confidence_score * 100)}% Confidence</p>
                  </div>
                </div>

                {result.flagged_keywords.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Suspicious Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.flagged_keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-white/50 rounded-full text-sm">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.domains_found.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Domains Found</h4>
                    {result.domains_found.map((d, i) => (
                      <div key={i} className="p-3 bg-white/50 rounded-lg text-sm mb-2">
                        <div className="font-medium">{d.domain}</div>
                        <div className="text-xs opacity-75 break-all">{d.url}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Scan History</h2>
              </div>
              <button onClick={clearHistoryData} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-lg font-medium">No scans yet</p>
                <p className="text-sm text-gray-400 mt-1">Your scan history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                {history.map((item) => (
                  <div key={item.id} className={`border rounded-xl overflow-hidden ${getRiskColor(item.risk_level)}`}>
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedItems(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          {getRiskIcon(item.risk_level, "lg")}
                          <div>
                            <p className="font-medium line-clamp-1">{item.email_preview}</p>
                            <p className="text-sm text-gray-500 mt-1">{new Date(item.scan_date).toLocaleString()}</p>
                          </div>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedItems.includes(item.id) ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {expandedItems.includes(item.id) && (
                      <div className="p-4 bg-white/50">
                        <div className="text-sm">
                          <p className="font-semibold mb-2">{item.risk_level} Risk ({Math.round(item.confidence_score * 100)}%)</p>
                          {item.flagged_keywords.length > 0 && (
                            <div className="mt-3">
                              <p className="font-medium mb-2">Keywords:</p>
                              <div className="flex flex-wrap gap-2">
                                {item.flagged_keywords.map((kw, i) => (
                                  <span key={i} className="px-2 py-1 bg-white/50 rounded text-xs">{kw}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-xl font-bold">PhishGuard</span>
          </div>
          <p className="text-gray-400 mb-1">© {new Date().getFullYear()} PhishGuard. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Powered by AI & Machine Learning</p>
        </div>
      </footer>
    </div>
  );
}

export default Scanner;
