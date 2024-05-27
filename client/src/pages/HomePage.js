import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import AllProperties from "./SellerProperty";
import PropertyCard from "../components/shared/PropertCard";


const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    nearbyFacilities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/properties/create', formData);
      console.log('Property posted successfully:', response.data);
      toast.success('Property posted successfully');
      fetchSellerProperties(); 
    } catch (error) {
      console.error('Error posting property:', error);
      toast.error('Error posting property');
    }
  };

  const fetchSellerProperties = async () => {
    try {
      const response = await API.get('/properties/list');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties');
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "buyer") {
      navigate("/admin");
    } else {
      fetchSellerProperties(); 
    }
  }, [user, navigate]);

  const deleteProperty = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id)); // Remove the deleted property from the state
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property");
    }
  };

  const updateProperty = async (id, updatedData) => {
    try {
      await API.put(`/properties/update/${id}`, updatedData);
      toast.success("Property updated successfully");
      fetchSellerProperties(); 
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Error updating property");
    }
  };

 

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container home">
            <h1>Welcome to Rentify</h1>
            <form onSubmit={handleSubmit}>
              <label className="hometext">Price:</label>
              <input className="homedata" type="number" name="price" value={formData.price} onChange={handleChange} required />

              <label className="hometext">Location:</label>
              <input className="homedata" type="text" name="location" value={formData.location} onChange={handleChange} required />

              <label className="hometext">Area (sq ft):</label>
              <input className="homedata" type="number" name="area" value={formData.area} onChange={handleChange} required />

              <label className="hometext">Number of Bedrooms:</label>
              <input className="homedata" type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

              <label className="hometext">Number of Bathrooms:</label>
              <input className="homedata" type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />

              <label className="hometext">Property Type:</label>
              <input className="homedata" type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} required />

              <label className="hometext">Nearby Facilities (comma separated):</label>
              <input className="homedata" type="text" name="nearbyFacilities" value={formData.nearbyFacilities} onChange={handleChange} />

              <button className="homedata subdata" type="submit">Submit</button>
            </form>

            <div className="property-list">
              {properties.map(property => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  title="Delete"
                  up="Update"
                  onDelete={() => deleteProperty(property._id)}
                  onUpdate={(updatedData) => updateProperty(property._id, updatedData)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;