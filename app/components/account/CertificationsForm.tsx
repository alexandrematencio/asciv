'use client';

import { useState } from 'react';
import { useProfile } from '@/app/contexts/ProfileContext';
import type { Certification } from '@/app/types';

interface Props {
  onSaveStart: () => void;
  onSaveSuccess: () => void;
  onSaveError: () => void;
}

interface CertificationFormData {
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
}

const emptyCertification: CertificationFormData = {
  name: '',
  issuer: '',
  date: '',
  expiryDate: '',
  credentialId: '',
};

export default function CertificationsForm({ onSaveStart, onSaveSuccess, onSaveError }: Props) {
  const { profile, updateProfile } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CertificationFormData>(emptyCertification);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const certifications = profile?.certifications || [];

  const handleAdd = () => {
    setFormData(emptyCertification);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (cert: Certification) => {
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiryDate: cert.expiryDate || '',
      credentialId: cert.credentialId || '',
    });
    setEditingId(cert.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData(emptyCertification);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.issuer || !formData.date) {
      return;
    }

    onSaveStart();

    const newCertification: Certification = {
      id: editingId || crypto.randomUUID(),
      name: formData.name,
      issuer: formData.issuer,
      date: formData.date,
      expiryDate: formData.expiryDate || undefined,
      credentialId: formData.credentialId || undefined,
    };

    let updatedCertifications: Certification[];
    if (editingId) {
      updatedCertifications = certifications.map((c) =>
        c.id === editingId ? newCertification : c
      );
    } else {
      updatedCertifications = [newCertification, ...certifications];
    }

    const success = await updateProfile({ certifications: updatedCertifications });
    if (success) {
      onSaveSuccess();
      handleCancel();
    } else {
      onSaveError();
    }
  };

  const handleDelete = async (id: string) => {
    onSaveStart();
    const updatedCertifications = certifications.filter((c) => c.id !== id);
    const success = await updateProfile({ certifications: updatedCertifications });
    if (success) {
      onSaveSuccess();
    } else {
      onSaveError();
    }
  };

  const handleClearAll = async () => {
    onSaveStart();
    const success = await updateProfile({ certifications: [] });
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
          <h2 className="text-xl font-bold text-white mb-2">Certifications</h2>
          <p className="text-slate-400 text-sm">
            Ajoutez vos certifications professionnelles.
          </p>
        </div>
        {!isAdding && (
          <div className="flex gap-2">
            {certifications.length > 0 && (
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
            {editingId ? 'Modifier la certification' : 'Nouvelle certification'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nom de la certification <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AWS Solutions Architect, PMP, Google Analytics..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Organisme <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amazon Web Services, PMI, Google..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date d'obtention <span className="text-red-400">*</span>
              </label>
              <input
                type="month"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date d'expiration
              </label>
              <input
                type="month"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ID du certificat
              </label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABC123XYZ"
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
              disabled={!formData.name || !formData.issuer || !formData.date}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.length === 0 && !isAdding ? (
          <div className="text-center py-12 text-slate-500">
            <p>Aucune certification ajoutée</p>
            <p className="text-sm mt-1">Cliquez sur "Ajouter" pour commencer</p>
          </div>
        ) : (
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-700/20 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{cert.name}</h3>
                  <p className="text-slate-400 text-sm">{cert.issuer}</p>
                  <p className="text-slate-500 text-sm">
                    Obtenu: {cert.date}
                    {cert.expiryDate && ` • Expire: ${cert.expiryDate}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-slate-500 text-xs mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
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
              <h3 className="text-lg font-semibold text-white">Effacer toutes les certifications</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Ceci supprimera définitivement les {certifications.length} certification{certifications.length === 1 ? '' : 's'}. Cette action est irréversible.
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
