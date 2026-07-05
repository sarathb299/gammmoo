import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// MySQL Database Connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  connectTimeout: 5000,
};

let dbPool: mysql.Pool | null = null;
let isDbConnected = false;
let dbErrorMsg = "";

// In-memory fallback stores
const inMemoryLeads: any[] = [];
const inMemoryAudits: any[] = [];

/**
 * Checks if the required DB environment variables are configured.
 */
export function isDbConfigured(): boolean {
  return !!(
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_NAME &&
    process.env.DB_PASSWORD
  );
}

/**
 * Automatically initializes the database connection and verifies or creates required tables.
 * This satisfies the 'initializeDatabase' function requirement.
 */
export async function initializeDatabase(): Promise<void> {
  if (!isDbConfigured()) {
    dbErrorMsg = "MySQL Database connection parameters (DB_HOST, DB_USER, DB_NAME, DB_PASSWORD) are not fully configured in environment variables. Running in-memory fallback store.";
    console.warn("⚠️ " + dbErrorMsg);
    return;
  }

  try {
    console.log(`Connecting to MySQL database at ${dbConfig.host}:${dbConfig.port}...`);
    dbPool = mysql.createPool(dbConfig);
    
    // Test the database connection
    await dbPool.query("SELECT 1");
    isDbConnected = true;
    dbErrorMsg = "";
    console.log(`✅ Successfully connected to MySQL database: ${dbConfig.database}`);

    // Automatically check for/create leads table with standard SQL syntax
    const createLeadsTable = `
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        industry VARCHAR(100),
        scaling_goal VARCHAR(100),
        bottleneck VARCHAR(100),
        authority_level VARCHAR(100),
        audience VARCHAR(100),
        competitor_state VARCHAR(100),
        content_capability VARCHAR(100),
        geo_scope VARCHAR(100),
        budget VARCHAR(100),
        business_name VARCHAR(255),
        contact_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        website_url VARCHAR(255),
        custom_goal TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    // Automatically check for/create audits table
    const createAuditsTable = `
      CREATE TABLE IF NOT EXISTS audits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        business_name VARCHAR(255),
        website_url VARCHAR(255),
        niche VARCHAR(255),
        selected_services TEXT,
        goals TEXT,
        seo_score INT,
        aeo_score INT,
        geo_score INT,
        ads_score INT,
        overview TEXT,
        estimated_growth TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await dbPool.query(createLeadsTable);
    await dbPool.query(createAuditsTable);
    console.log("✅ Database tables verified and initialized successfully.");
  } catch (err: any) {
    isDbConnected = false;
    dbErrorMsg = `Failed to connect to MySQL database: ${err.message}`;
    console.error(`❌ ${dbErrorMsg}. Continuing with resilient in-memory fallback store.`);
  }
}

/**
 * Saves a qualified lead record to the database or fallback store.
 */
