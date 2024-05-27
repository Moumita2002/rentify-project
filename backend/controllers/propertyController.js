const Property = require('../models/Property');
const user=require("../models/userModel");

const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getPropertyWithSeller = async (req, res) => {
  try {
    const property = await Property.findById(req.params._id).populate('user', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Seller Properties
const getSellerProperties = async (req, res) => {
  try {
    const filters = {};
    if (req.query.price) {
      filters.price = { $lte: req.query.price };
    }
    if (req.query.location) {
      filters.location = new RegExp(req.query.location, 'i');
    }
    if (req.query.bedrooms) {
      filters.bedrooms =req.query.bedrooms;
    }
    

    const properties = await Property.find(filters);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Delete Property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id});
    if (!property) {
      return res.status(404).json({ message: 'Property not found or you do not have permission to delete this property' });
    }
    res.status(200).json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found or you do not have permission to update this property' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



module.exports = { createProperty, getSellerProperties, deleteProperty, getPropertyWithSeller, updateProperty};
