'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export interface CVData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    age?: number;
    languages?: string;
    address: string;
    email: string;
    phone: string;
    portfolio?: string;
    photo?: string;
  };
  profile?: {
    text: string;
    availability?: string;
  };
  skills?: {
    technical: string[];
    marketing: string[];
    soft?: string[];
  };
  experiences: Array<{
    id: string;
    company: string;
    jobTitle: string;
    period: string;
    industry?: string;
    achievements: string[];
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    years: string;
    degree: string;
    specialization?: string;
  }>;
}

interface CVRendererProps {
  data: CVData;
  className?: string;
}

export default function CVRenderer({ data, className = '' }: CVRendererProps) {
  return (
    <div
      className={`bg-white shadow-2xl mx-auto overflow-hidden flex flex-col ${className}`}
      style={{
        maxWidth: '210mm',
        height: '297mm',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* HEADER SECTION */}
      <header className="border-b border-gray-300 px-8 py-5 flex-shrink-0">
        <div className="grid grid-cols-[100px_1fr] gap-5 items-start">
          {/* Photo Profile */}
          {data.personalInfo.photo && (
            <div className="profile-photo">
              <img
                src={data.personalInfo.photo}
                alt={data.personalInfo.name}
                className="w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
          {!data.personalInfo.photo && (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
              <span className="text-4xl text-gray-400">
                {data.personalInfo.firstName?.[0] || data.personalInfo.name?.[0] || '?'}
              </span>
            </div>
          )}

          {/* Header Info */}
          <div>
            <h1
              className="text-4xl font-black uppercase tracking-wide mb-2"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '0.05em' }}
            >
              {data.personalInfo.firstName}{' '}
              <span className="text-accent-600">{data.personalInfo.lastName}</span>
            </h1>

            <ul className="grid grid-cols-3 gap-x-6 gap-y-0.5 text-xs">
              <li>{data.personalInfo.email}</li>
              <li>{data.personalInfo.phone}</li>
              {data.personalInfo.portfolio && <li>{data.personalInfo.portfolio}</li>}
              <li>{data.personalInfo.address}</li>
              {data.personalInfo.age && <li>{data.personalInfo.age} years old</li>}
              {data.personalInfo.languages && <li>{data.personalInfo.languages}</li>}
            </ul>
          </div>
        </div>
      </header>

      {/* PROFILE SECTION */}
      {data.profile && (
        <section className="px-8 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="text-xs leading-relaxed text-gray-800">
            <p className="mb-1">{data.profile.text}</p>
            {data.profile.availability && (
              <p className="font-semibold text-xs text-accent-600">
                {data.profile.availability}
              </p>
            )}
          </div>
        </section>
      )}

      {/* SKILLS SECTION */}
      {data.skills && (data.skills.technical.length > 0 || data.skills.marketing.length > 0) && (
        <section className="px-8 py-3.5 border-b border-gray-200 flex-shrink-0">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-1"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <Zap className="w-4 h-4 text-accent-600" aria-hidden="true" />
            Skills
          </h2>
          <div className="space-y-1.5">
            {data.skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-semibold text-gray-700">Tech:</span>
                {data.skills.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium border border-accent-200 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {data.skills.marketing.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-semibold text-gray-700">Marketing:</span>
                {data.skills.marketing.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-success-100 text-success-700 text-xs font-medium border border-success-200 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* EXPERIENCES SECTION */}
      <section className="px-8 py-5 flex-shrink-0">
        <h2
          className="text-sm font-bold uppercase tracking-wide mb-3"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Work Experience
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {data.experiences.map((exp) => (
            <article
              key={exp.id}
              className="border border-gray-300 bg-gray-50 px-3 py-2.5 rounded-sm"
            >
              <div className="flex justify-between items-start mb-0.5">
                <h3 className="font-bold text-xs">
                  <span className="text-accent-600">[ {exp.company} ]</span>
                </h3>
                <p className="text-[10px] italic text-gray-500">{exp.period}</p>
              </div>
              <p className="text-xs font-semibold mb-1.5 text-gray-800">{exp.jobTitle}</p>
              <ul className="text-[10px] space-y-0.5 text-gray-700 leading-tight">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex gap-1">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span className="flex-1">{achievement}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      {data.projects && data.projects.length > 0 && (
        <section className="px-8 py-3.5 border-t border-gray-200 flex-shrink-0">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Key Projects
          </h2>
          <div className="space-y-1.5">
            {data.projects.map((project) => (
              <div key={project.id} className="text-xs">
                <span className="font-bold text-accent-600">[ {project.name} ]</span>
                <span className="text-gray-700"> — {project.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}
      <section className="bg-primary-900 text-white px-8 py-5 flex-grow flex flex-col justify-center">
        <h2
          className="text-sm font-bold uppercase tracking-wide mb-3"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Education
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {data.education.map((edu) => (
            <article key={edu.id}>
              <h3 className="font-bold text-xs mb-0.5">
                [ {edu.institution} ]
              </h3>
              <p className="text-[10px] italic mb-1 text-gray-300">{edu.years}</p>
              <p className="text-xs font-semibold mb-0.5">{edu.degree}</p>
              {edu.specialization && (
                <p className="text-[10px] text-gray-400">— {edu.specialization}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
