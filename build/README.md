# ViaVai - Build

This folder contains the build scripts that prepare the javascript code to be used from the backend.
The build of the javascript code is divided in three parts:
1. The libraries that are the external libraries that are used in the frontend.
2. The `index.jsx` that contain the dynamic react rendering logic.
3. The single react components that are loaded dynamically.
4. Tailwind will compile all the required css classes.

The entry point is the `.index.mjs` file, it contains the logic to build all the parts of the frontend. To build it use
```bash
npm run build
```


<br />

## Constants
The file `constants.mjs` contains the constants that are used in the frontend and backend. 
1. In the `PACKAGES` objects are stored the libraries that are avalable globally. Add here new libraries when added, so that the js code is not shipped multiple times.
2. In the `CORE` are placed the core components, wieh key-value pairs. The key is the path to the component and the value is the output path.
3. In the `LAYOUTS` are placed the layouts, same as the core components.

