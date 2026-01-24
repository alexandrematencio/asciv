# 🎯 Prompt pour Claude Code

## Executive-Agent : Nouvelle Feature "Application → Matching Flow"

### 📋 Contexte

Implémenter un flow permettant de lier la partie Applications avec Matching. L'utilisateur doit pouvoir, depuis une application existante avec CV généré, lancer une analyse de matching en un clic.

### 🎯 Objectif

Créer un pont bidirectionnel Applications ↔ Matching, sens Applications → Matching (le sens inverse existe déjà).

---

## Plan d'exécution

1. **PRD-Agent** → Valider l'alignement avec les priorités produit et UX
2. **UX-Product-Agent** → Designer le flow et les états UI
3. **Brand-Agent** → Valider le micro-copy et le ton
4. **Dev-Agent** → Implémenter les changements
5. **Security-Agent** → Auditer le code final

---

## Spécifications détaillées

### User Story

```
As a user who just created an application with a CV,
I want to analyze the job matching with one click,
So that I can evaluate if this opportunity aligns with my profile and preferences.
```

### Acceptance Criteria

```gherkin
GIVEN an application exists with jobDescription filled and at least one CV version
WHEN I click "Analyze Job Matching" in CVDetailModal
THEN JobImportModal opens pre-filled with application data
AND I can review/edit the job data
AND I click "Confirm & Analyze"
THEN a JobOffer is created with source_application_id link
AND analysis is triggered automatically
AND I'm redirected to /jobs/{newJobId} to view results
```

### Flow détaillé

```
1. User dans CVDetailModal (application saved, CV generated)
   ↓
2. Click "Analyze Job Matching" (nouveau bouton dans toolbar du modal)
   ↓
3. JobImportModal s'ouvre avec:
   - Mode: "from-application" (nouveau prop)
   - Pré-remplissage: company, role, jobDescription de l'application
   - Banner info: "Job data from Application: [Company] - [Role]"
   - User peut compléter: salary, location, remote, etc.
   ↓
4. Click "Confirm & Analyze" (CTA modifié si mode from-application)
   ↓
5. System:
   - Vérifie si un JobOffer existe déjà pour cette application (via source_application_id)
   - Si oui: redirect vers /jobs/{existingJobId}
   - Si non: crée JobOffer avec source_application_id
   - Déclenche analyzeJob() automatiquement
   - Redirect vers /jobs/{newJobId}
   ↓
6. User voit l'analyse (loading puis résultats)
```

---

## Modifications requises

### 1. Database Schema (`supabase-schema.sql`)

```sql
-- Ajouter colonne pour lier job_offers aux applications sources
ALTER TABLE job_offers
ADD COLUMN source_application_id UUID REFERENCES applications(id) ON DELETE SET NULL;

-- Index pour performance (recherche de JobOffer existant pour une application)
CREATE INDEX idx_job_offers_source_application_id 
ON job_offers(source_application_id) 
WHERE source_application_id IS NOT NULL;
```

### 2. Types (`app/types.ts`)

Ajouter `sourceApplicationId` à l'interface `JobOffer`:

```typescript
export interface JobOffer {
  // ... existing fields
  sourceApplicationId?: string; // NEW: Link to source application if created from Applications flow
}
```

### 3. Database Layer (`lib/job-intelligence-db.ts`)

**Dans `saveJobOffer()`** :
- Mapper `offer.sourceApplicationId` → `source_application_id` dans l'upsert

**Nouvelle fonction** :
```typescript
export async function getJobOfferByApplicationId(applicationId: string): Promise<JobOffer | null> {
  // Récupère le JobOffer lié à une application (si existe)
}
```

### 4. Context (`app/contexts/JobIntelligenceContext.tsx`)

