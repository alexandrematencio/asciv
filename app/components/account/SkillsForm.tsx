'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { Skill, SkillCategory, SkillProficiency } from '@/app/types';
import CVImportSection from './CVImportSection';
import ImportPreviewModal from './ImportPreviewModal';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface SkillFormData {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency | '';
}

interface Uncertainty {
  entryIndex: number;
  field: string;
  reason: string;
}

const emptySkill: SkillFormData = {
  name: '',
  category: 'technical',
  proficiency: '',
};

const categoryLabels: Record<SkillCategory, string> = {
  technical: 'Technical',
  soft: 'Soft Skill',
  language: 'Language',
  tool: 'Tool',
};

const proficiencyLabels: Record<SkillProficiency, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

const categoryColors: Record<SkillCategory, string> = {
  technical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  soft: 'bg-green-500/20 text-green-400 border-green-500/30',
  language: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  tool: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function SkillsForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>(emptySkill);
  const [isAdding, setIsAdding] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Import state
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [importedData, setImportedData] = useState<Skill[]>([]);
  const [importUncertainties, setImportUncertainties] = useState<Uncertainty[]>([]);

  const skills = profile?.skills || [];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const handleAdd = () => {
    setFormData(emptySkill);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency || '',
    });
    setEditingId(skill.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptySkill);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      return;
    }

    onSaveStart();

    const newSkill: Skill = {
      id: editingId || crypto.randomUUID(),
      name: formData.name,
      category: formData.category,
      proficiency: formData.proficiency || undefined,
    };

    let updatedSkills: Skill[];
    if (editingId) {
      updatedSkills = skills.map((s) =>
        s.id === editingId ? newSkill : s
      );
    } else {
      updatedSkills = [...skills, newSkill];
    }

    const success = await updateProfile({ skills: updatedSkills });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedSkills = skills.filter((s) => s.id !== id);
    const success = await updateProfile({ skills: updatedSkills });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ skills: [] });
    if (success) {
      onSaveSuccess();
      setShowClearConfirm(false);
    } else {
      onSaveError();
    }
  };

  // Import handlers
  const handleImportComplete = (data: Skill[], uncertainties: Uncertainty[]) => {
    setImportedData(data);
    setImportUncertainties(uncertainties);
    setShowPreviewModal(true);
  };

  const handleImportConfirm = async (data: Skill[], mode: 'add' | 'replace') => {
    onSaveStart();

    let updatedSkills: Skill[];
    if (mode === 'replace') {
      updatedSkills = data;
    } else {
      updatedSkills = [...skills, ...data];
    }

    const success = await updateProfile({ skills: updatedSkills });
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

  const skillCounts = {
    all: skills.length,
    technical: skills.filter((s) => s.category === 'technical').length,
    soft: skills.filter((s) => s.category === 'soft').length,
    language: skills.filter((s) => s.category === 'language').length,
    tool: skills.filter((s) => s.category === 'tool').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
          <p className="text-slate-400 text-sm">
            Add your technical and soft skills.
            <span className={`ml-2 ${skills.length >= 5 ? 'text-green-400' : 'text-yellow-400'}`}>
              ({skills.length}/5 minimum)
            </span>
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {skills.length > 0 && (
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
          section="skills"
          onImportComplete={(data, uncertainties) => handleImportComplete(data as Skill[], uncertainties)}
          existingCount={skills.length}
        />
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Skill' : 'New Skill'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Leadership, Python..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Proficiency
              </label>
              <select
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value as SkillProficiency | '' })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Not specified</option>
                {Object.entries(proficiencyLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
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
              disabled={!formData.name || !formData.category}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-slate-600 text-white'
              : 'bg-slate-700/50 text-slate-400 hover:text-white'
          }`}
        >
          All ({skillCounts.all})
        </button>
        {(Object.entries(categoryLabels) as [SkillCategory, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeCategory === key
                ? 'bg-slate-600 text-white'
                : 'bg-slate-700/50 text-slate-400 hover:text-white'
            }`}
          >
            {label} ({skillCounts[key]})
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-2">
        {filteredSkills.length === 0 && !isAdding ? (
          <div className="w-full text-center py-12 text-slate-500">
            <p>No skills added yet</p>
            <p className="text-sm mt-1">Click "Add" or import from your CV to get started</p>
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg border ${categoryColors[skill.category]} transition-colors`}
            >
              <span className="text-sm font-medium">{skill.name}</span>
              {skill.proficiency && (
                <span className="text-xs opacity-70">
                  ({proficiencyLabels[skill.proficiency]})
                </span>
              )}
              <div className="hidden group-hover:flex items-center gap-1 ml-1">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-red-400"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Import Preview Modal */}
      <ImportPreviewModal
        isOpen={showPreviewModal}
        section="skills"
        parsedData={importedData}
        uncertainties={importUncertainties}
        existingCount={skills.length}
        onConfirm={(data, mode) => handleImportConfirm(data as Skill[], mode)}
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
              <h3 className="text-lg font-semibold text-white">Clear All Skills</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete all {skills.length} {skills.length === 1 ? 'skill' : 'skills'}. This action cannot be undone.
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
