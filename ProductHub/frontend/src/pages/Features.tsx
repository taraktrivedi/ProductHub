import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Badge,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ThumbUp as ThumbUpIcon,
  Add as AddIcon,
  Edit as EditIcon,
  MoreVert as MoreIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Mock features data
const featuresData = [
  {
    id: 1,
    title: 'Mobile App Interface Redesign',
    description: 'Complete redesign of the mobile interface to improve user experience and make feature requests more accessible on mobile devices.',
    category: 'UI/UX',
    status: 'in-progress',
    priority: 'high',
    votes: 287,
    impactScore: 95,
    effortScore: 75,
    reachScore: 90,
    confidenceScore: 85,
    revenueImpact: 120000,
    complexity: 'medium',
    estimatedEffort: 40,
    dependencies: ['API v2', 'User Authentication'],
    assignedTo: 'Sarah Johnson',
    assigneeAvatar: 'SJ',
    createdBy: 'John Doe',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    tags: ['mobile', 'ui', 'ux', 'redesign']
  },
  {
    id: 2,
    title: 'Salesforce CRM Integration',
    description: 'Seamless integration with Salesforce CRM to sync customer data and improve workflow efficiency.',
    category: 'Integration',
    status: 'backlog',
    priority: 'high',
    votes: 243,
    impactScore: 88,
    effortScore: 60,
    reachScore: 85,
    confidenceScore: 90,
    revenueImpact: 85000,
    complexity: 'high',
    estimatedEffort: 60,
    dependencies: ['OAuth 2.0', 'API Documentation'],
    assignedTo: 'Mike Chen',
    assigneeAvatar: 'MC',
    createdBy: 'Jane Smith',
    createdAt: '2024-01-08T15:20:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    tags: ['integration', 'crm', 'salesforce', 'api']
  },
  {
    id: 3,
    title: 'Advanced Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with detailed insights on feature usage, voting patterns, and customer engagement metrics.',
    category: 'Analytics',
    status: 'completed',
    priority: 'medium',
    votes: 198,
    impactScore: 76,
    effortScore: 55,
    reachScore: 80,
    confidenceScore: 95,
    revenueImpact: 45000,
    complexity: 'medium',
    estimatedEffort: 35,
    dependencies: ['Data Pipeline', 'Chart Library'],
    assignedTo: 'Alex Rodriguez',
    assigneeAvatar: 'AR',
    createdBy: 'John Doe',
    createdAt: '2024-01-05T09:30:00Z',
    updatedAt: '2024-01-14T16:20:00Z',
    tags: ['analytics', 'dashboard', 'reporting', 'insights']
  },
  {
    id: 4,
    title: 'Team Collaboration Tools',
    description: 'Enhanced collaboration features including feature assignment, team notifications, and shared workspaces.',
    category: 'Collaboration',
    status: 'review',
    priority: 'medium',
    votes: 156,
    impactScore: 82,
    effortScore: 45,
    reachScore: 75,
    confidenceScore: 80,
    revenueImpact: 65000,
    complexity: 'low',
    estimatedEffort: 25,
    dependencies: ['User Management', 'Notification System'],
    assignedTo: 'Emma Wilson',
    assigneeAvatar: 'EW',
    createdBy: 'Jane Smith',
    createdAt: '2024-01-12T14:15:00Z',
    updatedAt: '2024-01-17T10:30:00Z',
    tags: ['collaboration', 'team', 'notifications', 'workspace']
  },
  {
    id: 5,
    title: 'Dark Mode Support',
    description: 'Implement dark mode theme for better accessibility and user experience in low-light environments.',
    category: 'UI/UX',
    status: 'completed',
    priority: 'low',
    votes: 189,
    impactScore: 45,
    effortScore: 25,
    reachScore: 95,
    confidenceScore: 100,
    revenueImpact: 15000,
    complexity: 'low',
    estimatedEffort: 15,
    dependencies: ['Theme System'],
    assignedTo: 'David Kim',
    assigneeAvatar: 'DK',
    createdBy: 'John Doe',
    createdAt: '2024-01-03T11:00:00Z',
    updatedAt: '2024-01-11T15:45:00Z',
    tags: ['ui', 'theme', 'accessibility', 'dark-mode']
  }
];

const categories = ['All', 'UI/UX', 'Integration', 'Analytics', 'Collaboration', 'Performance'];
const statuses = ['All', 'backlog', 'in-progress', 'review', 'completed', 'deferred'];
const priorities = ['All', 'low', 'medium', 'high', 'critical'];
const assignees = ['All', 'Sarah Johnson', 'Mike Chen', 'Alex Rodriguez', 'Emma Wilson', 'David Kim'];

