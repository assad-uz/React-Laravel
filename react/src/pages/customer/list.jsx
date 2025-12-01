import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import api from "../../axios";

function List() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await api.get("/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]);
    }
  }, [setCustomers]);

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/api/customers/${id}`);
      alert(`Customer ID ${id} deleted successfully!`);
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="container mt-4">
      <h3>Customer Details</h3>
      <NavLink to="/insert" className="btn btn-success mb-3">
        Add New Customer
      </NavLink>

      {Array.isArray(customers) && customers.length === 0 && (
        <p>No customers found. Please add a new customer.</p>
      )}

      {Array.isArray(customers) && customers.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, i) => {
              return (
                <tr key={customer.id}>
                  <td>{i + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <NavLink
                      to={`/edit/${customer.id}`}
                      className="btn btn-info btn-sm mx-2"
                    >
                      Edit
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
