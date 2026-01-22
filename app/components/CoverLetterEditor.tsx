import React, { useState, useEffect } from 'react';
import { X, Mail, Save, Loader2 } from 'lucide-react';
import { CoverLetter, CoverLetterStyle, RecipientInfo } from '../types';

interface CoverLetterEditorProps {
  coverLetter: CoverLetter;
  onSave: (updatedLetter: { recipientInfo: RecipientInfo; content: string }) => void;
  onCancel: () => void;
}

export default function CoverLetterEditor({ coverLetter, onSave, onCancel }: CoverLetterEditorProps) {
  // Recipient Info state
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>(coverLetter.recipientInfo);

  // Content state
  const [content, setContent] = useState(coverLetter.content);

  const handleSave = () => {
    onSave({
      recipientInfo,
      content
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="bg-white dark:bg-primary-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-primary-200 dark:border-primary-700 sticky top-0 bg-white dark:bg-primary-800 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-primary-50">Edit Cover Letter</h2>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">Version {coverLetter.version}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-300 p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
              aria-label="Close editor"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recipient Information Section */}
          <div className="bg-primary-50 dark:bg-primary-900/50 rounded-xl p-5 border-2 border-primary-200 dark:border-primary-700">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              Recipient Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    Company Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipientInfo.companyName}
                    onChange={(e) => setRecipientInfo(prev => ({ ...prev, companyName: e.target.value }))}
                    className="input-primary"
                    placeholder="e.g., Tech Innovations Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientInfo.recipientName || ''}
                    onChange={(e) => setRecipientInfo(prev => ({ ...prev, recipientName: e.target.value }))}
                    className="input-primary"
                    placeholder="e.g., John Smith"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    Recipient Title
                  </label>
                  <input
                    type="text"
                    value={recipientInfo.recipientTitle || ''}
                    onChange={(e) => setRecipientInfo(prev => ({ ...prev, recipientTitle: e.target.value }))}
                    className="input-primary"
                    placeholder="e.g., HR Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={recipientInfo.address || ''}
                    onChange={(e) => setRecipientInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="input-primary"
                    placeholder="e.g., 123 Main Street"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={recipientInfo.postalCode || ''}
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
                    value={recipientInfo.city || ''}
                    onChange={(e) => setRecipientInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="input-primary"
                    placeholder="e.g., New York"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Letter Content Section */}
          <div className="bg-primary-50 dark:bg-primary-900/50 rounded-xl p-5 border-2 border-primary-200 dark:border-primary-700">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              Letter Content
            </h3>

            <div className="mb-2">
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">
                <strong>Note:</strong> Edit the complete letter content below. Make sure to maintain the structure:
              </p>
              <ul className="text-xs text-primary-500 dark:text-primary-400 list-disc list-inside space-y-1">
                <li>Your name and contact information at the top</li>
                <li>Recipient information</li>
                <li>Date</li>
                <li>Subject line</li>
                <li>Salutation</li>
                <li>Body paragraphs</li>
                <li>Closing and signature</li>
              </ul>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea-primary h-[500px] font-mono text-sm resize-none"
              placeholder="Enter your cover letter content here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/50 flex justify-end gap-3 sticky bottom-0 rounded-b-2xl">
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!recipientInfo.companyName || !content.trim()}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
