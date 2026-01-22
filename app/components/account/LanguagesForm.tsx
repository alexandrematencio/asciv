'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { Language, LanguageProficiency, LanguageAcquisition, LanguageCertification } from '@/app/types';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface LanguageFormData {
  language: string;
  proficiency: LanguageProficiency;
  acquisition: LanguageAcquisition;
  yearsOfPractice: string;
  hasCertification: boolean;
  certificationName: string;
  certificationLevel: string;
  certificationScore: string;
  certificationDate: string;
  notes: string;
}

const emptyLanguage: LanguageFormData = {
  language: '',
  proficiency: 'conversational',
  acquisition: 'education',
  yearsOfPractice: '',
  hasCertification: false,
  certificationName: '',
  certificationLevel: '',
  certificationScore: '',
  certificationDate: '',
  notes: '',
};

const proficiencyLabels: Record<LanguageProficiency, string> = {
  basic: 'Basic',
  conversational: 'Conversational',
  professional: 'Professional',
  native: 'Native',
  bilingual: 'Bilingual',
};

const acquisitionLabels: Record<LanguageAcquisition, string> = {
  native: 'Native speaker (from birth)',
  education: 'Formal education',
  immersion: 'Immersion (lived abroad)',
  self_taught: 'Self-taught',
  practice: 'Daily practice over years',
};

const proficiencyColors: Record<LanguageProficiency, string> = {
  basic: 'bg-slate-500/20 text-slate-400',
  conversational: 'bg-blue-500/20 text-blue-400',
  professional: 'bg-green-500/20 text-green-400',
  native: 'bg-purple-500/20 text-purple-400',
  bilingual: 'bg-purple-500/20 text-purple-400',
};

const commonLanguages = [
  'English',
  'French',
  'Spanish',
  'German',
  'Italian',
  'Portuguese',
  'Chinese (Mandarin)',
  'Japanese',
  'Arabic',
  'Russian',
  'Dutch',
  'Polish',
  'Korean',
  'Hindi',
  'Turkish',
];

const commonCertifications: Record<string, string[]> = {
  'English': ['TOEFL', 'IELTS', 'Cambridge (FCE/CAE/CPE)', 'TOEIC'],
  'French': ['DELF', 'DALF', 'TCF', 'TEF'],
  'German': ['Goethe-Zertifikat', 'TestDaF', 'DSH'],
  'Spanish': ['DELE', 'SIELE'],
  'Japanese': ['JLPT'],
  'Chinese (Mandarin)': ['HSK'],
  'Italian': ['CELI', 'CILS'],
};

