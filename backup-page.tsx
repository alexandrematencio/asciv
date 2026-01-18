'use client';

import { useState, useEffect } from 'react';

export default function ResumeBuilder() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  });

  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedProfile, setSavedProfile] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      const saved = localStorage.getItem('resume-profile');
      if (saved) {
        setProfile(JSON.parse(saved));
        setSavedProfile(true);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const saveProfile = () => {
    try {
      localStorage.setItem('resume-profile', JSON.stringify(profile));
      setSavedProfile(true);
      setTimeout(() => setSavedProfile(false), 2000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setError('Failed to save profile');
    }
  };

  const generateResume = async () => {
    if (!profile.name || !profile.experience) {
      setError('Please fill in at least your name and experience');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedResume('');

    const prompt = `Create a professional, tailored resume based on the following information:

PERSONAL INFORMATION:
Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}

PROFESSIONAL SUMMARY:
${profile.summary || 'Create a compelling professional summary based on the experience below'}

EXPERIENCE:
${profile.experience}

EDUCATION:
${profile.education}

SKILLS:
${profile.skills}

${jobDescription ? `JOB DESCRIPTION TO TAILOR FOR:
${jobDescription}

INSTRUCTIONS: Analyze the job description and tailor the resume to highlight the most relevant experience, skills, and achievements. Use keywords from the job posting. Rewrite bullet points to emphasize fit for this specific role.` : 'INSTRUCTIONS: Create a well-formatted, professional resume with strong action verbs and quantifiable achievements where possible.'}

Format the resume professionally with clear sections. Make it compelling and achievement-focused.`;

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedResume(data.resume);
    } catch (err) {
      console.error('Generation failed:', err);
      setError('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResume);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-gray-600">
            Create tailored, professional resumes powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Personal Information
              </h2>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <input
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    placeholder="Location"
                    value={profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Professional Summary
              </h2>
              <textarea
                placeholder="Brief overview of your professional background (optional - AI can generate this)"
                value={profile.summary}
                onChange={(e) => handleProfileChange('summary', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Experience *
              </h2>
              <textarea
                placeholder="List your work experience, job titles, companies, dates, and key achievements..."
                value={profile.experience}
                onChange={(e) => handleProfileChange('experience', e.target.value)}
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Education
              </h2>
              <textarea
                placeholder="Degrees, institutions, graduation dates, relevant coursework..."
                value={profile.education}
                onChange={(e) => handleProfileChange('education', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Skills
              </h2>
              <textarea
                placeholder="Technical skills, soft skills, languages, certifications..."
                value={profile.skills}
                onChange={(e) => handleProfileChange('skills', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job Description (Optional)
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Paste a job description to tailor your resume specifically for that role
              </p>
              <textarea
                placeholder="Paste the job description here for a tailored resume..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#9DA3AF] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveProfile}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {savedProfile ? '✓ Saved!' : 'Save Profile'}
              </button>
              
              <button
                onClick={generateResume}
                disabled={loading || !profile.name || !profile.experience}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? 'Generating...' : '✨ Generate Resume'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Generated Resume
                </h2>
                {generatedResume && (
                  <button
                    onClick={copyToClipboard}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    📋 Copy to Clipboard
                  </button>
                )}
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-gray-600">Creating your tailored resume...</p>
                </div>
              )}

              {!loading && !generatedResume && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-900 mb-2">
                    Fill in your information and click "Generate Resume"
                  </p>
                  <p className="text-sm text-gray-500">
                    {jobDescription 
                      ? 'Your resume will be tailored to the job description' 
                      : 'Add a job description for a tailored resume'}
                  </p>
                </div>
              )}

              {generatedResume && !loading && (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {generatedResume}
                  </div>
                </div>
              )}
            </div>

            {generatedResume && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Copy this resume and paste it into a word processor 
                  for final formatting and customization. You can regenerate with different 
                  job descriptions to create multiple tailored versions!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
