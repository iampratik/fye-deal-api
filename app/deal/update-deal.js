const getDeal = require('./get-deal');

const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "accessToken": process.env.ACCESS_TOKEN });

function generate_string(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function updateDeal() {
    const a = await getDeal();
    console.log(a);

    let prepareBath = [];
    a.forEach(element => {
        if (!element.properties.expose_custom_url_slug) {
            let obj = { "properties": { "expose_custom_url_slug": generate_string(20) }, "id": element.id };
            prepareBath.push(obj)
        }
    });
    const BatchInputSimplePublicObjectBatchInput = { inputs: prepareBath };
    try {
        const apiResponse = await hubspotClient.crm.deals.batchApi.update(BatchInputSimplePublicObjectBatchInput);
        return new Promise(resolve => {
            resolve(apiResponse.results, null, 2);
        });
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
    }
}

module.exports = updateDeal;