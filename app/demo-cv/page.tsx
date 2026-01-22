'use client';

import React from 'react';

// Données de démonstration - VERSION B COMPLÈTE (Optimisée)
const demoCVData = {
  personalInfo: {
    name: "Alex Matencio",
    firstName: "Alex",
    lastName: "Matencio",
    age: 27,
    languages: "Français, Anglais, Espagnol",
    address: "Paris, France",
    email: "alex.matencio@email.com",
    phone: "+33 6 12 34 56 78",
    portfolio: "alexmatencio.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  profile: {
    text: "Designer graphique senior avec 5+ ans d'expérience en création de contenu digital et branding. Spécialisé dans la direction artistique multi-canal (print, web, social media) avec un track record de +250% d'engagement client. Passionné par l'innovation visuelle et la stratégie créative data-driven.",
    availability: "Disponible immédiatement • Mobilité nationale"
  },
  skills: {
    technical: ["Adobe CC", "Figma", "After Effects", "Final Cut Pro", "DaVinci Resolve", "Premiere Pro"],
    marketing: ["SEO", "Google Analytics", "Social Media Mgmt", "Content Strategy", "A/B Testing"],
    soft: ["Leadership", "Gestion de projet", "Communication client", "Team building"]
  },
  experiences: [
    {
      id: "1",
      company: "CREATIVE STUDIO",
      jobTitle: "Designer Graphique Senior",
      period: "Jan 2022 - Présent",
      industry: "Agence de communication digitale",
      achievements: [
        "Direction artistique 15+ clients (mode, tech, lifestyle) • Budget annuel 200K€",
        "Création identités visuelles complètes • Taux satisfaction client 98%"
      ]
    },
    {
      id: "2",
      company: "DIGITAL AGENCY",
      jobTitle: "Content Creator",
      period: "Mar 2020 - Déc 2021",
      industry: "Marketing digital",
      achievements: [
        "Production photo/vidéo multi-plateformes (IG, TikTok, YT) • +2M impressions",
        "+250% engagement moyen • Collaboration avec 10+ marques internationales"
      ]
    },
    {
      id: "3",
      company: "STARTUP TECH",
      jobTitle: "Designer UI/UX Junior",
      period: "Sep 2019 - Fév 2020",
      industry: "Apps mobiles",
      achievements: [
        "Conception interfaces iOS/Android • Wireframes & prototypes interactifs",
        "Tests utilisateurs itératifs • +40% retention après redesign"
      ]
    },
    {
      id: "4",
      company: "FREELANCE",
      jobTitle: "Photographe & Vidéaste",
      period: "2018 - 2019",
      industry: "Audiovisuel",
      achievements: [
        "Portfolio 20+ clients (événementiel, corporate, clips musicaux)",
        "Production complète de A à Z • Gestion budget & planning"
      ]
    },
    {
      id: "5",
      company: "AGENCE CREATIVE",
      jobTitle: "Stagiaire Designer",
      period: "2017 - 2018",
      industry: "Publicité",
      achievements: [
        "Support création visuelle campagnes print/web",
        "Retouche photo & montage vidéo pour clients retail"
      ]
    },
    {
      id: "6",
      company: "STUDIO PHOTO",
      jobTitle: "Assistant Photographe",
      period: "2016 - 2017",
      industry: "Photo professionnelle",
      achievements: [
        "Assistance shooting mode & produits • Gestion éclairage studio",
        "Post-production Lightroom/Photoshop • Livraison clients"
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "Campagne Nike 2023",
      description: "Direction artistique lancement produit • 2M+ impressions, +300% engagement vs benchmark"
    },
    {
      id: "2",
      name: "Refonte Brand Identity - Startup Tech",
      description: "Création complète charte graphique • Adoption par 50+ entreprises clientes"
    }
  ],
  education: [
    {
      id: "1",
      institution: "ÉCOLE SUPÉRIEURE D'ART",
      years: "2016 - 2019",
      degree: "Master Design Graphique",
      specialization: "Communication Visuelle & Branding"
    },
    {
      id: "2",
      institution: "UNIVERSITÉ PARIS",
      years: "2013 - 2016",
      degree: "Licence Arts Visuels",
      specialization: "Multimédia & Digital"
    }
  ]
};

export default function DemoCVPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header avec lien retour */}
      <div className="max-w-[210mm] mx-auto mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Retour à l'application
        </a>
        <h1 className="text-2xl font-bold mt-4 mb-2">Version B - Template CV Complet (OPTIMISÉ)</h1>
        <p className="text-gray-600">6 expériences + Compétences + Projets Marquants sur 1 page A4</p>
      </div>

      {/* CV Container - Format A4 avec flexbox pour stretch Education */}
      <div
        className="bg-white shadow-2xl mx-auto overflow-hidden flex flex-col"
        style={{
          maxWidth: '210mm',
          height: '297mm',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {/* HEADER SECTION - Compacté */}
        <header className="border-b-2 border-black px-8 py-5 flex-shrink-0">
          <div className="grid grid-cols-[100px_1fr] gap-5 items-start">
            {/* Photo Profile - Réduite */}
            <div className="profile-photo">
              <img
                src={demoCVData.personalInfo.photo}
                alt={demoCVData.personalInfo.name}
                className="w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-200"
              />
            </div>

            {/* Header Info */}
            <div>
              <h1
                className="text-4xl font-black uppercase tracking-wide mb-2"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '0.05em' }}
              >
                {demoCVData.personalInfo.firstName}{' '}
                <span style={{ color: '#3B5CFF' }}>{demoCVData.personalInfo.lastName}</span>
              </h1>

              <ul className="grid grid-cols-3 gap-x-6 gap-y-0.5 text-xs">
                <li>{demoCVData.personalInfo.email}</li>
                <li>{demoCVData.personalInfo.phone}</li>
                <li>{demoCVData.personalInfo.portfolio}</li>
                <li>{demoCVData.personalInfo.address}</li>
                <li>{demoCVData.personalInfo.age} ans</li>
                <li>{demoCVData.personalInfo.languages}</li>
              </ul>
            </div>
          </div>
        </header>

        {/* PROFILE SECTION - Ultra compact */}
        <section className="px-8 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="text-xs leading-relaxed text-gray-800">
            <p className="mb-1">{demoCVData.profile.text}</p>
            <p className="font-semibold text-xs" style={{ color: '#3B5CFF' }}>
              {demoCVData.profile.availability}
            </p>
          </div>
        </section>

        {/* SKILLS SECTION - Horizontal compact */}
        <section className="px-8 py-3.5 border-b border-gray-200 flex-shrink-0">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-1"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span style={{ color: '#3B5CFF' }}>⚡</span>
            Compétences
          </h2>
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-semibold text-gray-700">Tech:</span>
              {demoCVData.skills.technical.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs border border-gray-200 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-semibold text-gray-700">Marketing:</span>
              {demoCVData.skills.marketing.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs border border-gray-200 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCES SECTION - 2 COLUMNS, ULTRA COMPACT */}
        <section className="px-8 py-5 flex-shrink-0">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Expériences Professionnelles
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {demoCVData.experiences.map((exp) => (
              <article
                key={exp.id}
                className="border border-gray-300 bg-gray-50 px-3 py-2.5 rounded-sm"
              >
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-xs">
                    <span style={{ color: '#3B5CFF' }}>[ {exp.company} ]</span>
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

        {/* PROJECTS SECTION - Compact */}
        <section className="px-8 py-3.5 border-t border-gray-200 flex-shrink-0">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Projets Marquants
          </h2>
          <div className="space-y-1.5">
            {demoCVData.projects.map((project) => (
              <div key={project.id} className="text-xs">
                <span className="font-bold" style={{ color: '#3B5CFF' }}>[ {project.name} ]</span>
                <span className="text-gray-700"> — {project.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION - Dark Background, Calée en bas avec flex-grow */}
        <section className="bg-black text-white px-8 py-5 flex-grow flex flex-col justify-center">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Formation
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {demoCVData.education.map((edu) => (
              <article key={edu.id}>
                <h3 className="font-bold text-xs mb-0.5">
                  [ {edu.institution} ]
                </h3>
                <p className="text-[10px] italic mb-1 text-gray-300">{edu.years}</p>
                <p className="text-xs font-semibold mb-0.5">{edu.degree}</p>
                <p className="text-[10px] text-gray-400">— {edu.specialization}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Notes de design - MISES À JOUR */}
      <div className="max-w-[210mm] mx-auto mt-8 bg-green-50 border border-green-300 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3 text-green-900">✅ Version B - Optimisations Spatiales & Équilibre Visuel</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h4 className="font-bold mb-2">🎯 Gains d'Espace:</h4>
            <ul className="space-y-1">
              <li>• <strong>6 expériences</strong> au lieu de 4 (+50%)</li>
              <li>• 2 bullets/xp au lieu de 3 (-33% vertical)</li>
              <li>• Header réduit: 100px photo vs 120px</li>
              <li>• Marges optimisées: py-3 à py-5</li>
              <li>• Police 10-12px pour expériences (vs 13-14px)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">➕ Sections Ajoutées:</h4>
            <ul className="space-y-1">
              <li>• <strong>Compétences</strong> (Tech + Marketing) en pills</li>
              <li>• <strong>Projets Marquants</strong> (2 projets phares)</li>
              <li>• Portfolio link dans header</li>
              <li>• Bullets avec métriques clés</li>
              <li>• Format ultra-scannable ATS-friendly</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
          <p className="text-sm font-bold text-green-900">🏆 Résultat: 1 page A4 complète avec 6 expériences + compétences + projets</p>
          <p className="text-sm text-green-700 mt-1">✨ Section Education calée en bas avec flex-grow pour équilibre visuel parfait</p>
        </div>
      </div>
    </div>
  );
}
