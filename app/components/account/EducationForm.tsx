'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { Education } from '@/app/types';
import CVImportSection from './CVImportSection';
import ImportPreviewModal from './ImportPreviewModal';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface EducationFormData {
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  current: boolean;
  gpa: string;
  honors: string;
}

interface Uncertainty {
  entryIndex: number;
  field: string;
  reason: string;
}

const emptyEducation: EducationFormData = {
  degree: '',
  institution: '',
  field: '',
  startYear: '',
  endYear: '',
  current: false,
  gpa: '',
  honors: '',
};

export default function EducationForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EducationFormData>(emptyEducation);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Import state
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [importedData, setImportedData] = useState<Education[]>([]);
  const [importUncertainties, setImportUncertainties] = useState<Uncertainty[]>([]);

  const educations = profile?.education || [];

  const handleAdd = () => {
    setFormData(emptyEducation);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      field: edu.field,
      startYear: edu.startYear.toString(),
      endYear: edu.endYear?.toString() || '',
      current: edu.current || false,
      gpa: edu.gpa || '',
      honors: edu.honors || '',
    });
    setEditingId(edu.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyEducation);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.degree || !formData.institution || !formData.field || !formData.startYear) {
      return;
    }

    onSaveStart();

    const newEducation: Education = {
      id: editingId || crypto.randomUUID(),
      degree: formData.degree,
      institution: formData.institution,
      field: formData.field,
      startYear: parseInt(formData.startYear),
      endYear: formData.current ? undefined : formData.endYear ? parseInt(formData.endYear) : undefined,
      current: formData.current,
      gpa: formData.gpa || undefined,
      honors: formData.honors || undefined,
    };

    let updatedEducations: Education[];
    if (editingId) {
      updatedEducations = educations.map((e) =>
        e.id === editingId ? newEducation : e
      );
    } else {
      updatedEducations = [newEducation, ...educations];
    }

    const success = await updateProfile({ education: updatedEducations });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedEducations = educations.filter((e) => e.id !== id);
    const success = await updateProfile({ education: updatedEducations });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ education: [] });
    if (success) {
      onSaveSuccess();
      setShowClearConfirm(false);
    } else {
      onSaveError();
    }
  };

  // Import handlers
  const handleImportComplete = (data: Education[], uncertainties: Uncertainty[]) => {
    setImportedData(data);
    setImportUncertainties(uncertainties);
    setShowPreviewModal(true);
  };

  const handleImportConfirm = async (data: Education[], mode: 'add' | 'replace') => {
    onSaveStart();

    let updatedEducations: Education[];
    if (mode === 'replace') {
      updatedEducations = data;
    } else {
      updatedEducations = [...data, ...educations];
    }

    const success = await updateProfile({ education: updatedEducations });
    if (success) {
      onSaveSuccess();
      setShowPreviewModal(false);
      setImportedData([]);
      setImportUncertainties([]);
    } else {
      onSaveError();
    }
  };

  const handleImportCancel = () => {
    setShowPreviewModal(false);
    setImportedData([]);
    setImportUncertainties([]);
  };

  const handleImportRetry = () => {
    setShowPreviewModal(false);
    setImportedData([]);
    setImportUncertainties([]);
  };

  const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor of Arts',
    'Bachelor of Science',
    'Bachelor of Engineering',
    'Master of Arts',
    'Master of Science',
    'Master of Business Administration',
    'Doctor of Philosophy',
    'Professional Certificate',
    'Other',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Education</h2>
          <p className="text-slate-400 text-sm">
            Add your degrees and educational background.
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {educations.length > 0 && (
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

      {/* Import Section */}
      {!isAdding && (
        <CVImportSection
          section="education"
          onImportComplete={(data, uncertainties) => handleImportComplete(data as Education[], uncertainties)}
          existingCount={educations.length}
        />
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Education' : 'New Education'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Degree <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {degreeOptions.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Institution <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Stanford University"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Field of Study <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science, Business, Marketing..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Start Year <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2020"
                min="1950"
                max="2030"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                End Year
              </label>
              <input
                type="number"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                disabled={formData.current}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="2024"
                min="1950"
                max="2030"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-300">Currently studying</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                GPA / Honors
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.8/4.0, Cum Laude..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Awards / Distinctions
              </label>
              <input
                type="text"
                value={formData.honors}
                onChange={(e) => setFormData({ ...formData, honors: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Valedictorian, Dean's List..."
              />
            </div>
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
              disabled={!formData.degree || !formData.institution || !formData.field || !formData.startYear}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {educations.length === 0 && !isAdding ? (
          <div className="text-center py-12 text-slate-500">
            <p>No education added yet</p>
            <p className="text-sm mt-1">Click "Add" or import from your CV to get started</p>
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-slate-700/20 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.field}</p>
                  <p className="text-slate-500 text-sm">
                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                    {edu.gpa && ` | ${edu.gpa}`}
                  </p>
                  {edu.honors && (
                    <p className="text-blue-400 text-sm mt-1">{edu.honors}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Import Preview Modal */}
      <ImportPreviewModal
        isOpen={showPreviewModal}
        section="education"
        parsedData={importedData}
        uncertainties={importUncertainties}
        existingCount={educations.length}
        onConfirm={(data, mode) => handleImportConfirm(data as Education[], mode)}
        onCancel={handleImportCancel}
        onRetry={handleImportRetry}
      />

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
              <h3 className="text-lg font-semibold text-white">Clear All Education</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete all {educations.length} education {educations.length === 1 ? 'entry' : 'entries'}. This action cannot be undone.
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
