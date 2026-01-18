'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import { ToastContainer } from '@/app/components/Toast';
import NewApplicationModal from '@/app/components/NewApplicationModal';
import CVDetailModal from '@/app/components/CVDetailModal';
import {
  Template,
  Application,
  ApplicationStatus,
  CVVersion,
  Toast as ToastType,
  DashboardStats,
  SentVia,
  InterviewInfo,
} from '@/app/types';

export default function JobHunterPro() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  
  const [generatingCV, setGeneratingCV] = useState(false);
  
  // Interview modal
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewAppId, setInterviewAppId] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedApps = localStorage.getItem('job-applications-v2');
      const savedTemplates = localStorage.getItem('job-templates-v2');
      
      if (savedApps) {
        setApplications(JSON.parse(savedApps));
      }
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const saveApplications = (apps: Application[]) => {
    try {
      localStorage.setItem('job-applications-v2', JSON.stringify(apps));
      setApplications(apps);
    } catch (error) {
      console.error('Failed to save:', error);
      addToast('error', 'Failed to save');
    }
  };

  const saveTemplates = (temps: Template[]) => {
    try {
      localStorage.setItem('job-templates-v2', JSON.stringify(temps));
      setTemplates(temps);
    } catch (error) {
      console.error('Failed to save templates:', error);
    }
  };

  const addToast = (type: ToastType['type'], message: string) => {
    const toast: ToastType = {
      id: Date.now().toString(),
      type,
      message,
    };
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const generateCVFromScratch = async (
    jobDescription: string,
    cvData: any
  ): Promise<string> => {
    const prompt = `Create a professional, tailored resume for this job application:

PERSONAL INFORMATION:
Name: ${cvData.name}
Email: ${cvData.email}
Phone: ${cvData.phone}
Address: ${cvData.address}

PROFESSIONAL SUMMARY:
${cvData.summary || 'Create a compelling professional summary based on the experience and job description'}

EXPERIENCE:
${cvData.experience}

SKILLS:
${cvData.skills}

EDUCATION:
${cvData.education}

JOB DESCRIPTION TO TAILOR FOR:
${jobDescription}

INSTRUCTIONS: Create a well-formatted, professional resume that is specifically tailored to this job. Highlight relevant experience and skills that match the job requirements. Use strong action verbs and quantify achievements where possible. Format it professionally with clear sections.`;

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
      return data.resume;
    } catch (error) {
      console.error('CV generation failed:', error);
      throw error;
    }
  };

  const generateCVFromTemplate = async (
    jobDescription: string,
    template: Template,
    company: string,
    role: string
  ): Promise<string> => {
    const prompt = `Create a professional resume tailored for this job:

COMPANY: ${company}
ROLE: ${role}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE TEMPLATE (use as base):
Name: ${template.content.personalInfo.name}
Email: ${template.content.personalInfo.email}
Phone: ${template.content.personalInfo.phone}
Address: ${template.content.personalInfo.address}

Summary: ${template.content.summary}
Experience: ${template.content.experience}
Education: ${template.content.education}
Skills: ${template.content.skills}

Create a tailored, professional resume that highlights relevant skills and experience for this specific role. Use strong action verbs and quantify achievements where possible. Format it professionally with clear sections.`;

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
      return data.resume;
    } catch (error) {
      console.error('CV generation failed:', error);
      throw error;
    }
  };

  const createApplication = async (data: {
    company: string;
    role: string;
    jobDescription: string;
    jobUrl?: string;
    cvData?: any;
    useExistingTemplate: boolean;
    selectedTemplateId?: string;
  }) => {
    setGeneratingCV(true);
    
    try {
      let cvContent: string;
      let usedTemplateId: string | undefined;

      if (data.useExistingTemplate && data.selectedTemplateId) {
        const template = templates.find(t => t.id === data.selectedTemplateId);
        if (!template) throw new Error('Template not found');
        
        cvContent = await generateCVFromTemplate(
          data.jobDescription,
          template,
          data.company,
          data.role
        );
        usedTemplateId = template.id;
        
        const updatedTemplates = templates.map(t => 
          t.id === template.id 
            ? { ...t, usageCount: t.usageCount + 1 }
            : t
        );
        saveTemplates(updatedTemplates);
      } else {
        cvContent = await generateCVFromScratch(data.jobDescription, data.cvData);
      }

      const firstCV: CVVersion = {
        id: `cv-${Date.now()}`,
        version: 1,
        content: cvContent,
        generatedBy: 'ai',
        createdAt: Date.now(),
      };

      const newApp: Application = {
        id: `app-${Date.now()}`,
        company: data.company,
        role: data.role,
        jobDescription: data.jobDescription,
        jobUrl: data.jobUrl,
        selectedTemplateId: usedTemplateId,
        cvVersions: [firstCV],
        status: 'draft',
        statusHistory: [
          {
            status: 'draft',
            timestamp: Date.now(),
            note: 'Application created',
          },
        ],
        tracking: {
          followUpDates: [],
        },
        createdAt: Date.now(),
        notes: '',
        tags: [],
        isFavorite: false,
      };

      const updatedApps = [newApp, ...applications];
      saveApplications(updatedApps);
      setShowNewAppModal(false);
      
      addToast('success', `✨ CV generated for ${data.company}!`);
    } catch (error) {
      addToast('error', 'Failed to generate CV. Please try again.');
    } finally {
      setGeneratingCV(false);
    }
  };

  const markAsSent = (appId: string) => {
    const updatedApps = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'sent' as ApplicationStatus,
          statusHistory: [
            ...app.statusHistory,
            {
              status: 'sent' as ApplicationStatus,
              timestamp: Date.now(),
            },
          ],
          tracking: {
            ...app.tracking,
            sentDate: Date.now(),
            sentVia: 'indeed' as SentVia, // Default, can be changed later
          },
          appliedAt: Date.now(),
        };
      }
      return app;
    });
    
    saveApplications(updatedApps);
    addToast('success', '✓ Marked as sent!');
  };

  const toggleInterview = (appId: string, hasInterview: boolean) => {
    if (hasInterview) {
      // Show modal to add interview details
      setInterviewAppId(appId);
      const app = applications.find(a => a.id === appId);
      if (app?.tracking.interviewScheduled) {
        // Pre-fill if already exists
        const interview = app.tracking.interviewScheduled;
        setInterviewDate(new Date(interview.date).toISOString().split('T')[0]);
        setInterviewTime(new Date(interview.date).toTimeString().slice(0, 5));
        setInterviewLocation(interview.location || '');
      }
      setShowInterviewModal(true);
    } else {
      // Remove interview
      const updatedApps = applications.map(app => {
        if (app.id === appId) {
          const { interviewScheduled, ...restTracking } = app.tracking;
          return {
            ...app,
            status: 'sent' as ApplicationStatus,
            tracking: restTracking,
          };
        }
        return app;
      });
      saveApplications(updatedApps);
    }
  };

  const saveInterviewDetails = () => {
    if (!interviewAppId || !interviewDate || !interviewTime) return;

    const dateTime = new Date(`${interviewDate}T${interviewTime}`).getTime();

    const updatedApps = applications.map(app => {
      if (app.id === interviewAppId) {
        return {
          ...app,
          status: 'interview' as ApplicationStatus,
          tracking: {
            ...app.tracking,
            interviewScheduled: {
              date: dateTime,
              type: 'video' as const,
              location: interviewLocation,
            },
          },
        };
      }
      return app;
    });

    saveApplications(updatedApps);
    setShowInterviewModal(false);
    setInterviewAppId(null);
    setInterviewDate('');
    setInterviewTime('');
    setInterviewLocation('');
    addToast('success', 'Interview scheduled!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied to clipboard!');
  };

  const setMainVersion = (appId: string, cvId: string) => {
    const updatedApps = applications.map(app => {
      if (app.id === appId) {
        // Reorder versions: put selected version first (first = main)
        const selectedVersion = app.cvVersions.find(cv => cv.id === cvId);
        const otherVersions = app.cvVersions.filter(cv => cv.id !== cvId);
        
        if (selectedVersion) {
          return {
            ...app,
            cvVersions: [selectedVersion, ...otherVersions]
          };
        }
      }
      return app;
    });
    
    saveApplications(updatedApps);
    setApplications(updatedApps); // Force immediate state update
    
    // Force selectedApp update with new object reference
    if (selectedApp?.id === appId) {
      const updatedApp = updatedApps.find(a => a.id === appId);
      if (updatedApp) {
        setSelectedApp({ ...updatedApp }); // Create new object reference
      }
    }
    
    addToast('success', 'Main version updated!');
  };

  const downloadCV = (cv: CVVersion, app: Application) => {
    const element = document.createElement('a');
    const file = new Blob([cv.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${app.company}_${app.role}_CV_v${cv.version}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    addToast('success', 'CV downloaded!');
  };

  const updateCV = (appId: string, cvId: string, newContent: string) => {
    const updatedApps = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          cvVersions: app.cvVersions.map(cv => 
            cv.id === cvId 
              ? { ...cv, content: newContent, modifiedAt: Date.now() }
              : cv
          )
        };
      }
      return app;
    });
    
    saveApplications(updatedApps);
    
    // Update selectedApp if it's the one being edited
    if (selectedApp?.id === appId) {
      const updatedApp = updatedApps.find(a => a.id === appId);
      if (updatedApp) {
        setSelectedApp(updatedApp);
      }
    }
    
    addToast('success', 'CV updated successfully!');
  };

  const deleteApplication = (appId: string) => {
    const updatedApps = applications.filter(app => app.id !== appId);
    saveApplications(updatedApps);
    setSelectedApp(null); // Close modal
    addToast('success', 'Application deleted successfully!');
  };

  const createNewCVVersion = (appId: string, currentCvId: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    // Find current CV to copy its content
    const currentCV = app.cvVersions.find(cv => cv.id === currentCvId);
    const contentToCopy = currentCV ? currentCV.content : '';

    const newVersion: CVVersion = {
      id: `cv-${Date.now()}`,
      version: app.cvVersions.length + 1,
      content: contentToCopy, // Copy current CV content
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      generatedBy: 'manual',
    };

    const updatedApps = applications.map(a => 
      a.id === appId 
        ? { ...a, cvVersions: [...a.cvVersions, newVersion] }
        : a
    );

    saveApplications(updatedApps);
    
    // Update selectedApp
    if (selectedApp?.id === appId) {
      const updatedApp = updatedApps.find(a => a.id === appId);
      if (updatedApp) {
        setSelectedApp(updatedApp);
      }
    }

    addToast('success', 'New CV version created from current!');
    return newVersion.id;
  };

  // Filter applications
  const filteredApps = filterStatus === 'all' 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  // Sort by most recent
  const sortedApps = [...filteredApps].sort((a, b) => b.createdAt - a.createdAt);

  // Calculate basic stats
  const stats = {
    total: applications.length,
    draft: applications.filter(a => a.status === 'draft').length,
    sent: applications.filter(a => a.status === 'sent').length,
    waiting: applications.filter(a => a.status === 'waiting').length,
    interview: applications.filter(a => a.status === 'interview').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <NewApplicationModal
        isOpen={showNewAppModal}
        onClose={() => setShowNewAppModal(false)}
        onCreate={createApplication}
        templates={templates}
      />

      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🎯 Job Hunter Pro
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              AI-Powered Resume Builder & Application Tracker
            </p>
          </div>
          <Button onClick={() => setShowNewAppModal(true)} size="lg">
            ➕ New Application
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
            <div className="text-xs text-gray-600">Draft</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
            <div className="text-xs text-blue-600">Sent</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.waiting}</div>
            <div className="text-xs text-yellow-600">Waiting</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.interview}</div>
            <div className="text-xs text-purple-600">Interview</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['all', 'draft', 'sent', 'waiting', 'interview'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {status} ({status === 'all' ? applications.length : stats[status as keyof typeof stats] || 0})
            </button>
          ))}
        </div>

        {/* Applications List */}
        {sortedApps.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">📄</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              No applications yet
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Start tracking your job applications and let AI generate perfect resumes
            </p>
            <Button onClick={() => setShowNewAppModal(true)} size="lg">
              Create Your First Application
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              {sortedApps.map(app => {
                const isSent = app.status === 'sent' || app.status === 'waiting' || app.status === 'interview';
                const hasInterview = app.status === 'interview' && app.tracking.interviewScheduled;

                return (
                  <div
                    key={app.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left: Job Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">
                            {app.role}
                          </h3>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{app.company}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                            app.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                            app.status === 'interview' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {app.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Created {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex items-center gap-3">
                        {/* Edit Button */}
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                        >
                          ✏️ Edit
                        </button>

                        {/* Send Button */}
                        <button
                          onClick={() => !isSent && markAsSent(app.id)}
                          disabled={isSent}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            isSent
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSent ? '✓ Sent' : 'Send'}
                        </button>

                        {/* Interview Button */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!hasInterview}
                            onChange={(e) => toggleInterview(app.id, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <button
                            onClick={() => hasInterview && setInterviewAppId(app.id) && setShowInterviewModal(true)}
                            className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 font-medium transition-colors"
                          >
                            Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowInterviewModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {interviewAppId && applications.find(a => a.id === interviewAppId)?.tracking.interviewScheduled
                  ? 'Interview Details'
                  : 'Schedule Interview'}
              </h3>
              <button onClick={() => setShowInterviewModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {interviewAppId && applications.find(a => a.id === interviewAppId)?.tracking.interviewScheduled ? (
              // Show details
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <span>{new Date(applications.find(a => a.id === interviewAppId)!.tracking.interviewScheduled!.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕐</span>
                  <span>{new Date(applications.find(a => a.id === interviewAppId)!.tracking.interviewScheduled!.date).toLocaleTimeString()}</span>
                </div>
                {applications.find(a => a.id === interviewAppId)!.tracking.interviewScheduled!.location && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span className="flex-1">{applications.find(a => a.id === interviewAppId)!.tracking.interviewScheduled!.location}</span>
                    <button
                      onClick={() => copyToClipboard(applications.find(a => a.id === interviewAppId)!.tracking.interviewScheduled!.location!)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      📋
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Edit form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.target.value)}
                    placeholder="123 Main St, Paris"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowInterviewModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveInterviewDetails}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generating Overlay */}
      {generatingCV && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-12 text-center max-w-md">
            <div className="animate-spin h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Generating Your CV...
            </h3>
            <p className="text-gray-600">
              AI is analyzing the job and creating a tailored resume
            </p>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {selectedApp && (
        <CVDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onDownloadCV={(cv) => downloadCV(cv, selectedApp)}
          onSetMainVersion={(cvId) => setMainVersion(selectedApp.id, cvId)}
          onUpdateCV={(appId, cvId, newContent) => updateCV(appId, cvId, newContent)}
          onDeleteApplication={() => deleteApplication(selectedApp.id)}
          onCreateNewVersion={(currentCvId) => createNewCVVersion(selectedApp.id, currentCvId)}
        />
      )}
    </div>
  );
}
