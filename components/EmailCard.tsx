import React, { useState } from 'react';
import { EmailCampaign } from '../types';
import { Clipboard } from './icons/Clipboard';
import { Check } from './icons/Check';
import { Tag } from './icons/Tag';
import { ChartBar } from './icons/ChartBar';

interface EmailCardProps {
  campaign: EmailCampaign;
}

const CopyButton: React.FC<{ textToCopy: string, title: string }> = ({ textToCopy, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-900/50 rounded-md transition-all"
      title={title}
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4" />}
    </button>
  );
};


export const EmailCard: React.FC<EmailCardProps> = ({ campaign }) => {
  const [view, setView] = useState<'preview' | 'html'>('preview');

  const previewBody = campaign.headerImage
    ? campaign.body.replace('<!-- HEADER_IMAGE -->', `<img src="data:image/jpeg;base64,${campaign.headerImage}" alt="Campaign Header" />`)
    : campaign.body.replace('<!-- HEADER_IMAGE -->', '');

  return (
    <div className="bg-gray-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg shadow-black/20">
      <div className="p-4 bg-gray-800/50 border-b border-slate-700">
        <h3 className="text-xl font-bold text-slate-100">
          Segment: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">{campaign.segment}</span>
        </h3>
        <div className="mt-3 flex items-center gap-3">
            <Tag className="w-5 h-5 text-green-400"/>
            <p className="font-mono text-sm bg-green-900/50 text-green-300 px-2 py-1 rounded-md border border-green-700">
                {campaign.discountCode}
            </p>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* KPIs */}
        <div>
          <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <ChartBar className="w-5 h-5 text-cyan-400" />
            Suggested KPIs
          </h4>
          <div className="bg-gray-900 p-3 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-300">{campaign.suggestedKPIs}</p>
          </div>
        </div>

        {/* A/B Subjects */}
        <div>
          <h4 className="font-semibold text-slate-300 mb-2">A/B Subject Lines:</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-900 p-2 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-300"><span className="font-bold text-cyan-400">A:</span> {campaign.subjectA}</p>
              <CopyButton textToCopy={campaign.subjectA} title="Copy subject A" />
            </div>
            <div className="flex items-center justify-between bg-gray-900 p-2 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-300"><span className="font-bold text-indigo-400">B:</span> {campaign.subjectB}</p>
              <CopyButton textToCopy={campaign.subjectB} title="Copy subject B" />
            </div>
          </div>
        </div>

        {/* Body Preview/HTML */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-slate-300">Email Body:</h4>
            <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-lg border border-slate-700">
              <button onClick={() => setView('preview')} className={`px-3 py-1 text-xs rounded-md transition-colors ${view === 'preview' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>Preview</button>
              <button onClick={() => setView('html')} className={`px-3 py-1 text-xs rounded-md transition-colors ${view === 'html' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>HTML</button>
            </div>
          </div>

          <div className="min-h-[200px] border border-slate-700 rounded-lg bg-gray-900 relative">
            {view === 'preview' ? (
              <div 
                className="prose prose-sm prose-invert max-w-none p-4"
                dangerouslySetInnerHTML={{ __html: previewBody }} 
              />
            ) : (
              <>
                <div className="absolute top-2 right-2 z-10">
                    <CopyButton textToCopy={campaign.body} title="Copy HTML code" />
                </div>
                <pre className="text-xs text-slate-300 whitespace-pre-wrap overflow-x-auto p-4">
                  <code>{campaign.body}</code>
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};