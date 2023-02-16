const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "accessToken": process.env.ACCESS_TOKEN });

const limit = 100;
const after = undefined;
const properties = ["expose_custom_url_slug"];
const propertiesWithHistory = undefined;
const associations = undefined;
const archived = false;


async function getDeals() {
  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
    return new Promise(resolve => {
      resolve(apiResponse.results, null, 2);
    });
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}


module.exports = getDeals;



