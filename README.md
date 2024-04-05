# GBFS to GeoJSON parser

This is a small parser to get GBFS data in a nice GeoJSON format for better compatibility.
This project has three endpoints :
- /lime
- /bolt
- /dott
Each for a micromobility company by the same name.

**Note : This project uses Brussels data by default**
## Technologies used

[Node.js](https://nodejs.org/en/about/) to run the server-side JavaScript.

[Fastify](https://www.fastify.io/) to manage incoming HTTP requests easily.

[Axios](https://axios-http.com/docs/intro/) to send HTTP requests easily.

## Run it yourself

To run this project, you simply need to set up a new Node.js project, get the packages, and modify the provider parameter of the getGBFSData function in server.js to whichever you prefer and create a fastify.get function for each endpoint you'd like to have.


## Want to run it on Glitch ?

[Glitch](https://glitch.com) is a pretty useful and free website which I used to host this project initially. You can access the project and remix it as you wish [here](https://glitch.com/~bolt-geojson-parser)
