import React from 'react';

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

export default BrandSelector;