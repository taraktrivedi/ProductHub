const express = require('express');
const router = express.Router();

// GET /api/analytics/dashboard - Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const mockAnalytics = {
      totalFeedback: 2487,
      activeFeatures: 142,
      totalVotes: 8432,
      customerSatisfaction: 87,
      monthlyGrowth: 12.5,
      topFeatures: [
        { title: 'Mobile App Interface', votes: 287, status: 'in-progress' },
        { title: 'API Integration', votes: 243, status: 'backlog' },
        { title: 'Advanced Analytics', votes: 198, status: 'completed' }
      ],
      feedbackByCategory: [
        { name: 'UI/UX', value: 45, count: 1120 },
        { name: 'Performance', value: 25, count: 622 },
        { name: 'Features', value: 20, count: 497 }
      ]
    };
    
    res.json(mockAnalytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/analytics/feedback-trends - Get feedback trends
router.get('/feedback-trends', async (req, res) => {
  try {
    const mockTrends = [
      { month: 'Jan', feedback: 180, features: 12, votes: 420 },
      { month: 'Feb', feedback: 220, features: 15, votes: 580 },
      { month: 'Mar', feedback: 280, features: 18, votes: 720 },
      { month: 'Apr', feedback: 320, features: 22, votes: 890 }
    ];
    
    res.json(mockTrends);
  } catch (error) {
    console.error('Error fetching feedback trends:', error);
    res.status(500).json({ error: 'Failed to fetch feedback trends' });
  }
});

module.exports = router;