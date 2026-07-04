/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tag: string;
  iconName: string;
  details: string[];
}

export interface Stat {
  value: string;
  label: string;
  desc: string;
}

export interface Industry {
  name: string;
  desc: string;
  image: string;
}

export interface AuditRequest {
  businessName: string;
  websiteUrl: string;
  niche: string;
  selectedServices: string[];
  goals: string;
}

export interface AuditResult {
  overview: string;
  scoreCard: {
    seoScore: number;
    aeoScore: number;
    geoScore: number;
    adsScore: number;
  };
  recommendations: {
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    channel: string;
  }[];
  aeoFunnels: {
    query: string;
    competitorPresence: string;
    recommendedKeywords: string[];
  }[];
  estimatedGrowth: string;
}
