import React from 'react';

/**
 * Modern Business Intelligence (BI) Analytics & Dashboard SVG Logo
 * Combines sleek multi-chart visualization, telemetry trendline, and dashboard canvas styling.
 */
export function BiLogo({ className = 'w-5 h-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="bi-bar-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="bi-bar-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="bi-bar-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>
      {/* Outer Dashboard Card/Frame */}
      <rect
        x="2"
        y="3"
        width="20"
        height="18"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        fill="none"
      />
      {/* Top Header Bar */}
      <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.2" />
      {/* Dashboard Dots */}
      <circle cx="5" cy="5.5" r="0.9" fill="#3B82F6" />
      <circle cx="7.8" cy="5.5" r="0.9" fill="#8B5CF6" />
      {/* Analytics Bars */}
      <rect x="5.5" y="13.5" width="2.6" height="5" rx="1.2" fill="url(#bi-bar-1)" />
      <rect x="10.7" y="10.5" width="2.6" height="8" rx="1.2" fill="url(#bi-bar-2)" />
      <rect x="15.9" y="12" width="2.6" height="6.5" rx="1.2" fill="url(#bi-bar-3)" />
      {/* Trendline overlay */}
      <path
        d="M5.5 12.5L10 9.5L14 11L18.5 6.5"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="6.5" r="1.3" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Modern ETL (Extract · Transform · Load) Data Pipeline SVG Logo
 * Visualizes multi-source data ingestion, mid-stream transformation engine, and destination storage load.
 */
export function EtlLogo({ className = 'w-5 h-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="etl-grad-flow" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="etl-node-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="etl-node-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="etl-node-3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      {/* Connecting Pipeline Flows */}
      <path
        d="M6 7C9 7 9 12 12 12M6 17C9 17 9 12 12 12M12 12C15 12 15 12 18 12"
        stroke="url(#etl-grad-flow)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Source Node Top (Extract 1) */}
      <circle cx="5" cy="7" r="2.8" fill="url(#etl-node-1)" />
      <circle cx="5" cy="7" r="1.1" fill="#FFFFFF" />
      {/* Source Node Bottom (Extract 2) */}
      <circle cx="5" cy="17" r="2.8" fill="url(#etl-node-1)" />
      <circle cx="5" cy="17" r="1.1" fill="#FFFFFF" />
      {/* Transform Center Node (Process/Transform) */}
      <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="1.4" fill="url(#etl-node-2)" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="0.9" fill="#FFFFFF" />
      {/* Destination Target Node (Load / Warehouse) */}
      <rect x="16.5" y="9.5" width="4.8" height="5" rx="1.5" fill="url(#etl-node-3)" />
      {/* Database/Storage stack lines on destination */}
      <line x1="18" y1="11.2" x2="20" y2="11.2" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="18" y1="12.8" x2="20" y2="12.8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
