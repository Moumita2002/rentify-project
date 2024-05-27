const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  propertyType: { type: String, required: true },
  nearbyFacilities: { type: [String], default: [] },
});

module.exports = mongoose.model('Property', propertySchema);
