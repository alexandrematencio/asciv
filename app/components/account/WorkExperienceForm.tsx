'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { WorkExperience } from '@/app/types';
import CVImportSection from './CVImportSection';
import ImportPreviewModal from './ImportPreviewModal';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface Uncertainty {
  entryIndex: number;
  field: string;
  reason: string;
}

const emptyExperience: ExperienceFormData = {
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  achievements: [''],
};

export default function WorkExperienceForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>(emptyExperience);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Import state
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [importedData, setImportedData] = useState<WorkExperience[]>([]);
  const [importUncertainties, setImportUncertainties] = useState<Uncertainty[]>([]);

  const experiences = profile?.workExperience || [];

  const handleAdd = () => {
    setFormData(emptyExperience);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (exp: WorkExperience) => {
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current,
      achievements: exp.achievements.length > 0 ? exp.achievements : [''],
    });
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyExperience);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.startDate) {
      return;
    }

    onSaveStart();

    const newExperience: WorkExperience = {
      id: editingId || crypto.randomUUID(),
      title: formData.title,
      company: formData.company,
      location: formData.location || undefined,
      startDate: formData.startDate,
      endDate: formData.current ? undefined : formData.endDate || undefined,
      current: formData.current,
      achievements: formData.achievements.filter((a) => a.trim() !== ''),
    };

    let updatedExperiences: WorkExperience[];
    if (editingId) {
      updatedExperiences = experiences.map((e) =>
        e.id === editingId ? newExperience : e
      );
    } else {
      updatedExperiences = [newExperience, ...experiences];
    }

    const success = await updateProfile({ workExperience: updatedExperiences });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedExperiences = experiences.filter((e) => e.id !== id);
    const success = await updateProfile({ workExperience: updatedExperiences });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ workExperience: [] });
    if (success) {
      onSaveSuccess();
      setShowClearConfirm(false);
    } else {
      onSaveError();
    }
  };

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    if (formData.achievements.length > 1) {
      const newAchievements = formData.achievements.filter((_, i) => i !== index);
      setFormData({ ...formData, achievements: newAchievements });
    }
  };

  // Import handlers
  const handleImportComplete = (data: WorkExperience[], uncertainties: Uncertainty[]) => {
    setImportedData(data);
    setImportUncertainties(uncertainties);
    setShowPreviewModal(true);
  };

  const handleImportConfirm = async (data: WorkExperience[], mode: 'add' | 'replace') => {
    onSaveStart();

    let updatedExperiences: WorkExperience[];
    if (mode === 'replace') {
      updatedExperiences = data;
    } else {
      updatedExperiences = [...data, ...experiences];
    }

    const success = await updateProfile({ workExperience: updatedExperiences });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Work Experience</h2>
          <p className="text-slate-400 text-sm">
            Add your work experience with measurable achievements.
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {experiences.length > 0 && (
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
          section="experience"
          onImportComplete={(data, uncertainties) => handleImportComplete(data as WorkExperience[], uncertainties)}
          existingCount={experiences.length}
        />
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Experience' : 'New Experience'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Job Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-300">Current position</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Start Date <span className="text-red-400">*</span>
                <span className="text-slate-500 font-normal ml-1">(dd-mm-yyyy)</span>
              </label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="01-09-2020"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                End Date
                <span className="text-slate-500 font-normal ml-1">(dd-mm-yyyy)</span>
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                placeholder="01-07-2023"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Achievements
            </label>
            <p className="text-slate-500 text-xs mb-3">
              Use action verbs and quantifiable metrics when possible.
            </p>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Increased conversion rate by 25% through UX optimization"
                />
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="px-3 py-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              + Add achievement
            </button>
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
              disabled={!formData.title || !formData.company || !formData.startDate}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 && !isAdding ? (
          <div className="text-center py-12 text-slate-500">
            <p>No work experience added yet</p>
            <p className="text-sm mt-1">Click "Add" or import from your CV to get started</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-700/20 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-white">{exp.title}</h3>
                  <p className="text-slate-400 text-sm">
                    {exp.company}
                    {exp.location && ` | ${exp.location}`}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              {exp.achievements.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Import Preview Modal */}
      <ImportPreviewModal
        isOpen={showPreviewModal}
        section="experience"
        parsedData={importedData}
        uncertainties={importUncertainties}
        existingCount={experiences.length}
        onConfirm={(data, mode) => handleImportConfirm(data as WorkExperience[], mode)}
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
              <h3 className="text-lg font-semibold text-white">Clear All Experience</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete all {experiences.length} work experience {experiences.length === 1 ? 'entry' : 'entries'}. This action cannot be undone.
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
