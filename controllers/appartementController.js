// const fetch = require('isomorphic-fetch');

// data
const appartments = require('../data/appartments.json')

exports.getAppartements = async (req, res) => {
    res.json(appartments)
}