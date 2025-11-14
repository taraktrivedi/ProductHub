const express = require('express');
const router = express.Router();

// Mock features data
let features = [
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
  }
];

// GET /api/features - Get all features
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      priority, 
      assignee,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredFeatures = [...features];

    // Apply filters
    if (category && category !== 'All') {
      filteredFeatures = filteredFeatures.filter(item => item.category === category);
    }
    if (status && status !== 'All') {
      filteredFeatures = filteredFeatures.filter(item => item.status === status);
    }
    if (priority && priority !== 'All') {
      filteredFeatures = filteredFeatures.filter(item => item.priority === priority);
    }
    if (assignee && assignee !== 'All') {
      filteredFeatures = filteredFeatures.filter(item => item.assignedTo === assignee);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredFeatures = filteredFeatures.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filteredFeatures.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedFeatures = filteredFeatures.slice(startIndex, endIndex);

    res.json({
      data: paginatedFeatures,
      totalCount: filteredFeatures.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredFeatures.length / limit),
      hasNext: endIndex < filteredFeatures.length,
      hasPrev: page > 1
    });
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// GET /api/features/:id - Get specific feature
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feature = features.find(item => item.id === parseInt(id));
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({ error: 'Failed to fetch feature' });
  }
});

// POST /api/features - Create new feature
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status = 'backlog',
      priority = 'medium',
      impactScore = 50,
      effortScore = 50,
      reachScore = 50,
      confidenceScore = 50,
      complexity = 'medium',
      estimatedEffort = 0,
      assignedTo = 'Unassigned',
      tags = []
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newFeature = {
      id: Math.max(...features.map(f => f.id)) + 1,
      title,
      description,
      category,
      status,
      priority,
      votes: 0,
      impactScore,
      effortScore,
      reachScore,
      confidenceScore,
      revenueImpact: 0,
      complexity,
      estimatedEffort,
      dependencies: [],
      assignedTo,
      assigneeAvatar: assignedTo.split(' ').map(name => name[0]).join(''),
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags
    };

    features.push(newFeature);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feature:created', newFeature);
    }

    res.status(201).json(newFeature);
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(500).json({ error: 'Failed to create feature' });
  }
});

// PUT /api/features/:id - Update feature
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const featureIndex = features.findIndex(item => item.id === parseInt(id));
    
    if (featureIndex === -1) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    features[featureIndex] = {
      ...features[featureIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const updatedFeature = features[featureIndex];

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feature:updated', updatedFeature);
    }

    res.json(updatedFeature);
  } catch (error) {
    console.error('Error updating feature:', error);
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// DELETE /api/features/:id - Delete feature
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const featureIndex = features.findIndex(item => item.id === parseInt(id));
    
    if (featureIndex === -1) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    const deletedFeature = features.splice(featureIndex, 1)[0];

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feature:deleted', { id: parseInt(id) });
    }

    res.json({ message: 'Feature deleted successfully', feature: deletedFeature });
  } catch (error) {
    console.error('Error deleting feature:', error);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

module.exports = router;