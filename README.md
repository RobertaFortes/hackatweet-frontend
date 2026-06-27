# Hackatweet — Frontend

Un clone de Twitter construit avec Next.js. Les utilisateurs peuvent s'inscrire / se connecter, publier des tweets, les liker et les déliker, et parcourir les hashtags tendances.

Ceci est l'application **frontend** — elle communique avec le [backend Hackatweet](https://hackatweet-backend-iota-nine.vercel.app) via une API REST.

## Stack technique

- [Next.js](https://nextjs.org/) 12 (Pages Router)
- [React](https://react.dev/) 18
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) pour la gestion de l'état
- [redux-persist](https://github.com/rt2zz/redux-persist) pour conserver l'utilisateur connecté entre les rechargements
- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) pour les tests

## Prérequis

- Node.js `20.18.3` (voir [.nvmrc](.nvmrc) — lancez `nvm use` pour vous aligner)
- [Yarn](https://yarnpkg.com/) (un `yarn.lock` est versionné)
- Une instance du backend Hackatweet en cours d'exécution (locale ou hébergée)

## Démarrage rapide

```bash
# 1. Installer les dépendances
yarn install

# 2. Configurer les variables d'environnement
cp .env.example .env.local
# modifiez .env.local et faites pointer NEXT_PUBLIC_API_URL vers votre backend

# 3. Démarrer le serveur de développement
yarn dev
```

L'application tourne sur [http://localhost:3001](http://localhost:3001).

## Variables d'environnement

| Variable              | Description                          | Valeur par défaut (dev)   |
| --------------------- | ------------------------------------ | ------------------------- |
| `NEXT_PUBLIC_API_URL` | URL de base de l'API backend.        | `http://localhost:3000`   |

La logique de résolution se trouve dans [config.js](config.js) : la variable
d'environnement est utilisée si elle est définie ; sinon, on retombe sur l'URL
du backend de production en production, et sur `localhost:3000` en développement
local.

## Scripts

| Commande      | Description                                       |
| ------------- | ------------------------------------------------ |
| `yarn dev`    | Démarre le serveur de dev sur le port **3001**.  |
| `yarn build`  | Construit le bundle de production.               |
| `yarn start`  | Démarre le serveur de production.                |
| `yarn lint`   | Lance les vérifications Next.js / ESLint.        |

## Structure du projet

```
.
├── pages/                # Routes Next.js
│   ├── _app.js           # Wrapper Provider Redux + PersistGate
│   ├── index.js          # Page d'accueil / connexion
│   └── home.js           # Fil d'actualité authentifié
├── components/
│   ├── ModalWrapper.js   # Monte les modales selon l'état du store
│   ├── modals/           # AuthModal (connexion / inscription)
│   ├── pages/            # Composants des pages Login & Home
│   ├── sections/         # Fil, NewTweet, trends, tweet, user
│   └── ui/               # UI réutilisable (Button)
├── reducers/             # Slices Redux
│   ├── user.js           # Utilisateur connecté (username, token)
│   └── modal.js          # État ouvert/fermé de la modale d'auth
├── services/
│   └── tweets.js         # Appels API : liste, création, suppression, like
├── store.js              # Store Redux + configuration redux-persist
├── styles/               # Modules CSS et styles globaux
└── config.js             # Résolution de l'URL de l'API
```

## État & persistance

L'état global est géré avec Redux Toolkit ([store.js](store.js)). Le slice
`user` est persisté dans le `localStorage` (clé `hackatweet`) via redux-persist,
afin qu'une session connectée survive aux rechargements de page. Le slice
`modal` contrôle la modale d'authentification et n'est **volontairement pas**
persisté.

## API

Tous les appels au backend sont centralisés dans
[services/tweets.js](services/tweets.js) et authentifiés avec un token Bearer :

| Fonction                       | Méthode & endpoint             |
| ------------------------------ | ------------------------------ |
| `getTweets(token)`             | `GET /api/tweets`              |
| `createTweet(token, content)`  | `POST /api/tweets`             |
| `deleteTweet(token, id)`       | `DELETE /api/tweets/:id`       |
| `toggleLike(token, id)`        | `PUT /api/tweets/:id/like`     |

## Tests

```bash
yarn jest
```

Jest est configuré dans [jest.config.js](jest.config.js) avec l'environnement jsdom.
