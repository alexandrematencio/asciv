# DESIGN-SYSTEM.md – UX Priorities & Component Standards

> Ce fichier définit les **priorités UX** et **standards de composants**. 
> Pour l'identité visuelle et le ton, voir BRAND-IDENTITY.md.

---

## 🎯 Priorités UX (ordre strict, non-négociable)

| Rang | Priorité | Description | Exemple |
|------|----------|-------------|---------|
| **1** | Fiabilité & Professionnalisme | L'utilisateur doit percevoir la qualité dans les 5 premières secondes | Pas de skeleton loaders excessifs, pas de "loading..." partout |
| **2** | Anti-fatigue décisionnelle | Minimiser le nombre de choix et décisions | Max 3 actions principales par écran |
| **3** | Anti-regret post-action | Permettre d'annuler, revenir en arrière | Confirmation avant suppression, undo disponible |
| **4** | Empowerment & Contrôle | L'utilisateur sent qu'il maîtrise l'outil | Pas de "magie" opaque, transparence sur les actions |
| **5** | Inclusivité & Accessibilité | Accessible à tous, même au détriment de l'esthétique | Contraste WCAG AA minimum, focus visible |
| **6** | Anti-addiction | Ne jamais optimiser pour le "temps passé" | Pas de gamification, pas de FOMO, pas d'infinite scroll |

---

## 🚫 Patterns Interdits

| Pattern | Pourquoi c'est interdit | Alternative |
|---------|------------------------|-------------|
| Gamification des candidatures | Crée pression et anxiété | Feedback factuel et calme |
| Infinite scroll sur jobs | Encourage doom-scrolling | Pagination claire avec compteur |
| Micro-interactions festives | Ton inapproprié pour sujet sérieux | Feedback subtil et professionnel |
| "🎉 Bravo !" / emojis celebratoires | Infantilisant | "Saved." / "Done." |
| Compteurs de volume ("50 applications!") | Encourage quantité vs qualité | Pas de metrics de volume |
| Skeleton loaders animés | Anxiogène si trop long | Spinner simple ou message d'état |
| FOMO ("3 autres personnes consultent...") | Manipulation comportementale | Jamais |

---

## 📐 Standards de Composants

### États obligatoires pour TOUT composant interactif

Chaque composant DOIT définir ces états :

| État | Obligatoire | Description |
|------|-------------|-------------|
| Default | ✅ OUI | État de repos |
| Hover | ✅ OUI | Survol souris |
| Active/Pressed | ✅ OUI | Pendant le clic |
| Focused | ✅ OUI | Focus clavier (accessibilité) |
| Disabled | ✅ OUI | Non-interactif |
| Loading | ⚠️ Si applicable | Pendant chargement |
| Empty | ⚠️ Si applicable | Aucune donnée |
| Error | ⚠️ Si applicable | État d'erreur |
| Success | ⚠️ Si applicable | Confirmation |
| **États métier** | ✅ OUI | Ex: dismissed, blocked, matched |

### Template de documentation d'états

```markdown
## États du composant [Nom]

| État | Visuel | Comportement |
|------|--------|--------------|
| Default | bg-white border-gray-200 | Cliquable |
| Hover | bg-gray-50 border-gray-300 | Cursor pointer |
| Focused | ring-2 ring-blue-500 | Accessible au clavier |
| Disabled | bg-gray-100 opacity-50 | Cursor not-allowed |
| Loading | Spinner visible | Non-cliquable |
| [État métier] | [style] | [comportement] |
```

---

## 🔄 Protocole d'harmonisation

Avant TOUTE tâche d'harmonisation/unification :

### Étape 1 : Inventaire obligatoire

```markdown
## Inventaire des composants similaires

| Composant | Fichier | Dimensions | Style actuel |
|-----------|---------|------------|--------------|
| [Nom A] | [path] | [W x H px] | [classes] |
| [Nom B] | [path] | [W x H px] | [classes] |
```

### Étape 2 : Détection des incohérences

```markdown
## Incohérences détectées

| Incohérence | Composant A | Composant B | Impact |
|-------------|-------------|-------------|--------|
| Hauteur bouton | 40px | 36px | Visuel |
| Border radius | 8px | 12px | Visuel |
| Padding | px-4 | px-6 | Espacement |
```

### Étape 3 : Standard unifié

```markdown
## Standard retenu

- Hauteur : 40px (h-10)
- Border radius : 8px (rounded-lg)
- Padding : px-4 py-2
- Composants à modifier : [liste]
```

---

## ✅ Regret-Minimization Checklist

Pour TOUTE feature, répondre à ces 5 questions :

| # | Question | Réponse attendue |
|---|----------|------------------|
| 1 | Risque de fatigue décisionnelle ? | NON ou mitigé |
| 2 | Regret possible dans 48h ? | NON ou réversible |
| 3 | Perte de contrôle utilisateur ? | NON |
| 4 | Risque de manipulation ? | NON |
| 5 | Inclusivité compromise ? | NON |

---

## 📊 Value Alignment Score

Pour TOUTE feature, calculer le score d'alignement :

| Critère | Poids | Score /100 |
|---------|-------|------------|
| Fiabilité 5s | 25% | [X] |
| Anti-fatigue | 20% | [X] |
| Anti-regret | 20% | [X] |
| Empowerment | 15% | [X] |
| Inclusivité | 10% | [X] |
| Anti-addiction | 10% | [X] |
| **Total pondéré** | 100% | **[X]** |

Seuil minimum : **70/100** pour valider une feature.

---

## 🎨 Référence visuelle

Pour les aspects visuels (palette, typo, ton), voir `BRAND-IDENTITY.md`.

Les deux fichiers doivent être lus ensemble pour toute tâche UX/UI.
