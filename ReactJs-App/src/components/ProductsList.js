import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ProductsList = () => {
  const [Products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const setActiveProduct = (Product, index) => {
    setCurrentProduct(Product);
    setCurrentIndex(index);
  };

  const classes = useStyles();

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Products List</h4>

        <ul className="list-group">
          {Products &&
            Products.map((Product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(Product, index)}
                key={index}
              >
                {Product.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Product</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentProduct.type}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentProduct.price}
               €
            </div>
            <div>
              <label>
                <strong>Rating:</strong>
              </label>{" "}
              {currentProduct.rating}
            </div>
            <div>
              <label>
                <strong>Warranty Years:</strong>
              </label>{" "}
              {currentProduct.warranty_years}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentProduct.available ? "Available" : "Unavailable"}
            </div>
            <Link
              to={"/Products/" + currentProduct._id}
              className="badge badge-warning"
            >
            <Button size="small" className={classes.margin}>
             Edit
            </Button>
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
