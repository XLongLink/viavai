# ViaVai - Build

This folder contains the build script that prepare the javascript code to be used from the backend.


<br />

## Main

The `main.mjs` compiles the `index.jsx` file to a single file `bundle.js` using webpack.

```bash
npm run main
```


# Testing - Core functionality of ViaVai

The goal is to compile the react and js code in tree separate parts.
1. The `.dist/libs`s folder contains the `min.js` files needed for each library.
   To ensures that the libraries are only loaded once.

2. The `.dist/bundle` folder contains the `bundle.js` file that is the entry file. It contains the logic to connect with the python backend and load the components dynamically.

3. The `.dist/components` folder contains the `components` files that are the components that are loaded dynamically, those are imported in the frontend only when needed.


<br />

## Build

To compile the libraries run
```bash
npm run libs
```

To compile the main run
```bash
npm run main
```

To compile the components run
```bash
npm run components
```

To compile all run
```bash
npm run build
```

