import React from 'react';
import PropTypes from 'prop-types';

export default function AddProduct(props) {
  return (
    <div>
      <h1>
        Add Product
      </h1>
      <div>
        Name: <input value={props.name} onChange={props.onNameValueChanged} />
      </div>
      <div>
        Color: <input value={props.color} onChange={props.onColorValueChanged} />
      </div>
      <div>
        Size: <input value={props.size} onChange={props.onSizeValueChanged} />
      </div>
      <div>
        Description: <input value={props.description} onChange={props.onDescriptionValueChanged} />
      </div>
      <div>
        Price: <input value={props.price} onChange={props.onPriceValueChanged} />
      </div>
      <div>
        <button onClick={props.onSaveClicked}>Save</button>
        <button onClick={props.onBackClicked}>Back</button>
      </div>
    </div>
  );
}

AddProduct.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  onNameValueChanged: PropTypes.func.isRequired,
  onColorValueChanged: PropTypes.func.isRequired,
  onSizeValueChanged: PropTypes.func.isRequired,
  onDescriptionValueChanged: PropTypes.func.isRequired,
  onPriceValueChanged: PropTypes.func.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired
};
