#!/usr/bin/env node
/**
 * Toggle Mind AI — static site build script.
 *
 * Reads editable content from /_content/**\/*.json and /_data/settings.json
 * (maintained through Decap CMS / DecapBridge at /admin) and renders it
 * into templates/index.template.html to produce the final index.html
 * that gets deployed. Runs automatically on every Netlify build (see
 * netlify.toml), so a CMS content change results in a fresh, fully
 * static page — no client-side data fetching, no framework, no server.
 *
 * Folder collections (services, industries, process, why_us, results,
 * technologies, faq) have no inherent order on a filesystem, so each
 * item file carries an explicit "order" (or "number" for process)
 * field that this script sorts by before rendering.
 */
"use strict";

var fs = require("fs");
var path = require("path");

var tpl = require("./templates.js");

var ROOT = path.join(__dirname, "..");

function readJSON(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

function readCollection(folder, sortKey) {
  var dir = path.join(ROOT, "_content", folder);
  if (!fs.existsSync(dir)) return [];
  var files = fs.readdirSync(dir).filter(function (f) {
    return f.endsWith(".json");
  });
  var items = files.map(function (f) {
    return readJSON(path.join("_content", folder, f));
  });
  items.sort(function (a, b) {
    return (a[sortKey] || 0) - (b[sortKey] || 0);
  });
  return items;
}

function main() {
  var settings = readJSON("_data/settings.json");
  var hero = readJSON("_content/hero/main.json");
  var about = readJSON("_content/about/main.json");
  var profile = readJSON("_content/profile/main.json");
  var contact = readJSON("_content/contact/main.json");

  var services = readCollection("services", "order");
  var industries = readCollection("industries", "order");
  var process_ = readCollection("process", "number");
  var whyUs = readCollection("why_us", "order");
  var results = readCollection("results", "order");
  var technologies = readCollection("technologies", "order");
  var faq = readCollection("faq", "order");

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
