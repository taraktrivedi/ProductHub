import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';

// Mock features data for prioritization
const featuresData = [
  {
    id: 1,
    title: 'Mobile App Interface',
    description: 'Redesign mobile interface',
    category: 'UI/UX',
    impact: 95,
    effort: 75,
    reach: 90,
    confidence: 85,
    votes: 287,
    assignedTo: 'Sarah Johnson',
    assigneeAvatar: 'SJ',
    color: '#9333EA',
    rice: Math.round((95 * 90 * 85) / (75 * 100))
  },
  {
    id: 2,
    title: 'Salesforce Integration',
    description: 'CRM integration',
    category: 'Integration',
    impact: 88,
    effort: 60,
    reach: 85,
    confidence: 90,
    votes: 243,
    assignedTo: 'Mike Chen',
    assigneeAvatar: 'MC',
    color: '#A855F7',
    rice: Math.round((88 * 85 * 90) / (60 * 100))
  },
  {
    id: 3,
    title: 'Advanced Analytics',
    description: 'Analytics dashboard',
    category: 'Analytics',
    impact: 76,
    effort: 55,
    reach: 80,
    confidence: 95,
    votes: 198,
    assignedTo: 'Alex Rodriguez',
    assigneeAvatar: 'AR',
    color: '#6366F1',
    rice: Math.round((76 * 80 * 95) / (55 * 100))
  },
  {
    id: 4,
    title: 'Team Collaboration',
    description: 'Collaboration tools',
    category: 'Collaboration',
    impact: 82,
    effort: 45,
    reach: 75,
    confidence: 80,
    votes: 156,
    assignedTo: 'Emma Wilson',
    assigneeAvatar: 'EW',
    color: '#8B5CF6',
    rice: Math.round((82 * 75 * 80) / (45 * 100))
  },
  {
    id: 5,
    title: 'Dark Mode',
    description: 'Dark theme support',
    category: 'UI/UX',
    impact: 45,
    effort: 25,
    reach: 95,
    confidence: 100,
    votes: 189,
    assignedTo: 'David Kim',
    assigneeAvatar: 'DK',
    color: '#C084FC',
    rice: Math.round((45 * 95 * 100) / (25 * 100))
  },
  {
    id: 6,
    title: 'API Documentation',
    description: 'Complete API docs',
    category: 'Documentation',
    impact: 35,
    effort: 30,
    reach: 70,
    confidence: 90,
    votes: 67,
    assignedTo: 'Lisa Wang',
    assigneeAvatar: 'LW',
    color: '#DDD6FE',
    rice: Math.round((35 * 70 * 90) / (30 * 100))
  }
];