const Features: React.FC = () => {
  const navigate = useNavigate();
  const [filteredFeatures, setFilteredFeatures] = useState(featuresData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedAssignee, setSelectedAssignee] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let filtered = featuresData.filter(feature => {
      const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feature.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || feature.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || feature.priority === selectedPriority;
      const matchesAssignee = selectedAssignee === 'All' || feature.assignedTo === selectedAssignee;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesAssignee;
    });

    setFilteredFeatures(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, selectedPriority, selectedAssignee]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return 'default';
      case 'in-progress': return 'primary';
      case 'review': return 'warning';
      case 'completed': return 'success';
      case 'deferred': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'default';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const calculateRICEScore = (feature: any) => {
    const reach = feature.reachScore || 0;
    const impact = feature.impactScore || 0;
    const confidence = feature.confidenceScore || 0;
    const effort = feature.effortScore || 1;
    return Math.round((reach * impact * confidence) / (effort * 100));
  };

  const FeatureCard: React.FC<{ feature: any }> = ({ feature }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
      onClick={() => handleFeatureClick(feature)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" sx={{ flex: 1 }}>
            {feature.title}
          </Typography>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
          {feature.description.substring(0, 120)}...
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={feature.category}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={feature.status}
            size="small"
            color={getStatusColor(feature.status)}
          />
          <Chip
            label={feature.priority}
            size="small"
            color={getPriorityColor(feature.priority)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="body2">{feature.votes}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
            <Typography variant="body2">{calculateRICEScore(feature)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">{feature.assignedTo}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Impact Score
          </Typography>
          <LinearProgress
            variant="determinate"
            value={feature.impactScore}
            sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
            color={feature.impactScore > 70 ? 'success' : feature.impactScore > 40 ? 'warning' : 'default'}
          />
          <Typography variant="caption" color="text.secondary">
            {feature.impactScore}/100
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {feature.tags.slice(0, 3).map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: 10 }}
            />
          ))}
          {feature.tags.length > 3 && (
            <Chip
              label={`+${feature.tags.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: 10 }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <div>
            <Typography variant="h1" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage product features with voting, prioritization, and roadmap planning
            </Typography>
          </div>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/prioritization')}
            >
              Add Feature
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    label="Status"
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={selectedPriority}
                    label="Priority"
                    onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    value={selectedAssignee}
                    label="Assignee"
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                  >
                    {assignees.map((assignee) => (
                      <MenuItem key={assignee} value={assignee}>
                        {assignee}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                    setSelectedPriority('All');
                    setSelectedAssignee('All');
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Features View */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {filteredFeatures
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((feature) => (
              <Grid item xs={12} sm={6} lg={4} key={feature.id}>
                <FeatureCard feature={feature} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Votes</TableCell>
                  <TableCell>RICE Score</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Effort</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFeatures
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((feature) => (
                    <TableRow
                      key={feature.id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {feature.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {feature.description.substring(0, 80)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={feature.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={feature.status}
                          size="small"
                          color={getStatusColor(feature.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={feature.priority}
                          size="small"
                          color={getPriorityColor(feature.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ThumbUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                          <Typography variant="body2">{feature.votes}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {calculateRICEScore(feature)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={feature.impactScore}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption">{feature.impactScore}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={feature.effortScore}
                            sx={{ width: 60, height: 6, borderRadius: 3, color: 'warning.main' }}
                          />
                          <Typography variant="caption">{feature.effortScore}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                            {feature.assigneeAvatar}
                          </Avatar>
                          <Typography variant="body2">{feature.assignedTo}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={(e) => e.stopPropagation()}>
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFeatures.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Floating Action Button for Quick Add */}
      <Tooltip title="Add New Feature">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => navigate('/prioritization')}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Feature Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">Feature Details</Typography>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedFeature && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  {selectedFeature.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedFeature.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Prioritization Metrics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Impact Score</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedFeature.impactScore}
                      sx={{ mt: 0.5, mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2">{selectedFeature.impactScore}/100</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Effort Score</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedFeature.effortScore}
                      color="warning"
                      sx={{ mt: 0.5, mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2">{selectedFeature.effortScore}/100</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Reach Score</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedFeature.reachScore}
                      color="info"
                      sx={{ mt: 0.5, mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2">{selectedFeature.reachScore}/100</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Confidence Score</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedFeature.confidenceScore}
                      color="success"
                      sx={{ mt: 0.5, mb: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2">{selectedFeature.confidenceScore}/100</Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  RICE Score
                </Typography>
                <Typography variant="h3" color="primary">
                  {calculateRICEScore(selectedFeature)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Details</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Status</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={selectedFeature.status}
                          color={getStatusColor(selectedFeature.status)}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Priority</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={selectedFeature.priority}
                          color={getPriorityColor(selectedFeature.priority)}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Category</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={selectedFeature.category}
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Assigned To</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                          {selectedFeature.assigneeAvatar}
                        </Avatar>
                        <Typography variant="body2">{selectedFeature.assignedTo}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Votes</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{selectedFeature.votes} upvotes</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">Revenue Impact</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        ${selectedFeature.revenueImpact.toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button variant="outlined">Edit</Button>
          <Button variant="contained">Add to Roadmap</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Features;