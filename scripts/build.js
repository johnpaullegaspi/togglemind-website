#!/usr/bin/env node
/**
 * Toggle Mind AI — static site build script.
 *
 * Reads all editable content from the single _content/site.json file
 * (maintained through Sveltia CMS at /admin as one entry, so every CMS
 * edit — no matter how many sections/fields changed — is one Git commit
 * and one Netlify build) and renders it into templates/index.template.html
 * to produce the final index.html that gets deployed. Runs automatically
 * on every Netlify build (see netlify.toml), so a CMS save results in a
 * fresh, fully static page — no client-side data fetching, no framework,
 * no server.
 *
 * List sections (services, industries, process, why_us, results,
 * technologies, faq) are arrays inside site.json; each item still
 * carries an explicit "order" (or "number" for process) field, and this
 * script sorts by that before rendering so drag-reordering in the CMS
 * isn't the only way to control display order.
 */
"use strict";

var fs = require("fs");
var path = require("path");

var tpl = require("./templates.js");

var ROOT = path.join(__dirname, "..");

function readJSON(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

function sortBy(items, sortKey) {
  return (items || []).slice().sort(function (a, b) {
    return (a[sortKey] || 0) - (b[sortKey] || 0);
  });
}

function main() {
  var site = readJSON("_content/site.json");

  var settings = site.settings;
  var hero = site.hero;
  var about = site.about;
  var profile = site.profile;
  var contact = site.contact;

  var services = sortBy(site.services, "order");
  var industries = sortBy(site.industries, "order");
  var process_ = sortBy(site.process, "number");
  var whyUs = sortBy(site.why_us, "order");
  var results = sortBy(site.results, "order");
  var technologies = sortBy(site.technologies, "order");
  var faq = sortBy(site.faq, "order");

  var template = fs.readFileSync(path.join(ROOT, "templates/index.template.html"), "utf8");

  var siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://togglemind.netlify.app";
  var phoneHref = "+" + String(settings.phone).replace(/[^\d]/g, "");

  var footerFacebook =
    '<a href="' + tpl.esc(settings.facebook) + '" target="_blank" rel="noopener noreferrer" class="footer-link">Facebook: Toggle Mind AI</a>';

  var replacements = {
    "{{META_DESCRIPTION}}": tpl.esc(settings.description),
    "{{SITE_URL}}": siteUrl,
    "{{SITE_EMAIL}}": tpl.esc(settings.email),
    "{{SITE_PHONE}}": tpl.esc(settings.phone),
    "{{SITE_PHONE_HREF}}": tpl.esc(phoneHref),
    "{{CONTACT_DESCRIPTION}}": tpl.esc(contact.description),
    "{{FACEBOOK_ICON}}": require("./icons.js").FACEBOOK_ICON,
    "<!--HERO-->": tpl.renderHero(hero),
    "<!--HERO_IMAGE-->": tpl.renderHeroImage(hero),
    "<!--ABOUT_HEADER-->": tpl.renderAbout(about),
    "<!--ABOUT_TEXT-->": tpl.renderAboutText(about),
    "<!--PROFILE-->": tpl.renderProfile(profile),
    "<!--SERVICES-->": tpl.renderServices(services),
    "<!--INDUSTRIES-->": tpl.renderIndustries(industries),
    "<!--PROCESS-->": tpl.renderProcess(process_),
    "<!--WHY_US-->": tpl.renderWhyUs(whyUs),
    "<!--RESULTS-->": tpl.renderResults(results),
    "<!--TECHNOLOGIES-->": tpl.renderTechnologies(technologies),
    "<!--FAQ-->": tpl.renderFaq(faq),
    "<!--CONTACT_HEADING-->": tpl.renderContactHeading(contact),
    "<!--CONTACT_CTAS-->": tpl.renderContactCtas(contact),
    "<!--FACEBOOK_LINK-->": tpl.renderFacebookLink(settings),
    "<!--FACEBOOK_FOOTER_LINK-->": footerFacebook
  };

  var output = template;
  Object.keys(replacements).forEach(function (marker) {
    output = output.split(marker).join(replacements[marker]);
  });

  fs.writeFileSync(path.join(ROOT, "index.html"), output, "utf8");
  console.log("Build complete: index.html generated from " + Object.keys(replacements).length + " content bindings.");
  console.log(
    "  services=" + services.length +
    " industries=" + industries.length +
    " process=" + process_.length +
    " why_us=" + whyUs.length +
    " results=" + results.length +
    " technologies=" + technologies.length +
    " faq=" + faq.length
  );
}

main();
