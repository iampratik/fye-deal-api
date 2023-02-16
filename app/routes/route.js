var express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "accessToken": 'pat-eu1-b87bbedc-e1bb-45d7-b114-504a1733caf8' });


const getDeals = require('../deal/get-deal');
const updateDeal = require('../deal/update-deal');



router.get('/get-deal', async function (req, res, next) {
    res.status(200).json({
        message: "post request!",
        res: await getDeals().then(data => data)
    });
});

router.get('/update-deal', async function (req, res, next) {
    const d = await updateDeal();
    res.status(200).json({
        message: "post request!",
        res: d
    });
});


module.exports = router;