import React, { useState } from 'react';
import Button from './Button';
import { Template } from '../types';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    company: string;
    role: string;
    jobDescription: string;
    jobUrl?: string;
    cvData?: {
      name: string;
      email: string;
      phone: string;
      address: string;
      summary: string;
      experience: string;
      skills: string;
      education: string;
    };
    useExistingTemplate: boolean;
    selectedTemplateId?: string;
  }) => void;
  templates: Template[];
}

export default function NewApplicationModal({
  isOpen,
  onClose,
  onCreate,
  templates,
}: NewApplicationModalProps) {
  const [step, setStep] = useState(1);
  
  // Step 1: Job Info
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [useUrl, setUseUrl] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  
  // Step 2: CV Source
  const [cvSource, setCvSource] = useState<'scratch' | 'template'>('scratch');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  
  // Step 3: CV Data (if from scratch)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');

  const hasTemplates = templates.length > 0;

  const resetForm = () => {
    setStep(1);
    setCompany('');
    setRole('');
    setUseUrl(false);
    setJobDescription('');
    setJobUrl('');
    setCvSource('scratch');
    setSelectedTemplateId('');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setSummary('');
    setExperience('');
    setSkills('');
    setEducation('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => {
    if (step === 1) {
      if (!company.trim() || !role.trim()) return;
      if (!useUrl && !jobDescription.trim()) return;
      if (useUrl && !jobUrl.trim()) return;
      setStep(2);
    } else if (step === 2) {
      if (cvSource === 'template' && hasTemplates) {
        // Use template - can create directly
        handleCreate();
      } else {
        // From scratch - go to step 3
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    if (cvSource === 'scratch') {
      // Validate CV data
      if (!name.trim() || !email.trim() || !experience.trim()) {
        return;
      }
      
      onCreate({
        company: company.trim(),
        role: role.trim(),
        jobDescription: useUrl ? '' : jobDescription.trim(),
        jobUrl: useUrl ? jobUrl.trim() : undefined,
        cvData: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          summary: summary.trim(),
          experience: experience.trim(),
          skills: skills.trim(),
          education: education.trim(),
        },
        useExistingTemplate: false,
      });
    } else {
      // Use template
      onCreate({
        company: company.trim(),
        role: role.trim(),
        jobDescription: useUrl ? '' : jobDescription.trim(),
        jobUrl: useUrl ? jobUrl.trim() : undefined,
        useExistingTemplate: true,
        selectedTemplateId,
      });
    }
    
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Slide Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-3xl font-bold">🎯 New Job Application</h2>
              <p className="text-indigo-100 mt-1">
                Step {step} of {cvSource === 'template' && hasTemplates ? 2 : 3}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-indigo-400/30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / (cvSource === 'template' && hasTemplates ? 2 : 3)) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* STEP 1: Job Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📋 Job Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Google, Meta, Airbnb..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Product Designer"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Job Details *
                  </label>
                  <button
                    onClick={() => setUseUrl(!useUrl)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    {useUrl ? '📝 Switch to Description' : '🔗 Switch to URL'}
                  </button>
                </div>

                {useUrl ? (
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="https://linkedin.com/jobs/..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                ) : (
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here...

We're looking for a talented designer who...
Requirements:
- 5+ years experience
- Figma expert
..."
                    rows={10}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CV Source */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📄 CV Source
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Choose how to create your CV for this application
                </p>
              </div>

              <div className="space-y-4">
                {/* From Scratch Option */}
                <button
                  onClick={() => setCvSource('scratch')}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    cvSource === 'scratch'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      cvSource === 'scratch' ? 'border-indigo-500' : 'border-gray-300'
                    }`}>
                      {cvSource === 'scratch' && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-lg mb-2">
                        ✨ Create from Scratch
                      </div>
                      <div className="text-sm text-gray-600">
                        Enter your information and AI will generate a complete, tailored CV based on the job description
                      </div>
                    </div>
                  </div>
                </button>

                {/* Use Template Option */}
                <button
                  onClick={() => {
                    if (hasTemplates) {
                      setCvSource('template');
                      if (!selectedTemplateId && templates.length > 0) {
                        setSelectedTemplateId(templates[0].id);
                      }
                    }
                  }}
                  disabled={!hasTemplates}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    !hasTemplates
                      ? 'opacity-50 cursor-not-allowed bg-gray-50'
                      : cvSource === 'template'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      cvSource === 'template' && hasTemplates ? 'border-indigo-500' : 'border-gray-300'
                    }`}>
                      {cvSource === 'template' && hasTemplates && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-lg mb-2">
                        📋 Use Existing Template
                        {!hasTemplates && (
                          <span className="ml-2 text-xs font-normal text-gray-500">(No templates yet)</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {hasTemplates 
                          ? 'AI will match and adapt your best existing template for this job'
                          : 'Create your first CV to use templates in future applications'}
                      </div>
                      
                      {hasTemplates && cvSource === 'template' && (
                        <select
                          value={selectedTemplateId}
                          onChange={(e) => setSelectedTemplateId(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {templates.map(template => (
                            <option key={template.id} value={template.id}>
                              {template.icon} {template.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CV Data (From Scratch) */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  👤 Your Information
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Fill in your details - AI will use this to create your tailored CV
                </p>
              </div>

              {/* Personal Info */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h4 className="font-semibold text-gray-900">Personal Details</h4>
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email *"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address / Location"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Professional Summary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief overview of your professional background and goals..."
                  rows={3}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience *
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Your work experience, job titles, companies, dates, and achievements..."
                  rows={6}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Your technical skills, tools, languages, certifications..."
                  rows={3}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Education
                </label>
                <textarea
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Degrees, institutions, graduation dates..."
                  rows={3}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t-2 p-6 flex gap-4 shadow-lg">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              ← Back
            </Button>
          )}
          
          {step < (cvSource === 'template' && hasTemplates ? 2 : 3) ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!company.trim() || !role.trim() || (!useUrl && !jobDescription.trim()) || (useUrl && !jobUrl.trim())))
              }
              size="lg"
              className="flex-1"
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={
                cvSource === 'scratch' && (!name.trim() || !email.trim() || !experience.trim())
              }
              size="lg"
              className="flex-1"
            >
              ✨ Create & Generate CV
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
