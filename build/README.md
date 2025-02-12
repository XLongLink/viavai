# Build

Handle the build of the frontend (located in `view`) into static js file. The output is placed into `viavai/static` and then packaged into the python library.

Since not all the components are used in all the pages, and there are icon libraries, each component is build separately and then lazy loaded only when is needed.

## Libraries

The libraries are downloaded directly from the respective cdn.

## Components
