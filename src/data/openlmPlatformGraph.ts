export type PlatformNodeGroup =
  | 'infra'
  | 'db'
  | 'core'
  | 'collection'
  | 'automation'
  | 'reporting'
  | 'integration'
  | 'external';

export type PlatformNode = {
  id: string;
  label: string;
  group: PlatformNodeGroup;
  href?: string;
  description?: string;
};

export type PlatformEdgeKind =
  | 'dependsOn'
  | 'consumesFrom'
  | 'producesTo'
  | 'storesIn'
  | 'integratesWith';

export type PlatformEdge = {
  from: string;
  to: string;
  kind: PlatformEdgeKind;
  description?: string;
};

export const OPENLM_PLATFORM_NODES: PlatformNode[] = [
  { id: 'kafka', label: 'Kafka Event Stream', group: 'infra' },
  { id: 'spark', label: 'Apache Spark', group: 'infra' },
  { id: 'mongodb', label: 'MongoDB', group: 'db' },
  { id: 'identity-db', label: 'Identity DB (RDBMS)', group: 'db' },
  { id: 'reporting-db', label: 'Reporting DB', group: 'db' },

  { id: 'identity', label: 'Identity', group: 'core', href: '/cloud/services/openlm-administration/identity' },
  { id: 'users-and-groups', label: 'Users and Groups', group: 'core', href: '/cloud/services/users/users-and-groups' },
  { id: 'products', label: 'Products', group: 'core', href: '/cloud/services/openlm-administration/products' },
  { id: 'projects', label: 'Projects', group: 'core', href: '/cloud/services/users/projects' },
  { id: 'personal-dashboard', label: 'Personal Dashboard', group: 'core', href: '/cloud/services/users/personal-dashboard' },
  { id: 'homepage', label: 'Homepage', group: 'core', href: '/cloud/services/openlm-administration/homepage' },
  { id: 'ui-configurations', label: 'UI Configurations', group: 'core', href: '/cloud/services/openlm-administration/ui-configuration' },
  {
    id: 'database-configuration-tool',
    label: 'Database Configuration Tool',
    group: 'core',
    href: '/cloud/services/openlm-administration/database-configuration-tool',
  },
  { id: 'license-manager', label: 'License Manager', group: 'core', href: '/cloud/services/openlm-administration/license-manager' },
  { id: 'licenses', label: 'Licenses', group: 'core', href: '/cloud/services/slm/licenses' },
  { id: 'license-servers', label: 'License Servers', group: 'core', href: '/cloud/services/slm/license-servers' },
  { id: 'license-allocations', label: 'License Allocations', group: 'core', href: '/cloud/services/slm/license-allocations' },
  { id: 'lfm', label: 'License File Management', group: 'core', href: '/cloud/services/lfm' },
  { id: 'vlm', label: 'Virtual License Manager', group: 'core', href: '/cloud/services/vlm' },

  { id: 'agents-hub', label: 'Agents Hub', group: 'collection', href: '/cloud/services/data-collection/agents_hub' },
  { id: 'broker-hub', label: 'Broker Hub', group: 'collection', href: '/cloud/services/data-collection/broker-hub' },
  { id: 'cloud-broker', label: 'Cloud Broker', group: 'collection', href: '/cloud/services/data-collection/cloud-broker' },
  { id: 'directory-sync', label: 'Directory Sync', group: 'collection', href: '/cloud/services/users/directory-sync' },
  {
    id: 'agent-activity-manager',
    label: 'Agent Activity Manager',
    group: 'collection',
    href: '/cloud/services/data-collection/agent_activity_manager',
  },
  { id: 'process-manager', label: 'Process Manager', group: 'collection', href: '/cloud/services/data-collection/process-manager' },
  { id: 'dongle-monitoring', label: 'Dongle Monitoring', group: 'collection', href: '/cloud/services/dongle-monitoring' },

  { id: 'alerts', label: 'Alerts', group: 'automation', href: '/cloud/services/automations/alerts' },
  { id: 'notifications', label: 'Notifications', group: 'automation', href: '/cloud/services/automations/notifications' },
  { id: 'lac', label: 'License Access Control', group: 'automation', href: '/cloud/services/automations/lac' },
  {
    id: 'subscription-optimizer',
    label: 'Subscription Optimizer',
    group: 'automation',
    href: '/cloud/services/automations/subscription-optimizer',
  },
  { id: 'compliance', label: 'Compliance', group: 'automation', href: '/cloud/services/compliance' },
  { id: 'audit', label: 'Audit', group: 'automation', href: '/cloud/services/openlm-administration/audit' },
  { id: 'sam', label: 'Software Asset Management', group: 'automation', href: '/cloud/services/sam' },

  { id: 'enrichment-service', label: 'Enrichment Service', group: 'reporting' },
  { id: 'reporting-service', label: 'Reporting Service', group: 'reporting', href: '/cloud/reporting' },
  { id: 'usage-report', label: 'Usage', group: 'reporting', href: '/cloud/reporting/ui-reports/usage' },
  { id: 'denials-report', label: 'Denials', group: 'reporting', href: '/cloud/reporting/ui-reports/denials' },
  { id: 'process-sessions-report', label: 'Process Sessions', group: 'reporting', href: '/cloud/reporting/ui-reports/process-sessions' },
  { id: 'touch-point-events-report', label: 'Touch Point Events', group: 'reporting', href: '/cloud/reporting/ui-reports/touch-point-events' },

  {
    id: 'freshworks-alerts-integration',
    label: 'Freshworks Alerts Integration',
    group: 'integration',
    href: '/cloud/services/integrations/freshworks-alerts',
  },
  {
    id: 'salesforce-alerts-integration',
    label: 'Salesforce Alerts Integration',
    group: 'integration',
    href: '/cloud/services/integrations/salesforce-alerts',
  },
  { id: 'zoho-alerts-integration', label: 'Zoho Alerts Integration', group: 'integration', href: '/cloud/services/integrations/zoho-alerts' },
  { id: 'servicenow-connector', label: 'ServiceNow Connector', group: 'integration' },

  { id: 'workstation-agent', label: 'Workstation Agents', group: 'external' },
  { id: 'brokers', label: 'Brokers', group: 'external' },
  { id: 'external-directory', label: 'External Directory (LDAP/AD)', group: 'external' },
  { id: 'security-service', label: 'Security Service', group: 'external' },
];

