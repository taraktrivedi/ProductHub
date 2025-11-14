import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Integrations: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Integrations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Connect with your favorite tools and import data seamlessly
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Integration Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Integration dashboard for Jira, Salesforce, Slack, and more coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Integrations;