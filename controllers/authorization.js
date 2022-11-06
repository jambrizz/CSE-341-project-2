//This file is the authorization controller

//This variable is to require the config file
const { method } = require('lodash');
const config = require('../config/db.config');

const axios = require('axios');

const authorizationController ={
    login: (req, res) => {
        const authorizationUrl = `${config.authorizationHost}/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${encodeURIComponent (config.redirectUri)}&state=1234&scope=openid profile email`;

        res.redirect(authorizationUrl);
    },
     callback: async(req, res, next) => {
        try {
            const response = await fetch(
                `${config.authorizationHost}/oauth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: config.clientID,
                    client_secret: config.clientSecret,
                    redirectUri: config.redirectUri,
                    scope: 'openid profile email',
                    code: req.query.code,
                }),
            });
            const jsonResponse = await response.json();
            res.json(jsonResponse);
        } catch(error){
            next(error);
        }
    }
};

module.exports = authorizationController;