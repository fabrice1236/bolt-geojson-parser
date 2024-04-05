
const axios = require('axios');
let BoltData;
const BoltURL = 'https://mds.bolt.eu/gbfs/2/336/free_bike_status'; //MODIFY ME TO WHATEVER BOLT CITY ENDPOINT YOU'D LIKE


const fastify = require("fastify")({
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

async function getBoltData() {
  try {
    const response = await axios.get(BoltURL);
    BoltData = response.data.data.bikes;
  } catch (error) {
    console.error(error);
  }
}

let onIt = false

fastify.get("/", async function (request, reply) {
  let FeatureDic = [];
  await getBoltData();
  for (let i = 0; i < BoltData.length; i++) {
    if (BoltData[i].is_reserved == false && BoltData[i].is_disabled == false) {
      let data = `{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          ${BoltData[i].lon},
          ${BoltData[i].lat}
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
  console.log(FeatureDic.length);
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