export default function LanguagesForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<LanguageFormData>(emptyLanguage);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const languages = profile?.languages || [];

  const handleAdd = () => {
    setFormData(emptyLanguage);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (lang: Language) => {
    setFormData({
      language: lang.language,
      proficiency: lang.proficiency,
      acquisition: lang.acquisition,
      yearsOfPractice: lang.yearsOfPractice?.toString() || '',
      hasCertification: !!lang.certification,
      certificationName: lang.certification?.name || '',
      certificationLevel: lang.certification?.level || '',
      certificationScore: lang.certification?.score || '',
      certificationDate: lang.certification?.date || '',
      notes: lang.notes || '',
    });
    setEditingId(lang.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyLanguage);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.language) {
      return;
    }

    onSaveStart();

    let certification: LanguageCertification | undefined;
    if (formData.hasCertification && formData.certificationName) {
      certification = {
        name: formData.certificationName,
        level: formData.certificationLevel || undefined,
        score: formData.certificationScore || undefined,
        date: formData.certificationDate || undefined,
      };
    }

    const newLanguage: Language = {
      id: editingId || crypto.randomUUID(),
      language: formData.language,
      proficiency: formData.proficiency,
      acquisition: formData.acquisition,
      yearsOfPractice: formData.yearsOfPractice ? parseInt(formData.yearsOfPractice) : undefined,
      certification,
      notes: formData.notes || undefined,
    };

    let updatedLanguages: Language[];
    if (editingId) {
      updatedLanguages = languages.map((l) =>
        l.id === editingId ? newLanguage : l
      );
    } else {
      updatedLanguages = [...languages, newLanguage];
    }

    const success = await updateProfile({ languages: updatedLanguages });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedLanguages = languages.filter((l) => l.id !== id);
    const success = await updateProfile({ languages: updatedLanguages });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ languages: [] });
    if (success) {
      onSaveSuccess();
      setShowClearConfirm(false);
    } else {
      onSaveError();
    }
  };

  const suggestedCertifications = commonCertifications[formData.language] || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Languages</h2>
          <p className="text-slate-400 text-sm">
            Add languages you speak, including certifications or years of practice.
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {languages.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Add
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Language' : 'New Language'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Language <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type or select..."
                list="languages-list"
              />
              <datalist id="languages-list">
                {commonLanguages.map((lang) => (
                  <option key={lang} value={lang} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Proficiency Level <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value as LanguageProficiency })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(proficiencyLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                How did you learn it? <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.acquisition}
                onChange={(e) => setFormData({ ...formData, acquisition: e.target.value as LanguageAcquisition })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(acquisitionLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Years of Practice
              </label>
              <input
                type="number"
                value={formData.yearsOfPractice}
                onChange={(e) => setFormData({ ...formData, yearsOfPractice: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5, 10, 23"
                min="0"
                max="100"
              />
              <p className="text-xs text-slate-500 mt-1">
                Daily or regular practice (useful for non-native, non-certified fluency)
              </p>
            </div>
          </div>

          {/* Certification Section */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={formData.hasCertification}
                onChange={(e) => setFormData({ ...formData, hasCertification: e.target.checked })}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">I have a language certification</span>
            </label>

            {formData.hasCertification && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={formData.certificationName}
                    onChange={(e) => setFormData({ ...formData, certificationName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., TOEFL, DELF, JLPT"
                    list="certifications-list"
                  />
                  <datalist id="certifications-list">
                    {suggestedCertifications.map((cert) => (
                      <option key={cert} value={cert} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Level
                  </label>
                  <input
                    type="text"
                    value={formData.certificationLevel}
                    onChange={(e) => setFormData({ ...formData, certificationLevel: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., B2, C1, N2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Score (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.certificationScore}
                    onChange={(e) => setFormData({ ...formData, certificationScore: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 110/120, 7.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date Obtained
                  </label>
                  <input
                    type="month"
                    value={formData.certificationDate}
                    onChange={(e) => setFormData({ ...formData, certificationDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Notes
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 23 years of daily practice, used professionally for 10 years"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.language}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Languages List */}
      <div className="space-y-3">
        {languages.length === 0 && !isAdding ? (
          <div className="text-center py-12 text-slate-500">
            <p>No languages added yet</p>
            <p className="text-sm mt-1">Click "Add" to get started</p>
          </div>
        ) : (
          languages.map((lang) => (
            <div
              key={lang.id}
              className="group flex items-start justify-between px-4 py-3 bg-slate-700/20 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-medium text-white">{lang.language}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${proficiencyColors[lang.proficiency]}`}>
                    {proficiencyLabels[lang.proficiency]}
                  </span>
                  <span className="text-xs text-slate-500">
                    {acquisitionLabels[lang.acquisition]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {lang.yearsOfPractice && (
                    <span className="text-xs bg-slate-600/50 text-slate-300 px-2 py-0.5 rounded">
                      {lang.yearsOfPractice} years of practice
                    </span>
                  )}
                  {lang.certification && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                      {lang.certification.name}
                      {lang.certification.level && ` (${lang.certification.level})`}
                      {lang.certification.score && ` - ${lang.certification.score}`}
                    </span>
                  )}
                </div>

                {lang.notes && (
                  <p className="text-xs text-slate-500 mt-1">{lang.notes}</p>
                )}
              </div>

              <div className="hidden group-hover:flex items-center gap-1 ml-2">
                <button
                  onClick={() => handleEdit(lang)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(lang.id)}
                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Clear All Languages</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete all {languages.length} {languages.length === 1 ? 'language' : 'languages'}. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
