/**
 * Toggle Mind AI — build-time icon library.
 * Exact SVG paths preserved from the original hand-authored markup so the
 * CMS-driven rebuild is visually identical to the original page. Editors
 * pick a select-widget key in Decap CMS (see admin/config.yml) rather
 * than pasting raw SVG.
 */
"use strict";

var STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

var SERVICE_ICONS = {
  monitor:
    '<svg width="24" height="24" viewBox="0 0 24 24" ' + STROKE + '><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
  settings:
    '<svg width="24" height="24" viewBox="0 0 24 24" ' + STROKE + '><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>',
  "bar-chart":
    '<svg width="24" height="24" viewBox="0 0 24 24" ' + STROKE + '><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
};

var WHY_ICONS = {
  shield:
    '<svg width="22" height="22" viewBox="0 0 24 24" ' + STROKE.replace("stroke-width=\"2\"", 'stroke="#FF6A13" stroke-width="2"') + '><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  zap:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>',
  users:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  star:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
  layout:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
  "message-circle":
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  "check-circle":
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  "trending-up":
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6A13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>'
};

// Proper Facebook "f" glyph (replaces the previous 📘 emoji placeholder).
var FACEBOOK_ICON =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>';

var ARROW_RIGHT =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

var EXTERNAL_LINK_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

function getServiceIcon(key) {
  return SERVICE_ICONS[key] || SERVICE_ICONS.monitor;
}

function getWhyIcon(key) {
  return WHY_ICONS[key] || WHY_ICONS.star;
}

module.exports = {
  getServiceIcon: getServiceIcon,
  getWhyIcon: getWhyIcon,
  FACEBOOK_ICON: FACEBOOK_ICON,
  ARROW_RIGHT: ARROW_RIGHT,
  EXTERNAL_LINK_ICON: EXTERNAL_LINK_ICON
};
