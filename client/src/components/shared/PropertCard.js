import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from "../../services/API";

const PropertyCard = ({ property, onDelete, onUpdate, title, btn, up }) => {
  const [sellerDetails, setSellerDetails] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    price: property.price,
    location: property.location,
    area: property.area,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    propertyType: property.propertyType,
    nearbyFacilities: property.nearbyFacilities.join(', '),
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleInterest = async () => {
    try {
      const response = await API.get(`/properties/${property._id}`);
      setSellerDetails(response.data.seller);
    } catch (error) {
      console.error('Error fetching seller details:', error);
      toast.error('Error fetching seller details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      setIsFormChanged(
        newData.price !== property.price ||
        newData.location !== property.location ||
        newData.area !== property.area ||
        newData.bedrooms !== property.bedrooms ||
        newData.bathrooms !== property.bathrooms ||
        newData.propertyType !== property.propertyType ||
        newData.nearbyFacilities !== property.nearbyFacilities.join(', ')
      );
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(updateFormData);
      toast.success('Property updated successfully');
      setIsFormChanged(false);
      setIsFormVisible(false); // Hide form after successful update
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Error updating property');
    }
  };

  const handleUpdateClick = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="property-card">
      <h3>{property.location}</h3>
      <p>Price: ${property.price}</p>
      <p>Area: {property.area} sq ft</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Type: {property.propertyType}</p>
      <p>Facilities: {property.nearbyFacilities.join(', ')}</p>
      <button onClick={handleInterest}>{btn}</button>
      {sellerDetails && (
        <div className="seller-details">
          <p>Seller Name: {sellerDetails.name}</p>
          <p>Seller Email: {sellerDetails.email}</p>
        </div>
      )}
      {!isFormVisible && <button onClick={handleUpdateClick}>{up}</button>}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label>Price:</label>
          <input type="number" name="price" value={updateFormData.price} onChange={handleChange} />
          <label>Location:</label>
          <input type="text" name="location" value={updateFormData.location} onChange={handleChange} />
          <label>Area (sq ft):</label>
          <input type="number" name="area" value={updateFormData.area} onChange={handleChange} />
          <label>Number of Bedrooms:</label>
          <input type="number" name="bedrooms" value={updateFormData.bedrooms} onChange={handleChange} />
          <label>Number of Bathrooms:</label>
          <input type="number" name="bathrooms" value={updateFormData.bathrooms} onChange={handleChange} />
          <label>Property Type:</label>
          <input type="text" name="propertyType" value={updateFormData.propertyType} onChange={handleChange} />
          <label>Nearby Facilities (comma separated):</label>
          <input type="text" name="nearbyFacilities" value={updateFormData.nearbyFacilities} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={onDelete}>{title}</button>
    </div>
  );
};

export default PropertyCard;
