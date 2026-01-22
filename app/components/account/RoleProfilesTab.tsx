'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { RoleProfile, Skill } from '@/app/types';

interface RoleFormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  customSummary: string;
  selectedExperienceIds: string[];
  selectedSkillIds: string[];
  selectedEducationIds: string[];
}

const emptyRole: RoleFormData = {
  name: '',
  description: '',
  icon: '🎯',
  color: '#6366f1',
  customSummary: '',
  selectedExperienceIds: [],
  selectedSkillIds: [],
  selectedEducationIds: [],
};

const iconOptions = ['🎯', '💼', '💻', '🎨', '📊', '🔧', '📱', '🌐', '🚀', '⚡', '🎭', '📈'];
const colorOptions = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#14b8a6', // Teal
];

export default function RoleProfilesTab() {
  const {
    profile,
    roleProfiles,
    createRoleProfile,
    updateRoleProfile,
    removeRoleProfile,
    setDefaultRole,
  } = useProfile();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<RoleFormData>(emptyRole);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const experiences = profile?.workExperience || [];
  const skills = profile?.skills || [];
  const educations = profile?.education || [];

  const handleAdd = () => {
    setFormData(emptyRole);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (role: RoleProfile) => {
    setFormData({
      name: role.name,
      description: role.description || '',
      icon: role.icon,
      color: role.color,
      customSummary: role.customSummary || '',
      selectedExperienceIds: role.selectedExperienceIds,
      selectedSkillIds: role.selectedSkillIds,
      selectedEducationIds: role.selectedEducationIds,
    });
    setEditingId(role.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyRole);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.name) {
      return;
    }

    setSaveStatus('saving');

    const roleData: Partial<RoleProfile> = {
      id: editingId || undefined,
      name: formData.name,
      description: formData.description || undefined,
      icon: formData.icon,
      color: formData.color,
      customSummary: formData.customSummary || undefined,
      selectedExperienceIds: formData.selectedExperienceIds,
      experienceOrder: formData.selectedExperienceIds,
      selectedSkillIds: formData.selectedSkillIds,
      skillPriority: formData.selectedSkillIds,
      selectedEducationIds: formData.selectedEducationIds,
      selectedCertificationIds: [],
      additionalSkills: [],
      customAchievements: [],
    };

    const success = editingId
      ? await updateRoleProfile({ ...roleData, id: editingId })
      : await createRoleProfile(roleData);

    if (success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      handleCancel();
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    setSaveStatus('saving');
    const success = await removeRoleProfile(id);
    if (success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSetDefault = async (id: string) => {
    setSaveStatus('saving');
    const success = await setDefaultRole(id);
    if (success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const toggleExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedExperienceIds: prev.selectedExperienceIds.includes(id)
        ? prev.selectedExperienceIds.filter((i) => i !== id)
        : [...prev.selectedExperienceIds, id],
    }));
  };

  const toggleSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkillIds: prev.selectedSkillIds.includes(id)
        ? prev.selectedSkillIds.filter((i) => i !== id)
        : [...prev.selectedSkillIds, id],
    }));
  };

  const toggleEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedEducationIds: prev.selectedEducationIds.includes(id)
        ? prev.selectedEducationIds.filter((i) => i !== id)
        : [...prev.selectedEducationIds, id],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Profils de rôle</h2>
          <p className="text-slate-400 text-sm">
            Créez des profils personnalisés pour différents types de postes.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {saveStatus === 'saving' && (
            <span className="text-yellow-400 text-sm flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-400"></div>
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-green-400 text-sm">Enregistré</span>
          )}
          {!isAdding && (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Nouveau profil
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Modifier le profil' : 'Nouveau profil de rôle'}
          </h3>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nom du profil <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: UX Designer, Développeur Full Stack..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brève description de ce profil"
              />
            </div>
          </div>

          {/* Icon & Color */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Icône
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 text-xl rounded-lg border transition-colors ${
                      formData.icon === icon
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Couleur
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      formData.color === color
                        ? 'border-white scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Custom Summary */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Résumé personnalisé (optionnel)
            </label>
            <textarea
              value={formData.customSummary}
              onChange={(e) => setFormData({ ...formData, customSummary: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Laissez vide pour utiliser votre résumé général, ou écrivez un résumé spécifique pour ce type de poste..."
            />
          </div>

          {/* Experience Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Expériences à inclure
            </label>
            {experiences.length === 0 ? (
              <p className="text-slate-500 text-sm">Aucune expérience dans votre profil</p>
            ) : (
              <div className="space-y-2">
                {experiences.map((exp) => (
                  <label
                    key={exp.id}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedExperienceIds.includes(exp.id)}
                      onChange={() => toggleExperience(exp.id)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-white font-medium">{exp.title}</p>
                      <p className="text-slate-400 text-sm">{exp.company}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Skills Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Compétences à mettre en avant
            </label>
            {skills.length === 0 ? (
              <p className="text-slate-500 text-sm">Aucune compétence dans votre profil</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.selectedSkillIds.includes(skill.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Education Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Formations à inclure
            </label>
            {educations.length === 0 ? (
              <p className="text-slate-500 text-sm">Aucune formation dans votre profil</p>
            ) : (
              <div className="space-y-2">
                {educations.map((edu) => (
                  <label
                    key={edu.id}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedEducationIds.includes(edu.id)}
                      onChange={() => toggleEducation(edu.id)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-white font-medium">{edu.degree}</p>
                      <p className="text-slate-400 text-sm">{edu.institution}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.name}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Mettre à jour' : 'Créer le profil'}
            </button>
          </div>
        </div>
      )}

      {/* Role Profiles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleProfiles.length === 0 && !isAdding ? (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <p>Aucun profil de rôle créé</p>
            <p className="text-sm mt-1">
              Les profils de rôle vous permettent de personnaliser votre CV pour différents types de postes
            </p>
          </div>
        ) : (
          roleProfiles.map((role) => (
            <div
              key={role.id}
              className="bg-slate-700/20 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              style={{ borderLeftColor: role.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{role.name}</h3>
                      {role.isDefault && (
                        <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                          Par défaut
                        </span>
                      )}
                    </div>
                    {role.description && (
                      <p className="text-slate-400 text-sm">{role.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {!role.isDefault && (
                    <button
                      onClick={() => handleSetDefault(role.id)}
                      className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                      title="Définir par défaut"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                {role.selectedExperienceIds.length} expériences •{' '}
                {role.selectedSkillIds.length} compétences •{' '}
                {role.selectedEducationIds.length} formations
              </div>

              {role.usageCount > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  Utilisé {role.usageCount} fois
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
