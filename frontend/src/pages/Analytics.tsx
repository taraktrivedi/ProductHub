import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Analytics: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Comprehensive analytics and reporting for data-driven decision making
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Advanced analytics dashboard with custom reports coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;