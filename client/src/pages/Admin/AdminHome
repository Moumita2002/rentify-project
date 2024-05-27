
import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import PropertyCard from "../../components/shared/PropertCard";


const AdminHome = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ price: '', location: '', bedrooms: '' });
  const navigate = useNavigate();

  const fetchSellerProperties = async () => {
    try {
      const response = await API.get('/properties/list', { params: filters });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties');
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "seller") {
      navigate("/admin");
    } else {
      fetchSellerProperties(); // Fetch properties when user is logged in and is a buyer
    }
  }, [user, navigate, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>Welcome <i className="text-success">{user?.name}</i></h1>
          <h3>Struggling to find a house in an affordable range? Don't worry you will find it here!</h3>
          <hr />
          <div className="filters">
            <input type="number" name="price" placeholder="Max Price" value={filters.price} onChange={handleFilterChange} />
            <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
            <input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} />
          </div>
          <div className="property-list">
            {properties.map(property => (
              <PropertyCard
                key={property._id}
                property={property}
                btn="I'm interested"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
