const express = require('express');
const router = express.Router();

// Mock feedback data
let feedbackItems = [
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
  }
];

// GET /api/feedback - Get all feedback items
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      priority, 
      source, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredFeedback = [...feedbackItems];

    // Apply filters
    if (category && category !== 'All') {
      filteredFeedback = filteredFeedback.filter(item => item.category === category);
    }
    if (status && status !== 'All') {
      filteredFeedback = filteredFeedback.filter(item => item.status === status);
    }
    if (priority && priority !== 'All') {
      filteredFeedback = filteredFeedback.filter(item => item.priority === priority);
    }
    if (source && source !== 'All') {
      filteredFeedback = filteredFeedback.filter(item => item.source === source);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredFeedback = filteredFeedback.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.customer.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filteredFeedback.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedFeedback = filteredFeedback.slice(startIndex, endIndex);

    res.json({
      data: paginatedFeedback,
      totalCount: filteredFeedback.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredFeedback.length / limit),
      hasNext: endIndex < filteredFeedback.length,
      hasPrev: page > 1
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// GET /api/feedback/:id - Get specific feedback item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = feedbackItems.find(item => item.id === parseInt(id));
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// POST /api/feedback - Create new feedback
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      source,
      customer,
      category,
      status = 'new',
      priority = 'medium',
      tags = []
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newFeedback = {
      id: Math.max(...feedbackItems.map(f => f.id)) + 1,
      title,
      description,
      source: source || 'Manual Entry',
      customer: customer || 'Unknown',
      category,
      status,
      priority,
      votes: 0,
      sentiment: 0,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    feedbackItems.push(newFeedback);

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feedback:created', newFeedback);
    }

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// PUT /api/feedback/:id - Update feedback
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const feedbackIndex = feedbackItems.findIndex(item => item.id === parseInt(id));
    
    if (feedbackIndex === -1) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    feedbackItems[feedbackIndex] = {
      ...feedbackItems[feedbackIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const updatedFeedback = feedbackItems[feedbackIndex];

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feedback:updated', updatedFeedback);
    }

    res.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedbackIndex = feedbackItems.findIndex(item => item.id === parseInt(id));
    
    if (feedbackIndex === -1) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const deletedFeedback = feedbackItems.splice(feedbackIndex, 1)[0];

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feedback:deleted', { id: parseInt(id) });
    }

    res.json({ message: 'Feedback deleted successfully', feedback: deletedFeedback });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

// POST /api/feedback/:id/vote - Vote on feedback
router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType = 'up' } = req.body;
    const feedback = feedbackItems.find(item => item.id === parseInt(id));
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    if (voteType === 'up') {
      feedback.votes += 1;
    } else if (voteType === 'down') {
      feedback.votes = Math.max(0, feedback.votes - 1);
    }

    feedback.updatedAt = new Date().toISOString();

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.emit('feedback:voted', { id: parseInt(id), votes: feedback.votes });
    }

    res.json({ ...feedback, message: `Vote ${voteType} recorded` });
  } catch (error) {
    console.error('Error voting on feedback:', error);
    res.status(500).json({ error: 'Failed to vote on feedback' });
  }
});

// GET /api/feedback/stats/summary - Get feedback statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalFeedback = feedbackItems.length;
    const totalVotes = feedbackItems.reduce((sum, item) => sum + item.votes, 0);
    
    const statusCounts = feedbackItems.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    
    const categoryCounts = feedbackItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    
    const priorityCounts = feedbackItems.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalFeedback,
      totalVotes,
      statusCounts,
      categoryCounts,
      priorityCounts,
      averageVotesPerFeedback: totalFeedback > 0 ? Math.round(totalVotes / totalFeedback) : 0
    });
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({ error: 'Failed to fetch feedback statistics' });
  }
});

module.exports = router;