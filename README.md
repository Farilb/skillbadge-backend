# 🎓 SkillBadge – Certification blockchain des compétences numériques

![Version](https://img.shields.io/badge/version-3.0-green)
![Blockchain](https://img.shields.io/badge/blockchain-Polygon-purple)
![Standard](https://img.shields.io/badge/standard-ERC--5192-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📌 Description du projet

**SkillBadge** est une plateforme de certification numérique basée sur la blockchain qui permet aux jeunes autodidactes burkinabè de prouver leurs compétences techniques auprès des recruteurs.

### Problème identifié

Au Burkina Faso :
- **15 000+** jeunes se forment au numérique chaque année via des canaux informels
- **Moins de 5%** obtiennent une certification reconnue par les employeurs
- **70%** des recruteurs IT peinent à évaluer les profils autodidactes

### Solution proposée

SkillBadge permet à des **formateurs habilités** d'émettre des **badges NFT** (standard ERC-5192 Soulbound) sur la blockchain Polygon. Les apprenants disposent d'un **portfolio public** et les recruteurs peuvent **vérifier instantanément** l'authenticité des badges.

---

## 🚀 Fonctionnalités principales

### 🎓 Espace Formateur
- Création de types de badges (nom, niveau, domaine, organisation, emoji)
- Attribution de badges aux apprenants
- Suggestion automatique du niveau suivant (Débutant → Intermédiaire → Expert)
- Révocation de badges
- Export des preuves blockchain

### 👤 Espace Apprenant
- Portfolio public avec adresse wallet unique
- Visualisation des badges obtenus
- Progression par domaine (barres et étapes)
- Partage du portfolio par email ou WhatsApp

### 🔍 Espace Recruteur
- Vérification par adresse wallet
- Affichage de la progression par domaine
- Détails des transactions (TX, bloc, IPFS)
- **Aucune connexion requise**

---

## 🛠️ Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | React 18, Vite, TailwindCSS, JavaScript |
| **Backend** | Node.js, Express, Prisma ORM |
| **Base de données** | PostgreSQL |
| **Blockchain** | Polygon Amoy Testnet, Solidity, ethers.js |
| **Authentification** | JWT, bcryptjs |
| **Smart Contract** | ERC-5192 Soulbound NFT |

---

## 📁 Structure du projet


---

## 📦 Installation et exécution locale

### Prérequis

- Node.js 18+
- PostgreSQL 15+ (ou Docker)
- MetaMask (extension navigateur)

### Backend

```bash
cd backend
npm install

# Configurer la base de données
npx prisma generate
npx prisma migrate dev --name init

# Lancer le serveur
npm run dev

cd frontend
npm install
npm run dev

docker run --name skillbadge-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skillbadge \
  -p 5432:5432 \
  -d postgres:15

⛓️ Déploiement du smart contract
Aller sur Remix IDE

Créer SkillBadge.sol et copier le code

Compiler avec Solidity 0.8.19

Sélectionner "Injected Provider - MetaMask"

Changer de réseau pour Polygon Amoy Testnet

Déployer le contrat

Copier l'adresse du contrat dans VITE_CONTRACT_ADDRESS

Obtenir des MATIC gratuits
Polygon Faucet (sélectionner Amoy Testnet)

🎮 Utilisation
Comptes de démo
Rôle	Email	Mot de passe
Formateur	sawadogo@gmail.com	Imman2026
Apprenant	daouda@gmail.com	Daoud2026
Apprenant	cheick@gmail.com	Cheick2026
Flux de test
Formateur : Créer un badge → Attribuer à un apprenant → Confirmer la transaction MetaMask

Apprenant : Se connecter → Voir le badge dans le portfolio → Partager le wallet

Recruteur : Entrer le wallet → Vérifier les badges

📊 API Endpoints
Méthode	Endpoint	Description	Auth
POST	/api/auth/register	Inscription	❌
POST	/api/auth/login	Connexion	❌
GET	/api/badges	Liste des badges	❌
GET	/api/badges/types	Types de badges	❌
GET	/api/badges/wallet/:address	Badges par wallet	❌
POST	/api/badges/types	Créer type badge	✅ (Formateur)
POST	/api/badges/assign	Attribuer badge	✅ (Formateur)
PUT	/api/badges/:id/revoke	Révoquer badge	✅ (Formateur)



📘 SKILLBADGE – DOCUMENTATION TECHNIQUE COMPLÈTE
Table des matières
Vue d'ensemble

Diagramme de cas d'utilisation

Diagramme de séquence

Diagramme de classes

Architecture technique

Rôles et fonctionnalités

Flux blockchain

API Endpoints

1. VUE D'ENSEMBLE
SkillBadge est une plateforme qui permet la certification décentralisée des compétences numériques via des NFT Soulbound (ERC-5192) sur la blockchain Polygon.

text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SKILLBADGE - VUE D'ENSEMBLE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │  FORMATEUR   │     │  APPRENANT   │     │  RECRUTEUR   │               │
│   │              │     │              │     │              │               │
│   │ • Crée badge │     │ • Portfolio  │     │ • Vérifie    │               │
│   │ • Attribue   │     │ • Progression│     │ • Wallet     │               │
│   │ • Révoque    │     │ • Partage    │     │ • Badges     │               │
│   └──────┬───────┘     └──────┬───────┘     └──────┬───────┘               │
│          │                    │                    │                        │
│          ▼                    ▼                    ▼                        │
│   ┌──────────────────────────────────────────────────────────┐             │
│   │                      API REST (Node.js)                   │             │
│   └──────────────────────────────────────────────────────────┘             │
│                              │                                              │
│          ┌───────────────────┼───────────────────┐                          │
│          ▼                   ▼                   ▼                          │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│   │ PostgreSQL  │     │   Prisma    │     │  Blockchain │                   │
│   │   Database  │◄───►│    ORM      │     │   Polygon   │                   │
│   └─────────────┘     └─────────────┘     │   Amoy      │                   │
│                                           └─────────────┘                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
2. DIAGRAMME DE CAS D'UTILISATION
text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DIAGRAMME DE CAS D'UTILISATION                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ┌─────────────────┐                            │
│                              │                 │                            │
│                              │   ◯ FORMATEUR   │                            │
│                              │                 │                            │
│                              └────────┬────────┘                            │
│                                       │                                     │
│                    ┌──────────────────┼──────────────────┐                  │
│                    │                  │                  │                  │
│                    ▼                  ▼                  ▼                  │
│            ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│            │ Créer badge │    │ Attribuer   │    │  Révoquer   │            │
│            │             │    │   badge     │    │   badge     │            │
│            └─────────────┘    └─────────────┘    └─────────────┘            │
│                    │                  │                  │                  │
│                    └──────────────────┼──────────────────┘                  │
│                                       │                                     │
│                                       ▼                                     │
│                              ┌─────────────────┐                            │
│                              │                 │                            │
│                              │   ◯ APPRENANT   │                            │
│                              │                 │                            │
│                              └────────┬────────┘                            │
│                                       │                                     │
│                    ┌──────────────────┼──────────────────┐                  │
│                    │                  │                  │                  │
│                    ▼                  ▼                  ▼                  │
│            ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│            │  Voir son   │    │  Voir sa    │    │  Partager   │            │
│            │  portfolio  │    │ progression │    │  son wallet │            │
│            └─────────────┘    └─────────────┘    └─────────────┘            │
│                    │                  │                  │                  │
│                    └──────────────────┼──────────────────┘                  │
│                                       │                                     │
│                                       ▼                                     │
│                              ┌─────────────────┐                            │
│                              │                 │                            │
│                              │   ◯ RECRUTEUR   │                            │
│                              │                 │                            │
│                              └────────┬────────┘                            │
│                                       │                                     │
│                                       ▼                                     │
│                              ┌─────────────────┐                            │
│                              │  Vérifier par   │                            │
│                              │     wallet      │                            │
│                              └─────────────────┘                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
3. DIAGRAMME DE SÉQUENCE
Flux d'attribution d'un badge
text
┌────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐     ┌─────────┐
│Formateur│     │ Frontend │     │ Backend │     │ MetaMask │     │ Polygon │
└───┬────┘     └────┬─────┘     └────┬────┘     └────┬─────┘     └────┬────┘
    │               │                │               │                │
    │ 1. Sélectionne│                │               │                │
    │   badge et    │                │               │                │
    │   apprenant   │                │               │                │
    │──────────────►│                │               │                │
    │               │                │               │                │
    │               │ 2. GET /badges/types           │                │
    │               │───────────────►│               │                │
    │               │                │               │                │
    │               │ 3. Types de badges             │                │
    │               │◄───────────────│               │                │
    │               │                │               │                │
    │ 4. Clique     │                │               │                │
    │   "Attribuer" │                │               │                │
    │──────────────►│                │               │                │
    │               │                │               │                │
    │               │ 5. Connecter MetaMask          │                │
    │               │───────────────────────────────►│                │
    │               │                │               │                │
    │               │ 6. Demander signature          │                │
    │               │◄───────────────────────────────│                │
    │               │                │               │                │
    │               │ 7. Approuver transaction       │                │
    │               │───────────────────────────────►│                │
    │               │                │               │                │
    │               │                │ 8. Transaction│                │
    │               │                │   sur Polygon │                │
    │               │                │──────────────►│                │
    │               │                │               │                │
    │               │                │ 9. Receipt    │                │
    │               │                │◄──────────────│                │
    │               │                │               │                │
    │               │ 10. POST /badges/assign        │                │
    │               │───────────────►│               │                │
    │               │                │               │                │
    │               │ 11. Sauvegarde en base         │                │
    │               │◄───────────────│               │                │
    │               │                │               │                │
    │ 12. Badge attribué ✅                          │                │
    │◄──────────────│                │               │                │
    │               │                │               │                │
Flux de vérification par un recruteur
text
┌──────────┐     ┌──────────┐     ┌─────────┐
│Recruteur │     │ Frontend │     │ Backend │
└────┬─────┘     └────┬─────┘     └────┬────┘
     │                │                │
     │ 1. Entrer wallet│                │
     │───────────────►│                │
     │                │                │
     │                │ 2. GET /badges/wallet/:address
     │                │───────────────►│
     │                │                │
     │                │ 3. Requête Prisma
     │                │                │
     │                │ 4. Badges trouvés
     │                │◄───────────────│
     │                │                │
     │ 5. Affichage   │                │
     │   des badges   │                │
     │◄───────────────│                │
     │                │                │
4. DIAGRAMME DE CLASSES
text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DIAGRAMME DE CLASSES                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────┐                                                │
│  │         User            │                                                │
│  ├─────────────────────────┤                                                │
│  │ - id: String            │                                                │
│  │ - email: String         │                                                │
│  │ - password: String      │                                                │
│  │ - name: String          │                                                │
│  │ - role: UserRole        │                                                │
│  │ - walletAddress: String │                                                │
│  │ - createdAt: DateTime   │                                                │
│  │ - updatedAt: DateTime   │                                                │
│  ├─────────────────────────┤                                                │
│  │ + register()            │                                                │
│  │ + login()               │                                                │
│  │ + getProfile()          │                                                │
│  └───────────┬─────────────┘                                                │
│              │                                                              │
│              │ 1                                                      *     │
│              ▼                                                              │
│  ┌─────────────────────────┐     ┌─────────────────────────┐               │
│  │       BadgeType         │     │         Badge           │               │
│  ├─────────────────────────┤     ├─────────────────────────┤               │
│  │ - id: String            │     │ - id: String            │               │
│  │ - name: String          │◄────│ - badgeTypeId: String   │               │
│  │ - level: Level          │     │ - student: String       │               │
│  │ - org: String           │     │ - studentWallet: String │               │
│  │ - domain: String        │     │ - tx: String            │               │
│  │ - emoji: String         │     │ - block: Int            │               │
│  │ - issuerId: String      │     │ - revoked: Boolean      │               │
│  │ - createdAt: DateTime   │     │ - date: DateTime        │               │
│  ├─────────────────────────┤     │ - issuerId: String      │               │
│  │ + createBadgeType()     │     ├─────────────────────────┤               │
│  │ + getBadgeTypes()       │     │ + assignBadge()         │               │
│  └─────────────────────────┘     │ + revokeBadge()         │               │
│                                   │ + getBadgesByWallet()   │               │
│                                   └─────────────────────────┘               │
│                                                                              │
│  ┌─────────────────────────┐                                                │
│  │       SmartContract     │                                                │
│  │      (Blockchain)       │                                                │
│  ├─────────────────────────┤                                                │
│  │ - owner: address        │                                                │
│  │ - authorizedIssuers     │                                                │
│  │ - studentBadges         │                                                │
│  ├─────────────────────────┤                                                │
│  │ + issueBadge()          │                                                │
│  │ + revokeBadge()         │                                                │
│  │ + getStudentBadges()    │                                                │
│  │ + authorizeIssuer()     │                                                │
│  └─────────────────────────┘                                                │
│                                                                              │
│  ┌─────────────────────────┐                                                │
│  │        Enums            │                                                │
│  ├─────────────────────────┤                                                │
│  │ UserRole:               │                                                │
│  │   - FORMATEUR           │                                                │
│  │   - APPRENANT           │                                                │
│  │   - RECRUTEUR           │                                                │
│  │   - ADMIN               │                                                │
│  │                         │                                                │
│  │ Level:                  │                                                │
│  │   - DEBUTANT            │                                                │
│  │   - INTERMEDIAIRE       │                                                │
│  │   - EXPERT              │                                                │
│  └─────────────────────────┘                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
5. ARCHITECTURE TECHNIQUE
Stack technologique
Couche	Technologie	Version
Frontend	React + Vite + TailwindCSS	18.2.0
Backend	Node.js + Express	20.x
ORM	Prisma	5.22.0
Base de données	PostgreSQL	15
Blockchain	Polygon Amoy Testnet	-
Smart Contract	Solidity (ERC-5192)	0.8.19
Authentification	JWT + bcrypt	-
Structure des dossiers
text
skillbadge/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── routes/          # Endpoints API
│   │   ├── middleware/      # Auth JWT
│   │   ├── utils/           # Utilitaires
│   │   └── index.js         # Point d'entrée
│   ├── prisma/
│   │   └── schema.prisma    # Modèles DB
│   ├── contracts/
│   │   └── SkillBadge.sol   # Smart contract
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/      # Composants React
    │   ├── pages/           # Pages (Formateur, Apprenant, Recruteur)
    │   ├── hooks/           # Hooks personnalisés
    │   ├── services/        # Appels API
    │   ├── styles/          # CSS Tailwind
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
6. RÔLES ET FONCTIONNALITÉS
🎓 Formateur
Fonctionnalité	API	Blockchain
Créer un type de badge	POST /api/badges/types	❌
Attribuer un badge	POST /api/badges/assign	✅ (issueBadge)
Révoquer un badge	PUT /api/badges/:id/revoke	✅ (revokeBadge)
Voir les badges émis	GET /api/badges	❌
👤 Apprenant
Fonctionnalité	API	Blockchain
Voir son portfolio	GET /api/badges/wallet/:address	✅ (getStudentBadges)
Voir sa progression	Calculée côté frontend	❌
Partager son wallet	Frontend uniquement	❌
🔍 Recruteur
Fonctionnalité	API	Blockchain
Vérifier un wallet	GET /api/badges/wallet/:address	✅ (lecture on-chain)
Afficher les badges	Frontend	❌
7. FLUX BLOCKCHAIN
Smart Contract ERC-5192 Soulbound
solidity
// Structure d'un badge
struct Badge {
    string name;      // Nom du badge
    string skill;     // Compétence
    string level;     // Niveau (Débutant/Intermédiaire/Expert)
    address issuer;   // Adresse du formateur
    uint256 issuedAt; // Timestamp
    bool active;      // Actif ou révoqué
}

// Principales fonctions
function issueBadge(address _student, string memory _name, ...) external;
function revokeBadge(address _student, uint256 _index) external;
function getStudentBadges(address _student) external view returns (Badge[] memory);
Cycle de vie d'un badge
text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CYCLE DE VIE D'UN BADGE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐              │
│   │ CRÉATION│────►│ATTRIBUTION│───►│ VALIDATION│───►│RÉVOCATION│             │
│   └─────────┘     └─────────┘     └─────────┘     └─────────┘              │
│        │               │               │               │                    │
│        ▼               ▼               ▼               ▼                    │
│   Formateur      Transaction     Recruteur       Formateur                  │
│   crée un        sur Polygon     vérifie le      peut révoquer              │
│   type de        → NFT minté     wallet →        le badge                   │
│   badge                          badges actifs                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
8. API ENDPOINTS
Méthode	Endpoint	Description	Auth	Rôle
POST	/api/auth/register	Inscription	❌	Tous
POST	/api/auth/login	Connexion	❌	Tous
GET	/api/users/profile	Profil	✅	Tous
GET	/api/badges	Liste badges	❌	Public
GET	/api/badges/types	Types de badges	❌	Public
GET	/api/badges/wallet/:address	Badges par wallet	❌	Public
POST	/api/badges/types	Créer type badge	✅	FORMATEUR
POST	/api/badges/assign	Attribuer badge	✅	FORMATEUR
PUT	/api/badges/:id/revoke	Révoquer badge	✅	FORMATEUR

9. COMMANDES UTILES
bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# Frontend
cd frontend
npm install
npm run dev

# Docker PostgreSQL
docker run --name skillbadge-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skillbadge \
  -p 5432:5432 \
  -d postgres:15

