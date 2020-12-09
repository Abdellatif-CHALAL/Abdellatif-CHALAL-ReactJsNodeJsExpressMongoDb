import React, { useState } from "react";
import ProductDataService from "../services/ProductService";
import TextField from '@material-ui/core/TextField';


const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: "",
    type: "",
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: false,
  };
  const [Product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...Product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: Product.name,
      type: Product.type,
      price: Product.price,
      rating: Product.rating,
      warranty_years: Product.warranty_years,
      available: Product.available,
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data._id,
          name: response.data.name,
          type: response.data.type,
          price: response.data.price,
          rating: response.data.rating,
          warranty_years: response.data.warranty_years,
          available: response.data.available,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
          
        <div>
            <h3>Add New Product</h3>
         <br/>
         <TextField
          fullWidth
          id="name" 
          name="name" 
          value={Product.name} 
          onChange={handleInputChange}
          label="Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
        <TextField
          fullWidth
          id="type" 
          name="type" 
          value={Product.type} 
          onChange={handleInputChange}
          label="Type"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
         <TextField
         fullWidth
          id="price" 
          name="price"
          value={Product.price} 
          onChange={handleInputChange}
          label="Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <br/>
        <br/>
         <TextField
         fullWidth
          id="rating" 
          name="rating"
          value={Product.rating}
          onChange={handleInputChange}
          label="Rating"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <br/>
        <br/>
         <TextField
         fullWidth
          id="warranty_years" 
          name="warranty_years"
          value={Product.warranty_years} 
          onChange={handleInputChange}
          label="Warranty Years"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <br/>
        <br/>
         <TextField
         fullWidth
          id="available" 
          name="available"
          value={Product.available} 
          onChange={handleInputChange}
          label="Available"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;