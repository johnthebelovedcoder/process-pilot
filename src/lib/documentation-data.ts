export interface Document {
  id: string
  title: string
  content: string
  description: string
  category: string
  type: 'prd' | 'frd' | 'brd' | 'api' | 'guide' | 'policy'
  author: {
    name: string
    avatar: string
    role: string
  }
  status: 'published' | 'draft' | 'review' | 'archived'
  version: string
  created: string
  updated: string
  readTime: number
  tags: string[]
  starred: boolean
  bookmarked: boolean
  views: number
  likes: number
  comments: Comment[]
  toc: TocItem[]
  contributors: Contributor[]
  relatedDocs: RelatedDoc[]
}

export interface TocItem {
  id: string
  title: string
  level: number
}

export interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

export interface Contributor {
  name: string
  avatar: string
  commits: number
}

export interface RelatedDoc {
  id: string
  title: string
  category: string
}

export const documents: Record<string, Document> = {
  'proc-001': {
    id: 'proc-001',
    title: 'Employee Recruitment Process',
    description: 'Complete process documentation for recruiting new employees from job posting to onboarding.',
    content: `# Employee Recruitment Process

## Overview
This process outlines the standard procedure for recruiting new employees, from initial job posting through successful onboarding.

## Process Steps

### 1. Job Requisition
- **Responsible**: Department Manager
- **Duration**: 1-2 days
- **Documents Required**: Job requisition form, budget approval
- **Actions**:
  - Submit job requisition form
  - Get budget approval from Finance
  - Define job requirements and qualifications
  - Set salary range and benefits

### 2. Job Posting
- **Responsible**: HR Team
- **Duration**: 1 day
- **Documents Required**: Job description template, posting guidelines
- **Actions**:
  - Create job posting using approved template
  - Post on company careers page
  - Share on LinkedIn and relevant job boards
  - Send to internal team for referrals

### 3. Application Review
- **Responsible**: HR Team + Hiring Manager
- **Duration**: 3-5 days
- **Documents Required**: Application review checklist, screening criteria
- **Actions**:
  - Screen applications for basic qualifications
  - Use scoring rubric for consistent evaluation
  - Shortlist top 5-8 candidates
  - Schedule initial phone screenings

### 4. Phone Screening
- **Responsible**: HR Team
- **Duration**: 2-3 days
- **Documents Required**: Phone screening template, assessment form
- **Actions**:
  - Conduct 15-20 minute phone calls
  - Verify basic qualifications and interest
  - Assess communication skills and culture fit
  - Select 3-4 candidates for interviews

### 5. Interview Process
- **Responsible**: Hiring Manager + Team Members
- **Duration**: 1-2 weeks
- **Documents Required**: Interview guides, evaluation forms, reference check template
- **Actions**:
  - Schedule interviews with shortlisted candidates
  - Conduct behavioral and technical interviews
  - Perform reference checks
  - Collect feedback from all interviewers

### 6. Decision & Offer
- **Responsible**: Hiring Manager
- **Duration**: 2-3 days
- **Documents Required**: Offer letter template, salary guidelines, benefits package info
- **Actions**:
  - Review all interview feedback
  - Make final decision with team input
  - Prepare and extend job offer
  - Negotiate terms if needed

### 7. Onboarding
- **Responsible**: HR Team + IT + Direct Manager
- **Duration**: First week
- **Documents Required**: Welcome package, equipment checklist, orientation schedule, buddy assignment
- **Actions**:
  - Send welcome package before start date
  - Set up workspace and equipment
  - Schedule orientation sessions
  - Assign buddy/mentor
  - Complete paperwork and documentation

## Attached Documents
- Job Requisition Form Template
- Job Description Template
- Application Review Checklist
- Phone Screening Guide
- Interview Evaluation Forms
- Reference Check Template
- Offer Letter Template
- Onboarding Checklist
- Equipment Setup Guide
- New Hire Welcome Package

## Success Criteria
- Position filled within 30 days of posting
- New hire satisfaction score >4.0/5.0
- All documentation completed before start date
- Hiring manager satisfaction with candidate quality
- Compliance with all legal requirements`,
    category: 'Human Resources',
    type: 'guide',
    author: {
      name: 'Lisa Rodriguez',
      avatar: '/avatars/lisa.jpg',
      role: 'HR Manager'
    },
    status: 'published',
    version: '1.3.0',
    created: '2024-01-12',
    updated: '2024-01-25',
    readTime: 8,
    tags: ['hr', 'recruitment', 'hiring', 'onboarding'],
    starred: true,
    bookmarked: false,
    views: 156,
    likes: 12,
    comments: [
      {
        id: '1',
        author: {
          name: 'David Kim',
          avatar: '/avatars/david.jpg'
        },
        content: 'Should we add a step for background checks after the offer is accepted?',
        timestamp: '1 day ago',
        likes: 2,
        replies: []
      },
      {
        id: '2',
        author: {
          name: 'Sarah Wilson',
          avatar: '/avatars/sarah.jpg'
        },
        content: 'Great process! The timelines are realistic and the documentation requirements are comprehensive.',
        timestamp: '2 days ago',
        likes: 5,
        replies: []
      }
    ],
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'steps', title: 'Process Steps', level: 2 },
      { id: 'success', title: 'Success Criteria', level: 2 }
    ],
    contributors: [
      { name: 'Lisa Rodriguez', avatar: '/avatars/lisa.jpg', commits: 12 },
      { name: 'David Kim', avatar: '/avatars/david.jpg', commits: 4 },
      { name: 'Emma Thompson', avatar: '/avatars/emma.jpg', commits: 2 }
    ],
    relatedDocs: [
      { id: 'proc-002', title: 'Employee Onboarding Process', category: 'Human Resources' },
      { id: 'proc-003', title: 'Performance Review Process', category: 'Human Resources' },
      { id: 'proc-004', title: 'Employee Termination Process', category: 'Human Resources' }
    ]
  },
  'proc-002': {
    id: 'proc-002',
    title: 'Customer Support Ticket Process',
    description: 'Standard process for handling customer support tickets from creation to resolution.',
    content: `# Customer Support Ticket Process

## Overview
This document outlines the standard operating procedure for managing customer support tickets to ensure consistent, timely, and effective resolution.

## Process Flow

### 1. Ticket Creation
- **Source**: Customer portal, email, phone, chat
- **Automatic Actions**: 
  - Ticket ID generation
  - Initial acknowledgment sent
  - Priority assignment based on keywords
- **Timeline**: Immediate

### 2. Initial Triage
- **Responsible**: Support Tier 1
- **Timeline**: Within 30 minutes
- **Actions**:
  - Review ticket details
  - Assign priority level (Critical/High/Medium/Low)
  - Route to appropriate team
  - Send confirmation to customer

### 3. Investigation & Resolution
- **Responsible**: Assigned support agent
- **Timeline**: Based on priority (Critical: 2 hours, High: 4 hours, Medium: 1 day, Low: 3 days)
- **Actions**:
  - Reproduce issue if applicable
  - Research knowledge base
  - Escalate to Tier 2/3 if needed
  - Implement solution
  - Update ticket with resolution

### 4. Customer Communication
- **Timeline**: Every 24 hours minimum
- **Requirements**:
  - Clear, professional communication
  - Regular status updates
  - Solution explanation
  - Next steps if applicable

### 5. Ticket Closure
- **Requirements**:
  - Customer confirmation of resolution
  - Solution documented
  - Root cause identified
  - Preventive measures noted
- **Timeline**: Within 24 hours of resolution

## Attached Documents
- Support Ticket Template
- Priority Classification Guide
- Escalation Matrix
- Customer Communication Templates
- Knowledge Base Article Template
- Resolution Documentation Form

## Service Level Agreements
- Critical: 2 hours response, 4 hours resolution
- High: 4 hours response, 8 hours resolution  
- Medium: 1 day response, 2 days resolution
- Low: 2 days response, 5 days resolution`,
    category: 'Customer Support',
    type: 'guide',
    author: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      role: 'Support Manager'
    },
    status: 'published',
    version: '2.1.0',
    created: '2024-01-15',
    updated: '2024-01-28',
    readTime: 6,
    tags: ['support', 'customer', 'tickets', 'sla'],
    starred: false,
    bookmarked: true,
    views: 203,
    likes: 18,
    comments: [],
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'flow', title: 'Process Flow', level: 2 },
      { id: 'sla', title: 'Service Level Agreements', level: 2 }
    ],
    contributors: [
      { name: 'Mike Chen', avatar: '/avatars/mike.jpg', commits: 8 },
      { name: 'Jennifer Lee', avatar: '/avatars/jennifer.jpg', commits: 3 }
    ],
    relatedDocs: [
      { id: 'proc-001', title: 'Employee Recruitment Process', category: 'Human Resources' },
      { id: 'proc-005', title: 'Escalation Management Process', category: 'Customer Support' }
    ]
  },
  'prd': {
    id: 'prd',
    title: 'Product Requirements Document (PRD)',
    description: 'Comprehensive product requirements document outlining the vision, objectives, features, and success metrics for the Enterprise Dashboard Platform.',
    content: `# Product Requirements Document (PRD)
## Enterprise Dashboard Platform

### Executive Summary

The Enterprise Dashboard Platform is a comprehensive business intelligence and data visualization solution designed to empower organizations with real-time insights, collaborative tools, and advanced analytics capabilities. This platform addresses the critical need for unified data access, intuitive visualization, and actionable intelligence across all organizational levels.

### Product Vision

**Vision Statement:** To create the industry's most intuitive and powerful dashboard platform that transforms raw data into actionable insights, enabling data-driven decision-making at every level of the organization.

**Mission:** Democratize data access and analytics by providing a user-friendly, scalable, and secure platform that integrates seamlessly with existing enterprise systems while delivering exceptional performance and reliability.

### Problem Statement

#### Current Challenges
Organizations today face significant challenges in data management and analytics:

1. **Data Silos:** Information scattered across multiple systems with no unified view
2. **Complex Tools:** Existing BI tools require technical expertise, limiting accessibility
3. **Delayed Insights:** Manual reporting processes cause decision-making delays
4. **Poor Collaboration:** Limited ability to share insights and collaborate on data analysis
5. **Scalability Issues:** Current solutions struggle with growing data volumes
6. **Security Concerns:** Inadequate access controls and data governance

#### Market Opportunity
- Total Addressable Market (TAM): $35.6 billion (2024)
- Expected CAGR: 12.3% (2024-2029)
- Target Segments: Enterprise (5000+ employees), Mid-market (500-5000 employees)

### Target Audience

#### Primary Users

**1. Business Executives (C-Suite)**
- Need high-level KPI dashboards
- Require mobile access for on-the-go decisions
- Value predictive analytics and trend analysis
- Prioritize data security and compliance

**2. Data Analysts**
- Require advanced visualization capabilities
- Need data manipulation and transformation tools
- Value integration with existing analytics tools
- Prioritize performance and scalability

**3. Department Managers**
- Need team performance metrics
- Require customizable department-specific views
- Value real-time alerts and notifications
- Prioritize ease of use and accessibility

**4. IT Administrators**
- Require robust security and access controls
- Need system monitoring and maintenance tools
- Value API access and integration capabilities
- Prioritize reliability and performance

### Product Objectives

#### Primary Objectives
1. **Reduce Time to Insight:** Decrease report generation time by 80%
2. **Increase User Adoption:** Achieve 90% active user rate within 6 months
3. **Improve Decision Quality:** Enable data-driven decisions with 95% accuracy
4. **Enhance Collaboration:** Increase cross-team data sharing by 200%

#### Success Metrics
- **User Engagement:** Daily Active Users (DAU) / Monthly Active Users (MAU) > 60%
- **Performance:** Dashboard load time < 3 seconds for 95% of requests
- **Satisfaction:** Net Promoter Score (NPS) > 50
- **Reliability:** 99.9% uptime SLA
- **Adoption:** 80% of target departments using platform within 12 months

### Core Features

#### 1. Dashboard Creation & Management

**Visual Dashboard Builder**
- Drag-and-drop interface for widget placement
- 50+ pre-built visualization types
- Custom widget creation capabilities
- Responsive design for all screen sizes
- Theme customization and branding options

**Template Library**
- Industry-specific dashboard templates
- Department-focused layouts (Sales, Marketing, Finance, HR, Operations)
- Best practice visualization patterns
- One-click template deployment
- Custom template creation and sharing

**Real-time Data Updates**
- Live data streaming with WebSocket support
- Configurable refresh intervals (1s - 24h)
- Smart caching for optimal performance
- Delta updates for efficient bandwidth usage
- Background data synchronization

#### 2. Data Integration & Management

**Data Source Connectivity**
- 100+ pre-built connectors (databases, APIs, files)
- Custom connector SDK for proprietary systems
- Real-time and batch data ingestion
- Data transformation pipeline
- Schema mapping and validation

**Data Processing**
- ETL/ELT capabilities with visual workflow designer
- Data cleansing and normalization
- Calculated fields and metrics
- Time-series analysis and aggregation
- Data quality monitoring and alerts

**Data Governance**
- Data lineage tracking
- Metadata management
- Data catalog with search capabilities
- Compliance reporting (GDPR, HIPAA, SOC2)
- Audit logging and change tracking

#### 3. Analytics & Intelligence

**Advanced Analytics**
- Predictive analytics with ML models
- Anomaly detection and alerting
- Trend analysis and forecasting
- Statistical analysis tools
- What-if scenario modeling

**Natural Language Processing**
- Natural language queries ("Show me sales by region last quarter")
- Automated insight generation
- Smart data narratives
- Voice-enabled commands
- Multi-language support

**AI-Powered Recommendations**
- Suggested visualizations based on data types
- Automated dashboard optimization
- Personalized content recommendations
- Intelligent alert thresholds
- Performance optimization suggestions

#### 4. Collaboration & Sharing

**Team Collaboration**
- Real-time collaborative editing
- Comments and annotations on dashboards
- @mentions and notifications
- Version control with rollback
- Change request workflow

**Sharing & Distribution**
- Public and private sharing links
- Embedded dashboards for websites/apps
- Scheduled email reports (PDF, Excel, CSV)
- Slack/Teams integration
- Mobile push notifications

**Presentation Mode**
- Full-screen presentation view
- Slide-based dashboard stories
- Interactive presentation controls
- Offline presentation capability
- Recording and playback features

#### 5. Security & Administration

**Access Control**
- Role-based access control (RBAC)
- Row-level and column-level security
- Single Sign-On (SSO) support
- Multi-factor authentication (MFA)
- API key management

**Administration Tools**
- User and group management
- Usage analytics and reporting
- System health monitoring
- Backup and recovery tools
- Configuration management

**Compliance & Audit**
- Comprehensive audit trails
- Data encryption at rest and in transit
- Compliance certifications dashboard
- Privacy controls (data masking, anonymization)
- Retention policy management

### User Experience Requirements

#### Design Principles
1. **Intuitive:** Zero training required for basic usage
2. **Responsive:** Consistent experience across all devices
3. **Accessible:** WCAG 2.1 AA compliance
4. **Fast:** Sub-second response times for common actions
5. **Consistent:** Unified design language throughout

#### Platform Support
- **Web:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS 14+, Android 10+
- **Desktop:** Windows 10+, macOS 11+
- **API:** RESTful API with GraphQL support

### Technical Requirements

#### Performance Specifications
- Dashboard load time: < 3 seconds (P95)
- Query execution: < 5 seconds for 1M records
- Concurrent users: Support 10,000+ simultaneous users
- Data refresh rate: Real-time (< 1 second latency)
- Storage: Scalable to petabyte-level datasets

#### Architecture Requirements
- Cloud-native microservices architecture
- Horizontal scalability with auto-scaling
- Multi-region deployment support
- Containerized deployment (Docker/Kubernetes)
- Event-driven architecture with message queuing

#### Integration Requirements
- RESTful API with OpenAPI specification
- GraphQL endpoint for flexible queries
- Webhook support for event notifications
- SDK availability (JavaScript, Python, Java, .NET)
- CLI tools for automation

### Release Strategy

#### Phase 1: MVP (Q1 2024)
- Core dashboard builder
- Basic data connectors (10 sources)
- Essential visualizations (20 types)
- User authentication and basic RBAC
- Web platform only

#### Phase 2: Enhanced Analytics (Q2 2024)
- Advanced analytics features
- AI-powered insights
- Natural language queries
- Mobile applications (iOS/Android)
- Extended connector library (50+ sources)

#### Phase 3: Enterprise Features (Q3 2024)
- Full collaboration suite
- Advanced security features
- Compliance tools
- White-labeling capabilities
- Enterprise support portal

#### Phase 4: Platform Expansion (Q4 2024)
- Marketplace for custom widgets
- Developer ecosystem tools
- Advanced ML/AI capabilities
- Industry-specific solutions
- Global expansion features

### Risk Analysis

#### Technical Risks
- **Scalability challenges** - Mitigation: Cloud-native architecture, load testing
- **Data security breaches** - Mitigation: Security audits, encryption, compliance
- **Performance degradation** - Mitigation: Performance monitoring, optimization
- **Integration complexity** - Mitigation: Standardized APIs, extensive testing

#### Business Risks
- **Market competition** - Mitigation: Unique features, superior UX
- **User adoption** - Mitigation: Comprehensive onboarding, training programs
- **Pricing pressure** - Mitigation: Value-based pricing, flexible plans
- **Regulatory changes** - Mitigation: Compliance team, regular updates

### Success Criteria

#### Year 1 Goals
- 500+ enterprise customers
- 100,000+ active users
- $50M ARR
- 95% customer retention rate
- 50+ NPS score

#### Long-term Vision (3 Years)
- Market leader in enterprise BI
- 5,000+ enterprise customers
- 1M+ active users
- $500M ARR
- IPO readiness

### Appendices

#### A. Competitive Analysis
- Tableau: Strong visualization, high cost
- Power BI: Microsoft integration, Windows-centric
- Looker: Developer-friendly, complex for business users
- Qlik: Associative model, steep learning curve

#### B. User Research Findings
- 87% of users want self-service analytics
- 73% require mobile access
- 91% value real-time data
- 68% need collaboration features
- 82% prioritize ease of use over features

#### C. Technical Specifications
- Frontend: React 18+, TypeScript, TailwindCSS
- Backend: Node.js, Python microservices
- Database: PostgreSQL, Redis, Elasticsearch
- Infrastructure: AWS/Azure/GCP, Kubernetes
- Monitoring: Datadog, Sentry, CloudWatch

---

*Document Version: 1.0*  
*Last Updated: January 2024*  
*Status: Approved*  
*Owner: Product Management Team*`,
    category: 'Product Documentation',
    type: 'prd',
    author: {
      name: 'Sarah Mitchell',
      avatar: '/avatars/sarah.jpg',
      role: 'Chief Product Officer'
    },
    status: 'published',
    version: '1.0',
    created: '2024-01-10',
    updated: '2024-01-15',
    readTime: 25,
    tags: ['product', 'requirements', 'strategy', 'roadmap', 'features'],
    starred: true,
    bookmarked: false,
    views: 8234,
    likes: 342,
    comments: [],
    toc: [],
    contributors: [
      { name: 'Sarah Mitchell', avatar: '/avatars/sarah.jpg', commits: 45 },
      { name: 'David Chen', avatar: '/avatars/david.jpg', commits: 23 },
      { name: 'Emily Rodriguez', avatar: '/avatars/emily.jpg', commits: 18 },
      { name: 'Michael Brown', avatar: '/avatars/michael.jpg', commits: 12 }
    ],
    relatedDocs: [
      { id: 'frd', title: 'Functional Requirements Document', category: 'Technical Documentation' },
      { id: 'brd', title: 'Business Requirements Document', category: 'Business Documentation' },
      { id: 'api', title: 'API Documentation', category: 'Technical Documentation' }
    ]
  },
  'frd': {
    id: 'frd',
    title: 'Functional Requirements Document (FRD)',
    description: 'Detailed functional specifications and technical requirements for the Enterprise Dashboard Platform implementation.',
    content: `# Functional Requirements Document (FRD)
## Enterprise Dashboard Platform

### Document Information

- **Version:** 2.0
- **Date:** January 2024
- **Status:** Approved
- **Classification:** Confidential

### Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Functional Requirements](#functional-requirements)
4. [User Interface Requirements](#user-interface-requirements)
5. [Data Requirements](#data-requirements)
6. [Security Requirements](#security-requirements)
7. [Performance Requirements](#performance-requirements)
8. [Integration Requirements](#integration-requirements)
9. [Testing Requirements](#testing-requirements)

### Introduction

#### Purpose
This Functional Requirements Document (FRD) provides a detailed specification of the functional requirements for the Enterprise Dashboard Platform. It serves as the primary reference for development teams, quality assurance, and stakeholders to ensure all functional aspects are properly implemented.

#### Scope
This document covers all functional requirements for the Enterprise Dashboard Platform including:
- User management and authentication
- Dashboard creation and management
- Data integration and processing
- Analytics and reporting capabilities
- Collaboration features
- Administrative functions

#### Definitions and Acronyms
- **API:** Application Programming Interface
- **RBAC:** Role-Based Access Control
- **SSO:** Single Sign-On
- **MFA:** Multi-Factor Authentication
- **ETL:** Extract, Transform, Load
- **WebSocket:** Full-duplex communication protocol
- **REST:** Representational State Transfer
- **JSON:** JavaScript Object Notation

### System Overview

#### System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   Web    │  │  Mobile  │  │   API    │  │   CLI    ││
│  │   App    │  │   Apps   │  │ Gateway  │  │  Tools   ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │Dashboard │  │Analytics │  │   Auth   │  │  Admin   ││
│  │ Service  │  │ Service  │  │ Service  │  │ Service  ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │PostgreSQL│  │  Redis   │  │Elastic   │  │   S3     ││
│  │    DB    │  │  Cache   │  │ Search   │  │ Storage  ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└─────────────────────────────────────────────────────────┘
\`\`\`

#### System Components

1. **Frontend Applications**
   - React-based web application
   - React Native mobile applications
   - Progressive Web App (PWA) support

2. **Backend Services**
   - Microservices architecture
   - RESTful APIs
   - GraphQL endpoint
   - WebSocket connections

3. **Data Storage**
   - Primary database (PostgreSQL)
   - Caching layer (Redis)
   - Search engine (Elasticsearch)
   - Object storage (S3)

### Functional Requirements

#### FR-001: User Authentication & Authorization

**FR-001.1: User Registration**
- System shall allow new users to register with email verification
- System shall support social login (Google, Microsoft, LinkedIn)
- System shall enforce password complexity requirements
- System shall prevent duplicate registrations

**FR-001.2: User Login**
- System shall authenticate users via email/password
- System shall support Single Sign-On (SSO) via SAML 2.0
- System shall implement Multi-Factor Authentication (MFA)
- System shall maintain session management with configurable timeout

**FR-001.3: Role-Based Access Control**
- System shall support predefined roles (Admin, Editor, Viewer)
- System shall allow custom role creation
- System shall enforce role-based permissions at API level
- System shall provide role assignment interface

**FR-001.4: Password Management**
- System shall provide password reset via email
- System shall enforce password expiration policies
- System shall maintain password history (last 5)
- System shall implement account lockout after failed attempts

#### FR-002: Dashboard Management

**FR-002.1: Dashboard Creation**
\`\`\`javascript
// Dashboard Creation API
POST /api/v1/dashboards
{
  "name": "Sales Dashboard",
  "description": "Q4 Sales Performance",
  "layout": "grid",
  "widgets": [],
  "permissions": {
    "view": ["all_users"],
    "edit": ["editors", "admins"]
  }
}
\`\`\`

**FR-002.2: Widget Management**
- System shall provide 50+ widget types
- System shall support custom widget creation
- System shall allow widget resizing and repositioning
- System shall maintain widget state across sessions

**FR-002.3: Dashboard Templates**
- System shall provide industry-specific templates
- System shall allow template customization
- System shall support template import/export
- System shall enable template sharing

**FR-002.4: Dashboard Versioning**
- System shall maintain version history
- System shall allow version comparison
- System shall support rollback to previous versions
- System shall track change authors and timestamps

#### FR-003: Data Integration

**FR-003.1: Data Source Connectivity**
\`\`\`yaml
# Supported Data Sources
databases:
  - PostgreSQL
  - MySQL
  - MongoDB
  - Oracle
  - SQL Server
  - Snowflake
  - BigQuery
  - Redshift

apis:
  - REST
  - GraphQL
  - SOAP
  - WebSocket

files:
  - CSV
  - Excel
  - JSON
  - XML
  - Parquet
\`\`\`

**FR-003.2: Data Transformation**
- System shall provide visual ETL pipeline builder
- System shall support data type conversions
- System shall implement data validation rules
- System shall handle error recovery and retry logic

**FR-003.3: Real-time Data Streaming**
- System shall support WebSocket connections
- System shall implement server-sent events (SSE)
- System shall buffer streaming data
- System shall handle connection recovery

**FR-003.4: Data Refresh Scheduling**
- System shall support cron-based scheduling
- System shall allow manual refresh triggers
- System shall implement incremental updates
- System shall notify on refresh completion/failure

#### FR-004: Visualization & Analytics

**FR-004.1: Chart Types**
\`\`\`typescript
enum ChartType {
  // Basic Charts
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  AREA = 'area',
  SCATTER = 'scatter',
  
  // Advanced Charts
  HEATMAP = 'heatmap',
  TREEMAP = 'treemap',
  SANKEY = 'sankey',
  GAUGE = 'gauge',
  RADAR = 'radar',
  
  // Statistical Charts
  BOXPLOT = 'boxplot',
  HISTOGRAM = 'histogram',
  PARETO = 'pareto',
  WATERFALL = 'waterfall',
  
  // Geo Charts
  MAP = 'map',
  CHOROPLETH = 'choropleth',
  BUBBLE_MAP = 'bubble_map'
}
\`\`\`

**FR-004.2: Data Analysis**
- System shall calculate statistical measures (mean, median, std dev)
- System shall perform trend analysis
- System shall detect anomalies using ML algorithms
- System shall generate automated insights

**FR-004.3: Filtering & Drill-down**
- System shall provide global dashboard filters
- System shall support cascading filters
- System shall enable drill-down to detail views
- System shall maintain filter state in URL

**FR-004.4: Predictive Analytics**
- System shall integrate ML models for predictions
- System shall provide confidence intervals
- System shall support what-if scenarios
- System shall visualize prediction accuracy

#### FR-005: Collaboration Features

**FR-005.1: Comments & Annotations**
- System shall allow comments on dashboards
- System shall support @mentions with notifications
- System shall enable threaded discussions
- System shall track comment history

**FR-005.2: Sharing & Permissions**
\`\`\`json
{
  "sharing": {
    "public_link": {
      "enabled": true,
      "expiry": "2024-12-31",
      "password_protected": true
    },
    "embed": {
      "allowed_domains": ["example.com"],
      "responsive": true
    },
    "export": {
      "formats": ["pdf", "excel", "csv"],
      "scheduled": true
    }
  }
}
\`\`\`

**FR-005.3: Real-time Collaboration**
- System shall show active users on dashboard
- System shall synchronize changes in real-time
- System shall implement conflict resolution
- System shall maintain collaboration history

**FR-005.4: Notifications**
- System shall send email notifications
- System shall provide in-app notifications
- System shall support webhook notifications
- System shall allow notification preferences

### User Interface Requirements

#### UI-001: Responsive Design
- Interface shall adapt to screen sizes (320px - 4K)
- Interface shall support touch gestures on mobile
- Interface shall maintain functionality across devices
- Interface shall optimize for performance on mobile

#### UI-002: Accessibility
- Interface shall meet WCAG 2.1 Level AA standards
- Interface shall support keyboard navigation
- Interface shall provide screen reader compatibility
- Interface shall offer high contrast mode

#### UI-003: Theming
- Interface shall support light/dark modes
- Interface shall allow custom color schemes
- Interface shall enable logo customization
- Interface shall support custom CSS injection

#### UI-004: Localization
- Interface shall support 15+ languages
- Interface shall handle RTL languages
- Interface shall format dates/numbers per locale
- Interface shall allow translation management

### Data Requirements

#### DR-001: Data Storage
\`\`\`sql
-- Dashboard Schema
CREATE TABLE dashboards (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  layout JSON NOT NULL,
  config JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  version INTEGER DEFAULT 1,
  is_public BOOLEAN DEFAULT FALSE,
  tags TEXT[]
);

-- Widget Schema
CREATE TABLE widgets (
  id UUID PRIMARY KEY,
  dashboard_id UUID REFERENCES dashboards(id),
  type VARCHAR(50) NOT NULL,
  position JSON NOT NULL,
  data_source_id UUID,
  query TEXT,
  config JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### DR-002: Data Retention
- System shall retain user data for 7 years
- System shall archive inactive dashboards after 1 year
- System shall purge temporary data after 30 days
- System shall compress historical data

#### DR-003: Data Backup
- System shall perform daily incremental backups
- System shall perform weekly full backups
- System shall store backups in geo-redundant storage
- System shall test backup restoration monthly

### Security Requirements

#### SR-001: Authentication Security
- System shall implement OAuth 2.0
- System shall use JWT tokens with refresh
- System shall enforce HTTPS for all communications
- System shall implement rate limiting

#### SR-002: Data Security
\`\`\`python
# Encryption Implementation
from cryptography.fernet import Fernet

class DataEncryption:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    def encrypt_sensitive_data(self, data: str) -> bytes:
        """Encrypt sensitive data at rest"""
        return self.cipher.encrypt(data.encode())
    
    def decrypt_sensitive_data(self, encrypted: bytes) -> str:
        """Decrypt sensitive data"""
        return self.cipher.decrypt(encrypted).decode()
\`\`\`

#### SR-003: Audit Logging
- System shall log all user actions
- System shall log all data access
- System shall log all configuration changes
- System shall retain logs for 1 year

#### SR-004: Compliance
- System shall comply with GDPR requirements
- System shall comply with HIPAA requirements
- System shall comply with SOC 2 Type II
- System shall provide compliance reports

### Performance Requirements

#### PR-001: Response Times
| Operation | Requirement | Target |
|-----------|-------------|--------|
| Page Load | < 3 seconds | 2 seconds |
| Dashboard Refresh | < 5 seconds | 3 seconds |
| Query Execution | < 10 seconds | 5 seconds |
| Export Generation | < 30 seconds | 20 seconds |

#### PR-002: Throughput
- System shall handle 10,000 concurrent users
- System shall process 1,000 requests/second
- System shall support 100 real-time connections/server
- System shall scale horizontally to meet demand

#### PR-003: Availability
- System shall maintain 99.9% uptime
- System shall implement automatic failover
- System shall support zero-downtime deployments
- System shall provide health monitoring endpoints

### Integration Requirements

#### IR-001: API Specifications
\`\`\`yaml
openapi: 3.0.0
info:
  title: Dashboard Platform API
  version: 1.0.0
paths:
  /api/v1/dashboards:
    get:
      summary: List dashboards
      parameters:
        - name: page
          in: query
          schema:
            type: integer
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Dashboard'
\`\`\`

#### IR-002: Webhook Events
- dashboard.created
- dashboard.updated
- dashboard.deleted
- widget.data_refreshed
- alert.triggered
- user.login
- export.completed

#### IR-003: Third-party Integrations
- Slack notifications
- Microsoft Teams integration
- Jira ticket creation
- ServiceNow integration
- Salesforce connectivity

### Testing Requirements

#### TR-001: Unit Testing
- Code coverage shall be minimum 80%
- All critical paths shall have tests
- Tests shall run on every commit
- Tests shall complete within 5 minutes

#### TR-002: Integration Testing
- API endpoints shall be tested
- Database operations shall be tested
- External service mocks shall be used
- Tests shall cover error scenarios

#### TR-003: Performance Testing
\`\`\`javascript
// Performance Test Example
describe('Dashboard Performance', () => {
  it('should load dashboard under 3 seconds', async () => {
    const startTime = Date.now();
    const response = await loadDashboard('dashboard-id');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
    expect(response.status).toBe(200);
  });
  
  it('should handle 1000 concurrent requests', async () => {
    const requests = Array(1000).fill(null).map(() => 
      fetch('/api/v1/dashboards')
    );
    
    const results = await Promise.all(requests);
    const successCount = results.filter(r => r.status === 200).length;
    
    expect(successCount).toBeGreaterThan(950); // 95% success rate
  });
});
\`\`\`

#### TR-004: Security Testing
- Penetration testing quarterly
- Vulnerability scanning weekly
- Security code review for all changes
- OWASP Top 10 compliance testing

### Acceptance Criteria

Each functional requirement must meet the following acceptance criteria:

1. **Functionality:** Feature works as specified
2. **Performance:** Meets performance requirements
3. **Security:** Passes security testing
4. **Usability:** User acceptance testing passed
5. **Documentation:** Complete documentation provided
6. **Testing:** All tests passing with >80% coverage

### Appendices

#### Appendix A: Error Codes
| Code | Description | Resolution |
|------|-------------|------------|
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Authenticate user |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Verify resource exists |
| 429 | Rate Limited | Retry after delay |
| 500 | Server Error | Contact support |

#### Appendix B: API Rate Limits
- Anonymous: 100 requests/hour
- Authenticated: 1,000 requests/hour
- Premium: 10,000 requests/hour
- Enterprise: Unlimited

#### Appendix C: Browser Support Matrix
| Browser | Minimum Version | Full Support |
|---------|----------------|--------------|
| Chrome | 90 | 100+ |
| Firefox | 88 | 100+ |
| Safari | 14 | 15+ |
| Edge | 90 | 100+ |

---

*Document Version: 2.0*  
*Last Updated: January 2024*  
*Status: Approved*  
*Owner: Engineering Team*`,
    category: 'Technical Documentation',
    type: 'frd',
    author: {
      name: 'Alex Thompson',
      avatar: '/avatars/alex.jpg',
      role: 'Lead Software Architect'
    },
    status: 'published',
    version: '2.0',
    created: '2024-01-12',
    updated: '2024-01-18',
    readTime: 30,
    tags: ['functional', 'technical', 'specifications', 'architecture', 'requirements'],
    starred: true,
    bookmarked: true,
    views: 5421,
    likes: 186,
    comments: [],
    toc: [],
    contributors: [
      { name: 'Alex Thompson', avatar: '/avatars/alex.jpg', commits: 67 },
      { name: 'Jennifer Wu', avatar: '/avatars/jennifer.jpg', commits: 34 },
      { name: 'Robert Garcia', avatar: '/avatars/robert.jpg', commits: 28 },
      { name: 'Lisa Park', avatar: '/avatars/lisa.jpg', commits: 19 }
    ],
    relatedDocs: [
      { id: 'prd', title: 'Product Requirements Document', category: 'Product Documentation' },
      { id: 'brd', title: 'Business Requirements Document', category: 'Business Documentation' },
      { id: 'api', title: 'API Documentation', category: 'Technical Documentation' }
    ]
  },
  'brd': {
    id: 'brd',
    title: 'Business Requirements Document (BRD)',
    description: 'Comprehensive business requirements, objectives, and success criteria for the Enterprise Dashboard Platform initiative.',
    content: `# Business Requirements Document (BRD)
## Enterprise Dashboard Platform

### Executive Summary

The Enterprise Dashboard Platform represents a strategic initiative to transform how our organization leverages data for decision-making. This document outlines the business requirements, objectives, and expected outcomes that will guide the development and implementation of a comprehensive business intelligence solution.

### Business Context

#### Current State Analysis

Our organization currently faces significant challenges in data utilization and business intelligence:

**Data Fragmentation**
- 12 different reporting systems across departments
- No unified view of organizational performance
- Average of 4 hours daily spent on manual report generation
- 60% of decisions made without complete data visibility

**Operational Inefficiencies**
- $2.3M annual cost of redundant reporting tools
- 35% of analyst time spent on data preparation
- 48-hour average delay in critical metric reporting
- Limited real-time business visibility

**Competitive Disadvantage**
- Competitors leveraging AI-driven insights
- Market response time 40% slower than industry leaders
- Customer satisfaction impacted by delayed issue resolution
- Lost opportunities due to lack of predictive capabilities

#### Market Analysis

**Industry Trends**
- 73% of enterprises prioritizing data-driven transformation
- Real-time analytics becoming standard expectation
- Self-service BI adoption growing at 29% CAGR
- Cloud-based solutions preferred by 81% of organizations

**Competitive Landscape**
| Competitor | Market Share | Key Strength | Our Gap |
|------------|--------------|--------------|---------|
| Company A | 24% | Real-time analytics | 48-hour delay |
| Company B | 18% | AI predictions | No predictive capability |
| Company C | 15% | User experience | Complex interfaces |
| Company D | 12% | Integration breadth | Limited connectors |

### Business Objectives

#### Strategic Objectives

**1. Accelerate Decision-Making**
- Reduce decision latency from 48 hours to < 1 hour
- Enable real-time visibility into critical KPIs
- Provide predictive insights for proactive decisions
- Democratize data access across all levels

**2. Optimize Operational Efficiency**
- Eliminate redundant reporting systems
- Reduce manual reporting effort by 85%
- Automate routine analytical tasks
- Centralize data governance and quality

**3. Drive Revenue Growth**
- Identify new revenue opportunities through analytics
- Improve customer retention through predictive modeling
- Optimize pricing strategies with market intelligence
- Enable data-driven product development

**4. Enhance Competitive Position**
- Match or exceed industry-standard response times
- Leverage AI/ML for competitive advantage
- Improve customer satisfaction through insights
- Enable innovation through data exploration

#### Financial Objectives

**Cost Reduction Targets**
- Year 1: $1.5M reduction in tool consolidation
- Year 2: $2.8M in productivity improvements
- Year 3: $3.5M in operational efficiencies
- 5-Year TCO: 40% lower than current state

**Revenue Impact**
- 2% increase in revenue through better decisions
- 15% improvement in customer retention
- 10% reduction in customer acquisition costs
- $12M incremental revenue over 3 years

**ROI Projections**
\`\`\`
Year 1: -$2.0M (Investment)
Year 2: +$1.5M (Break-even)
Year 3: +$4.2M (Positive ROI)
5-Year NPV: $8.7M
Payback Period: 18 months
IRR: 127%
\`\`\`

### Business Requirements

#### BR-001: Business Intelligence Capabilities

**BR-001.1: Executive Dashboards**
- Real-time C-suite performance dashboards
- Mobile-first design for on-the-go access
- Customizable KPI scorecards
- Automated exception reporting
- Board-ready presentation formats

**BR-001.2: Departmental Analytics**

*Sales Analytics*
- Pipeline visibility and forecasting
- Territory performance analysis
- Product mix optimization
- Commission calculation automation
- Customer segmentation analysis

*Marketing Analytics*
- Campaign ROI measurement
- Lead scoring and attribution
- Customer journey mapping
- Content performance tracking
- Market trend analysis

*Financial Analytics*
- P&L real-time monitoring
- Cash flow forecasting
- Budget vs. actual analysis
- Cost center performance
- Profitability analysis

*Operations Analytics*
- Supply chain visibility
- Inventory optimization
- Quality metrics tracking
- Resource utilization
- Process efficiency monitoring

*HR Analytics*
- Workforce planning
- Retention analysis
- Performance management
- Recruitment metrics
- Compensation benchmarking

**BR-001.3: Predictive Analytics**
- Demand forecasting with 90% accuracy
- Customer churn prediction
- Revenue forecasting models
- Risk assessment algorithms
- Anomaly detection systems

#### BR-002: Data Governance & Compliance

**BR-002.1: Data Governance Framework**
\`\`\`
Data Governance Structure:
├── Data Governance Council
│   ├── Executive Steering Committee
│   ├── Data Stewards
│   └── Business Representatives
├── Data Policies
│   ├── Data Classification
│   ├── Access Control
│   ├── Retention Policies
│   └── Quality Standards
└── Compliance Framework
    ├── Regulatory Compliance
    ├── Audit Trails
    ├── Privacy Controls
    └── Risk Management
\`\`\`

**BR-002.2: Regulatory Compliance**
- GDPR compliance for EU operations
- CCPA compliance for California data
- SOX compliance for financial reporting
- HIPAA compliance for healthcare data
- Industry-specific regulations adherence

**BR-002.3: Data Quality Management**
- Data quality score > 95%
- Automated data validation
- Master data management
- Data lineage tracking
- Quality improvement workflows

#### BR-003: User Enablement

**BR-003.1: User Adoption Strategy**
- Phased rollout plan by department
- Role-based training programs
- Self-service learning portal
- Power user certification program
- Continuous support model

**BR-003.2: Change Management**
\`\`\`
Change Management Timeline:
Q1 2024: Awareness Campaign
- Executive communications
- Department briefings
- Success story sharing

Q2 2024: Training Rollout
- Role-based training
- Hands-on workshops
- Documentation release

Q3 2024: Adoption Drive
- Gamification program
- User competitions
- Recognition system

Q4 2024: Optimization
- Feedback incorporation
- Advanced training
- Best practice sharing
\`\`\`

**BR-003.3: Support Structure**
- 24/7 help desk for critical issues
- Dedicated business analyst support
- User community forum
- Monthly user group meetings
- Quarterly business reviews

#### BR-004: Integration Requirements

**BR-004.1: System Integration Map**
| System | Type | Priority | Timeline |
|--------|------|----------|----------|
| SAP ERP | Core | Critical | Q1 2024 |
| Salesforce CRM | Core | Critical | Q1 2024 |
| Oracle Financials | Core | Critical | Q1 2024 |
| Workday HCM | Core | High | Q2 2024 |
| ServiceNow | Support | High | Q2 2024 |
| Microsoft 365 | Productivity | Medium | Q3 2024 |
| Marketing Cloud | Marketing | Medium | Q3 2024 |
| Custom Systems | Various | Low | Q4 2024 |

**BR-004.2: Data Integration Strategy**
- Real-time integration for critical systems
- Batch processing for historical data
- API-first integration approach
- Event-driven architecture
- Fallback mechanisms for reliability

**BR-004.3: Process Integration**
- Automated workflow triggers
- Alert-driven actions
- Cross-system data synchronization
- Process orchestration capabilities
- Business rule engine integration

### Stakeholder Analysis

#### Primary Stakeholders

**Executive Leadership**
- *Needs:* Strategic insights, competitive intelligence
- *Success Criteria:* Improved decision speed, ROI achievement
- *Engagement:* Monthly steering committee, quarterly reviews

**Department Heads**
- *Needs:* Operational visibility, team performance
- *Success Criteria:* Efficiency gains, goal achievement
- *Engagement:* Bi-weekly updates, feedback sessions

**Business Analysts**
- *Needs:* Self-service capabilities, advanced analytics
- *Success Criteria:* Reduced manual work, insight quality
- *Engagement:* Daily standups, continuous training

**End Users**
- *Needs:* Easy access to information, intuitive interface
- *Success Criteria:* Time savings, decision confidence
- *Engagement:* User groups, feedback channels

#### RACI Matrix

| Activity | CEO | CFO | CIO | Dept Heads | IT | Users |
|----------|-----|-----|-----|------------|-----|-------|
| Strategy | A | C | R | C | I | I |
| Budget | A | R | C | C | I | I |
| Requirements | I | C | C | R | C | C |
| Implementation | I | I | A | C | R | C |
| Training | I | I | I | A | C | R |
| Adoption | C | C | I | R | C | R |

*R: Responsible, A: Accountable, C: Consulted, I: Informed*

### Success Metrics

#### Key Performance Indicators (KPIs)

**Business KPIs**
| Metric | Baseline | Year 1 Target | Year 3 Target |
|--------|----------|---------------|---------------|
| Decision Speed | 48 hours | 4 hours | < 1 hour |
| Report Automation | 15% | 60% | 85% |
| Data-Driven Decisions | 40% | 70% | 90% |
| User Adoption | N/A | 75% | 95% |
| Cost Reduction | $0 | $1.5M | $3.5M |
| Revenue Impact | $0 | $2M | $12M |

**Operational KPIs**
- System Uptime: 99.9%
- Query Response Time: < 3 seconds
- Data Freshness: < 5 minutes for critical data
- User Satisfaction: > 4.5/5.0
- Support Ticket Resolution: < 4 hours

**Quality KPIs**
- Data Accuracy: > 99%
- Report Accuracy: 100%
- Insight Relevance: > 85%
- Prediction Accuracy: > 90%
- Error Rate: < 0.1%

### Risk Assessment

#### Business Risks

**Risk 1: User Adoption Failure**
- *Probability:* Medium
- *Impact:* High
- *Mitigation:* Comprehensive change management program
- *Contingency:* Phased rollout with early adopter focus

**Risk 2: Data Quality Issues**
- *Probability:* Medium
- *Impact:* High
- *Mitigation:* Data quality framework implementation
- *Contingency:* Manual validation processes

**Risk 3: Integration Complexity**
- *Probability:* High
- *Impact:* Medium
- *Mitigation:* Proven integration patterns, experienced team
- *Contingency:* Prioritized integration approach

**Risk 4: Budget Overrun**
- *Probability:* Low
- *Impact:* High
- *Mitigation:* Fixed-price contracts, phased investment
- *Contingency:* Scope adjustment options

**Risk 5: Regulatory Non-Compliance**
- *Probability:* Low
- *Impact:* Very High
- *Mitigation:* Compliance-first design, regular audits
- *Contingency:* Legal team engagement, insurance

### Implementation Roadmap

#### Phase 1: Foundation (Q1-Q2 2024)
**Deliverables:**
- Core platform deployment
- Critical system integrations
- Executive dashboards
- Basic analytics capabilities

**Milestones:**
- Week 4: Platform selection complete
- Week 8: Infrastructure ready
- Week 12: First dashboards live
- Week 16: Phase 1 complete

#### Phase 2: Expansion (Q3-Q4 2024)
**Deliverables:**
- Department-specific dashboards
- Advanced analytics features
- Mobile applications
- Self-service capabilities

**Milestones:**
- Week 20: All departments onboarded
- Week 24: Mobile apps launched
- Week 28: Self-service enabled
- Week 32: Phase 2 complete

#### Phase 3: Optimization (Q1-Q2 2025)
**Deliverables:**
- AI/ML capabilities
- Predictive analytics
- Process automation
- Advanced integrations

**Milestones:**
- Week 36: ML models deployed
- Week 40: Automation live
- Week 44: Full integration complete
- Week 48: Project complete

### Budget Summary

#### Capital Expenditure (CapEx)
\`\`\`
Software Licenses:        $500,000
Infrastructure:           $300,000
Implementation Services:  $400,000
Training & Certification: $100,000
Total CapEx:            $1,300,000
\`\`\`

#### Operating Expenditure (OpEx)
\`\`\`
Annual Licenses:          $200,000
Cloud Services:           $150,000
Support & Maintenance:    $100,000
Ongoing Training:          $50,000
Total Annual OpEx:        $500,000
\`\`\`

#### Total Cost of Ownership (5 Years)
\`\`\`
Initial Investment:     $1,300,000
5-Year OpEx:           $2,500,000
Total TCO:             $3,800,000
Current State TCO:     $6,300,000
Savings:               $2,500,000 (40%)
\`\`\`

### Governance Structure

#### Steering Committee
- **Chair:** Chief Executive Officer
- **Members:** CFO, CIO, COO, CMO, CHRO
- **Frequency:** Monthly
- **Responsibilities:** Strategic oversight, budget approval, issue escalation

#### Project Management Office
- **Lead:** VP of Business Intelligence
- **Team:** Project managers, business analysts, technical leads
- **Frequency:** Weekly reviews
- **Responsibilities:** Execution management, risk mitigation, stakeholder communication

#### Change Advisory Board
- **Lead:** Change Management Director
- **Members:** Department representatives, user champions
- **Frequency:** Bi-weekly
- **Responsibilities:** Change approval, impact assessment, communication planning

### Conclusion

The Enterprise Dashboard Platform represents a critical investment in our organization's future competitiveness. By consolidating our fragmented reporting landscape into a unified, intelligent platform, we will achieve:

1. **Operational Excellence:** 85% reduction in manual reporting
2. **Financial Performance:** $8.7M NPV over 5 years
3. **Competitive Advantage:** Real-time insights matching industry leaders
4. **Organizational Agility:** Sub-hour decision-making capability

Success requires commitment from all stakeholders, adherence to the implementation roadmap, and continuous focus on user adoption. With proper execution, this initiative will transform our organization into a truly data-driven enterprise.

### Appendices

#### Appendix A: Current System Inventory
[Detailed list of 12 existing reporting systems]

#### Appendix B: Vendor Evaluation Matrix
[Comparison of top 5 platform vendors]

#### Appendix C: Detailed Financial Model
[Complete 5-year financial projection model]

#### Appendix D: Compliance Requirements
[Detailed regulatory compliance checklist]

#### Appendix E: Training Curriculum
[Comprehensive training program outline]

---

*Document Version: 1.5*  
*Last Updated: January 2024*  
*Status: Approved*  
*Owner: Business Strategy Team*  
*Next Review: April 2024*`,
    category: 'Business Documentation',
    type: 'brd',
    author: {
      name: 'Michael Harrison',
      avatar: '/avatars/michael.jpg',
      role: 'VP Business Strategy'
    },
    status: 'published',
    version: '1.5',
    created: '2024-01-08',
    updated: '2024-01-20',
    readTime: 35,
    tags: ['business', 'strategy', 'requirements', 'roi', 'governance'],
    starred: false,
    bookmarked: true,
    views: 4123,
    likes: 98,
    comments: [],
    toc: [],
    contributors: [
      { name: 'Michael Harrison', avatar: '/avatars/michael.jpg', commits: 38 },
      { name: 'Patricia Lee', avatar: '/avatars/patricia.jpg', commits: 22 },
      { name: 'James Wilson', avatar: '/avatars/james.jpg', commits: 15 },
      { name: 'Karen Martinez', avatar: '/avatars/karen.jpg', commits: 11 }
    ],
    relatedDocs: [
      { id: 'prd', title: 'Product Requirements Document', category: 'Product Documentation' },
      { id: 'frd', title: 'Functional Requirements Document', category: 'Technical Documentation' },
      { id: 'roi-analysis', title: 'ROI Analysis Report', category: 'Business Documentation' }
    ]
  }
}

export function getDocument(id: string): Document | undefined {
  return documents[id]
}

export function getAllDocuments(): Document[] {
  return Object.values(documents)
}

export function getDocumentsByCategory(category: string): Document[] {
  return Object.values(documents).filter(doc => doc.category === category)
}

export function getDocumentsByType(type: string): Document[] {
  return Object.values(documents).filter(doc => doc.type === type)
}

export function searchDocuments(query: string): Document[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(documents).filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.description.toLowerCase().includes(lowerQuery) ||
    doc.content.toLowerCase().includes(lowerQuery) ||
    doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}