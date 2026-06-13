# A-B-I Sourcing & Wholesale

**Landing page minimaliste moderne pour les services d'importation et de distribution A-B-I**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.6.3-3178c6.svg)

## 🎯 À propos

**A-B-I Sourcing & Wholesale** est une landing page moderne conçue pour faciliter :

- 🛢️ **Commandes d'huile de tournesol** (Zeti Sunflower Oil 1L)
- 📦 **Demandes d'importation groupée** (semi-conteneurs/conteneurs)
- 💬 **Communication directe via WhatsApp**
- 🌍 **Support bilingue** (Swahili/Anglais)

## ✨ Caractéristiques principales

### Design & UX
- ✅ Design minimaliste All-White avec typographie premium
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ Conformité WCAG AA/AAA pour l'accessibilité
- ✅ Animations fluides avec Framer Motion
- ✅ Interface intuitive et épurée

### Fonctionnalités
- ✅ Sélecteur de langue bilingue (SW/EN)
- ✅ Deux flux de commande distincts
- ✅ Validation de formulaires robuste
- ✅ Intégration WhatsApp native
- ✅ Notifications toast avec Sonner
- ✅ Thème clair/sombre (optionnel)

### Performance
- ✅ Build rapide avec Vite
- ✅ Optimisation CSS avec Tailwind 4
- ✅ Code TypeScript type-safe
- ✅ Zéro dépendances backend requises

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ ou 20+
- pnpm 10.4.1+

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/AliouneABI/abi-sourcing-wholesale.git
cd abi-sourcing-wholesale

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Stack technologique

### Frontend
- **React 19** - Framework UI
- **TypeScript 5.6** - Typage statique
- **Tailwind CSS 4** - Styling utilitaire
- **shadcn/ui** - Composants UI
- **Framer Motion** - Animations
- **Wouter** - Routage client-side
- **Sonner** - Notifications toast
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

### Build & Tooling
- **Vite 7** - Build tool
- **pnpm** - Package manager
- **TypeScript** - Langage
- **Prettier** - Formatage de code

## 📁 Structure du projet

```
abi-sourcing-wholesale/
├── client/                    # Frontend React
│   ├── public/               # Fichiers statiques
│   ├── src/
│   │   ├── pages/           # Pages (Home, NotFound)
│   │   ├── components/      # Composants réutilisables
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilitaires
│   │   ├── App.tsx          # Composant racine
│   │   ├── main.tsx         # Point d'entrée
│   │   └── index.css        # Styles globaux
│   └── index.html           # Template HTML
├── server/                   # Express server (placeholder)
├── shared/                   # Code partagé
├── package.json             # Dépendances
├── vite.config.ts           # Configuration Vite
├── tsconfig.json            # Configuration TypeScript
└── README.md                # Ce fichier
```

## 🛠️ Scripts disponibles

```bash
# Développement
pnpm dev              # Démarrer le serveur de développement

# Build
pnpm build            # Construire pour la production
pnpm preview          # Prévisualiser la build de production

# Maintenance
pnpm check            # Vérifier les types TypeScript
pnpm format           # Formater le code avec Prettier
```

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
# 1. Pousser vers GitHub
git push origin main

# 2. Aller sur vercel.com
# 3. Cliquer "New Project"
# 4. Sélectionner ce dépôt
# 5. Cliquer "Deploy"
```

**Configuration Vercel :**
- Build command : `pnpm build`
- Output directory : `dist/public`
- Node.js version : 20.x (recommandé)

### Netlify

```bash
# 1. Connecter Netlify à GitHub
# 2. Build command : pnpm build
# 3. Publish directory : dist/public
# 4. Déployer
```

### Déploiement manuel

```bash
# Build pour la production
pnpm build

# Les fichiers sont générés dans dist/public/
# Uploader sur votre serveur web
```

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```bash
# Formspree (optionnel - pour la capture d'emails)
VITE_FORMSPREE_ID=your_formspree_id_here

# WhatsApp (déjà configuré)
VITE_WHATSAPP_NUMBER=33773728140

# Analytics (optionnel)
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

### Configurer Formspree (optionnel)

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire
4. Ajouter à `.env.local` : `VITE_FORMSPREE_ID=f/xxxxx`

## 📱 Fonctionnalités détaillées

### Flux 1 : Commande d'huile de tournesol

**Produit :** Zeti Sunflower Oil 1L

**Tarification :**
- 500+ Pcs (MOQ) → 7,000 TZS (Livraison gratuite)
- 1,000+ Pcs → 6,800 TZS
- 2,000+ Pcs → 6,500 TZS

**Formulaire :**
- Nom complet
- Quantité (minimum 500 pcs)

### Flux 2 : Demande d'importation groupée

**Type :** Semi-conteneur / Conteneur

**Marques disponibles :**
- Jadida
- Nutella
- Kinder
- Monster Energy
- Redbull

**Formulaire :**
- Nom et prénom
- Numéro TIN (Numéro Fiscal)
- Numéro de téléphone
- Adresse email

## 🌍 Langues supportées

- 🇹🇿 **Swahili** (Kiswahili)
- 🇬🇧 **Anglais** (English)

Le site détecte automatiquement la langue du navigateur et propose un sélecteur pour basculer.

## ♿ Accessibilité

Le site respecte les normes WCAG AA/AAA :

- ✅ Contraste suffisant (ratio 4.5:1 minimum)
- ✅ Navigation au clavier complète
- ✅ Labels explicites pour tous les champs
- ✅ Structure sémantique HTML
- ✅ Texte alternatif pour les images
- ✅ Support des lecteurs d'écran

## 📊 Performance

**Lighthouse Scores (cible) :**
- Performance : 90+
- Accessibility : 95+
- Best Practices : 90+
- SEO : 95+

## 🔒 Sécurité

- ✅ Validation des formulaires côté client
- ✅ Pas de données sensibles en dur
- ✅ Variables d'environnement pour les secrets
- ✅ HTTPS obligatoire en production
- ✅ Content Security Policy (CSP) configurée

## 🐛 Troubleshooting

| Problème | Solution |
|---|---|
| Le site ne se charge pas | Vérifier que `pnpm dev` est en cours d'exécution |
| Les formulaires ne fonctionnent pas | Vérifier la configuration Formspree |
| WhatsApp ne s'ouvre pas | Vérifier le numéro de téléphone en format international |
| Styles cassés | Exécuter `pnpm install` et redémarrer le serveur |
| Erreurs TypeScript | Exécuter `pnpm check` et corriger les erreurs |

## 📝 Licence

MIT - Libre d'utilisation

## 👥 Support

Pour toute question ou problème :
- 📧 Email : contact@a-b-i.fr
- 💬 WhatsApp : +33 7 73 72 81 40

## 🚀 Améliorations futures

- [ ] Intégration d'une base de données
- [ ] Système d'authentification utilisateur
- [ ] Panier d'achat persistant
- [ ] Paiement en ligne (Stripe, M-Pesa)
- [ ] Dashboard d'administration
- [ ] Notifications email automatiques
- [ ] Système de recommandations
- [ ] Chat en direct avec support

## 📄 Documentation complète

Voir le fichier `ABI_Documentation.md` pour la documentation technique complète.

---

**Créé avec ❤️ par Manus AI - Juin 2026**
