import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Feedback as FeedbackIcon,
  Extension as FeaturesIcon,
  Map as RoadmapIcon,
  People as CustomersIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Mock data
const dashboardData = {
  metrics: {
    totalFeedback: 2487,
    activeFeatures: 142,
    totalVotes: 8432,
    customerSatisfaction: 87,
    monthlyGrowth: 12.5
  },
  recentActivity: [
    {
      id: 1,
      type: 'feedback',
      title: 'New feedback from Microsoft Corp',
      description: 'Request for better mobile interface',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'feature',
      title: 'Dark mode feature completed',
      description: 'User requested feature implemented',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'vote',
      title: 'API integration feature trending',
      description: 'Received 45 new votes this week',
      time: '6 hours ago',
      priority: 'low'
    }
  ],
  topFeatures: [
    {
      id: 1,
      title: 'Mobile App Interface',
      votes: 287,
      status: 'in-progress',
      impact: 95
    },
    {
      id: 2,
      title: 'API Integration',
      votes: 243,
      status: 'backlog',
      impact: 88
    },
    {
      id: 3,
      title: 'Advanced Analytics',
      votes: 198,
      status: 'completed',
      impact: 76
    },
    {
      id: 4,
      title: 'Team Collaboration',
      votes: 156,
      status: 'review',
      impact: 82
    }
  ],
  feedbackByCategory: [
    { name: 'UI/UX', value: 45, count: 1120 },
    { name: 'Performance', value: 25, count: 622 },
    { name: 'Features', value: 20, count: 497 },
    { name: 'Integration', value: 10, count: 248 }
  ],
  monthlyGrowth: [
    { month: 'Jan', feedback: 180, features: 12, votes: 420 },
    { month: 'Feb', feedback: 220, features: 15, votes: 580 },
    { month: 'Mar', feedback: 280, features: 18, votes: 720 },
    { month: 'Apr', feedback: 320, features: 22, votes: 890 },
    { month: 'May', feedback: 380, features: 28, votes: 1050 },
    { month: 'Jun', feedback: 420, features: 32, votes: 1200 }
  ],
  customerSegments: [
    { name: 'Enterprise', value: 35, color: '#9333EA' },
    { name: 'SMB', value: 45, color: '#A855F7' },
    { name: 'Starter', value: 20, color: '#C084FC' }
  ]
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: 'center' }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your product.
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FeedbackIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Total Feedback
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {dashboardData.metrics.totalFeedback.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    +12.5% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FeaturesIcon sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Active Features
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {dashboardData.metrics.activeFeatures}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    +8 this week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Total Votes
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {dashboardData.metrics.totalVotes.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    +156 today
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CustomersIcon sx={{ color: 'info.main', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Customer Satisfaction
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {dashboardData.metrics.customerSatisfaction}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    +3% improvement
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <RoadmapIcon sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Monthly Growth
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  +{dashboardData.metrics.monthlyGrowth}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="success.main">
                    Exceeding target
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  Recent Activity
                </Typography>
                <List>
                  {dashboardData.recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: activity.type === 'feedback' ? 'primary.main' :
                                      activity.type === 'feature' ? 'secondary.main' : 'warning.main'
                            }}
                          >
                            {activity.type === 'feedback' && <FeedbackIcon />}
                            {activity.type === 'feature' && <FeaturesIcon />}
                            {activity.type === 'vote' && <StarIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" fontWeight={600}>
                                {activity.title}
                              </Typography>
                              <Chip
                                label={activity.priority}
                                size="small"
                                color={activity.priority === 'high' ? 'error' : 
                                      activity.priority === 'medium' ? 'warning' : 'default'}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {activity.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < dashboardData.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Top Features */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  Top Features by Votes
                </Typography>
                <List>
                  {dashboardData.topFeatures.map((feature, index) => (
                    <React.Fragment key={feature.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              fontSize: 14,
                              fontWeight: 600
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="body2" fontWeight={600}>
                                {feature.title}
                              </Typography>
                              <Chip
                                label={feature.status}
                                size="small"
                                color={
                                  feature.status === 'completed' ? 'success' :
                                  feature.status === 'in-progress' ? 'primary' :
                                  feature.status === 'review' ? 'warning' : 'default'
                                }
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {feature.votes} votes
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Impact Score: {feature.impact}/100
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={feature.impact}
                                sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < dashboardData.topFeatures.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  View All Features
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Monthly Growth Chart */}
        <Grid item xs={12} md={8}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  Growth Trends
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardData.monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="feedback" 
                        stroke="#9333EA" 
                        strokeWidth={3}
                        name="Feedback"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="votes" 
                        stroke="#A855F7" 
                        strokeWidth={3}
                        name="Votes"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="features" 
                        stroke="#6366F1" 
                        strokeWidth={3}
                        name="Features"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Feedback Categories */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <Typography variant="h3" sx={{ mb: 3 }}>
                  Feedback by Category
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.feedbackByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dashboardData.feedbackByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === 'UI/UX' ? '#9333EA' : 
                                                     entry.name === 'Performance' ? '#A855F7' :
                                                     entry.name === 'Features' ? '#6366F1' : '#8B5CF6'} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value}% (${props.payload.count} items)`,
                          'Percentage'
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {dashboardData.feedbackByCategory.map((category, index) => (
                    <Box key={category.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: category.name === 'UI/UX' ? '#9333EA' : 
                                   category.name === 'Performance' ? '#A855F7' :
                                   category.name === 'Features' ? '#6366F1' : '#8B5CF6',
                          mr: 1
                        }}
                      />
                      <Typography variant="caption" sx={{ flex: 1 }}>
                        {category.name}: {category.count} items
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Dashboard;