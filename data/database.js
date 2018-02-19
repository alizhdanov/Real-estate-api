const apartments = require('./appartments')

exports.getAparments = () => {
    return apartments
};

exports.getAparmentsLength = () => apartments.length

exports.getApartment = (id) => {
    return apartments.find(apartment => apartment.id === id)
};