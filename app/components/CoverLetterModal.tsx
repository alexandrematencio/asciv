import React, { useState } from 'react';
import { X, Sparkles, Loader2, Crown, Zap, Flag, Rocket } from 'lucide-react';
import { Application, CoverLetter, CoverLetterStyle, RecipientInfo } from '../types';

const STYLE_INFO = {
  french_formal: {
    name: 'French Formal',
    icon: Crown,
    description: 'Traditional French style. Rigorous format with classic salutations.',
    example: 'Madame, Monsieur, / Je vous prie d\'agréer...'
  },
  french_modern: {
    name: 'French Modern',
    icon: Zap,
    description: 'Contemporary professional style. Less formal but respectful.',
    example: 'Bonjour, / Cordialement'
  },
  american_standard: {
    name: 'American Standard',
    icon: Flag,
    description: 'Classic American style. Direct and results-oriented.',
    example: 'Dear Hiring Manager, / Sincerely'
  },
  american_creative: {
    name: 'American Creative',
    icon: Rocket,
    description: 'For startups and creative roles. Dynamic tone and personality.',
    example: 'Hi there! / Best regards'
  }
};

interface CoverLetterModalProps {
  application: Application;
  onClose: () => void;
  onGenerate: (style: CoverLetterStyle, recipientInfo: RecipientInfo, availabilityDate?: string) => void;
  isGenerating: boolean;
}

export default function CoverLetterModal({ application, onClose, onGenerate, isGenerating }: CoverLetterModalProps) {
  const [selectedStyle, setSelectedStyle] = useState<CoverLetterStyle>('french_modern');
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    companyName: application.company,
    recipientName: '',
    recipientTitle: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [availabilityDate, setAvailabilityDate] = useState<string>('');

  const handleGenerate = () => {
    onGenerate(selectedStyle, recipientInfo, availabilityDate || undefined);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bg-white dark:bg-primary-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-primary-200 dark:border-primary-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-primary-50">Generate Cover Letter</h2>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">{application.role} at {application.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-300 p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Style Selection */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-3">1. Choose a style</h3>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(STYLE_INFO) as CoverLetterStyle[]).map((style) => {
                const info = STYLE_INFO[style];
                const IconComponent = info.icon;
                const isSelected = selectedStyle === style;
                return (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-4 rounded-xl text-left transition-all border-2 ${
                      isSelected
                        ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 shadow-md'
                        : 'border-primary-200 dark:border-primary-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-primary-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-accent-600 dark:text-accent-400' : 'text-primary-500 dark:text-primary-400'}`} aria-hidden="true" />
                      <span className={`font-semibold ${isSelected ? 'text-accent-700 dark:text-accent-300' : 'text-primary-900 dark:text-primary-100'}`}>{info.name}</span>
                    </div>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mb-2">{info.description}</p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 italic">{info.example}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipient Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-3">2. Recipient information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Company <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientInfo.companyName}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  className="input-primary"
                  placeholder={application.company}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Recipient name
                </label>
                <input
                  type="text"
                  value={recipientInfo.recipientName}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, recipientName: e.target.value }))}
                  className="input-primary"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={recipientInfo.recipientTitle}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, recipientTitle: e.target.value }))}
                  className="input-primary"
                  placeholder="e.g., HR Manager"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={recipientInfo.address}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="input-primary"
                  placeholder="e.g., 123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Postal code
                </label>
                <input
                  type="text"
                  value={recipientInfo.postalCode}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="input-primary"
                  placeholder="e.g., 10001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={recipientInfo.city}
                  onChange={(e) => setRecipientInfo(prev => ({ ...prev, city: e.target.value }))}
                  className="input-primary"
                  placeholder="e.g., New York"
                />
              </div>
            </div>
          </div>

          {/* Availability Date */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-3">3. Availability date (optional)</h3>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                Start date
              </label>
              <input
                type="date"
                value={availabilityDate}
                onChange={(e) => setAvailabilityDate(e.target.value)}
                className="input-primary"
              />
              <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
                If specified, this date will be mentioned in the cover letter
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/50 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !recipientInfo.companyName}
            className="btn-primary flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
