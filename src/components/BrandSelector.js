import React from 'react';
import PropTypes from 'prop-types';

const BrandSelector = ({ selectedBrands, setSelectedBrands }) => {
  const allBrands = ['nike', 'adidas', 'apple', 'samsung', 'google', 'microsoft'];
  
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="brand-selector">
      <label>Select Brands to Monitor:</label>
      <div className="brand-checkboxes">
        {allBrands.map(brand => (
          <div key={brand} className="brand-checkbox">
            <input
              type="checkbox"
              id={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

BrandSelector.propTypes = {
  selectedBrands: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedBrands: PropTypes.func.isRequired
};

export default BrandSelector;
