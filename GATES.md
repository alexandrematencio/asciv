# GATES.md

Protocoles de validation finale. **Aucune tâche n'est complète sans passer son gate.**

---

## 🚪 Types de Gates

| Gate | Quand | Validateur | Bloquant |
|------|-------|------------|----------|
| **Security Gate** | Tout code | Security-Agent | ✅ OUI |
| **UX Gate** | Tout composant UI | UX-Agent | ✅ OUI |
| **Brand Gate** | Tout visuel/copy | Brand-Agent | ❌ NON |
| **Integration Gate** | Features complètes | Executive | ✅ OUI |

---

## 🔐 Security Gate

### Conditions de passage

```
✅ PASS si TOUS les critères sont verts :
- [ ] Aucun PII dans console.log
- [ ] Validation input sur toutes les API routes touchées
- [ ] RLS vérifié si tables Supabase modifiées
- [ ] Pas d'exposition PII en UI sans nécessité business
- [ ] Données sensibles jamais en URL/query params
```

### Format de validation

```markdown
## 🔐 Security Gate

**Status**: PASS ✅ | FAIL ❌ | CONDITIONAL ⚠️

### Audit Summary
| Critère | Status | Notes |
|---------|--------|-------|
| PII in logs | ✅/❌ | [détails] |
| Input validation | ✅/❌ | [détails] |
| RLS check | ✅/❌ | [détails] |
| PII in UI | ✅/❌ | [détails] |
| URL params | ✅/❌ | [détails] |

### Blocking Issues
[Liste si FAIL, vide si PASS]

### Recommendations
[Non-bloquants mais suggérés]
```

---

## 🎨 UX Gate

### Conditions de passage

```
✅ PASS si TOUS les critères sont verts :
- [ ] Tous les états UI documentés (default, hover, active, disabled, loading, empty, error, success, états métier)
- [ ] Pas plus de 3 choix principaux par écran
- [ ] Feedback utilisateur présent pour toute action
- [ ] États métier spécifiques identifiés et implémentés
- [ ] Si harmonisation : inventaire croisé complété
```

### Format de validation

```markdown
## 🎨 UX Gate

**Status**: PASS ✅ | FAIL ❌

### States Coverage
| Composant | États documentés | États implémentés | Gap |
|-----------|-----------------|-------------------|-----|
| [nom] | [n] | [n] | [liste manquants] |

### Anti-Fatigue Check
- Choix par écran : [n] (max 3)
- Cognitive load : LOW/MEDIUM/HIGH

### Missing States
[Liste si FAIL, vide si PASS]
```

---

## 🏷️ Brand Gate

### Conditions de passage (non-bloquant mais reporté)

```
⚠️ WARN si critères non respectés :
- [ ] Palette corporate (bleu-gris, neutres, accents verts/violets subtils)
- [ ] Typo system-ui pour body
- [ ] Spacing généreux (min 16px entre éléments)
- [ ] Animations < 300ms
- [ ] Ton neutre/factuel (pas d'exclamations, pas d'emoji)
- [ ] Rounded corners ≤ 16px
```

### Format de validation

```markdown
## 🏷️ Brand Gate

**Status**: ALIGNED ✅ | DRIFT ⚠️

### Alignment Score: [X]/100

| Critère | Status | Notes |
|---------|--------|-------|
| Palette | ✅/⚠️ | [détails] |
| Typography | ✅/⚠️ | [détails] |
| Spacing | ✅/⚠️ | [détails] |
| Animations | ✅/⚠️ | [détails] |
| Tone | ✅/⚠️ | [détails] |

### Brand Drift Items
[Liste des écarts à corriger, priorité basse]
```

---

## 🔗 Integration Gate

### Conditions de passage (features complètes uniquement)

```
✅ PASS si TOUS les sous-gates sont verts :
- [ ] Security Gate PASS
- [ ] UX Gate PASS
- [ ] Brand Gate ALIGNED ou DRIFT documenté
- [ ] PRD acceptance criteria couverts
- [ ] Pas de régression sur features existantes
```

### Format de validation

```markdown
## 🔗 Integration Gate

**Status**: SHIP ✅ | HOLD ❌ | SHIP WITH NOTES ⚠️

### Sub-Gates
| Gate | Status |
|------|--------|
| Security | ✅/❌ |
| UX | ✅/❌ |
| Brand | ✅/⚠️ |

### PRD Coverage
| Acceptance Criteria | Status |
|---------------------|--------|
| AC-01: [description] | ✅/❌ |
| AC-02: [description] | ✅/❌ |

### Regression Check
- [ ] Fonctionnalités existantes testées
- [ ] Aucune régression détectée

### Ship Decision
[SHIP / HOLD + motifs]
```

---

## 📋 Definition of Done (DoD)

Une tâche est **DONE** uniquement si :

### Pour tout code
- [ ] Code review implicite (Dev-Agent)
- [ ] Security Gate PASS
- [ ] Pas de TODO/FIXME critiques laissés
- [ ] Types TypeScript complets

### Pour tout composant UI
- [ ] UX Gate PASS (tous les états)
- [ ] Brand Gate documenté
- [ ] Responsive vérifié (si applicable)
- [ ] Accessibilité basique (focus, contraste)

### Pour toute feature
- [ ] Integration Gate PASS
- [ ] Documentation mise à jour (si applicable)
- [ ] PRD acceptance criteria validés

### Pour toute harmonisation
- [ ] Inventaire croisé complété AVANT modification
- [ ] Tous les composants similaires alignés
- [ ] Comparaison visuelle avant/après documentée

---

## 🚨 Escalation Protocol

### Si un gate FAIL

```
1. STOP - Ne pas merger/livrer
2. DOCUMENT - Lister les issues bloquantes
3. FIX - Corriger les issues
4. RE-VALIDATE - Repasser le gate
5. PROCEED - Seulement si PASS
```

### Si désaccord entre agents

```
1. ESCALATE à Executive-Agent
2. Executive arbitre selon PRD priorities
3. Decision documentée
4. Override possible avec justification explicite
```

---

## 📊 Gate Metrics (pour suivi)

| Métrique | Target | Calcul |
|----------|--------|--------|
| Security Gate Pass Rate | > 90% | Gates PASS / Total gates |
| UX Gate First Pass | > 70% | PASS sans itération / Total |
| Average Gate Iterations | < 1.5 | Nombre de tentatives avant PASS |
| Blocking Issues Caught | 100% | Issues pre-production / Total issues |
