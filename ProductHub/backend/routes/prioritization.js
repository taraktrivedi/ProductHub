const express = require('express');
const router = express.Router();

// Mock prioritization frameworks
const frameworks = [
  {
    id: 1,
    name: 'Impact vs Effort Matrix',
    description: 'Classic prioritization matrix based on impact and effort required',
    criteria: ['impact', 'effort'],
    weights: { impact: 0.5, effort: 0.5 },
    isDefault: true,
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'RICE Scoring',
    description: 'Reach, Impact, Confidence, Effort prioritization framework',
    criteria: ['reach', 'impact', 'confidence', 'effort'],
    weights: { reach: 0.25, impact: 0.25, confidence: 0.25, effort: 0.25 },
    isDefault: false,
    createdAt: '2024-01-01T10:00:00Z'
  }
];

// GET /api/prioritization/frameworks - Get all frameworks
router.get('/frameworks', async (req, res) => {
  try {
    res.json(frameworks);
  } catch (error) {
    console.error('Error fetching frameworks:', error);
    res.status(500).json({ error: 'Failed to fetch frameworks' });
  }
});

// POST /api/prioritization/frameworks - Create new framework
router.post('/frameworks', async (req, res) => {
  try {
    const { name, description, criteria, weights } = req.body;

    if (!name || !description || !criteria) {
      return res.status(400).json({ error: 'Name, description, and criteria are required' });
    }

    const newFramework = {
      id: Math.max(...frameworks.map(f => f.id)) + 1,
      name,
      description,
      criteria,
      weights: weights || {},
      isDefault: false,
      createdAt: new Date().toISOString()
    };

    frameworks.push(newFramework);
    res.status(201).json(newFramework);
  } catch (error) {
    console.error('Error creating framework:', error);
    res.status(500).json({ error: 'Failed to create framework' });
  }
});

// GET /api/prioritization/features - Get features for prioritization
router.get('/features', async (req, res) => {
  try {
    const mockFeatures = [
      {
        id: 1,
        title: 'Mobile App Interface',
        impact: 95,
        effort: 75,
        reach: 90,
        confidence: 85,
        votes: 287,
        assignedTo: 'Sarah Johnson',
        rice: Math.round((95 * 90 * 85) / (75 * 100))
      },
      {
        id: 2,
        title: 'Salesforce Integration',
        impact: 88,
        effort: 60,
        reach: 85,
        confidence: 90,
        votes: 243,
        assignedTo: 'Mike Chen',
        rice: Math.round((88 * 85 * 90) / (60 * 100))
      }
    ];
    
    res.json(mockFeatures);
  } catch (error) {
    console.error('Error fetching features for prioritization:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// PUT /api/prioritization/features/:id/position - Update feature position in matrix
router.put('/features/:id/position', async (req, res) => {
  try {
    const { id } = req.params;
    const { impact, effort } = req.body;
    
    // Mock position update
    const updatedFeature = {
      id: parseInt(id),
      impact,
      effort,
      updatedAt: new Date().toISOString()
    };

    res.json(updatedFeature);
  } catch (error) {
    console.error('Error updating feature position:', error);
    res.status(500).json({ error: 'Failed to update feature position' });
  }
});

module.exports = router;