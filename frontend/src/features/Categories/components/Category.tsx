import { Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
}

const Category: React.FC<Props> = ({title}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      px={1}
      py={0.4}
      sx={{
        bgcolor: 'coral',
        borderRadius: 4,
        color: 'white',
        display: 'inline-flex',
      }}
    >
      <Typography variant="body2" fontSize="small">
        {title}
      </Typography>
    </Stack>
  );
};

export default Category;