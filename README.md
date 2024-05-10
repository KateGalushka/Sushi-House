# sushi-house
---

## Description
The project is made in Vue3 Composition API with Firebase - Firestore Database, Storage and Authentication.

You can choose dishes from the menu and different categories, add them to the cart, increase or decrease quantity and submit your order by filling in the form with your data. If you are logged in - your account data (name, email, phone etc.) are completed in the form automatically.

All orders are saved in database with user's contact data, chosen dishes, delivery date and time, payment method.
The cart is stored in local storage until this order is submitted.
If the user is authenticated, his account data are saved in database.


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