**Nouvelle fonction** :
```typescript
const importFromApplication = async (application: Application): Promise<string> => {
  // 1. Vérifier si JobOffer existe déjà pour cette application
  const existing = await getJobOfferByApplicationId(application.id);
  if (existing) return existing.id; // Retourne l'ID existant
  
  // 2. Créer JobOffer avec sourceApplicationId
  const jobOffer: Partial<JobOffer> = {
    title: application.role,
    company: application.company,
    description: application.jobDescription,
    sourceApplicationId: application.id,
    status: 'new',
    // salary, location, remote, etc. = null (user will fill in modal)
  };
  
  const jobId = await saveJobOffer(jobOffer);
  
  // 3. Déclencher analyse automatiquement
  await analyzeJob(jobId);
  
  return jobId;
};
```

Exporter `importFromApplication` dans le context.

### 5. CVDetailModal (`app/components/CVDetailModal.tsx`)

**Ajout d'un bouton dans la toolbar** :

```typescript
// Condition d'affichage : application a un jobDescription ET au moins un CV
const canAnalyzeMatching = application.jobDescription && application.cvVersions.length > 0;

// Bouton
{canAnalyzeMatching && (
  <button
    onClick={handleAnalyzeMatching}
    className="..." // Style selon BRAND-IDENTITY.md (calme, neutre)
  >
    Analyze Job Matching
  </button>
)}

// Handler
const handleAnalyzeMatching = () => {
  setShowJobImportModal(true);
};

// State pour JobImportModal
const [showJobImportModal, setShowJobImportModal] = useState(false);

// Modal
{showJobImportModal && (
  <JobImportModal
    isOpen={showJobImportModal}
    onClose={() => setShowJobImportModal(false)}
    mode="from-application" // Nouveau prop
    sourceApplication={application} // Nouveau prop
    onSuccess={(jobId) => {
      router.push(`/jobs/${jobId}`);
      setShowJobImportModal(false);
    }}
  />
)}
```

### 6. JobImportModal (`app/components/jobs/JobImportModal.tsx`)

**Nouveaux props** :
```typescript
interface JobImportModalProps {
  // ... existing props
  mode?: 'default' | 'from-application'; // NEW
  sourceApplication?: Application; // NEW: si mode = from-application
  onSuccess?: (jobId: string) => void; // NEW: callback avec jobId créé
}
```

**Logique de pré-remplissage** :

```typescript
useEffect(() => {
  if (mode === 'from-application' && sourceApplication) {
    setJobData({
      title: sourceApplication.role,
      company: sourceApplication.company,
      description: sourceApplication.jobDescription,
      // salary, location, etc. restent vides pour que l'user complète
    });
  }
}, [mode, sourceApplication]);
```

**Banner informatif** (si mode = from-application) :

```tsx
{mode === 'from-application' && sourceApplication && (
  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <p className="text-sm text-gray-700">
      Job data from Application: <strong>{sourceApplication.company}</strong> - {sourceApplication.role}
    </p>
  </div>
)}
```

**Modification du CTA** :

```tsx
<button type="submit" disabled={isLoading}>
  {mode === 'from-application' ? 'Confirm & Analyze' : 'Import & Analyze'}
</button>
```

**Modification du handleSubmit** :

```typescript
const handleSubmit = async () => {
  // ... parsing et validation existants
  
  if (mode === 'from-application' && sourceApplication) {
    // Flow spécial : importFromApplication avec auto-analyse
    const jobId = await importFromApplication(sourceApplication);
    onSuccess?.(jobId); // Callback pour redirect
  } else {
    // Flow normal existant
    // ...
  }
};
```

---

## Contraintes UX (DESIGN-SYSTEM.md)

### Priorités à respecter

1. **Fiabilité** : Vérifier si JobOffer existe déjà → éviter doublons
2. **Anti-fatigue** : Un seul point d'entrée principal (CVDetailModal)
3. **Empowerment** : User peut review/edit avant création, peut annuler
4. **Anti-regret** : Preview des données, confirmation explicite

### États UI à implémenter (UX-Agent checklist)

**Bouton "Analyze Job Matching"** :
- Default, Hover, Active, Disabled (si pas de jobDescription ou pas de CV)
- Loading (pendant importFromApplication si async)

