/**
 * Toggle Mind AI — build-time HTML renderers.
 * Mirrors the exact markup/classes of the original hand-authored
 * index.html so the CMS-driven rebuild is visually identical; only the
 * text/data now comes from _content/**\/*.json instead of being
 * hardcoded.
 */
"use strict";

var icons = require("./icons.js");

function esc(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var CHECK_SVG =
  '<span class="service-feature-check"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>';

var PLUS_SVG =
  '<span class="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg></span>';

function delayClass(i) {
  var delays = ["", "delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
  return delays[i % delays.length];
}

function renderHero(hero) {
  return (
    '<div class="hero-badge animate-on-scroll">' +
    '<span class="hero-badge-dot"></span>' +
    "<span>" + esc(hero.badge) + "</span>" +
    "</div>" +
    '<h1 class="hero-title animate-on-scroll delay-100">' +
    esc(hero.heading) + ' <span class="hero-title-accent">' + esc(hero.highlight) + "</span>" +
    "</h1>" +
    '<p class="hero-description animate-on-scroll delay-200">' + esc(hero.description) + "</p>" +
    '<div class="hero-ctas animate-on-scroll delay-300">' +
    '<a href="#contact" class="btn btn-primary btn-lg">' + esc(hero.cta_primary) + icons.ARROW_RIGHT + "</a>" +
    '<a href="#services" class="btn btn-secondary btn-lg">' + esc(hero.cta_secondary) + "</a>" +
    "</div>"
  );
}

function renderHeroImage(hero) {
  return (
    '<img src="' + esc(hero.image) + '" alt="' + esc(hero.image_alt) + '" class="hero-image" width="600" height="750" loading="eager" fetchpriority="high">'
  );
}

function renderAbout(about) {
  return (
    '<span class="section-label">' + esc(about.label) + "</span>" +
    '<h2 class="section-title">' + esc(about.heading) + "</h2>"
  );
}

function renderAboutText(about) {
  return (
    "<p>" + esc(about.paragraph_1) + "</p>" +
    "<p>" + esc(about.paragraph_2) + "</p>" +
    "<p>" + esc(about.paragraph_3) + "</p>"
  );
}

function renderProfile(profile) {
  return (
    '<div class="profile-header">' +
    '<img src="' + esc(profile.photo) + '" alt="' + esc(profile.photo_alt) + '" class="profile-avatar" width="72" height="72" loading="lazy">' +
    "<div>" +
    '<div class="profile-name">' + esc(profile.name) + "</div>" +
    '<div class="profile-role">' + esc(profile.role) + "</div>" +
    "</div>" +
    "</div>" +
    '<p class="profile-bio">' + esc(profile.bio) + "</p>" +
    '<div class="profile-stats">' +
    "<div><div class=\"profile-stat-value\">" + esc(profile.stat_1_value) + "</div><div class=\"profile-stat-label\">" + esc(profile.stat_1_label) + "</div></div>" +
    "<div><div class=\"profile-stat-value\">" + esc(profile.stat_2_value) + "</div><div class=\"profile-stat-label\">" + esc(profile.stat_2_label) + "</div></div>" +
    "</div>"
  );
}

function renderServices(services) {
  return services
    .map(function (s, i) {
      var features = s.features
        .map(function (f) {
          return '<div class="service-feature">' + CHECK_SVG + esc(f) + "</div>";
        })
        .join("");
      return (
        '<div class="service-card animate-on-scroll ' + delayClass(i) + '">' +
        '<div class="service-icon">' + icons.getServiceIcon(s.icon) + "</div>" +
        '<h3 class="service-title">' + esc(s.title) + "</h3>" +
        '<p class="service-description">' + esc(s.description) + "</p>" +
        '<div class="service-features">' + features + "</div>" +
        "</div>"
      );
    })
    .join("");
}

function renderIndustries(industries) {
  return industries
    .map(function (ind, i) {
      return (
        '<div class="industry-card animate-on-scroll ' + delayClass(i) + '">' +
        '<div class="industry-icon">' + esc(ind.icon) + "</div>" +
        '<div class="industry-name">' + esc(ind.title) + "</div>" +
        "</div>"
      );
    })
    .join("");
}

function renderProcess(steps) {
  return steps
    .map(function (s, i) {
      return (
        '<div class="process-step animate-on-scroll ' + delayClass(i) + '">' +
        '<div class="process-number">' + esc(s.number) + "</div>" +
        '<h3 class="process-title">' + esc(s.title) + "</h3>" +
        '<p class="process-description">' + esc(s.description) + "</p>" +
        "</div>"
      );
    })
    .join("");
}

function renderWhyUs(items) {
  return items
    .map(function (w, i) {
      return (
        '<div class="why-card animate-on-scroll ' + delayClass(i) + '">' +
        '<div class="why-icon">' + icons.getWhyIcon(w.icon) + "</div>" +
        '<h3 class="why-title">' + esc(w.title) + "</h3>" +
        '<p class="why-description">' + esc(w.description) + "</p>" +
        "</div>"
      );
    })
    .join("");
}

function renderResults(items) {
  return items
    .map(function (r, i) {
      return (
        '<div class="result-card animate-on-scroll ' + delayClass(i) + '">' +
        '<div class="result-icon">' + esc(r.icon) + "</div>" +
        '<h3 class="result-title">' + esc(r.title) + "</h3>" +
        '<p class="result-description">' + esc(r.description) + "</p>" +
        "</div>"
      );
    })
    .join("");
}

function renderTechnologies(items) {
  return items.map(function (t) {
    return '<span class="tech-item">' + esc(t.title) + "</span>";
  }).join("");
}

function renderFaq(items) {
  return items
    .map(function (f, i) {
      return (
        '<div class="faq-item animate-on-scroll ' + delayClass(i) + '">' +
        '<button class="faq-question" aria-expanded="false">' +
        "<span>" + esc(f.question) + "</span>" +
        PLUS_SVG +
        "</button>" +
        '<div class="faq-answer"><p>' + esc(f.answer) + "</p></div>" +
        "</div>"
      );
    })
    .join("");
}

function renderContactHeading(contact) {
  return '<h2 class="contact-title animate-on-scroll">' + esc(contact.heading) + "</h2>";
}

function renderContactCtas(contact) {
  return (
    '<div class="contact-ctas animate-on-scroll delay-200">' +
    '<a href="' + esc(contact.cta_primary_link) + '" target="_blank" rel="noopener noreferrer" class="btn btn-white btn-lg">' +
    esc(contact.cta_primary) + icons.ARROW_RIGHT +
    "</a>" +
    "</div>"
  );
}

function renderFacebookLink(site, className) {
  var url = site.facebook || "https://fb.com/togglemind";
  var display = url.replace(/^https?:\/\//, "");
  return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"' + (className ? ' class="' + className + '"' : "") + ">" + esc(display) + "</a>";
}

module.exports = {
  esc: esc,
  renderHero: renderHero,
  renderHeroImage: renderHeroImage,
  renderAbout: renderAbout,
  renderAboutText: renderAboutText,
  renderProfile: renderProfile,
  renderServices: renderServices,
  renderIndustries: renderIndustries,
  renderProcess: renderProcess,
  renderWhyUs: renderWhyUs,
  renderResults: renderResults,
  renderTechnologies: renderTechnologies,
  renderFaq: renderFaq,
  renderContactHeading: renderContactHeading,
  renderContactCtas: renderContactCtas,
  renderFacebookLink: renderFacebookLink
};
