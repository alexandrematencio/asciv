'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Education, WorkExperience, Skill, SkillCategory, SkillProficiency } from '@/app/types';

type SectionType = 'education' | 'experience' | 'skills';
type ImportMode = 'add' | 'replace';

interface Uncertainty {
  entryIndex: number;
  field: string;
  reason: string;
}

interface ImportPreviewModalProps {
  isOpen: boolean;
  section: SectionType;
  parsedData: Education[] | WorkExperience[] | Skill[];
  uncertainties: Uncertainty[];
  existingCount: number;
  onConfirm: (data: Education[] | WorkExperience[] | Skill[], mode: ImportMode) => void;
  onCancel: () => void;
  onRetry: () => void;
}

const sectionLabels: Record<SectionType, string> = {
  education: 'Education',
  experience: 'Work Experience',
  skills: 'Skills',
};

export default function ImportPreviewModal({
  isOpen,
  section,
  parsedData,
  uncertainties: initialUncertainties,
  existingCount,
  onConfirm,
  onCancel,
  onRetry,
}: ImportPreviewModalProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<(Education | WorkExperience | Skill)[]>([]);
  const [importMode, setImportMode] = useState<ImportMode>('add');
  const [replaceConfirmed, setReplaceConfirmed] = useState(false);
  // Track resolved uncertainties (fields that have been edited)
  const [resolvedFields, setResolvedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    setEditedData([...parsedData]);
    setEditingIndex(null);
    setImportMode('add');
    setReplaceConfirmed(false);
    setResolvedFields(new Set());
  }, [parsedData]);

  if (!isOpen) return null;

  // Filter out resolved uncertainties
  const uncertainties = initialUncertainties.filter(
    (u) => !resolvedFields.has(`${u.entryIndex}-${u.field}`)
  );

  const getUncertaintiesForEntry = (index: number) => {
    return uncertainties.filter((u) => u.entryIndex === index);
  };

  const hasUncertainty = (index: number, field: string) => {
    return uncertainties.some((u) => u.entryIndex === index && u.field === field);
  };

  const getUncertaintyReason = (index: number, field: string) => {
    const u = uncertainties.find((u) => u.entryIndex === index && u.field === field);
    return u?.reason;
  };

  // Mark a field as resolved when edited
  const markFieldResolved = (index: number, field: string) => {
    setResolvedFields((prev) => new Set(prev).add(`${index}-${field}`));
  };

  const updateEntry = <T extends Education | WorkExperience | Skill>(
    index: number,
    updates: Partial<T>
  ) => {
    const newData = [...editedData];
    newData[index] = { ...newData[index], ...updates } as T;
    setEditedData(newData);

    // Mark edited fields as resolved to remove warnings
    Object.keys(updates).forEach((field) => {
      markFieldResolved(index, field);
    });
  };

  const removeEntry = (index: number) => {
    setEditedData(editedData.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleConfirm = () => {
    if (importMode === 'replace' && existingCount > 0 && !replaceConfirmed) {
      return;
    }
    onConfirm(editedData as Education[] | WorkExperience[] | Skill[], importMode);
  };

  const renderEducationEntry = (entry: Education, index: number) => {
    const isEditing = editingIndex === index;
    const entryUncertainties = getUncertaintiesForEntry(index);

    if (isEditing) {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Degree *</label>
              <input
                type="text"
                value={entry.degree}
                onChange={(e) => updateEntry<Education>(index, { degree: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Field of Study *</label>
              <input
                type="text"
                value={entry.field}
                onChange={(e) => updateEntry<Education>(index, { field: e.target.value })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'field') ? 'border-yellow-500' : 'border-slate-600'
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Institution *</label>
            <input
              type="text"
              value={entry.institution}
              onChange={(e) => updateEntry<Education>(index, { institution: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Start Year *</label>
              <input
                type="number"
                value={entry.startYear}
                onChange={(e) => updateEntry<Education>(index, { startYear: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'startYear') ? 'border-yellow-500' : 'border-slate-600'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">End Year</label>
              <input
                type="number"
                value={entry.endYear || ''}
                onChange={(e) => updateEntry<Education>(index, { endYear: e.target.value ? parseInt(e.target.value) : undefined })}
                disabled={entry.current}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200 disabled:opacity-50"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={entry.current || false}
                  onChange={(e) => updateEntry<Education>(index, { current: e.target.checked, endYear: e.target.checked ? undefined : entry.endYear })}
                  className="rounded border-slate-600"
                />
                <span className="text-sm text-slate-300">Current</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">GPA</label>
              <input
                type="text"
                value={entry.gpa || ''}
                onChange={(e) => updateEntry<Education>(index, { gpa: e.target.value || undefined })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'gpa') ? 'border-yellow-500' : 'border-slate-600'
                }`}
                placeholder="e.g., 3.8/4.0"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Honors</label>
              <input
                type="text"
                value={entry.honors || ''}
                onChange={(e) => updateEntry<Education>(index, { honors: e.target.value || undefined })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
                placeholder="e.g., Magna Cum Laude"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setEditingIndex(null)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done Editing
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-slate-200">{entry.degree} in {entry.field}</h4>
            <p className="text-sm text-slate-400">{entry.institution}</p>
            <p className="text-sm text-slate-500">
              {entry.startYear} - {entry.current ? 'Present' : entry.endYear}
              {entry.gpa && ` | GPA: ${entry.gpa}`}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setEditingIndex(index)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => removeEntry(index)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded"
              title="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        {entryUncertainties.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {entryUncertainties.map((u, i) => (
              <span key={i} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                {u.field}: {u.reason}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderExperienceEntry = (entry: WorkExperience, index: number) => {
    const isEditing = editingIndex === index;
    const entryUncertainties = getUncertaintiesForEntry(index);

    if (isEditing) {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Job Title *</label>
              <input
                type="text"
                value={entry.title}
                onChange={(e) => updateEntry<WorkExperience>(index, { title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company *</label>
              <input
                type="text"
                value={entry.company}
                onChange={(e) => updateEntry<WorkExperience>(index, { company: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Location</label>
            <input
              type="text"
              value={entry.location || ''}
              onChange={(e) => updateEntry<WorkExperience>(index, { location: e.target.value || undefined })}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                hasUncertainty(index, 'location') ? 'border-yellow-500' : 'border-slate-600'
              }`}
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Start Date * (dd-mm-yyyy)</label>
              <input
                type="text"
                value={entry.startDate}
                onChange={(e) => updateEntry<WorkExperience>(index, { startDate: e.target.value })}
                placeholder="01-09-2020"
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'startDate') ? 'border-yellow-500' : 'border-slate-600'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">End Date (dd-mm-yyyy)</label>
              <input
                type="text"
                value={entry.endDate || ''}
                onChange={(e) => updateEntry<WorkExperience>(index, { endDate: e.target.value || undefined })}
                disabled={entry.current}
                placeholder="01-07-2023"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200 disabled:opacity-50"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) => updateEntry<WorkExperience>(index, { current: e.target.checked, endDate: e.target.checked ? undefined : entry.endDate })}
                  className="rounded border-slate-600"
                />
                <span className="text-sm text-slate-300">Current</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Achievements</label>
            {entry.achievements.map((achievement, aIndex) => (
              <div key={aIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...entry.achievements];
                    newAchievements[aIndex] = e.target.value;
                    updateEntry<WorkExperience>(index, { achievements: newAchievements });
                  }}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
                />
                <button
                  onClick={() => {
                    const newAchievements = entry.achievements.filter((_, i) => i !== aIndex);
                    updateEntry<WorkExperience>(index, { achievements: newAchievements });
                  }}
                  className="p-2 text-slate-400 hover:text-red-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => updateEntry<WorkExperience>(index, { achievements: [...entry.achievements, ''] })}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Add achievement
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setEditingIndex(null)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done Editing
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-slate-200">{entry.title}</h4>
            <p className="text-sm text-slate-400">
              {entry.company}
              {entry.location && `, ${entry.location}`}
            </p>
            <p className="text-sm text-slate-500">
              {entry.startDate} - {entry.current ? 'Present' : entry.endDate}
            </p>
            {entry.achievements.length > 0 && (
              <ul className="mt-2 text-sm text-slate-400 list-disc list-inside">
                {entry.achievements.slice(0, 2).map((a, i) => (
                  <li key={i} className="truncate">{a}</li>
                ))}
                {entry.achievements.length > 2 && (
                  <li className="text-slate-500">+{entry.achievements.length - 2} more</li>
                )}
              </ul>
            )}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setEditingIndex(index)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => removeEntry(index)}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded"
              title="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        {entryUncertainties.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {entryUncertainties.map((u, i) => (
              <span key={i} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                {u.field}: {u.reason}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSkillEntry = (entry: Skill, index: number) => {
    const isEditing = editingIndex === index;
    const entryUncertainties = getUncertaintiesForEntry(index);

    const categories: SkillCategory[] = ['technical', 'soft', 'language', 'tool'];
    const proficiencies: (SkillProficiency | '')[] = ['', 'beginner', 'intermediate', 'advanced', 'expert'];

    if (isEditing) {
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Skill Name *</label>
            <input
              type="text"
              value={entry.name}
              onChange={(e) => updateEntry<Skill>(index, { name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Category</label>
              <select
                value={entry.category}
                onChange={(e) => updateEntry<Skill>(index, { category: e.target.value as SkillCategory })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'category') ? 'border-yellow-500' : 'border-slate-600'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Proficiency</label>
              <select
                value={entry.proficiency || ''}
                onChange={(e) => updateEntry<Skill>(index, { proficiency: e.target.value ? e.target.value as SkillProficiency : undefined })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-sm text-slate-200 ${
                  hasUncertainty(index, 'proficiency') ? 'border-yellow-500' : 'border-slate-600'
                }`}
              >
                {proficiencies.map((prof) => (
                  <option key={prof || 'none'} value={prof}>
                    {prof ? prof.charAt(0).toUpperCase() + prof.slice(1) : 'Not specified'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setEditingIndex(null)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done Editing
            </button>
          </div>
        </div>
      );
    }

    const categoryColors: Record<SkillCategory, string> = {
      technical: 'bg-blue-500/20 text-blue-400',
      soft: 'bg-green-500/20 text-green-400',
      language: 'bg-purple-500/20 text-purple-400',
      tool: 'bg-orange-500/20 text-orange-400',
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-200">{entry.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[entry.category]}`}>
            {entry.category}
          </span>
          {entry.proficiency && (
            <span className="text-xs text-slate-500">{entry.proficiency}</span>
          )}
          {entryUncertainties.length > 0 && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded" title={entryUncertainties.map(u => u.reason).join(', ')}>
              Uncertain
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setEditingIndex(index)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => removeEntry(index)}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded"
            title="Remove"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderEntry = (entry: Education | WorkExperience | Skill, index: number) => {
    switch (section) {
      case 'education':
        return renderEducationEntry(entry as Education, index);
      case 'experience':
        return renderExperienceEntry(entry as WorkExperience, index);
      case 'skills':
        return renderSkillEntry(entry as Skill, index);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">
            Preview Imported {sectionLabels[section]}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-slate-400 mb-4">
            AI extracted {editedData.length} {editedData.length === 1 ? 'entry' : 'entries'}.
            Review and edit before applying.
            {uncertainties.length > 0 && (
              <span className="text-yellow-400 ml-1">
                ({uncertainties.length} field{uncertainties.length === 1 ? '' : 's'} need{uncertainties.length === 1 ? 's' : ''} review)
              </span>
            )}
          </p>

          {editedData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No entries to import</p>
              <button
                onClick={onRetry}
                className="mt-4 px-4 py-2 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {editedData.map((entry, index) => (
                <div
                  key={entry.id || index}
                  className={`p-4 rounded-lg border ${
                    getUncertaintiesForEntry(index).length > 0
                      ? 'bg-yellow-500/5 border-yellow-500/30'
                      : 'bg-slate-700/50 border-slate-600/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-slate-500 font-medium">{index + 1}.</span>
                    <div className="flex-1">{renderEntry(entry, index)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Import Mode Selection */}
        {editedData.length > 0 && (
          <div className="p-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 mb-3">How do you want to apply these entries?</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  value="add"
                  checked={importMode === 'add'}
                  onChange={() => setImportMode('add')}
                  className="text-blue-600"
                />
                <span className="text-sm text-slate-300">
                  Add to existing data
                  {existingCount > 0 && (
                    <span className="text-slate-500 ml-1">
                      (keeps your {existingCount} current {existingCount === 1 ? 'entry' : 'entries'})
                    </span>
                  )}
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={() => {
                    setImportMode('replace');
                    setReplaceConfirmed(false);
                  }}
                  className="text-blue-600"
                />
                <span className="text-sm text-slate-300">
                  Replace existing data
                  {existingCount > 0 && (
                    <span className="text-red-400 ml-1">
                      (removes {existingCount} current {existingCount === 1 ? 'entry' : 'entries'})
                    </span>
                  )}
                </span>
              </label>

              {importMode === 'replace' && existingCount > 0 && (
                <div className="ml-6 mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={replaceConfirmed}
                      onChange={(e) => setReplaceConfirmed(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-red-400">
                      I understand this will permanently remove my {existingCount} existing {existingCount === 1 ? 'entry' : 'entries'}
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700">
          <button
            onClick={onRetry}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Retry
          </button>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={editedData.length === 0 || (importMode === 'replace' && existingCount > 0 && !replaceConfirmed)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Apply {editedData.length} {editedData.length === 1 ? 'Entry' : 'Entries'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