**JobImportModal en mode from-application** :
- Default (pré-rempli)
- Loading (pendant création + analyse)
- Success (redirect automatique)
- Error (si échec création ou analyse)

---

## Contraintes Brand (BRAND-IDENTITY.md)

### Micro-copy

| Élément | Texte | Ton |
|---------|-------|-----|
| Bouton principal | "Analyze Job Matching" | Neutre, factuel, pas "Check it!" |
| Banner modal | "Job data from Application: [Company] - [Role]" | Informatif, calme |
| CTA modal | "Confirm & Analyze" | Action claire, pas "Let's go!" |
| Success (si besoin) | "Analysis started." | Sobre, pas "Awesome!" |

### Palette

- Bouton : Accent vert doux (#4CAF9B) ou bleu-gris (#4A5F77) selon contexte
- Banner : bg-blue-50, border-blue-200 (neutre, pas vif)
- Pas d'animations festives, max 300ms si transition

---

## Contraintes Security (Security-Agent)

### Hard Blocks à vérifier

- [ ] Pas de `console.log` avec application.jobDescription ou user data
- [ ] Validation input sur jobData avant saveJobOffer
- [ ] RLS vérifié sur nouvelle colonne source_application_id
- [ ] Pas d'exposition de source_application_id en UI (interne uniquement)

### Audit checklist Security-Agent

```markdown
## Security Audit Report

### Fichiers audités
- supabase-schema.sql (nouvelle colonne)
- lib/job-intelligence-db.ts (getJobOfferByApplicationId)
- app/contexts/JobIntelligenceContext.tsx (importFromApplication)
- app/components/CVDetailModal.tsx
- app/components/jobs/JobImportModal.tsx

### PII Scan
[Scanner console.log avec application data]

### Validation Inputs
[Vérifier validation jobData avant saveJobOffer]

### RLS Check
[Vérifier que source_application_id respecte RLS existant]

### Verdict
- [ ] APPROVED
- [ ] CONDITIONAL
- [ ] BLOCKED
```

---

## Validation finale (Gates)

### UX Gate

- [ ] Tous les états UI listés et implémentés
- [ ] Max 3 choix par écran respecté
- [ ] Feedback utilisateur présent (loading, success, error)
- [ ] Inventaire complet fait (button states, modal states)

### Security Gate

- [ ] Aucun PII dans console.log
- [ ] Validation input sur jobData
- [ ] RLS vérifié
- [ ] Pas d'exposition PII en UI inutile

### Brand Gate

- [ ] Palette corporate respectée
- [ ] Ton neutre/factuel (pas d'exclamations)
- [ ] Animations < 300ms
- [ ] Rounded corners ≤ 16px

### Integration Gate

- [ ] Security Gate PASS
- [ ] UX Gate PASS
- [ ] Brand Gate ALIGNED
- [ ] PRD acceptance criteria couverts
- [ ] Pas de régression sur features existantes

---

## Checklist de validation humaine

Avant de merger, tester manuellement :

1. ✅ Créer application avec CV → bouton "Analyze Job Matching" visible
2. ✅ Click bouton → JobImportModal s'ouvre pré-rempli
3. ✅ Compléter salary/location → Click "Confirm & Analyze"
4. ✅ Redirect vers /jobs/{id} → Analyse en cours visible
5. ✅ Re-click "Analyze Job Matching" sur même application → Doit retrouver le job existant (pas de doublon)
6. ✅ Vérifier dans Supabase : job_offers.source_application_id = application.id

---

## Ordre d'exécution

1. Appliquer migration DB (source_application_id)
2. Mettre à jour types.ts
3. Mettre à jour job-intelligence-db.ts
4. Mettre à jour JobIntelligenceContext.tsx
5. Modifier JobImportModal.tsx
6. Modifier CVDetailModal.tsx
7. Build et tester
8. Security audit final
9. Merge si tous les gates PASS

---

**Niveau de radicalité : 3** (modéré, créatif mais jamais contre-productif)

**Executive Decision** : PROCEED si tous les agents valident leurs checklists respectives.
