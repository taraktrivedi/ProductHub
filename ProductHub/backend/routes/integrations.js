const express = require('express');
const router = express.Router();

// Mock integrations data
let integrations = [
  {
    id: 1,
    name: 'Jira Integration',
    type: 'jira',
    config: { projectKey: 'PROD', autoSync: true },
    isActive: true,
    lastSyncAt: '2024-01-16T10:00:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Salesforce CRM',
    type: 'salesforce',
    config: { instanceUrl: 'https://company.salesforce.com' },
    isActive: true,
    lastSyncAt: '2024-01-15T15:30:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 3,
    name: 'Slack Notifications',
    type: 'slack',
    config: { channel: '#product-feedback' },
    isActive: true,
    lastSyncAt: '2024-01-16T09:00:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

// GET /api/integrations - Get all integrations
router.get('/', async (req, res) => {
  try {
    res.json(integrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ error: 'Failed to fetch integrations' });
  }
});

// POST /api/integrations - Create new integration
router.post('/', async (req, res) => {
  try {
    const { name, type, config } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    const newIntegration = {
      id: Math.max(...integrations.map(i => i.id)) + 1,
      name,
      type,
      config: config || {},
      isActive: true,
      lastSyncAt: null,
      createdAt: new Date().toISOString()
    };

    integrations.push(newIntegration);
    res.status(201).json(newIntegration);
  } catch (error) {
    console.error('Error creating integration:', error);
    res.status(500).json({ error: 'Failed to create integration' });
  }
});

// PUT /api/integrations/:id - Update integration
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const integrationIndex = integrations.findIndex(item => item.id === parseInt(id));
    
    if (integrationIndex === -1) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    integrations[integrationIndex] = {
      ...integrations[integrationIndex],
      ...updates
    };

    res.json(integrations[integrationIndex]);
  } catch (error) {
    console.error('Error updating integration:', error);
    res.status(500).json({ error: 'Failed to update integration' });
  }
});

// POST /api/integrations/:id/sync - Trigger sync
router.post('/:id/sync', async (req, res) => {
  try {
    const { id } = req.params;
    const integration = integrations.find(item => item.id === parseInt(id));
    
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Mock sync process
    setTimeout(() => {
      integration.lastSyncAt = new Date().toISOString();
    }, 2000);

    res.json({ message: 'Sync started', integrationId: parseInt(id) });
  } catch (error) {
    console.error('Error syncing integration:', error);
    res.status(500).json({ error: 'Failed to start sync' });
  }
});

module.exports = router;