const { query } = require('../config/database');

const initDatabase = async () => {
  try {
    console.log('Initializing database...');

    // Users and Authentication
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        avatar_url VARCHAR(500),
        timezone VARCHAR(50),
        preferences JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        permissions JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Data Sources and Integrations
    await query(`
      CREATE TABLE IF NOT EXISTS integrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL, -- 'jira', 'salesforce', 'slack', 'azure-devops', etc.
        config JSONB DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        last_sync_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS integration_configs (
        id SERIAL PRIMARY KEY,
        integration_id INTEGER REFERENCES integrations(id),
        field_name VARCHAR(100) NOT NULL,
        mapped_field VARCHAR(100),
        transformation_rules JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Feedback Management
    await query(`
      CREATE TABLE IF NOT EXISTS feedback_sources (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL, -- 'email', 'survey', 'chat', 'integration'
        integration_id INTEGER REFERENCES integrations(id),
        config JSONB DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        tier VARCHAR(50), -- 'enterprise', 'sme', 'starter'
        segment VARCHAR(100), -- 'product-manager', 'developer', 'executive'
        company_size INTEGER,
        industry VARCHAR(100),
        location VARCHAR(100),
        health_score INTEGER DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS feedback_items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        content TEXT,
        source_id INTEGER REFERENCES feedback_sources(id),
        customer_id INTEGER REFERENCES customers(id),
        status VARCHAR(50) DEFAULT 'new', -- 'new', 'reviewed', 'assigned', 'completed'
        priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
        category VARCHAR(100),
        tags JSONB DEFAULT '[]',
        sentiment INTEGER DEFAULT 0, -- -1 negative, 0 neutral, 1 positive
        integration_id INTEGER REFERENCES integrations(id),
        external_id VARCHAR(255), -- ID from external system
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Feature Management
    await query(`
      CREATE TABLE IF NOT EXISTS features (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'backlog', -- 'backlog', 'in-progress', 'review', 'completed', 'deferred'
        category VARCHAR(100),
        tags JSONB DEFAULT '[]',
        -- Prioritization metrics
        impact_score INTEGER DEFAULT 0,
        effort_score INTEGER DEFAULT 0,
        reach_score INTEGER DEFAULT 0,
        confidence_score INTEGER DEFAULT 0,
        revenue_impact INTEGER DEFAULT 0,
        -- Strategic alignment
        strategic_objective_id INTEGER,
        business_value_score INTEGER DEFAULT 0,
        -- Technical details
        complexity VARCHAR(50) DEFAULT 'medium',
        estimated_effort INTEGER DEFAULT 0, -- story points or hours
        dependencies JSONB DEFAULT '[]',
        -- Metadata
        created_by INTEGER REFERENCES users(id),
        assigned_to INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS feature_votes (
        id SERIAL PRIMARY KEY,
        feature_id INTEGER REFERENCES features(id),
        customer_id INTEGER REFERENCES customers(id),
        user_id INTEGER REFERENCES users(id),
        vote_type VARCHAR(20) DEFAULT 'up', -- 'up', 'down'
        weight INTEGER DEFAULT 1,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS feature_comments (
        id SERIAL PRIMARY KEY,
        feature_id INTEGER REFERENCES features(id),
        user_id INTEGER REFERENCES users(id),
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS feedback_feature_links (
        id SERIAL PRIMARY KEY,
        feedback_id INTEGER REFERENCES feedback_items(id),
        feature_id INTEGER REFERENCES features(id),
        relevance_score INTEGER DEFAULT 0,
        link_strength VARCHAR(20) DEFAULT 'weak', -- 'weak', 'medium', 'strong'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Roadmapping
    await query(`
      CREATE TABLE IF NOT EXISTS roadmaps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE,
        end_date DATE,
        audience_type VARCHAR(50) DEFAULT 'internal', -- 'internal', 'executive', 'public', 'partner'
        is_public BOOLEAN DEFAULT false,
        version INTEGER DEFAULT 1,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS roadmap_items (
        id SERIAL PRIMARY KEY,
        roadmap_id INTEGER REFERENCES roadmaps(id),
        feature_id INTEGER REFERENCES features(id),
        start_date DATE,
        end_date DATE,
        status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'in-progress', 'completed', 'deferred'
        position_x DECIMAL(10,2) DEFAULT 0,
        position_y DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS strategic_objectives (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        target_date DATE,
        progress INTEGER DEFAULT 0, -- 0-100
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Prioritization
    await query(`
      CREATE TABLE IF NOT EXISTS prioritization_frameworks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        criteria JSONB NOT NULL, -- Array of criteria definitions
        weights JSONB DEFAULT '{}',
        created_by INTEGER REFERENCES users(id),
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS prioritization_sessions (
        id SERIAL PRIMARY KEY,
        framework_id INTEGER REFERENCES prioritization_frameworks(id),
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'archived'
        participants JSONB DEFAULT '[]',
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Mind Mapping and AI
    await query(`
      CREATE TABLE IF NOT EXISTS mind_maps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        data JSONB NOT NULL, -- Mind map structure
        created_by INTEGER REFERENCES users(id),
        is_shared BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ai_generated_ideas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        source_data JSONB DEFAULT '{}', -- Source feedback/analysis
        confidence_score INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'integrated'
        feedback_analysis TEXT,
        implementation_suggestions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Analytics
    await query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50), -- 'feature', 'feedback', 'roadmap', etc.
        entity_id INTEGER,
        user_id INTEGER REFERENCES users(id),
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await query('CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback_items(status)');
    await query('CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback_items(priority)');
    await query('CREATE INDEX IF NOT EXISTS idx_feedback_source ON feedback_items(source_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_features_status ON features(status)');
    await query('CREATE INDEX IF NOT EXISTS idx_features_category ON features(category)');
    await query('CREATE INDEX IF NOT EXISTS idx_feature_votes_feature ON feature_votes(feature_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_roadmap_items_roadmap ON roadmap_items(roadmap_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email)');
    await query('CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type)');

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = initDatabase;