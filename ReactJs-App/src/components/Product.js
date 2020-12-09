import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const Product = props => {
  const initialProductState = {
    id: null,
    name: "",
    type: "",
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: false,
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateAvailable = status => {
    var data = {
      id: currentProduct._id,
      name: currentProduct.name,
      type: currentProduct.type,
      price: currentProduct.price,
      rating: currentProduct.rating,
      warranty_years: currentProduct.warranty_years,
      available: currentProduct.available,
    };

    ProductDataService.update(currentProduct._id, data)
      .then(response => {
        setCurrentProduct({ ...currentProduct, Unavailable: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct._id, currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("The Product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Products");
      })
      .catch(e => {
        console.log(e);
      });
  };
 
  const classes = useStyles();
  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="name" 
          name="name" 
          value={currentProduct.name} 
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
          value={currentProduct.type} 
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
          value={currentProduct.price} 
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
          value={currentProduct.rating} 
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
          value={currentProduct.warranty_years} 
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
          value={currentProduct.available} 
          onChange={handleInputChange}
          label="Available"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </form>
          <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={deleteProduct}>
            Delete  
          </Button>
          <Button className={classes.button} variant="contained" size="small" color="primary" onClick={updateProduct}>
            update
          </Button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;