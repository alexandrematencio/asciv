import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, FileText, User, Briefcase, Link as LinkIcon, Sparkles, Plus, Loader2, Zap, Target } from 'lucide-react';
import Button from './Button';
import { Template } from '../types';
import { useProfile } from '../contexts/ProfileContext';

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
      age?: string;
      languages?: string;
      portfolio?: string;
      summary: string;
      experience: string;
      skills: string;
      education: string;
      projects?: string;
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
  const router = useRouter();
  const { profile, isComplete: profileComplete, roleProfiles, missingFields } = useProfile();
  const [step, setStep] = useState(1);

  // Step 1: Job Info
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [useUrl, setUseUrl] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  // Step 2: CV Source
  const [cvSource, setCvSource] = useState<'scratch' | 'template' | 'profile'>('scratch');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedRoleProfileId, setSelectedRoleProfileId] = useState<string>('');
  
  // Step 3: CV Data (if from scratch)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [languages, setLanguages] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState('');
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [education, setEducation] = useState('');
  const [projects, setProjects] = useState('');
  const [isLoadingProjectSuggestions, setIsLoadingProjectSuggestions] = useState(false);

  // Legacy skills string for backwards compatibility
  const skills = skillTags.join(', ');

  const hasTemplates = templates.length > 0;
  const hasRoleProfiles = roleProfiles.length > 0;

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number | null => {
    if (!dateOfBirth) return null;
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge > 0 ? calculatedAge : null;
  };

  // Pre-fill basic info from profile when modal opens (for both 'profile' and 'scratch' modes)
  useEffect(() => {
    if (isOpen && profile) {
      // Pre-fill basic personal info if available and fields are empty
      if (!name && profile.fullName) setName(profile.fullName);
      if (!email && profile.email) setEmail(profile.email);
      if (!phone && profile.phone) setPhone(profile.phone);
      if (!address && (profile.city || profile.country)) {
        setAddress([profile.city, profile.country].filter(Boolean).join(', '));
      }
      // Age - calculate from date of birth
      if (!age && profile.dateOfBirth) {
        const calculatedAge = calculateAge(profile.dateOfBirth);
        if (calculatedAge) setAge(calculatedAge.toString());
      }
      // Portfolio URL - pre-fill from links
      if (!portfolio) {
        const portfolioLink = profile.portfolioLinks?.find(l => l.type === 'portfolio' || l.type === 'linkedin');
        if (portfolioLink) setPortfolio(portfolioLink.url);
      }
      // Languages
      if (!languages && profile.languages?.length) {
        setLanguages(profile.languages.map(l => `${l.language} (${l.proficiency})`).join(', '));
      }
    }
  }, [isOpen, profile]);

  // Full pre-fill form from profile when source is 'profile'
  useEffect(() => {
    if (cvSource === 'profile' && profile && profileComplete) {
      // Find selected role profile or use general profile
      const roleProfile = selectedRoleProfileId
        ? roleProfiles.find(rp => rp.id === selectedRoleProfileId)
        : null;

      // Build name
      setName(profile.fullName || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setAddress([profile.city, profile.country].filter(Boolean).join(', '));

      // Languages from profile
      const langList = profile.languages?.map(l => `${l.language} (${l.proficiency})`).join(', ') || '';
      setLanguages(langList);

      // Portfolio - first link
      const portfolioLink = profile.portfolioLinks?.find(l => l.type === 'portfolio' || l.type === 'linkedin');
      setPortfolio(portfolioLink?.url || '');

      // Summary - use role profile custom summary if available
      setSummary(roleProfile?.customSummary || profile.professionalSummary || '');

      // Experience - filter by role profile if selected
      const experiencesToUse = roleProfile
        ? profile.workExperience.filter(exp => roleProfile.selectedExperienceIds.includes(exp.id))
        : profile.workExperience;

      const expText = experiencesToUse.map(exp => {
        const achievements = exp.achievements.map(a => `  - ${a}`).join('\n');
        return `${exp.title} at ${exp.company}${exp.location ? ` (${exp.location})` : ''}\n${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}\n${achievements}`;
      }).join('\n\n');
      setExperience(expText);

      // Skills - filter by role profile if selected
      const skillsToUse = roleProfile
        ? profile.skills.filter(s => roleProfile.selectedSkillIds.includes(s.id))
        : profile.skills;

      setSkillTags(skillsToUse.map(s => s.name));

      // Education - filter by role profile if selected
      const educationToUse = roleProfile
        ? profile.education.filter(e => roleProfile.selectedEducationIds.includes(e.id))
        : profile.education;

      const eduText = educationToUse.map(edu => {
        return `${edu.degree} in ${edu.field}\n${edu.institution}, ${edu.startYear} - ${edu.current ? 'Present' : edu.endYear || ''}${edu.honors ? `\n${edu.honors}` : ''}`;
      }).join('\n\n');
      setEducation(eduText);

      // Projects from certifications/awards
      const projectsText = [
        ...(profile.certifications?.map(c => `${c.name} - ${c.issuer} (${c.date})`) || []),
        ...(profile.awards?.map(a => `${a.title} - ${a.issuer} (${a.date})`) || []),
      ].join('\n');
      setProjects(projectsText);
    }
  }, [cvSource, profile, profileComplete, selectedRoleProfileId, roleProfiles]);

  const resetForm = () => {
    setStep(1);
    setCompany('');
    setRole('');
    setUseUrl(false);
    setJobDescription('');
    setJobUrl('');
    setCvSource('scratch');
    setSelectedTemplateId('');
    setSelectedRoleProfileId('');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setAge('');
    setLanguages('');
    setPortfolio('');
    setSummary('');
    setExperience('');
    setSkillTags([]);
    setNewSkillInput('');
    setEducation('');
    setProjects('');
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
        // From scratch or profile - go to step 3 (profile data is pre-filled via useEffect)
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    if (cvSource === 'scratch' || cvSource === 'profile') {
      // Validate CV data (same validation for scratch and profile)
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
          age: age.trim() || undefined,
          languages: languages.trim() || undefined,
          portfolio: portfolio.trim() || undefined,
          summary: summary.trim(),
          experience: experience.trim(),
          skills: skills.trim(),
          education: education.trim(),
          projects: projects.trim() || undefined,
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
        className="modal-backdrop z-40"
        onClick={handleClose}
      />

      {/* Slide Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-white dark:bg-primary-800 shadow-2xl z-50 overflow-y-auto animate-slide-in-right transition-colors">
        {/* Header */}
        <div className="sticky top-0 bg-accent-600 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Target className="w-6 h-6" aria-hidden="true" />
                New Application
              </h2>
              <p className="text-white/90 mt-1 text-sm">
                Step {step} of {cvSource === 'template' && hasTemplates ? 2 : 3}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-white/80 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-accent-400/30 rounded-full h-2">
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
                <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-500" aria-hidden="true" />
                  Job Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Google, Meta, Airbnb..."
                  className="input-primary"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Product Designer"
                  className="input-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
                    Job Details *
                  </label>
                  <button
                    onClick={() => setUseUrl(!useUrl)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 hover:bg-accent-100 dark:hover:bg-accent-900/50 transition-colors"
                  >
                    {useUrl ? (
                      <>
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        Switch to Description
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-4 h-4" aria-hidden="true" />
                        Switch to URL
                      </>
                    )}
                  </button>
                </div>

                {useUrl ? (
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="https://linkedin.com/jobs/..."
                    className="input-primary"
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
                    className="textarea-primary font-mono text-sm"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CV Source */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-500" aria-hidden="true" />
                  CV Source
                </h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-6">
                  Choose how to create your CV for this application
                </p>
              </div>

              <div className="space-y-4">
                {/* From Profile Option - Recommended if profile is complete */}
                <button
                  onClick={() => {
                    if (profileComplete) {
                      setCvSource('profile');
                      // Auto-select default role profile if exists
                      const defaultRole = roleProfiles.find(rp => rp.isDefault);
                      if (defaultRole) {
                        setSelectedRoleProfileId(defaultRole.id);
                      }
                    }
                  }}
                  disabled={!profileComplete}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    !profileComplete
                      ? 'opacity-60 cursor-not-allowed bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-700/30'
                      : cvSource === 'profile'
                      ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                      : 'border-primary-200 dark:border-primary-600 hover:border-success-300 dark:hover:border-success-600 hover:bg-success-50/50 dark:hover:bg-success-900/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      cvSource === 'profile' && profileComplete ? 'border-success-500' : 'border-primary-300 dark:border-primary-500'
                    }`}>
                      {cvSource === 'profile' && profileComplete && (
                        <div className="w-3 h-3 rounded-full bg-success-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-primary-900 dark:text-primary-100 text-lg flex items-center gap-2">
                          <User className="w-5 h-5" aria-hidden="true" />
                          Use my profile
                        </span>
                        {profileComplete && (
                          <span className="text-xs bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 px-2 py-0.5 rounded-full font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                        {profileComplete
                          ? 'Use your profile data to automatically generate an optimized CV'
                          : 'Complete your profile to use this option'}
                      </div>

                      {!profileComplete && (
                        <div className="bg-warning-100 dark:bg-warning-900/30 rounded-lg p-3 mb-3">
                          <p className="text-sm text-warning-800 dark:text-warning-300 font-medium mb-1">Incomplete profile</p>
                          <p className="text-xs text-warning-700 dark:text-warning-400">
                            Missing fields: {missingFields.slice(0, 3).join(', ')}
                            {missingFields.length > 3 && ` +${missingFields.length - 3}`}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              router.push('/account');
                            }}
                            className="mt-2 text-sm text-warning-800 dark:text-warning-300 underline hover:text-warning-900 dark:hover:text-warning-200"
                          >
                            Complete my profile
                          </button>
                        </div>
                      )}

                      {profileComplete && cvSource === 'profile' && hasRoleProfiles && (
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-primary-600 dark:text-primary-400">Role profile (optional)</label>
                          <select
                            value={selectedRoleProfileId}
                            onChange={(e) => setSelectedRoleProfileId(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="select-primary"
                          >
                            <option value="">General profile (all data)</option>
                            {roleProfiles.map(rp => (
                              <option key={rp.id} value={rp.id}>
                                {rp.icon} {rp.name} {rp.isDefault ? '(Default)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* From Scratch Option */}
                <button
                  onClick={() => setCvSource('scratch')}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    cvSource === 'scratch'
                      ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                      : 'border-primary-200 dark:border-primary-600 hover:border-primary-300 dark:hover:border-primary-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      cvSource === 'scratch' ? 'border-accent-500' : 'border-primary-300 dark:border-primary-500'
                    }`}>
                      {cvSource === 'scratch' && (
                        <div className="w-3 h-3 rounded-full bg-accent-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-primary-900 dark:text-primary-100 text-lg mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" aria-hidden="true" />
                        Manual entry
                      </div>
                      <div className="text-sm text-primary-600 dark:text-primary-400">
                        Enter your information manually - AI will generate a CV tailored to the job
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
                      ? 'opacity-50 cursor-not-allowed bg-primary-50 dark:bg-primary-700/50'
                      : cvSource === 'template'
                      ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                      : 'border-primary-200 dark:border-primary-600 hover:border-primary-300 dark:hover:border-primary-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      cvSource === 'template' && hasTemplates ? 'border-accent-500' : 'border-primary-300 dark:border-primary-500'
                    }`}>
                      {cvSource === 'template' && hasTemplates && (
                        <div className="w-3 h-3 rounded-full bg-accent-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-primary-900 dark:text-primary-100 text-lg mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5" aria-hidden="true" />
                        Use Existing Template
                        {!hasTemplates && (
                          <span className="ml-2 text-xs font-normal text-primary-500 dark:text-primary-400">(No templates yet)</span>
                        )}
                      </div>
                      <div className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                        {hasTemplates
                          ? 'AI will match and adapt your best existing template for this job'
                          : 'Create your first CV to use templates in future applications'}
                      </div>

                      {hasTemplates && cvSource === 'template' && (
                        <select
                          value={selectedTemplateId}
                          onChange={(e) => setSelectedTemplateId(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="select-primary"
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
                <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent-500" aria-hidden="true" />
                  Your Information
                </h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-6">
                  Fill in your details - AI will use this to create your tailored CV
                </p>
              </div>

              {/* Personal Info */}
              <div className="bg-primary-50 dark:bg-primary-700/50 rounded-xl p-5 space-y-4">
                <h4 className="font-medium text-primary-900 dark:text-primary-100">Personal Details</h4>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="input-primary"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email *"
                    className="input-primary"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="input-primary"
                  />
                </div>

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address / Location"
                  className="input-primary"
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    min="18"
                    max="99"
                    className="input-primary"
                  />
                  <input
                    type="text"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="Languages"
                    className="input-primary col-span-2"
                  />
                </div>

                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Portfolio / Website URL"
                  className="input-primary"
                />
              </div>

              {/* Professional Summary */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Professional Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief overview of your professional background and goals..."
                  rows={3}
                  className="textarea-primary"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Experience *
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Your work experience, job titles, companies, dates, and achievements..."
                  rows={6}
                  className="textarea-primary"
                />
              </div>

              {/* Skills - Tags UI */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Skills
                </label>

                {/* Skills Tags Display */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-3 border border-primary-200 dark:border-primary-600 rounded-lg bg-primary-50 dark:bg-primary-700/50">
                  {skillTags.length === 0 ? (
                    <span className="text-primary-400 dark:text-primary-500 text-sm">No skills added yet</span>
                  ) : (
                    skillTags.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => setSkillTags(skillTags.filter((_, i) => i !== index))}
                          className="ml-1 text-accent-500 hover:text-accent-700 dark:hover:text-accent-300 focus:outline-none"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Add Skill Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSkillInput.trim()) {
                        e.preventDefault();
                        if (!skillTags.includes(newSkillInput.trim())) {
                          setSkillTags([...skillTags, newSkillInput.trim()]);
                        }
                        setNewSkillInput('');
                      }
                    }}
                    placeholder="Add a skill"
                    className="input-primary flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSkillInput.trim() && !skillTags.includes(newSkillInput.trim())) {
                        setSkillTags([...skillTags, newSkillInput.trim()]);
                        setNewSkillInput('');
                      }
                    }}
                    className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add
                  </button>
                </div>
                <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
                  Press Enter or click Add to add each skill
                </p>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Education
                </label>
                <textarea
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Degrees, institutions, graduation dates..."
                  rows={3}
                  className="textarea-primary"
                />
              </div>

              {/* Projects with AI Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
                    Key Projects (Optional)
                  </label>
                  {(jobDescription || jobUrl) && profile?.certifications?.length || profile?.awards?.length ? (
                    <button
                      type="button"
                      onClick={async () => {
                        if (isLoadingProjectSuggestions) return;
                        setIsLoadingProjectSuggestions(true);
                        try {
                          const response = await fetch('/api/suggest-projects', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              jobDescription: jobDescription || '',
                              role,
                              company,
                              certifications: profile?.certifications || [],
                              awards: profile?.awards || [],
                              experience: experience,
                            }),
                          });
                          if (response.ok) {
                            const data = await response.json();
                            if (data.suggestions) {
                              setProjects(data.suggestions);
                            }
                          }
                        } catch (error) {
                          console.error('Failed to get project suggestions:', error);
                        } finally {
                          setIsLoadingProjectSuggestions(false);
                        }
                      }}
                      disabled={isLoadingProjectSuggestions}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 hover:bg-accent-100 dark:hover:bg-accent-900/50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isLoadingProjectSuggestions ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" aria-hidden="true" />
                          Suggest
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
                <textarea
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  placeholder="Notable projects, achievements, portfolio pieces...
e.g., Nike Campaign 2023 - Led creative direction, +300% engagement"
                  rows={3}
                  className="textarea-primary"
                />
                {(jobDescription || jobUrl) && (
                  <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">
                    Click &quot;Suggest&quot; to get project recommendations based on the job description
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-primary-800 border-t border-primary-200 dark:border-primary-700 p-6 flex gap-4 shadow-lg transition-colors">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Back
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
              Next
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={
                (cvSource === 'scratch' || cvSource === 'profile') && (!name.trim() || !email.trim() || !experience.trim())
              }
              size="lg"
              className="flex-1"
            >
              Create application
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
