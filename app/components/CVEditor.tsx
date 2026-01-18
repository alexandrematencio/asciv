import React, { useState } from 'react';
import { Application } from '../types';

interface CVEditorProps {
  application: Application;
  onSave: (cvContent: CVContent) => void;
  onCancel: () => void;
  onDeleteApplication?: () => void;
}

interface CVContent {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export default function CVEditor({ application, onSave, onCancel, onDeleteApplication }: CVEditorProps) {
  // Parse initial CV content (Markdown-aware parsing with FIXED date extraction)
  const parseInitialCV = (): CVContent => {
    const cv = application.cvVersions[0];
    if (!cv || !cv.content) {
      return {
        personalInfo: { name: '', email: '', phone: '', location: '' },
        summary: '',
        experiences: [],
        education: [],
        skills: [],
      };
    }
    
    console.log('Parsing CV content:', cv.content);
    
    const lines = cv.content.split('\n');
    const result: CVContent = {
      personalInfo: { name: '', email: '', phone: '', location: '' },
      summary: '',
      experiences: [],
      education: [],
      skills: [],
    };

    // Extract personal info from header
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ') && !result.personalInfo.name) {
        result.personalInfo.name = line.replace(/^#\s+/, '').trim();
      }
      
      const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) result.personalInfo.email = emailMatch[0];
      
      const phoneMatch = line.match(/(\+?\d[\d\s\(\)-]{9,})/);
      if (phoneMatch) result.personalInfo.phone = phoneMatch[0].trim();
      
      if (line.includes('📍') || line.match(/\d+\s+\w+.*,/)) {
        result.personalInfo.location = line.replace(/📍/g, '').trim();
      }
    }