const DraggableFeatureCard: React.FC<{ feature: any; onUpdate: (id: number, updates: any) => void }> = ({ feature, onUpdate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'feature',
    item: { id: feature.id, feature },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getQuadrant = (impact: number, effort: number) => {
    const impactMid = 50;
    const effortMid = 50;
    if (impact >= impactMid && effort <= effortMid) return 'quick-wins';
    if (impact >= impactMid && effort > effortMid) return 'major-projects';
    if (impact < impactMid && effort <= effortMid) return 'fill-ins';
    return 'time-wasters';
  };

  return (
    <motion.div
      ref={drag}
      initial={{ scale: 1 }}
      animate={{ scale: isDragging ? 1.05 : 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        sx={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab',
          minWidth: 200,
          maxWidth: 300,
          height: 140,
          border: `2px solid ${feature.color}`,
          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
          position: 'relative'
        }}
      >
        <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="body2" fontWeight={600} sx={{ flex: 1, lineHeight: 1.2 }}>
              {feature.title}
            </Typography>
            <DragIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, lineHeight: 1.3 }}>
            {feature.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 20, height: 20, fontSize: 10, bgcolor: feature.color }}>
                {feature.assigneeAvatar}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {feature.assignedTo.split(' ')[0]}
              </Typography>
            </Box>
            <Chip
              label={feature.rice}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                fontWeight: 600,
                minWidth: 40
              }}
            />
          </Box>

          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Chip
              label={feature.votes}
              size="small"
              icon={<TrendingUpIcon />}
              sx={{
                bgcolor: 'success.main',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Quadrant: React.FC<{ 
  title: string; 
  description: string; 
  features: any[]; 
  onUpdate: (id: number, updates: any) => void;
  quadrant: string;
}> = ({ title, description, features, onUpdate, quadrant }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'feature',
    drop: (item: any) => {
      if (quadrant === 'quick-wins') {
        onUpdate(item.id, { impact: 80, effort: 30 });
      } else if (quadrant === 'major-projects') {
        onUpdate(item.id, { impact: 80, effort: 70 });
      } else if (quadrant === 'fill-ins') {
        onUpdate(item.id, { impact: 30, effort: 30 });
      } else {
        onUpdate(item.id, { impact: 30, effort: 70 });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getQuadrantColor = (quad: string) => {
    switch (quad) {
      case 'quick-wins': return '#22C55E';
      case 'major-projects': return '#F59E0B';
      case 'fill-ins': return '#3B82F6';
      case 'time-wasters': return '#EF4444';
      default: return '#6366F1';
    }
  };

  return (
    <Paper
      ref={drop}
      sx={{
        minHeight: 400,
        p: 2,
        backgroundColor: isOver ? `${getQuadrantColor(quadrant)}10` : 'background.paper',
        border: `2px dashed ${isOver ? getQuadrantColor(quadrant) : 'border.default'}`,
        borderRadius: 2,
        transition: 'all 0.3s ease'
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: getQuadrantColor(quadrant), fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        {features.map((feature) => (
          <DraggableFeatureCard
            key={feature.id}
            feature={feature}
            onUpdate={onUpdate}
          />
        ))}
        {features.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Drop features here
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

const Prioritization: React.FC = () => {
  const [features, setFeatures] = useState(featuresData);
  const [selectedFramework, setSelectedFramework] = useState('impact-effort');
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    category: '',
    impact: 50,
    effort: 50,
    reach: 50,
    confidence: 50
  });

  const updateFeature = (id: number, updates: any) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id ? { 
        ...feature, 
        ...updates,
        rice: Math.round((updates.impact * (updates.reach || feature.reach) * (updates.confidence || feature.confidence)) / ((updates.effort || feature.effort) * 100))
      } : feature
    ));
  };

  const addNewFeature = () => {
    const id = Math.max(...features.map(f => f.id)) + 1;
    const feature = {
      ...newFeature,
      id,
      votes: 0,
      assignedTo: 'Unassigned',
      assigneeAvatar: 'UA',
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      rice: Math.round((newFeature.impact * newFeature.reach * newFeature.confidence) / (newFeature.effort * 100))
    };
    setFeatures(prev => [...prev, feature]);
    setNewFeature({
      title: '',
      description: '',
      category: '',
      impact: 50,
      effort: 50,
      reach: 50,
      confidence: 50
    });
    setAddFeatureOpen(false);
  };

  const getQuadrantFeatures = (quadrant: string) => {
    return features.filter(feature => {
      const impact = feature.impact;
      const effort = feature.effort;
      const impactMid = 50;
      const effortMid = 50;
      
      switch (quadrant) {
        case 'quick-wins': return impact >= impactMid && effort <= effortMid;
        case 'major-projects': return impact >= impactMid && effort > effortMid;
        case 'fill-ins': return impact < impactMid && effort <= effortMid;
        case 'time-wasters': return impact < impactMid && effort > effortMid;
        default: return false;
      }
    });
  };

  const sortedFeatures = [...features].sort((a, b) => b.rice - a.rice);

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <div>
              <Typography variant="h1" gutterBottom>
                Prioritization
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Use multiple frameworks to prioritize features effectively
              </Typography>
            </div>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={selectedFramework === 'impact-effort' ? 'contained' : 'outlined'}
                onClick={() => setSelectedFramework('impact-effort')}
              >
                Impact/Effort Matrix
              </Button>
              <Button
                variant={selectedFramework === 'rice' ? 'contained' : 'outlined'}
                onClick={() => setSelectedFramework('rice')}
              >
                RICE Score
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddFeatureOpen(true)}
              >
                Add Feature
              </Button>
            </Box>
          </Box>
        </Box>

        {selectedFramework === 'impact-effort' ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom sx={{ color: 'success.main', fontWeight: 700 }}>
                    Quick Wins
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    High Impact, Low Effort
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Features with high impact that are easy to implement. These should be prioritized.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={false} md={6} />
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom sx={{ color: 'warning.main', fontWeight: 700 }}>
                    Major Projects
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    High Impact, High Effort
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Important features that require significant resources and planning.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="success.main" fontWeight={600}>
                  High Impact
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Quadrant
                    title=""
                    description=""
                    features={getQuadrantFeatures('quick-wins')}
                    onUpdate={updateFeature}
                    quadrant="quick-wins"
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="warning.main" fontWeight={600}>
                  High Impact
                </Typography>
              </Box>
              <Quadrant
                title=""
                description=""
                features={getQuadrantFeatures('major-projects')}
                onUpdate={updateFeature}
                quadrant="major-projects"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="info.main" fontWeight={600}>
                  Low Impact
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Quadrant
                    title=""
                    description=""
                    features={getQuadrantFeatures('fill-ins')}
                    onUpdate={updateFeature}
                    quadrant="fill-ins"
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="error.main" fontWeight={600}>
                  Low Impact
                </Typography>
              </Box>
              <Quadrant
                title=""
                description=""
                features={getQuadrantFeatures('time-wasters')}
                onUpdate={updateFeature}
                quadrant="time-wasters"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h3" color="text.secondary" fontWeight={600}>
                  Low Effort
                </Typography>
                <Box sx={{ display: 'inline-block', transform: 'rotate(90deg)', ml: 2 }}>
                  <Typography variant="h3" color="text.secondary" fontWeight={600}>
                    High Effort
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    RICE Prioritization
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Features ranked by RICE score (Reach × Impact × Confidence ÷ Effort)
                  </Typography>
                  
                  <List>
                    {sortedFeatures.map((feature, index) => (
                      <ListItem
                        key={feature.id}
                        sx={{
                          border: `1px solid ${feature.color}`,
                          borderRadius: 2,
                          mb: 2,
                          background: `linear-gradient(135deg, ${feature.color}05, transparent)`
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: feature.color, fontWeight: 700 }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="h4">{feature.title}</Typography>
                              <Chip
                                label={`RICE: ${feature.rice}`}
                                color="primary"
                                sx={{ fontWeight: 700 }}
                              />
                              <Chip
                                label={`${feature.votes} votes`}
                                variant="outlined"
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {feature.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Reach</Typography>
                                  <Typography variant="body2">{feature.reach}/100</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Impact</Typography>
                                  <Typography variant="body2">{feature.impact}/100</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Confidence</Typography>
                                  <Typography variant="body2">{feature.confidence}/100</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Effort</Typography>
                                  <Typography variant="body2">{feature.effort}/100</Typography>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: feature.color }}>
                            {feature.assigneeAvatar}
                          </Avatar>
                          <Typography variant="caption">{feature.assignedTo}</Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Framework Info
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    RICE is a prioritization framework that considers:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Reach - How many users/teams
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      How many people or teams will be affected by this feature in a given time period?
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Impact - How much value
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      How much will this feature move the needle on your goals?
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Confidence - How sure are you
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      How confident are you in your estimates of Reach, Impact, and Effort?
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Effort - How much work
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      How much effort will this feature require from your team?
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Add Feature Dialog */}
        <Dialog open={addFeatureOpen} onClose={() => setAddFeatureOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Feature</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Feature Title"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Category"
                  value={newFeature.category}
                  onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Assigned To</InputLabel>
                  <Select
                    value={newFeature.assignedTo || 'Unassigned'}
                    label="Assigned To"
                    onChange={(e) => setNewFeature({ ...newFeature, assignedTo: e.target.value })}
                  >
                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                    <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                    <MenuItem value="Mike Chen">Mike Chen</MenuItem>
                    <MenuItem value="Alex Rodriguez">Alex Rodriguez</MenuItem>
                    <MenuItem value="Emma Wilson">Emma Wilson</MenuItem>
                    <MenuItem value="David Kim">David Kim</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Impact: {newFeature.impact}</Typography>
                <Slider
                  value={newFeature.impact}
                  onChange={(_, value) => setNewFeature({ ...newFeature, impact: value as number })}
                  min={0}
                  max={100}
                  step={5}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Effort: {newFeature.effort}</Typography>
                <Slider
                  value={newFeature.effort}
                  onChange={(_, value) => setNewFeature({ ...newFeature, effort: value as number })}
                  min={0}
                  max={100}
                  step={5}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddFeatureOpen(false)}>Cancel</Button>
            <Button onClick={addNewFeature} variant="contained">
              Add Feature
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </DndProvider>
  );
};

export default Prioritization;