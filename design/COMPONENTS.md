# COMPONENTS.md — Catalogue de Composants

> Ce fichier documente tous les composants UI du design system.
> Pour les tokens (couleurs, spacing, etc.), voir `DESIGN-TOKENS.md`.
> Pour la philosophie UX, voir `DESIGN-SYSTEM.md`.

---

## Table des matières

1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Inputs](#inputs)
4. [Badges](#badges)
5. [Modals](#modals)
6. [Filter Pills](#filter-pills)
7. [Stat Cards](#stat-cards)
8. [Progress Bar](#progress-bar)
9. [Timeline](#timeline)
10. [Tooltips](#tooltips)
11. [Loading States](#loading-states)
12. [Empty States](#empty-states)
13. [Toast Notifications](#toast-notifications)

---

## Buttons

### Composant React

```tsx
import Button from '@/app/components/Button';
```

### Variantes

| Variante | Classe CSS | Couleur | Usage |
|----------|------------|---------|-------|
| Primary | `.btn-primary` | `accent-600` | Actions principales (Save, Submit, Continue) |
| Secondary | `.btn-secondary` | `primary-100` / `primary-700` (dark) | Actions secondaires (Cancel, Back) |
| Ghost | `.btn-ghost` | Transparent | Actions tertiaires (liens, navigation) |
| Danger | `.btn-danger` | `error-600` | Actions destructives (Delete, Remove) |
| Success | `.btn-success` | `success-600` | Confirmations positives |

### Tailles

| Taille | Classe | Padding | Font size |
|--------|--------|---------|-----------|
| sm | `.btn-sm` | `px-4 py-2` | `text-sm` (14px) |
| md | (default) | `px-6 py-3` | `text-base` (16px) |
| lg | `.btn-lg` | `px-8 py-4` | `text-lg` (18px) |

### États

| État | Visuel | Comportement |
|------|--------|--------------|
| Default | `bg-accent-600` | Cliquable |
| Hover | `bg-accent-700` + `shadow-md` + `scale-[1.02]` | Cursor pointer |
| Active | `bg-accent-800` + `scale-[0.98]` | Feedback tactile |
| Focused | `ring-2 ring-accent-500 ring-offset-2` | Navigation clavier |
| Disabled | `opacity-50` | `cursor-not-allowed`, non-cliquable |
| Loading | Spinner + "Loading..." | Non-cliquable |

### Exemples JSX

```tsx
// Bouton primaire standard
<Button variant="primary" size="md">
  Save Changes
</Button>

// Bouton avec loading state
<Button variant="primary" loading>
  Saving...
</Button>

// Bouton danger
<Button variant="danger" size="sm">
  Delete
</Button>

// Bouton disabled
<Button variant="secondary" disabled>
  Not Available
</Button>
```

### Classes CSS directes

```html
<!-- Si vous n'utilisez pas le composant React -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-danger">Danger</button>
<button class="btn-success">Success</button>

<!-- Tailles -->
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary btn-lg">Large</button>

<!-- Bouton icône -->
<button class="btn-icon">
  <IconComponent />
</button>
```

---

## Cards

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.card` | Card de base avec background, border, shadow |
| `.card-hover` | Ajoute effet hover (shadow + translate) |
| `.card-interactive` | Card cliquable avec tous les états |

### États

| État | Visuel |
|------|--------|
| Default | `bg-white` / `bg-primary-800` (dark), `border-primary-200`, `shadow-md` |
| Hover | `shadow-lg`, `translate-y-[-2px]` |
| Active | `translate-y-0`, `shadow-md` |

### Exemples JSX

```tsx
// Card simple
<div className="card p-6">
  <h3 className="text-lg font-semibold">Title</h3>
  <p className="text-primary-600 dark:text-primary-300">Content</p>
</div>

// Card interactive (cliquable)
<div className="card card-interactive p-6" onClick={handleClick}>
  <h3>Clickable Card</h3>
</div>

// Card avec hover effect seulement
<div className="card card-hover p-6">
  <h3>Hover Effect Card</h3>
</div>
```

### Structure type

```tsx
<div className="card p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
      Card Title
    </h3>
    <Badge variant="success">Status</Badge>
  </div>

  {/* Content */}
  <div className="space-y-2">
    <p className="text-primary-600 dark:text-primary-300">
      Card content goes here.
    </p>
  </div>

  {/* Footer (optional) */}
  <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
    <Button variant="primary" size="sm">Action</Button>
  </div>
</div>
```

---

## Inputs

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.input-base` | Style de base pour tous les inputs |
| `.input-primary` | Input standard (alias de input-base) |
| `.textarea-primary` | Textarea avec resize désactivé |
| `.select-primary` | Select dropdown |

### États

| État | Visuel |
|------|--------|
| Default | `bg-white` / `bg-primary-800`, `border-primary-200` / `border-primary-600` |
| Focused | `ring-2 ring-accent-500`, `border-accent-500` |
| Error | `border-error-500`, `ring-error-500` |
| Disabled | `opacity-50`, `cursor-not-allowed` |

### Exemples JSX

```tsx
// Input standard
<input
  type="text"
  className="input-primary"
  placeholder="Enter text..."
/>

// Input avec label
<div className="space-y-2">
  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
    Email
  </label>
  <input
    type="email"
    className="input-primary"
    placeholder="you@example.com"
  />
</div>

// Input avec erreur
<div className="space-y-2">
  <input
    type="text"
    className="input-primary border-error-500 focus:ring-error-500"
  />
  <p className="text-sm text-error-600">This field is required</p>
</div>

// Textarea
<textarea
  className="textarea-primary"
  rows={4}
  placeholder="Enter description..."
/>

// Select
<select className="select-primary">
  <option value="">Select option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

---

## Badges

### Classes CSS

| Classe | Couleur | Usage |
|--------|---------|-------|
| `.badge` | — | Base badge (à combiner avec variante) |
| `.badge-draft` | `primary` | Brouillons |
| `.badge-sent` | `info` | Envoyé |
| `.badge-waiting` | `warning` | En attente |
| `.badge-interview` | `accent` | Entretien |
| `.badge-offer` | `success` | Offre reçue |
| `.badge-rejected` | `error` | Refusé |

### Exemples JSX

```tsx
// Badge de statut
<span className="badge badge-draft">Draft</span>
<span className="badge badge-sent">Sent</span>
<span className="badge badge-waiting">Waiting</span>
<span className="badge badge-interview">Interview</span>
<span className="badge badge-offer">Offer</span>
<span className="badge badge-rejected">Rejected</span>

// Badge custom
<span className="badge bg-accent-100 text-accent-700 dark:bg-accent-700/20 dark:text-accent-300">
  Custom Badge
</span>
```

### Structure

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 9999px; /* rounded-full */
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
}
```

---

## Modals

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.modal-backdrop` | Overlay sombre avec blur |
| `.modal-content` | Container du modal |

### Structure

```tsx
// Modal standard
<div className="modal-backdrop" onClick={onClose}>
  <div
    className="modal-content w-full max-w-lg mx-4 animate-scale-in"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-primary-700">
      <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
        Modal Title
      </h2>
      <button className="btn-icon" onClick={onClose}>
        <XIcon className="w-5 h-5" />
      </button>
    </div>

    {/* Body */}
    <div className="p-6">
      <p>Modal content goes here.</p>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 p-6 border-t border-primary-200 dark:border-primary-700">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  </div>
</div>
```

### États

| État | Comportement |
|------|--------------|
| Ouverture | Animation `scale-in` (0.2s) |
| Backdrop click | Ferme le modal |
| Escape key | Ferme le modal (à implémenter) |

---

## Filter Pills

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.filter-pill` | Base du pill |
| `.filter-pill.active` | Pill sélectionné |

### États

| État | Visuel |
|------|--------|
| Default | `bg-white`, `border-primary-200`, `text-primary-600` |
| Hover | `bg-primary-50` |
| Active | `bg-primary-700`, `text-white` (inversé en dark mode) |

### Exemple JSX

```tsx
const filters = ['All', 'Draft', 'Sent', 'Interview'];
const [activeFilter, setActiveFilter] = useState('All');

<div className="flex gap-2">
  {filters.map((filter) => (
    <button
      key={filter}
      className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
```

---

## Stat Cards

### Classe CSS

```css
.stat-card {
  background: white / primary-800 (dark);
  border-radius: 12px;
  box-shadow: shadow-md;
  padding: 1.5rem;
  border: 1px solid primary-200 / primary-700;
  transition: shadow 200ms;
}
.stat-card:hover {
  box-shadow: shadow-lg;
}
```

### Structure type

```tsx
<div className="stat-card">
  {/* Icon avec background coloré */}
  <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-4">
    <IconComponent className="w-6 h-6 text-accent-600 dark:text-accent-400" />
  </div>

  {/* Valeur */}
  <p className="text-3xl font-bold text-primary-900 dark:text-primary-100">
    42
  </p>

  {/* Label */}
  <p className="text-sm text-primary-500 dark:text-primary-400">
    Applications
  </p>
</div>
```

### Variantes d'icônes (par couleur)

| Type | Background | Icon color |
|------|------------|------------|
| Default | `bg-accent-100` | `text-accent-600` |
| Success | `bg-success-100` | `text-success-600` |
| Warning | `bg-warning-100` | `text-warning-600` |
| Error | `bg-error-100` | `text-error-600` |

---

## Progress Bar

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.progress-bar` | Container de la barre |
| `.progress-bar-fill` | Remplissage animé |

### Exemple JSX

```tsx
<div className="progress-bar">
  <div
    className="progress-bar-fill"
    style={{ width: `${percentage}%` }}
  />
</div>

// Avec label
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-primary-600 dark:text-primary-400">Progress</span>
    <span className="font-medium text-primary-900 dark:text-primary-100">75%</span>
  </div>
  <div className="progress-bar">
    <div className="progress-bar-fill" style={{ width: '75%' }} />
  </div>
</div>
```

---

## Timeline

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.timeline-item` | Item de timeline avec bordure gauche |
| `.timeline-dot` | Point sur la timeline |

### Structure

```tsx
<div className="space-y-0">
  {events.map((event, index) => (
    <div key={index} className="timeline-item">
      <div className="timeline-dot" />
      <div className="space-y-1">
        <p className="font-medium text-primary-900 dark:text-primary-100">
          {event.title}
        </p>
        <p className="text-sm text-primary-500 dark:text-primary-400">
          {event.date}
        </p>
      </div>
    </div>
  ))}
</div>
```

---

## Tooltips

### Classes CSS

| Classe | Description |
|--------|-------------|
| `.tooltip` | Tooltip (invisible par défaut) |
| `.tooltip-trigger` | Parent qui déclenche le tooltip |

### Exemple JSX

```tsx
<div className="tooltip-trigger relative">
  <button className="btn-icon">
    <InfoIcon className="w-5 h-5" />
  </button>
  <div className="tooltip">
    Helpful information here
  </div>
</div>
```

### Position

Le tooltip apparaît au-dessus par défaut. Pour d'autres positions, ajuster avec :

```css
/* Bottom */
.tooltip-bottom {
  top: auto;
  bottom: -2px;
  transform: translateX(-50%) translateY(100%);
}
```

---

## Loading States

### Spinner

```tsx
// Spinner simple
<div className="spinner" />

// Spinner dans un bouton
<Button variant="primary" loading>
  Saving...
</Button>

// Spinner centré dans un container
<div className="flex items-center justify-center py-12">
  <div className="spinner" />
</div>
```

### Skeleton (éviter les animations excessives)

```tsx
// Skeleton card (animation subtile)
<div className="card p-6 animate-pulse">
  <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-4" />
  <div className="h-3 bg-primary-200 dark:bg-primary-700 rounded w-1/2" />
</div>
```

> **Note UX** : Éviter les skeleton loaders multiples ou longs. Préférer un spinner simple avec message d'état.

---

## Empty States

### Classe CSS

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}
```

### Structure type

```tsx
<div className="empty-state">
  <div className="empty-state-icon">
    <InboxIcon className="w-16 h-16" />
  </div>
  <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-2">
    No applications yet
  </h3>
  <p className="text-primary-500 dark:text-primary-400 mb-6 max-w-sm">
    Start by creating your first job application to track your progress.
  </p>
  <Button variant="primary">
    Create Application
  </Button>
</div>
```

---

## Toast Notifications

### Composant

```tsx
import { Toast } from '@/app/components/Toast';
```

### Variantes

| Type | Couleur | Usage |
|------|---------|-------|
| success | `success-600` | Action réussie |
| error | `error-600` | Erreur |
| warning | `warning-600` | Avertissement |
| info | `info-600` | Information |

### Exemple JSX

```tsx
// Dans le composant
const [toast, setToast] = useState<ToastProps | null>(null);

const showSuccess = () => {
  setToast({
    type: 'success',
    message: 'Changes saved successfully.',
    onClose: () => setToast(null)
  });
};

// Rendu
{toast && <Toast {...toast} />}
```

### Comportement

- Animation d'entrée : slide-in depuis la droite
- Auto-dismiss : 4 secondes (configurable)
- Position : fixed en haut à droite
- Fermeture manuelle : bouton X

---

## Animations disponibles

| Classe | Description | Durée |
|--------|-------------|-------|
| `.animate-slide-in-right` | Slide depuis la droite | 200ms |
| `.animate-scale-in` | Scale de 0.95 à 1 | 200ms |
| `.animate-fade-in` | Fade de 0 à 1 | 200ms |
| `.animate-spin` | Rotation continue | — |
| `.animate-pulse` | Pulsation (pour skeletons) | — |

### Respect de `prefers-reduced-motion`

Toutes les animations sont désactivées automatiquement si l'utilisateur a activé "Reduce motion" dans ses préférences système.

---

## Utilities

### Glass Effect

```tsx
<div className="glass p-6 rounded-lg">
  Glassmorphism effect
</div>
```

### Focus Ring

```tsx
<button className="focus-ring">
  Accessible focus
</button>
```

### Shadow Variants

```tsx
<div className="shadow-soft">Subtle shadow</div>
<div className="shadow-medium">Default shadow</div>
<div className="shadow-strong">Prominent shadow</div>
```

---

*Source de vérité : `app/globals.css` + `app/components/`*
*Dernière mise à jour : 2026-01-31*