    let currentSection = 'none';
    let currentExp: Partial<Experience> | null = null;
    let currentEdu: Partial<Education> | null = null;
    let expDescLines: string[] = [];
    let summaryLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Section detection
      if (trimmed.match(/^##\s+(professional\s+)?summary/i)) {
        currentSection = 'summary';
        continue;
      }
      
      if (trimmed.match(/^##\s+(professional\s+)?experience/i)) {
        currentSection = 'experience';
        continue;
      }
      
      if (trimmed.match(/^##\s+education/i)) {
        if (currentExp) {
          result.experiences.push({
            id: `exp-${Date.now()}-${result.experiences.length}`,
            company: currentExp.company || '',
            title: currentExp.title || '',
            startDate: currentExp.startDate || '',
            endDate: currentExp.endDate || '',
            current: currentExp.current || false,
            description: expDescLines.join('\n'),
          });
          currentExp = null;
          expDescLines = [];
        }
        currentSection = 'education';
        continue;
      }
      
      if (trimmed.match(/^##\s+(technical\s+)?(skills?|competencies|proficiencies)/i)) {
        if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
          result.education.push({
            id: `edu-${Date.now()}-${result.education.length}`,
            institution: currentEdu.institution || '',
            degree: currentEdu.degree || '',
            field: currentEdu.field || '',
            year: currentEdu.year || '',
          });
          currentEdu = null;
        }
        currentSection = 'skills';
        continue;
      }

      if (trimmed === '---' || trimmed === '***') continue;

      // Process content
      if (currentSection === 'summary') {
        if (trimmed.startsWith('#')) continue;
        const cleanText = trimmed.replace(/\*\*/g, '');
        if (cleanText && !cleanText.match(/^##/)) {
          summaryLines.push(cleanText);
        }
      } 
      else if (currentSection === 'experience') {
        // New experience: ### **Title** | *Dates*
        if (trimmed.startsWith('###')) {
          if (currentExp) {
            result.experiences.push({
              id: `exp-${Date.now()}-${result.experiences.length}`,
              company: currentExp.company || '',
              title: currentExp.title || '',
              startDate: currentExp.startDate || '',
              endDate: currentExp.endDate || '',
              current: currentExp.current || false,
              description: expDescLines.join('\n'),
            });
            expDescLines = [];
          }
          
          const headerText = trimmed.replace(/^###\s+/, '');
          currentExp = {};
          
          // Extract title (everything before first |)
          const titleMatch = headerText.match(/\*\*([^*]+)\*\*/);
          if (titleMatch) {
            currentExp.title = titleMatch[1].trim();
          }
          
          // Look for dates in the header (format: | *Sep 2017 - Jul 2023*)
          const dateMatch = headerText.match(/\*([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4}|Present|Current)\*/i);
          if (dateMatch) {
            currentExp.startDate = dateMatch[1];
            currentExp.endDate = dateMatch[2];
            currentExp.current = /present|current/i.test(dateMatch[2]);
          }
        }
        // Company name line: *Company Name* or role subtitle
        else if (trimmed.startsWith('*') && !trimmed.startsWith('**') && currentExp) {
          const subtitle = trimmed.replace(/\*/g, '').trim();
          
          // Check if this line contains dates
          const dateMatch = subtitle.match(/([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4}|Present|Current)/i);
          if (dateMatch && !currentExp.startDate) {
            currentExp.startDate = dateMatch[1];
            currentExp.endDate = dateMatch[2];
            currentExp.current = /present|current/i.test(dateMatch[2]);
          } else if (!currentExp.company) {
            currentExp.company = subtitle;
          }
        }
        // Description bullets
        else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
          const cleanLine = trimmed
            .replace(/^[-•]\s+/, '')
            .replace(/\*\*/g, '');
          expDescLines.push(cleanLine);
        }
      } 
      else if (currentSection === 'education') {
        if (trimmed.startsWith('**') || trimmed.match(/\d{4}/)) {
          if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
            result.education.push({
              id: `edu-${Date.now()}-${result.education.length}`,
              institution: currentEdu.institution || '',
              degree: currentEdu.degree || '',
              field: currentEdu.field || '',
              year: currentEdu.year || '',
            });
          }
          
          currentEdu = {};
          
          if (trimmed.includes('|')) {
            const parts = trimmed.split('|').map(p => p.trim());
            if (parts.length >= 1) {
              currentEdu.degree = parts[0].replace(/\*\*/g, '').trim();
            }
            if (parts.length >= 2) {
              currentEdu.institution = parts[1].replace(/\*/g, '').trim();
            }
            if (parts.length >= 3) {
              currentEdu.year = parts[2].replace(/\*/g, '').trim();
            }
          } else {
            const years = trimmed.match(/\d{4}(-\d{4})?/);
            if (years) {
              currentEdu.year = years[0];
              const beforeYear = trimmed.substring(0, trimmed.indexOf(years[0])).trim();
              currentEdu.degree = beforeYear.replace(/\*\*/g, '');
            } else {
              currentEdu.degree = trimmed.replace(/\*\*/g, '');
            }
          }
        }
        else if (trimmed.startsWith('*') && !trimmed.startsWith('**')) {
          const text = trimmed.replace(/\*/g, '').trim();
          if (currentEdu) {
            if (!currentEdu.institution) {
              currentEdu.institution = text;
            } else if (!currentEdu.field) {
              currentEdu.field = text;
            }
          }
        }
      } 
      else if (currentSection === 'skills') {
        if (trimmed.startsWith('#') || (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(','))) {
          continue;
        }
        
        const cleaned = trimmed.replace(/^[-•]\s+/, '').replace(/\*\*/g, '');
        const skillsList = cleaned.split(/[,|•]/)
          .map(s => s.trim())
          .filter(s => s.length > 0 && s.length < 50 && !s.match(/^##/));
        
        result.skills.push(...skillsList);
      }
    }

    // Save pending items
    if (currentExp) {
      result.experiences.push({
        id: `exp-${Date.now()}-${result.experiences.length}`,
        company: currentExp.company || '',
        title: currentExp.title || '',
        startDate: currentExp.startDate || '',
        endDate: currentExp.endDate || '',
        current: currentExp.current || false,
        description: expDescLines.join('\n'),
      });
    }

    if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
      result.education.push({
        id: `edu-${Date.now()}-${result.education.length}`,
        institution: currentEdu.institution || '',
        degree: currentEdu.degree || '',
        field: currentEdu.field || '',
        year: currentEdu.year || '',
      });
    }

    result.summary = summaryLines.join('\n').trim();
    result.skills = [...new Set(result.skills)]
      .filter(s => s && !s.match(/^(design|technical|additional|languages|tools|web|mobile|methodologies)/i));

    console.log('Parsed result:', result);
    return result;
  };

  const [cvData, setCvData] = useState<CVContent>(parseInitialCV());
  const [newSkill, setNewSkill] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updatePersonalInfo = (field: keyof CVContent['personalInfo'], value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setCvData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      title: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      year: '',
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSave = () => {
    onSave(cvData);
  };

  const handleDeleteApplication = () => {
    if (onDeleteApplication) {
      onDeleteApplication();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Edit CV</h2>
            <p className="text-indigo-100 text-sm mt-1">
              {application.company} - {application.role}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
            >
              💾 Save Changes
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Personal Info Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {cvData.personalInfo.name.charAt(0) || '?'}
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 shadow-lg">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <span className="text-white text-sm">📷</span>
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={cvData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    placeholder="Full Name *"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="Email *"
                  className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="tel"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="Phone"
                  className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <input
                type="text"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="Location (City, Country)"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Professional Summary
            </h3>
            <textarea
              value={cvData.summary}
              onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Write a brief summary of your professional background, key achievements, and career goals..."
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                Work Experience
              </h3>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 font-medium transition-colors"
              >
                + Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {cvData.experiences.map((exp, index) => (
                <div key={exp.id} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200 relative">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company Name *"
                        className="p-3 border-2 border-gray-200 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        placeholder="Job Title *"
                        className="p-3 border-2 border-gray-200 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-center">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Start Date (e.g., Sep 2020)"
                        className="p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="End Date (e.g., Jul 2023)"
                        disabled={exp.current}
                        className="p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Currently working here</span>
                      </label>
                    </div>

                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities, achievements, and key projects..."
                      rows={3}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}

              {cvData.experiences.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No experiences added yet. Click "+ Add Experience" to start.
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Education
              </h3>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 font-medium transition-colors"
              >
                + Add Education
              </button>
            </div>

            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200 relative">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Institution *"
                      className="p-3 border-2 border-gray-200 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Degree *"
                      className="p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Field of Study"
                      className="p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      placeholder="Year (e.g., 2020-2024)"
                      className="p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}

              {cvData.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No education added yet. Click "+ Add Education" to start.
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Skills
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a skill (e.g., Figma, JavaScript, Project Management)"
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addSkill}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium flex items-center gap-2 group"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-indigo-400 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {cvData.skills.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No skills added yet. Add your technical and soft skills above.
              </div>
            )}
          </div>

          {/* Delete Application Section */}
          {onDeleteApplication && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Danger Zone
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete this application, there is no going back. This action cannot be undone.
              </p>
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors"
                >
                  🗑️ Delete Application
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteApplication}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors"
                  >
                    ✓ Yes, Delete Forever
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
