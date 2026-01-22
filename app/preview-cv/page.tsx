'use client';

import React, { useRef } from 'react';
import CVRenderer, { CVData } from '../components/CVRenderer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Exemple de données JSON générées par l'AI
const sampleCVData: CVData = {
  personalInfo: {
    name: "Sarah Johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    age: 29,
    languages: "English, Spanish, French",
    address: "San Francisco, CA",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    portfolio: "sarahjohnson.design",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  },
  profile: {
    text: "Senior Product Designer with 7+ years of experience creating user-centered digital experiences for Fortune 500 companies and high-growth startups. Specialized in design systems, UX research, and cross-functional collaboration. Track record of increasing user engagement by 40%+ through data-driven design decisions.",
    availability: "Available immediately • Open to relocation"
  },
  skills: {
    technical: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer", "HTML/CSS"],
    marketing: ["A/B Testing", "User Research", "Analytics", "UX Writing", "Design Thinking"],
    soft: []
  },
  experiences: [
    {
      id: "1",
      company: "TECH INNOVATIONS INC",
      jobTitle: "Senior Product Designer",
      period: "Jan 2022 - Present",
      industry: "B2B SaaS Platform",
      achievements: [
        "Led design system overhaul • Reduced design debt by 60% and improved dev handoff efficiency",
        "Spearheaded mobile app redesign • +45% user engagement, 4.8★ App Store rating"
      ]
    },
    {
      id: "2",
      company: "CREATIVE STUDIOS",
      jobTitle: "UX/UI Designer",
      period: "Mar 2020 - Dec 2021",
      industry: "Digital Agency",
      achievements: [
        "Delivered 15+ client projects (e-commerce, fintech, healthcare) • 100% on-time delivery",
        "Conducted user research sessions • Insights drove 30% increase in conversion rates"
      ]
    },
    {
      id: "3",
      company: "STARTUP LABS",
      jobTitle: "Product Designer",
      period: "Jun 2018 - Feb 2020",
      industry: "EdTech Platform",
      achievements: [
        "Designed core learning dashboard • Adopted by 50K+ students in first 6 months",
        "Created interactive prototypes • Secured $2M Series A funding"
      ]
    },
    {
      id: "4",
      company: "DESIGN COLLECTIVE",
      jobTitle: "Junior Designer",
      period: "Sep 2017 - May 2018",
      industry: "Branding & Identity",
      achievements: [
        "Supported brand identity projects for 10+ clients • Logo design & style guides",
        "Collaborated with senior designers on UX flows • Improved onboarding completion by 25%"
      ]
    },
    {
      id: "5",
      company: "FREELANCE",
      jobTitle: "Graphic Designer",
      period: "2016 - 2017",
      industry: "Freelance Design",
      achievements: [
        "Built portfolio with 20+ clients (local businesses, nonprofits)",
        "Designed marketing materials & web assets • Managed end-to-end client relationships"
      ]
    },
    {
      id: "6",
      company: "AGENCY INTERNS",
      jobTitle: "Design Intern",
      period: "Summer 2016",
      industry: "Marketing Agency",
      achievements: [
        "Assisted in campaign design for major retail clients",
        "Created social media graphics & email templates"
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "Airbnb Redesign Concept",
      description: "Personal project featured on Dribbble • 15K+ views, showcased innovative booking flow"
    },
    {
      id: "2",
      name: "Design System Documentation",
      description: "Open-source contribution • Used by 500+ designers, featured in Design Tools Weekly"
    }
  ],
  education: [
    {
      id: "1",
      institution: "CALIFORNIA INSTITUTE OF ARTS",
      years: "2013 - 2017",
      degree: "Bachelor of Fine Arts (BFA)",
      specialization: "Graphic Design & Interaction Design"
    },
    {
      id: "2",
      institution: "GENERAL ASSEMBLY",
      years: "2018",
      degree: "UX Design Immersive",
      specialization: "User Experience & Research Methods"
    }
  ]
};

export default function PreviewCVPage() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      // Capture the CV element as canvas
      const canvas = await html2canvas(cvRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // For external images
        logging: false,
        backgroundColor: '#ffffff'
      });

      // A4 dimensions in mm
      const imgWidth = 210;
      const imgHeight = 297;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download
      const fileName = `CV_${sampleCVData.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div className="max-w-[210mm] mx-auto mb-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Retour à l'application
          </a>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger PDF
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-4 mb-2">Preview - CVRenderer Component</h1>
        <p className="text-gray-600">Test du nouveau composant CVRenderer avec données JSON structurées</p>
      </div>

      {/* CV Renderer */}
      <div ref={cvRef}>
        <CVRenderer data={sampleCVData} />
      </div>

      {/* JSON Data Display */}
      <div className="max-w-[210mm] mx-auto mt-8 bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-xs overflow-x-auto">
        <h3 className="font-bold text-lg mb-3 text-white">📄 JSON Structure</h3>
        <pre>{JSON.stringify(sampleCVData, null, 2)}</pre>
      </div>
    </div>
  );
}
