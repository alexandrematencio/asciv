import React, { useState } from 'react';
import { Application, CVVersion } from '../types';
import CVEditor from './CVEditor';

interface CVDetailModalProps {
  application: Application;
  onClose: () => void;
  onUpdateCV: (appId: string, cvId: string, newContent: string) => void;
  onSetMainVersion: (appId: string, cvId: string) => void;
  onDownloadCV: (cv: CVVersion, app: Application) => void;
  onDeleteApplication?: () => void;
  onCreateNewVersion?: (currentCvId: string) => string | void;
}

export default function CVDetailModal({
  application,
  onClose,
  onUpdateCV,
  onSetMainVersion,
  onDownloadCV,
  onDeleteApplication,
  onCreateNewVersion,
}: CVDetailModalProps) {
  const [selectedCVId, setSelectedCVId] = useState(
    application.cvVersions[0]?.id || ''
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const selectedCV = application.cvVersions.find(cv => cv.id === selectedCVId);
  const mainCV = application.cvVersions[0]; // First one is main

  const handleEdit = () => {
    if (selectedCV) {
      setEditContent(selectedCV.content);
      setIsEditing(true);
    }
  };

  const handleOpenEditor = () => {
    setShowEditor(true);
  };

  const handleSaveFromEditor = (cvData: any) => {
    // Convert structured data to text format
    const cvText = formatCVData(cvData);
    onUpdateCV(application.id, selectedCVId, cvText);
    setShowEditor(false);
  };

  const createNewVersion = () => {
    if (onCreateNewVersion) {
      const newVersionId = onCreateNewVersion(selectedCVId);
      // Switch to new version and open editor
      if (typeof newVersionId === 'string') {
        setSelectedCVId(newVersionId);
        setShowEditor(true);
      }
    }
  };

  const formatCVData = (cvData: any): string => {
    let text = '';
    
    // Personal Info
    text += `${cvData.personalInfo.name}\n`;
    text += `${cvData.personalInfo.email} | ${cvData.personalInfo.phone}\n`;
    text += `${cvData.personalInfo.location}\n\n`;
    
    // Summary
    if (cvData.summary) {
      text += `PROFESSIONAL SUMMARY\n`;
      text += `${cvData.summary}\n\n`;
    }
    
    // Experience
    if (cvData.experiences.length > 0) {
      text += `WORK EXPERIENCE\n\n`;
      cvData.experiences.forEach((exp: any) => {
        text += `${exp.title} at ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        text += `${exp.description}\n\n`;
      });
    }
    
    // Education
    if (cvData.education.length > 0) {
      text += `EDUCATION\n\n`;
      cvData.education.forEach((edu: any) => {
        text += `${edu.degree} in ${edu.field}\n`;
        text += `${edu.institution} - ${edu.year}\n\n`;
      });
    }
    
    // Skills
    if (cvData.skills.length > 0) {
      text += `SKILLS\n`;
      text += cvData.skills.join(', ');
    }
    
    return text;
  };

  const handleSave = () => {
    if (selectedCV) {
      onUpdateCV(application.id, selectedCV.id, editContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent('');
  };

  // Parse CV content into sections (simple text parsing)
  const parseCV = (content: string) => {
    const lines = content.split('\n');
    const sections: { [key: string]: string[] } = {
      header: [],
      summary: [],
      experience: [],
      education: [],
      skills: [],
      other: [],
    };

    let currentSection = 'header';
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('experience') || lowerLine.includes('expérience')) {
        currentSection = 'experience';
        continue;
      } else if (lowerLine.includes('education') || lowerLine.includes('études') || lowerLine.includes('formation')) {
        currentSection = 'education';
        continue;
      } else if (lowerLine.includes('skills') || lowerLine.includes('compétence') || lowerLine.includes('technical')) {
        currentSection = 'skills';
        continue;
      } else if (lowerLine.includes('summary') || lowerLine.includes('profil') || lowerLine.includes('about')) {
        currentSection = 'summary';
        continue;
      }
      
      if (line.trim()) {
        sections[currentSection].push(line);
      }
    }

    return sections;
  };

  const cvSections = selectedCV ? parseCV(selectedCV.content) : null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-7xl w-full h-[90vh] flex overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar - CV Versions */}
        <div className="w-80 bg-gray-50 border-r overflow-y-auto">
          <div className="p-6 border-b bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              CV Versions
            </h3>
            <p className="text-sm text-gray-600">
              {application.cvVersions.length} version{application.cvVersions.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="p-4 space-y-2">
            {application.cvVersions.map((cv, index) => {
              const isMain = index === 0;
              const isSelected = cv.id === selectedCVId;

              return (
                <div
                  key={cv.id}
                  onClick={() => setSelectedCVId(cv.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isMain && <span className="text-xl">⭐</span>}
                      <span className="font-semibold text-gray-900">
                        v{cv.version}
                      </span>
                    </div>
                    {isMain && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        MAIN
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    {new Date(cv.createdAt).toLocaleDateString()} at{' '}
                    {new Date(cv.createdAt).toLocaleTimeString()}
                  </div>

                  <div className="flex gap-2">
                    {!isMain && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSetMainVersion(application.id, cv.id);
                        }}
                        className="text-xs px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 font-medium"
                      >
                        ⭐ Set as Main
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadCV(cv, application);
                      }}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                    >
                      📥
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create New Version Button */}
          <div className="p-4 border-t">
            <button
              onClick={createNewVersion}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 font-semibold transition-colors shadow-md"
            >
              ✨ Create New Version
            </button>
          </div>
        </div>

        {/* Main Content - CV Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {application.company} - {application.role}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedCV && `Version ${selectedCV.version}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleOpenEditor}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
                  >
                    ✏️ Edit (Structured)
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-medium transition-colors text-sm"
                  >
                    Edit Text
                  </button>
                  <button
                    onClick={() => selectedCV && onDownloadCV(selectedCV, application)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                  >
                    📥 Download
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-colors"
                  >
                    💾 Save Changes
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* CV Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              {isEditing ? (
                // Edit Mode - Simple Textarea
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-[600px] p-4 border-2 border-gray-200 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                // Preview Mode - Formatted CV
                selectedCV && cvSections && (
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* CV Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                      {cvSections.header.map((line, i) => {
                        if (i === 0) {
                          // Name (first line)
                          return (
                            <h1 key={i} className="text-4xl font-bold mb-2">
                              {line}
                            </h1>
                          );
                        }
                        return (
                          <p key={i} className="text-indigo-100">
                            {line}
                          </p>
                        );
                      })}
                    </div>

                    <div className="p-8 space-y-8">
                      {/* Summary Section */}
                      {cvSections.summary.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-200">
                            📝 Professional Summary
                          </h2>
                          <div className="text-gray-700 leading-relaxed space-y-2">
                            {cvSections.summary.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Experience Section */}
                      {cvSections.experience.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-200">
                            💼 Experience
                          </h2>
                          <div className="space-y-4">
                            {cvSections.experience.map((line, i) => (
                              <div key={i} className="text-gray-700">
                                {line.startsWith('-') || line.startsWith('•') ? (
                                  <div className="flex gap-2 ml-4">
                                    <span className="text-indigo-600 mt-1">•</span>
                                    <span className="flex-1">{line.replace(/^[-•]\s*/, '')}</span>
                                  </div>
                                ) : (
                                  <p className="font-semibold text-gray-900">{line}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education Section */}
                      {cvSections.education.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-200">
                            🎓 Education
                          </h2>
                          <div className="space-y-2 text-gray-700">
                            {cvSections.education.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills Section */}
                      {cvSections.skills.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-200">
                            ⚡ Skills
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {cvSections.skills.map((line, i) => {
                              // Split by commas or bullets
                              const skills = line.split(/[,•]/).map(s => s.trim()).filter(Boolean);
                              return skills.map((skill, j) => (
                                <span
                                  key={`${i}-${j}`}
                                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ));
                            })}
                          </div>
                        </div>
                      )}

                      {/* Other Content */}
                      {cvSections.other.length > 0 && (
                        <div className="text-gray-700 space-y-2">
                          {cvSections.other.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* CVEditor Modal */}
        {showEditor && (
          <CVEditor
            application={application}
            onSave={handleSaveFromEditor}
            onCancel={() => setShowEditor(false)}
            onDeleteApplication={onDeleteApplication}
          />
        )}
      </div>
    </div>
  );
}