export const OPENLM_PLATFORM_EDGES: PlatformEdge[] = [
  { from: 'identity', to: 'identity-db', kind: 'storesIn' },
  { from: 'identity', to: 'kafka', kind: 'producesTo' },

  { from: 'personal-dashboard', to: 'identity', kind: 'dependsOn' },
  { from: 'personal-dashboard', to: 'workstation-agent', kind: 'dependsOn' },

  { from: 'directory-sync', to: 'identity', kind: 'dependsOn' },
  { from: 'directory-sync', to: 'external-directory', kind: 'dependsOn' },
  { from: 'directory-sync', to: 'mongodb', kind: 'storesIn' },

  { from: 'workstation-agent', to: 'agents-hub', kind: 'producesTo' },
  { from: 'agents-hub', to: 'kafka', kind: 'producesTo' },
  { from: 'agents-hub', to: 'mongodb', kind: 'storesIn' },

  { from: 'brokers', to: 'broker-hub', kind: 'producesTo' },
  { from: 'cloud-broker', to: 'broker-hub', kind: 'producesTo' },
  { from: 'broker-hub', to: 'kafka', kind: 'producesTo' },
  { from: 'broker-hub', to: 'mongodb', kind: 'storesIn' },

  { from: 'agent-activity-manager', to: 'agents-hub', kind: 'consumesFrom' },
  { from: 'agent-activity-manager', to: 'mongodb', kind: 'storesIn' },

  { from: 'process-manager', to: 'agents-hub', kind: 'consumesFrom' },
  { from: 'process-manager', to: 'mongodb', kind: 'storesIn' },

  { from: 'dongle-monitoring', to: 'broker-hub', kind: 'consumesFrom' },
  { from: 'dongle-monitoring', to: 'mongodb', kind: 'storesIn' },

  { from: 'enrichment-service', to: 'agents-hub', kind: 'consumesFrom' },
  { from: 'enrichment-service', to: 'broker-hub', kind: 'consumesFrom' },
  { from: 'enrichment-service', to: 'kafka', kind: 'consumesFrom' },
  { from: 'enrichment-service', to: 'kafka', kind: 'producesTo' },

  { from: 'spark', to: 'kafka', kind: 'consumesFrom' },
  { from: 'spark', to: 'reporting-db', kind: 'storesIn' },

  { from: 'reporting-service', to: 'enrichment-service', kind: 'dependsOn' },
  { from: 'reporting-service', to: 'kafka', kind: 'consumesFrom' },
  { from: 'reporting-service', to: 'reporting-db', kind: 'dependsOn' },

  { from: 'usage-report', to: 'reporting-service', kind: 'dependsOn' },
  { from: 'denials-report', to: 'reporting-service', kind: 'dependsOn' },
  { from: 'process-sessions-report', to: 'reporting-service', kind: 'dependsOn' },
  { from: 'touch-point-events-report', to: 'reporting-service', kind: 'dependsOn' },

  { from: 'alerts', to: 'kafka', kind: 'consumesFrom' },
  { from: 'alerts', to: 'mongodb', kind: 'storesIn' },
  { from: 'alerts', to: 'freshworks-alerts-integration', kind: 'integratesWith' },
  { from: 'alerts', to: 'salesforce-alerts-integration', kind: 'integratesWith' },
  { from: 'alerts', to: 'zoho-alerts-integration', kind: 'integratesWith' },
  { from: 'alerts', to: 'servicenow-connector', kind: 'integratesWith' },

  { from: 'notifications', to: 'kafka', kind: 'consumesFrom' },
  { from: 'notifications', to: 'mongodb', kind: 'storesIn' },
  { from: 'notifications', to: 'servicenow-connector', kind: 'integratesWith' },

  { from: 'subscription-optimizer', to: 'process-manager', kind: 'consumesFrom' },
  { from: 'subscription-optimizer', to: 'lac', kind: 'dependsOn' },
  { from: 'subscription-optimizer', to: 'notifications', kind: 'dependsOn' },

  { from: 'lac', to: 'broker-hub', kind: 'dependsOn' },
  { from: 'lac', to: 'identity', kind: 'dependsOn' },
  { from: 'lac', to: 'mongodb', kind: 'storesIn' },

  { from: 'audit', to: 'broker-hub', kind: 'dependsOn' },
  { from: 'audit', to: 'security-service', kind: 'dependsOn' },
  { from: 'audit', to: 'mongodb', kind: 'storesIn' },

  { from: 'compliance', to: 'broker-hub', kind: 'dependsOn' },
  { from: 'compliance', to: 'workstation-agent', kind: 'dependsOn' },
  { from: 'compliance', to: 'mongodb', kind: 'storesIn' },

  { from: 'projects', to: 'directory-sync', kind: 'dependsOn' },
  { from: 'projects', to: 'agents-hub', kind: 'dependsOn' },
  { from: 'projects', to: 'mongodb', kind: 'storesIn' },

  { from: 'products', to: 'reporting-service', kind: 'dependsOn' },
  { from: 'products', to: 'mongodb', kind: 'storesIn' },

  { from: 'sam', to: 'reporting-service', kind: 'dependsOn' },
  { from: 'sam', to: 'mongodb', kind: 'storesIn' },
];
