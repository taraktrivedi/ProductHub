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
  Paper,
  Menu,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Sort as SortIcon,
  Download as ExportIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Mock feedback data
const feedbackData = [
  {
    id: 1,
    title: 'Need better mobile interface for feature requests',
    description: 'The current mobile experience makes it difficult to submit new feature requests and vote on existing ones. A native mobile app would greatly improve user engagement.',
    source: 'Customer Survey',
    customer: 'Microsoft Corp',
    category: 'UI/UX',
    status: 'new',
    priority: 'high',
    votes: 287,
    sentiment: 1,
    tags: ['mobile', 'ux', 'engagement'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'API integration with Salesforce is missing',
    description: 'We need to sync customer data between our CRM and your platform. Currently, we have to manually update both systems.',
    source: 'Jira Integration',
    customer: 'Salesforce Inc',
    category: 'Integration',
    status: 'assigned',
    priority: 'high',
    votes: 243,
    sentiment: 0,
    tags: ['api', 'crm', 'integration'],
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-16T09:20:00Z'
  },
  {
    id: 3,
    title: 'Advanced analytics dashboard would be valuable',
    description: 'We would like to see detailed analytics on feature usage, voting patterns, and customer engagement metrics.',
    source: 'Slack',
    customer: 'Google LLC',
    category: 'Analytics',
    status: 'in-progress',
    priority: 'medium',
    votes: 198,
    sentiment: 1,
    tags: ['analytics', 'dashboard', 'reporting'],
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-17T14:15:00Z'
  },
  {
    id: 4,
    title: 'Team collaboration features needed',
    description: 'Need the ability to assign features to team members and set up notifications for status changes.',
    source: 'Email',
    customer: 'Apple Inc',
    category: 'Collaboration',
    status: 'review',
    priority: 'medium',
    votes: 156,
    sentiment: 0,
    tags: ['team', 'collaboration', 'notifications'],
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-16T16:30:00Z'
  },
  {
    id: 5,
    title: 'Dark mode support',
    description: 'A dark mode would be appreciated for better usability in low-light environments.',
    source: 'Feature Request Portal',
    customer: 'Amazon',
    category: 'UI/UX',
    status: 'completed',
    priority: 'low',
    votes: 189,
    sentiment: 1,
    tags: ['ui', 'accessibility', 'theme'],
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const categories = ['All', 'UI/UX', 'Integration', 'Analytics', 'Collaboration', 'Performance'];
const statuses = ['All', 'new', 'assigned', 'in-progress', 'review', 'completed'];
const priorities = ['All', 'low', 'medium', 'high', 'critical'];
const sources = ['All', 'Customer Survey', 'Jira Integration', 'Slack', 'Email', 'Feature Request Portal'];

const Feedback: React.FC = () => {
  const [filteredFeedback, setFilteredFeedback] = useState(feedbackData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    let filtered = feedbackData.filter(feedback => {
      const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feedback.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || feedback.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || feedback.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || feedback.priority === selectedPriority;
      const matchesSource = selectedSource === 'All' || feedback.source === selectedSource;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesSource;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredFeedback(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, selectedPriority, selectedSource, sortBy, sortOrder]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleFeedbackClick = (feedback: any) => {
    setSelectedFeedback(feedback);
    setDetailsOpen(true);
  };

  const handleActionMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'assigned': return 'info';
      case 'in-progress': return 'warning';
      case 'review': return 'primary';
      case 'completed': return 'success';
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

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0) return '😊';
    if (sentiment < 0) return '😟';
    return '😐';
  };

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
              Feedback Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Consolidate and manage customer feedback from all sources
            </Typography>
          </div>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={() => {}}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {}}
            >
              Add Feedback
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
                  placeholder="Search feedback..."
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
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={selectedSource}
                    label="Source"
                    onChange={(e) => setSelectedSource(e.target.value)}
                  >
                    {sources.map((source) => (
                      <MenuItem key={source} value={source}>
                        {source}
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
                    setSelectedSource('All');
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Feedback Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feedback</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFeedback
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleFeedbackClick(feedback)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                          {feedback.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getSentimentIcon(feedback.sentiment)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {feedback.description.substring(0, 100)}...
                      </Typography>
                      <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {feedback.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: 10 }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                          {feedback.customer.split(' ').map(word => word[0]).join('')}
                        </Avatar>
                        <Typography variant="body2">{feedback.customer}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.category}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.status}
                        size="small"
                        color={getStatusColor(feedback.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.priority}
                        size="small"
                        color={getPriorityColor(feedback.priority)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2">{feedback.votes}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {feedback.source}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => {
                        e.stopPropagation();
                        handleActionMenuClick(e);
                      }}>
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
          count={filteredFeedback.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => {
          handleActionMenuClose();
          // Handle edit
        }}>
          Edit Feedback
        </MenuItem>
        <MenuItem onClick={() => {
          handleActionMenuClose();
          // Handle create feature
        }}>
          Create Feature
        </MenuItem>
        <MenuItem onClick={() => {
          handleActionMenuClose();
          // Handle delete
        }}>
          Delete
        </MenuItem>
      </Menu>

      {/* Feedback Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">Feedback Details</Typography>
            <IconButton onClick={() => setDetailsOpen(false)}>
              ×
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <Box>
              <Typography variant="h4" gutterBottom>
                {selectedFeedback.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedFeedback.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Customer</Typography>
                  <Typography variant="body2">{selectedFeedback.customer}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Source</Typography>
                  <Typography variant="body2">{selectedFeedback.source}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Category</Typography>
                  <Chip
                    label={selectedFeedback.category}
                    size="small"
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Status</Typography>
                  <Chip
                    label={selectedFeedback.status}
                    size="small"
                    color={getStatusColor(selectedFeedback.status)}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Priority</Typography>
                  <Chip
                    label={selectedFeedback.priority}
                    size="small"
                    color={getPriorityColor(selectedFeedback.priority)}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Votes</Typography>
                  <Typography variant="body2">{selectedFeedback.votes} upvotes</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button variant="outlined">Edit</Button>
          <Button variant="contained">Create Feature</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Feedback;