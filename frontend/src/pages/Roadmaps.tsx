import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Roadmaps: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Roadmaps
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Visual roadmaps for strategic planning and stakeholder communication
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Roadmap Builder
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Interactive roadmap builder with drag-and-drop functionality coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Roadmaps;