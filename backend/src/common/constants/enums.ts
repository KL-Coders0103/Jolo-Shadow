export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  TEAM_LEAD = "TEAM_LEAD",
  EMPLOYEE = "EMPLOYEE",
}

export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  INACTIVE = "INACTIVE",
}

export enum SubscriptionPlan {
  FREE = "FREE",
  STARTER = "STARTER",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ProjectPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}