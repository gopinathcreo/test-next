import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function ProductRating() {
  const [value, setValue] = React.useState<number | null>(5);

  return (

      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
  );
}