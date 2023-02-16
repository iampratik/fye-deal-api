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
        let apiResponse = await hubspotClient.crm.deals.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
        let nextPagination = apiResponse['paging']['next']['after'];

        let customResponse = [];
        customResponse = apiResponse.results;

        do {
            let _after = apiResponse.paging.after;
            apiResponse = await hubspotClient.crm.deals.basicApi.getPage(limit, nextPagination, properties, propertiesWithHistory, associations, archived);
            apiResponse.results.map((val) => {
                customResponse.push(val)
            })
            if (apiResponse['paging'] !== undefined) {
                nextPagination = apiResponse['paging']['next']['after'];;
            } else {
                nextPagination = false;
            }
            console.log(nextPagination);
        }
        while (nextPagination);

        return new Promise(resolve => {
            resolve(customResponse, null, 2);
        });
    } catch (e) {
        e.message === 'HTTP request failed' ?
            console.error(JSON.stringify(e.response, null, 2)) :
            console.error(e)
    }
}


module.exports = getDeals;