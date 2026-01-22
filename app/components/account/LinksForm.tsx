'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { PortfolioLink } from '@/app/types';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface LinkFormData {
  type: PortfolioLink['type'];
  url: string;
  label: string;
}

const emptyLink: LinkFormData = {
  type: 'linkedin',
  url: '',
  label: '',
};

const linkTypeLabels: Record<PortfolioLink['type'], string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  portfolio: 'Portfolio',
  twitter: 'Twitter / X',
  dribbble: 'Dribbble',
  behance: 'Behance',
  other: 'Autre',
};

const linkTypeIcons: Record<PortfolioLink['type'], string> = {
  linkedin: '💼',
  github: '💻',
  portfolio: '🌐',
  twitter: '🐦',
  dribbble: '🎨',
  behance: '🎭',
  other: '🔗',
};

const linkTypePlaceholders: Record<PortfolioLink['type'], string> = {
  linkedin: 'https://linkedin.com/in/votre-profil',
  github: 'https://github.com/votre-username',
  portfolio: 'https://votre-site.com',
  twitter: 'https://twitter.com/votre-username',
  dribbble: 'https://dribbble.com/votre-username',
  behance: 'https://behance.net/votre-username',
  other: 'https://...',
};

export default function LinksForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<LinkFormData>(emptyLink);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const links = profile?.portfolioLinks || [];

  const handleAdd = () => {
    setFormData(emptyLink);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (link: PortfolioLink) => {
    setFormData({
      type: link.type,
      url: link.url,
      label: link.label || '',
    });
    setEditingId(link.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyLink);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.url) {
      return;
    }

    onSaveStart();

    const newLink: PortfolioLink = {
      id: editingId || crypto.randomUUID(),
      type: formData.type,
      url: formData.url,
      label: formData.label || undefined,
    };

    let updatedLinks: PortfolioLink[];
    if (editingId) {
      updatedLinks = links.map((l) =>
        l.id === editingId ? newLink : l
      );
    } else {
      updatedLinks = [...links, newLink];
    }

    const success = await updateProfile({ portfolioLinks: updatedLinks });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedLinks = links.filter((l) => l.id !== id);
    const success = await updateProfile({ portfolioLinks: updatedLinks });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ portfolioLinks: [] });
    if (success) {
      onSaveSuccess();
      setShowClearConfirm(false);
    } else {
      onSaveError();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Liens & Portfolio</h2>
          <p className="text-slate-400 text-sm">
            Ajoutez vos profils professionnels et liens de portfolio.
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {links.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition-colors"
              >
                Tout effacer
              </button>
            )}
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Ajouter
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Modifier le lien' : 'Nouveau lien'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as PortfolioLink['type'] })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(linkTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {linkTypeIcons[key as PortfolioLink['type']]} {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={linkTypePlaceholders[formData.type]}
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Label personnalisé (optionnel)
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Mon portfolio de design, Projets open source..."
              />
            </div>
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
              disabled={!formData.url}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* Links List */}
      <div className="space-y-3">
        {links.length === 0 && !isAdding ? (
          <div className="text-center py-12 text-slate-500">
            <p>Aucun lien ajouté</p>
            <p className="text-sm mt-1">Cliquez sur "Ajouter" pour commencer</p>
          </div>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className="group flex items-center justify-between px-4 py-3 bg-slate-700/20 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{linkTypeIcons[link.type]}</span>
                <div>
                  <p className="font-medium text-white">
                    {link.label || linkTypeLabels[link.type]}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate block max-w-xs md:max-w-md"
                  >
                    {link.url}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => handleEdit(link)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
              <h3 className="text-lg font-semibold text-white">Effacer tous les liens</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Ceci supprimera définitivement les {links.length} lien{links.length === 1 ? '' : 's'}. Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Tout effacer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
