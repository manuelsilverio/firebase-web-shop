# firebase-case-study
A case study of Firebase Authentication.


### Sample website can be found on:

https://fir-shop-pipeline.web.app/

### Requirements

- Node -> npm
- Create a firebase project: https://firebase.google.com/docs/web/setup


### Installation

1- Use ../firebase-shop/ as your main directory. ```cd firebase-shop``` on Windows.
2- Install dependencies. Use ``` npm i  ```
3- Then create a file named .env.local and add the variables required for Firebase.
4- run project using ```npm run dev```


### Deploying website using Firebase hosting

-  Documentation: https://firebase.google.com/docs/hosting/frameworks/nextjs

When running ``` firebase init ``` is meant to detect that we are running a nextjs project and offer the right installation

```bash
cd firebase-shop
npm install -g firebase-tools
```

```bash
firebase login
firebase init
```

```bash
firebase deploy --only hosting
```
