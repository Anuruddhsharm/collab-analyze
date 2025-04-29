import React from 'react';
import { Chip, Stack } from '@mui/material';

const BRANDS = [
  { name: "nike", color: "#111" },
  { name: "adidas", color: "#000" },
  { name: "apple", color: "#A3AAAE" },
  { name: "samsung", color: "#1428A0" },
  { name: "google", color: "#4285F4" },
  { name: "microsoft", color: "#7FBA00" }
];

const BrandSelector = ({ selectedBrands, setSelectedBrands }) => {
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Select Brands to Monitor</h3>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {BRANDS.map(brand => (
          <Chip
            key={brand.name}
            label={brand.name}
            onClick={() => toggleBrand(brand.name)}
            variant={selectedBrands.includes(brand.name) ? "filled" : "outlined"}
            style={{
              backgroundColor: selectedBrands.includes(brand.name) ? brand.color : 'transparent',
              color: selectedBrands.includes(brand.name) ? 'white' : brand.color,
              borderColor: brand.color,
              marginBottom: '0.5rem'
            }}
          />
        ))}
      </Stack>
    </div>
  );
};

export default BrandSelector;
