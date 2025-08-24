import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { DataInput } from './components/DataInput';
import { EmailCard } from './components/EmailCard';
import { Loader } from './components/Loader';
import { Welcome } from './components/Welcome';
import { EmailCampaign } from './types';
import { generatePersonalizedEmails } from './services/geminiService';
import { SAMPLE_CUSTOMER_DATA, SAMPLE_PRODUCT_DATA } from './constants';
import { AlertTriangle } from './components/icons/AlertTriangle';
import { AnimatedBackground } from './components/AnimatedBackground';
import { DecorativeOrbs } from './components/DecorativeOrbs';
import { SignUp } from './components/SignUp';

const TONES = ['Friendly', 'Professional', 'Urgent', 'Playful', 'Inspirational'];

const App: React.FC = () => {
  const [customerData, setCustomerData] = useState<string>('');
  const [productData, setProductData] = useState<string>('');
  const [campaignGoal, setCampaignGoal] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('Nexus Fitness');
  const [generateImage, setGenerateImage] = useState<boolean>(true);
  const [emailTone, setEmailTone] = useState<string>(TONES[0]);
  const [generatedEmails, setGeneratedEmails] = useState<EmailCampaign[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [hyperspaceActive, setHyperspaceActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleGenerateEmails = useCallback(async () => {
    if (!customerData || !productData || !campaignGoal || !brandName) {
      setError('Please fill out all fields: Brand, Goal, Customer Segments, and Product Catalog.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedEmails(null);

    try {
      const result = await generatePersonalizedEmails(customerData, productData, campaignGoal, emailTone, brandName, generateImage);
      setGeneratedEmails(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [customerData, productData, campaignGoal, emailTone, brandName, generateImage]);

  const loadSampleData = () => {
    setCustomerData(SAMPLE_CUSTOMER_DATA);
    setProductData(SAMPLE_PRODUCT_DATA);
    setCampaignGoal('Promote new products and re-engage lapsed customers.');
    setBrandName('Nexus Fitness');
    setError(null);
  };
  
  const handleTitleClick = useCallback(() => {
    const newClickCount = titleClickCount + 1;
    setTitleClickCount(newClickCount);

    if (newClickCount >= 3) {
      setHyperspaceActive(true);
      setTitleClickCount(0); // Reset after activation
    }
  }, [titleClickCount]);

  useEffect(() => {
    if (hyperspaceActive) {
      const timer = setTimeout(() => {
        setHyperspaceActive(false);
      }, 2000); // Hyperspace effect duration
      return () => clearTimeout(timer);
    }
  }, [hyperspaceActive]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        <AnimatedBackground hyperspaceActive={false} />
        <DecorativeOrbs />
        <SignUp onSignUpSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <AnimatedBackground hyperspaceActive={hyperspaceActive} />
      <Header onTitleClick={handleTitleClick} />
      <main className="container mx-auto p-4 md:p-8 relative z-10">
        <DecorativeOrbs />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">

             <div className="bg-gray-800/50 p-4 rounded-xl ring-1 ring-white/10">
                <label htmlFor="brand-name" className="block text-lg font-semibold text-slate-200 mb-2">Brand Name</label>
                <input
                    type="text"
                    id="brand-name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g., Nexus Fitness"
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-900 text-slate-300 placeholder-slate-500"
                />
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-xl ring-1 ring-white/10">
                <label htmlFor="campaign-goal" className="block text-lg font-semibold text-slate-200 mb-2">Campaign Goal</label>
                <input
                    type="text"
                    id="campaign-goal"
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    placeholder="e.g., Promote new running shoes"
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-900 text-slate-300 placeholder-slate-500"
                />
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl ring-1 ring-white/10">
                <label className="block text-lg font-semibold text-slate-200 mb-2">Email Tone</label>
                <div className="flex flex-wrap gap-2">
                    {TONES.map(tone => (
                        <button
                            key={tone}
                            onClick={() => setEmailTone(tone)}
                            className={`tone-button px-3 py-1.5 text-sm font-medium rounded-full ${
                              emailTone === tone
                                ? 'active-tone bg-cyan-500 text-white'
                                : 'bg-gray-700 text-slate-300'
                            }`}
                        >
                           <span>{tone}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                  <label htmlFor="generate-image-toggle" className="text-lg font-semibold text-slate-200">
                      ✨ Generate Header Image
                  </label>
                  <button
                      id="generate-image-toggle"
                      role="switch"
                      aria-checked={generateImage}
                      onClick={() => setGenerateImage(!generateImage)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                          generateImage ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                  >
                      <span
                          aria-hidden="true"
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              generateImage ? 'translate-x-5' : 'translate-x-0'
                          }`}
                      />
                  </button>
              </div>
            </div>

            <DataInput
              id="customer-data"
              label="Customer Segments"
              placeholder="e.g., name,email,segment,purchase_history..."
              value={customerData}
              onChange={(e) => setCustomerData(e.target.value)}
              rows={8}
            />
            <DataInput
              id="product-data"
              label="Product Catalog"
              placeholder="e.g., product_name,price,category,url..."
              value={productData}
              onChange={(e) => setProductData(e.target.value)}
              rows={12}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerateEmails}
                disabled={isLoading || !customerData || !productData || !campaignGoal}
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isLoading ? 'Generating...' : '✨ Generate Emails'}
              </button>
              <button
                onClick={loadSampleData}
                className="w-full bg-slate-700 text-slate-200 font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800/50 rounded-xl ring-1 ring-white/10 p-6 min-h-[600px] backdrop-blur-sm">
              {isLoading && <Loader />}
              {error && (
                <div className="flex flex-col items-center justify-center h-full text-red-400 bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                  <AlertTriangle className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-red-300 mb-2">An Error Occurred</h3>
                  <p className="text-center">{error}</p>
                </div>
              )}
              {!isLoading && !error && !generatedEmails && <Welcome />}
              {generatedEmails && (
                <div className="space-y-8">
                   <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-700 pb-3 mb-4">Generated Campaigns</h2>
                  {generatedEmails.map((campaign, index) => (
                    <EmailCard key={index} campaign={campaign} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;