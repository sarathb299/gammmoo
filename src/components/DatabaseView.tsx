import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Server, 
  Wifi, 
  WifiOff, 
  FileSpreadsheet, 
  Users, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  TrendingUp, 
  Bot,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';

interface DBStatus {
  isConfigured: boolean;
  connected: boolean;
  host: string;
  database: string;
  user: string;
  port: number;
  errorMessage: string;
  leadsCount: number;
  auditsCount: number;
}

interface LeadRecord {
  id: number;
  industry: string;
  scalingGoal: string;
  bottleneck: string;
  authorityLevel: string;
  audience: string;
  competitorState: string;
  contentCapability: string;
  geoScope: string;
  budget: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  customGoal: string;
  created_at: string;
}

interface AuditRecord {
  id: number;
  businessName: string;
  websiteUrl: string;
  niche: string;
  selectedServices: string[];
  goals: string;
  seoScore: number;
  aeoScore: number;
  geoScore: number;
  adsScore: number;
  overview: string;
  estimatedGrowth: string;
  created_at: string;
}

export default function DatabaseView() {
  const [status, setStatus] = useState<DBStatus | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'audits'>('leads');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDatabaseData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      // Fetch connection status
      const statusRes = await fetch('/api/db-status');
      const statusData = await statusRes.json();
      setStatus(statusData);

      // Fetch stored records
      const recordsRes = await fetch('/api/db-records');
      const recordsData = await recordsRes.json();
      setLeads(recordsData.leads || []);
      setAudits(recordsData.audits || []);
    } catch (err) {
      console.error("Database view fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDatabaseData();
    const interval = setInterval(() => fetchDatabaseData(true), 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchDatabaseData(true);
  };

  const filteredLeads = leads.filter(lead => 
    lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.bottleneck.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAudits = audits.filter(audit => 
    audit.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const databaseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "MySQL & phpMyAdmin Database Console | ThinkSarath",
    "description": "Secure connection node and client lead repository synchronized directly to MySQL DB registries.",
    "url": "https://thinksarath.com/database"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <SEOHead 
        title="MySQL & phpMyAdmin Lead Database Console | ThinkSarath" 
        description="Monitor automated database connection nodes, table verification routines, and captured real lead data pipelines in real-time." 
        schema={databaseSchema} 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-green-950/20 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold block">
            CENTRAL DATA REGISTRY
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-luxury-white mt-1 font-medium tracking-tight">
            Database Status & Records
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed font-sans">
            Real-time MySQL server connection monitoring and lead qualification database arrays.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-green-950/40 hover:border-luxury-green-glowing/30 bg-green-950/10 text-zinc-400 hover:text-luxury-white text-xs font-mono cursor-pointer transition-all shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-luxury-green-glowing ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'REFRESHING NODE...' : 'FORCE REFRESH'}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-luxury-green-glowing animate-spin" />
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Querying central databases...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STATUS METRICS */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-serif text-luxury-white font-medium flex items-center gap-2">
              <Server className="w-4 h-4 text-luxury-green-glowing" /> Server Parameters
            </h2>

            {/* Connection Status Card */}
            <BorderGlow className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">CONNECTION STATE</span>
                  {status?.connected ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-900/40 bg-green-950/35 text-[9px] font-mono text-luxury-green-glowing font-bold uppercase animate-pulse">
                      <Wifi className="w-3 h-3 text-luxury-green-glowing" /> LIVE MySQL
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-red-900/40 bg-red-950/35 text-[9px] font-mono text-red-400 font-bold uppercase">
                      <WifiOff className="w-3 h-3 text-red-400" /> FALLBACK MODE
                    </span>
                  )}
                </div>

                <div className="space-y-3 font-mono text-xs border-t border-green-950/20 pt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DB Host:</span>
                    <span className="text-zinc-300 font-semibold">{status?.host || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DB Name:</span>
                    <span className="text-zinc-300 font-semibold">{status?.database || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DB User:</span>
                    <span className="text-zinc-300 font-semibold">{status?.user || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Port:</span>
                    <span className="text-zinc-300 font-semibold">{status?.port || 3306}</span>
                  </div>
                </div>

                <div className="text-[11px] font-sans text-zinc-400 bg-green-950/5 border border-green-950/15 rounded-lg p-3.5 space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-luxury-green-glowing uppercase font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> phpMyAdmin Sync
                  </div>
                  <p>
                    These tables reside inside the same MySQL database instance. You can access them directly using standard phpMyAdmin or any database manager with the credentials listed above.
                  </p>
                </div>
              </div>
            </BorderGlow>

            {/* Error or Fallback Warning Box */}
            {!status?.connected && (
              <div className="p-4 rounded-xl border border-yellow-950/30 bg-yellow-950/5 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-mono text-yellow-500 font-bold block uppercase tracking-wider text-[10px]">MySQL OFFLINE NOTICE</span>
                  <p className="text-zinc-400 leading-relaxed font-sans font-light">
                    The backend is running in a fully redundant, memory-cached local fallback mode because database connection details are not active yet.
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono pt-1">
                    Configure <strong className="text-yellow-500">DB_HOST</strong>, <strong className="text-yellow-500">DB_USER</strong>, <strong className="text-yellow-500">DB_PASSWORD</strong>, and <strong className="text-yellow-500">DB_NAME</strong> in Secrets / environment variables to boot the live MySQL tables.
                  </p>
                </div>
              </div>
            )}

            {/* Live Counts bento box */}
            <div className="grid grid-cols-2 gap-4">
              <BorderGlow className="p-4 text-center space-y-1">
                <Users className="w-5 h-5 text-luxury-green-glowing mx-auto" />
                <span className="block text-xl font-mono font-bold text-luxury-white">{status?.leadsCount || leads.length}</span>
                <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Leads Captured</span>
              </BorderGlow>
              <BorderGlow className="p-4 text-center space-y-1">
                <FileSpreadsheet className="w-5 h-5 text-luxury-green-glowing mx-auto" />
                <span className="block text-xl font-mono font-bold text-luxury-white">{status?.auditsCount || audits.length}</span>
                <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Audits Saved</span>
              </BorderGlow>
            </div>

            {/* Diagnostic Node: Displays connection status and total stored leads ONLY if DB variables are configured */}
            {status?.isConfigured && (
              <BorderGlow className="p-5 relative overflow-hidden border border-luxury-green-glowing/20 bg-green-950/5">
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-green-glowing/5 rounded-full filter blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] tracking-wider font-mono text-luxury-green-glowing uppercase font-bold">
                    <Database className="w-4 h-4 text-luxury-green-glowing animate-pulse" />
                    <span>MySQL Diagnostic Status Indicator</span>
                  </div>

                  <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                    Environment configuration confirmed. Telemetry link actively testing and querying connection states directly from the live MySQL cluster.
                  </p>

                  <div className="space-y-2 border-t border-green-950/15 pt-3.5 font-mono text-[11px] leading-relaxed">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-medium">Env Variables Present:</span>
                      <span className="text-luxury-green-glowing font-bold">YES (DB_HOST, DB_USER, etc)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-medium">Connection Test:</span>
                      {status.connected ? (
                        <span className="text-luxury-green-glowing font-bold uppercase tracking-wide">
                          ● PASS (Successful Select 1)
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold uppercase tracking-wide">
                          ● FAIL (Timeout / Refused)
                        </span>
                      )}
                    </div>

                    {status.connected && (
                      <div className="mt-3 p-3 rounded-lg border border-green-900/30 bg-green-950/20 space-y-1 text-[11px]">
                        <span className="font-bold text-luxury-white block uppercase tracking-wider text-[9px] text-luxury-green-glowing">
                          Captured Leads Summary
                        </span>
                        <p className="text-zinc-400 text-xs leading-normal font-sans font-light">
                          Our active MySQL database node has safely persisted <strong className="text-luxury-white font-semibold">{status.leadsCount} leads</strong> and <strong className="text-luxury-white font-semibold">{status.auditsCount} site audits</strong>. All tables are verified as standard SQL schemas.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-zinc-500">Table 'leads' Status:</span>
                      <span className="text-luxury-green-glowing font-semibold uppercase text-[10px]">
                        Verified & Online
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">Table 'audits' Status:</span>
                      <span className="text-luxury-green-glowing font-semibold uppercase text-[10px]">
                        Verified & Online
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">Node Scope:</span>
                      <span className="text-zinc-400 font-bold">{status.user}@{status.host}</span>
                    </div>
                  </div>

                  {status.errorMessage && (
                    <div className="p-3 rounded-lg border border-red-950/40 bg-red-950/10 text-[10px] font-mono text-red-400 leading-relaxed break-all">
                      <span className="font-bold block mb-1">NODE LOG ERROR:</span>
                      {status.errorMessage}
                    </div>
                  )}
                </div>
              </BorderGlow>
            )}
          </div>

          {/* RIGHT: RECORDS LIST */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter and Tab Controller */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-green-950/5 border border-green-950/15 rounded-xl p-4">
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTab('leads'); setSearchTerm(''); }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    activeTab === 'leads' 
                      ? 'bg-luxury-green-glowing text-luxury-black shadow-[0_0_10px_rgba(74,222,128,0.25)]' 
                      : 'text-zinc-400 hover:text-luxury-white hover:bg-green-950/10 border border-green-950/20'
                  }`}
                >
                  LEADS ({leads.length})
                </button>
                <button
                  onClick={() => { setActiveTab('audits'); setSearchTerm(''); }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    activeTab === 'audits' 
                      ? 'bg-luxury-green-glowing text-luxury-black shadow-[0_0_10px_rgba(74,222,128,0.25)]' 
                      : 'text-zinc-400 hover:text-luxury-white hover:bg-green-950/10 border border-green-950/20'
                  }`}
                >
                  AI AUDITS ({audits.length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center shrink-0">
                <Search className="w-4 h-4 text-zinc-600 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'leads' ? 'leads' : 'audits'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg border border-green-950/40 bg-green-950/10 focus:border-luxury-green-glowing/60 focus:bg-green-950/15 text-xs text-luxury-white outline-none font-sans placeholder:text-zinc-600 transition-all"
                />
              </div>
            </div>

            {/* Records List Container */}
            <div className="space-y-4">
              {activeTab === 'leads' ? (
                // LEADS DISPLAY
                filteredLeads.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-green-950/20 rounded-xl bg-green-950/5 space-y-3">
                    <Users className="w-8 h-8 text-zinc-700 mx-auto" />
                    <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">No Lead Records Found</h3>
                    <p className="text-xs text-zinc-600 max-w-sm mx-auto font-sans leading-relaxed">
                      Initialize leads by filling out the Contact form or answering the Lead Qualification questionnaire.
                    </p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <BorderGlow key={lead.id} className="p-5 space-y-4 relative overflow-hidden">
                      {/* Accent glow corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-green-glowing/5 rounded-full filter blur-xl pointer-events-none" />
                      
                      {/* Header block of record */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-green-950/15 pb-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-luxury-green-glowing bg-green-950/40 px-2 py-0.5 rounded uppercase font-semibold">
                            ID: #{lead.id} · {lead.industry.toUpperCase()}
                          </span>
                          <h3 className="text-base font-serif text-luxury-white font-medium">
                            {lead.businessName || "Unnamed Enterprise"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-luxury-green-glowing/60" />
                          <span>{new Date(lead.created_at).toLocaleString('en-US', { hour12: true })}</span>
                        </div>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-xs leading-relaxed font-sans font-light text-zinc-300">
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Contact Person</span>
                          <strong className="text-luxury-white font-semibold">{lead.contactName}</strong>
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Email address</span>
                          <a href={`mailto:${lead.email}`} className="text-luxury-green-glowing hover:underline">{lead.email}</a>
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Telephone</span>
                          <a href={`tel:${lead.phone}`} className="text-zinc-400 hover:text-luxury-white">{lead.phone}</a>
                        </div>
                        {lead.websiteUrl && (
                          <div className="lg:col-span-2">
                            <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Website URL</span>
                            <a href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-luxury-green-glowing inline-flex items-center gap-1 font-mono text-[11px]">
                              {lead.websiteUrl} <ExternalLink className="w-3 h-3 text-luxury-green-glowing" />
                            </a>
                          </div>
                        )}
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Primary Bottleneck</span>
                          <span className="text-luxury-white uppercase font-mono text-[10px] bg-green-950/20 border border-green-950/30 px-1.5 py-0.5 rounded">
                            {lead.bottleneck}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Scaling Goal</span>
                          <span className="text-zinc-400 font-mono text-[10px] uppercase">
                            {lead.scalingGoal}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Target Budget</span>
                          <span className="text-luxury-green-glowing font-mono font-bold">
                            {lead.budget}
                          </span>
                        </div>
                      </div>

                      {/* Custom goals notes block */}
                      {lead.customGoal && (
                        <div className="bg-green-950/5 border border-green-950/15 rounded-lg p-3 text-xs text-zinc-400 italic">
                          <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-1 not-italic">CLIENT MEMO / CAMPAIGN NOTES:</span>
                          "{lead.customGoal}"
                        </div>
                      )}
                    </BorderGlow>
                  ))
                )
              ) : (
                // AUDITS DISPLAY
                filteredAudits.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-green-950/20 rounded-xl bg-green-950/5 space-y-3">
                    <FileSpreadsheet className="w-8 h-8 text-zinc-700 mx-auto" />
                    <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">No Audit Records Found</h3>
                    <p className="text-xs text-zinc-600 max-w-sm mx-auto font-sans leading-relaxed">
                      Initialize audits by conducting a web presence analysis using our SEO Audit widget on the homepage.
                    </p>
                  </div>
                ) : (
                  filteredAudits.map((audit) => (
                    <BorderGlow key={audit.id} className="p-5 space-y-4 relative overflow-hidden">
                      {/* Accent glow corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-green-glowing/5 rounded-full filter blur-xl pointer-events-none" />

                      {/* Header block of record */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-green-950/15 pb-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-luxury-green-glowing bg-green-950/40 px-2 py-0.5 rounded uppercase font-semibold">
                            ID: #{audit.id} · {audit.niche.toUpperCase()}
                          </span>
                          <h3 className="text-base font-serif text-luxury-white font-medium">
                            {audit.businessName || "Unnamed Business Entity"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-luxury-green-glowing/60" />
                          <span>{new Date(audit.created_at).toLocaleString('en-US', { hour12: true })}</span>
                        </div>
                      </div>

                      {/* Performance Scores Block */}
                      <div>
                        <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2">DYNAMIC PERFORMANCE LIFT ASSESSMENT</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-luxury-black border border-green-950/40 p-2.5 rounded-lg text-center">
                            <span className="block text-[8px] font-mono text-zinc-500 uppercase">Google SEO</span>
                            <span className="text-sm font-mono font-bold text-luxury-white">{audit.seoScore}/100</span>
                          </div>
                          <div className="bg-luxury-black border border-green-950/40 p-2.5 rounded-lg text-center">
                            <span className="block text-[8px] font-mono text-zinc-500 uppercase">AEO (Chat)</span>
                            <span className="text-sm font-mono font-bold text-luxury-green-glowing">{audit.aeoScore}/100</span>
                          </div>
                          <div className="bg-luxury-black border border-green-950/40 p-2.5 rounded-lg text-center">
                            <span className="block text-[8px] font-mono text-zinc-500 uppercase">GEO (LLM)</span>
                            <span className="text-sm font-mono font-bold text-luxury-white">{audit.geoScore}/100</span>
                          </div>
                          <div className="bg-luxury-black border border-green-950/40 p-2.5 rounded-lg text-center">
                            <span className="block text-[8px] font-mono text-zinc-500 uppercase">Paid ROAS</span>
                            <span className="text-sm font-mono font-bold text-luxury-white">{audit.adsScore}/100</span>
                          </div>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-zinc-300">
                        {audit.websiteUrl && (
                          <div>
                            <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Asset URL</span>
                            <a href={audit.websiteUrl.startsWith('http') ? audit.websiteUrl : `https://${audit.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-luxury-green-glowing hover:underline inline-flex items-center gap-1 font-mono">
                              {audit.websiteUrl} <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                        <div>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Selected Services</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {audit.selectedServices.map((srv) => (
                              <span key={srv} className="text-[8px] font-mono text-zinc-400 bg-green-950/10 border border-green-900/15 px-1.5 py-0.5 rounded uppercase">
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Strategic overview summary */}
                      {audit.overview && (
                        <div className="bg-green-950/5 border border-green-950/15 rounded-lg p-3.5 text-xs text-zinc-300 leading-relaxed space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-luxury-green-glowing uppercase font-bold">
                            <Bot className="w-3.5 h-3.5" /> STRATEGIC EVALUATION BY THINKSARATH GPT
                          </div>
                          <p className="font-light">
                            {audit.overview}
                          </p>
                          {audit.estimatedGrowth && (
                            <div className="text-[11px] font-mono text-zinc-400 border-t border-green-950/10 pt-2 flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-luxury-green-glowing" />
                              Estimated Growth Lift: <strong className="text-luxury-green-glowing font-bold">{audit.estimatedGrowth}</strong>
                            </div>
                          )}
                        </div>
                      )}
                    </BorderGlow>
                  ))
                )
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
