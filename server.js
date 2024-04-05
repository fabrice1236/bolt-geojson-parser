
const axios = require('axios');
const BoltURL = /*'https://mds.bolt.eu/gbfs/2/336/free_bike_status'*/'https://gbfs.api.ridedott.com/public/v2/brussels/free_bike_status.json'; //MODIFY ME TO WHATEVER BOLT CITY ENDPOINT YOU'D LIKE


const fastify = require("fastify")({
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE
function convert(array) {
  let FeatureDic = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].is_reserved == false && array[i].is_disabled == false) {
      let data = `{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          ${array[i].lon},
          ${array[i].lat}
        ],
        "type": "Point"
      }
    }`
    
    FeatureDic.push(data);
    }

  }
  let final = `{
  "type": "FeatureCollection",
  "features": [${FeatureDic}]}`;
  return final
}


async function getGBFSData(provider) {
  let GBFSData;
  try {
    const response = await axios.get(provider);
    GBFSData = response.data.data.bikes;
    return GBFSData;
  } catch (error) {
    console.error(error);
    return error;
  }
}

fastify.get("/bolt", async function (request, reply) {
  let BoltData = await getGBFSData("https://mds.bolt.eu/gbfs/2/336/free_bike_status");
  let final = convert(BoltData);
  

  return reply.send(JSON.parse(final));
});

fastify.get("/dott", async function (request, reply) {
  let DottData = await getGBFSData('https://gbfs.api.ridedott.com/public/v2/brussels/free_bike_status.json');
  let final = convert(DottData);
  

  return reply.send(JSON.parse(final));
});


fastify.get("/lime", async function (request, reply) {
  let LimeData = await getGBFSData('https://data.lime.bike/api/partners/v2/gbfs/brussels/free_bike_status');
  let final = convert(LimeData);
  

  return reply.send(JSON.parse(final));
});


fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Fastify is listening on ${address}`);
  }
);