export async function saveLead(lead: any): Promise<void> {
  const cleanLead = {
    industry: lead.industry || "custom",
    scalingGoal: lead.scalingGoal || "brand",
    bottleneck: lead.bottleneck || "aeo",
    authorityLevel: lead.authorityLevel || "New Entity",
    audience: lead.audience || "Premium Audience",
    competitorState: lead.competitorState || "Active",
    contentCapability: lead.contentCapability || "In-house",
    geoScope: lead.geoScope || "Metropolitan",
    budget: lead.budget || "Baseline",
    businessName: lead.businessName || "",
    contactName: lead.contactName || "",
    email: lead.email || "",
    phone: lead.phone || "",
    websiteUrl: lead.websiteUrl || "",
    customGoal: lead.customGoal || ""
  };

  if (isDbConnected && dbPool) {
    try {
      const query = `
        INSERT INTO leads (
          industry, scaling_goal, bottleneck, authority_level, audience,
          competitor_state, content_capability, geo_scope, budget,
          business_name, contact_name, email, phone, website_url, custom_goal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await dbPool.query(query, [
        cleanLead.industry,
        cleanLead.scalingGoal,
        cleanLead.bottleneck,
        cleanLead.authorityLevel,
        cleanLead.audience,
        cleanLead.competitorState,
        cleanLead.contentCapability,
        cleanLead.geoScope,
        cleanLead.budget,
        cleanLead.businessName,
        cleanLead.contactName,
        cleanLead.email,
        cleanLead.phone,
        cleanLead.websiteUrl,
        cleanLead.customGoal
      ]);
      console.log(`✅ Stored lead for "${cleanLead.businessName}" in MySQL database.`);
    } catch (err: any) {
      console.error("❌ Failed to insert lead into MySQL, falling back to memory:", err);
      inMemoryLeads.unshift({ ...cleanLead, created_at: new Date().toISOString() });
    }
  } else {
    console.log(`ℹ️ Database offline/unconfigured. Stored lead for "${cleanLead.businessName}" in-memory.`);
    inMemoryLeads.unshift({ ...cleanLead, created_at: new Date().toISOString() });
  }
}

/**
 * Saves an audit assessment to the database or fallback store.
 */
export async function saveAudit(audit: any): Promise<void> {
  const cleanAudit = {
    businessName: audit.businessName || "",
    websiteUrl: audit.websiteUrl || "",
    niche: audit.niche || "",
    selectedServices: Array.isArray(audit.selectedServices) ? JSON.stringify(audit.selectedServices) : JSON.stringify([]),
    goals: audit.goals || "",
    seoScore: parseInt(audit.seoScore || "0", 10),
    aeoScore: parseInt(audit.aeoScore || "0", 10),
    geoScore: parseInt(audit.geoScore || "0", 10),
    adsScore: parseInt(audit.adsScore || "0", 10),
    overview: audit.overview || "",
    estimatedGrowth: audit.estimatedGrowth || ""
  };

  if (isDbConnected && dbPool) {
    try {
      const query = `
        INSERT INTO audits (
          business_name, website_url, niche, selected_services, goals,
          seo_score, aeo_score, geo_score, ads_score, overview, estimated_growth
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await dbPool.query(query, [
        cleanAudit.businessName,
        cleanAudit.websiteUrl,
        cleanAudit.niche,
        cleanAudit.selectedServices,
        cleanAudit.goals,
        cleanAudit.seoScore,
        cleanAudit.aeoScore,
        cleanAudit.geoScore,
        cleanAudit.adsScore,
        cleanAudit.overview,
        cleanAudit.estimatedGrowth
      ]);
      console.log(`✅ Stored audit report for "${cleanAudit.businessName}" in MySQL database.`);
    } catch (err: any) {
      console.error("❌ Failed to insert audit into MySQL, falling back to memory:", err);
      inMemoryAudits.unshift({ ...cleanAudit, created_at: new Date().toISOString() });
    }
  } else {
    console.log(`ℹ️ Database offline/unconfigured. Stored audit report for "${cleanAudit.businessName}" in-memory.`);
    inMemoryAudits.unshift({ ...cleanAudit, created_at: new Date().toISOString() });
  }
}

/**
 * Returns connection diagnostic status and counts.
 */
export async function getDbStatus(): Promise<any> {
  let leadsCount = 0;
  let auditsCount = 0;

  if (isDbConnected && dbPool) {
    try {
      const [leadsRows]: any = await dbPool.query("SELECT COUNT(*) as count FROM leads");
      leadsCount = leadsRows[0]?.count || 0;

      const [auditsRows]: any = await dbPool.query("SELECT COUNT(*) as count FROM audits");
      auditsCount = auditsRows[0]?.count || 0;
    } catch (err) {
      console.error("Error fetching table counts from MySQL:", err);
      leadsCount = inMemoryLeads.length;
      auditsCount = inMemoryAudits.length;
    }
  } else {
    leadsCount = inMemoryLeads.length;
    auditsCount = inMemoryAudits.length;
  }

  return {
    isConfigured: isDbConfigured(),
    connected: isDbConnected,
    host: dbConfig.host || "Not specified",
    database: dbConfig.database || "Not specified",
    user: dbConfig.user || "Not specified",
    port: dbConfig.port,
    errorMessage: dbErrorMsg,
    leadsCount,
    auditsCount
  };
}

/**
 * Retrieves records for leads and audits.
 */
export async function getDbRecords(): Promise<any> {
  let leads: any[] = [];
  let audits: any[] = [];

  if (isDbConnected && dbPool) {
    try {
      const [leadsRows]: any = await dbPool.query("SELECT * FROM leads ORDER BY id DESC LIMIT 50");
      leads = leadsRows.map((row: any) => ({
        id: row.id,
        industry: row.industry,
        scalingGoal: row.scaling_goal,
        bottleneck: row.bottleneck,
        authorityLevel: row.authority_level,
        audience: row.audience,
        competitorState: row.competitor_state,
        contentCapability: row.content_capability,
        geoScope: row.geo_scope,
        budget: row.budget,
        businessName: row.business_name,
        contactName: row.contact_name,
        email: row.email,
        phone: row.phone,
        websiteUrl: row.website_url,
        customGoal: row.custom_goal,
        created_at: row.created_at
      }));

      const [auditsRows]: any = await dbPool.query("SELECT * FROM audits ORDER BY id DESC LIMIT 50");
      audits = auditsRows.map((row: any) => ({
        id: row.id,
        businessName: row.business_name,
        websiteUrl: row.website_url,
        niche: row.niche,
        selectedServices: JSON.parse(row.selected_services || "[]"),
        goals: row.goals,
        seoScore: row.seo_score,
        aeoScore: row.aeo_score,
        geoScore: row.geo_score,
        adsScore: row.ads_score,
        overview: row.overview,
        estimatedGrowth: row.estimated_growth,
        created_at: row.created_at
      }));
    } catch (err: any) {
      console.error("Error retrieving records from MySQL:", err);
      leads = inMemoryLeads;
      audits = inMemoryAudits;
    }
  } else {
    leads = inMemoryLeads;
    audits = inMemoryAudits;
  }

  return { leads, audits };
}
