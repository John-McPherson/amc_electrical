import fs from "fs";
import path from "path";

console.log("🚀 Building full design system tokens...");

const themePath = path.resolve(process.cwd(), "theme.json");
const outPath = path.resolve(process.cwd(), "src/scss/tokens/_generated.scss");

if (!fs.existsSync(themePath)) {
  console.error("❌ theme.json not found");
  process.exit(1);
}

const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));

/* =========================================================
   SLUG NORMALISER (DOMAIN-AWARE)
========================================================= */

function mapSlug(slug) {
  const aliases = {
    s: "sm",
    m: "md",
    l: "lg",
  };

  return aliases[slug] ?? slug.replace(/-/g, "");
}

/* =========================================================
   CONFIG-DRIVEN TOKEN SYSTEM
========================================================= */

const TOKEN_CONFIG = {
  colors: {
    source: () => theme?.settings?.color?.palette || [],
    cssVar: ({ slug }) => `--jm-color-${mapSlug(slug)}`,
    wpVar: ({ slug }) => `var(--wp--preset--color--${slug})`,
  },

  spacing: {
    source: () => theme?.settings?.spacing?.spacingSizes || [],
    cssVar: ({ slug }) => `--jm-spacing-${mapSlug(slug)}`,
    wpVar: ({ slug }) => `var(--wp--preset--spacing--${slug})`,
  },

  radius: {
    source: () => theme?.settings?.border?.radiusSizes || [],
    cssVar: ({ slug }) => `--jm-radius-${mapSlug(slug)}`,
    wpVar: ({ slug }) => `var(--wp--preset--border-radius--${slug})`,
  },

  fontFamilies: {
    source: () => theme?.settings?.typography?.fontFamilies ?? [],

    cssVar: ({ slug }) => `--jm-font-${slug}`,

    wpVar: ({ slug, fontFamily }) => `"${fontFamily}"`,
  },

  typography: {
    source: () => theme?.settings?.typography?.fontSizes || [],
    cssVar: ({ slug }) => `--jm-${mapSlug(slug)}`,
    wpVar: ({ slug }) => {
      return `var(--wp--preset--font-size--${slug.replace(
        /([a-z]+)(\d+)/i,
        "$1-$2",
      )})`;
    },
  },
};

/* =========================================================
   SCSS BUILDER
========================================================= */

let scss = `/* AUTO-GENERATED FILE — DO NOT EDIT */\n\n@layer base {\n  :root {\n`;

function add(line = "") {
  scss += line + "\n";
}

/* =========================================================
   GENERIC TOKEN GENERATOR
========================================================= */

function generate(domain, label) {
  const cfg = TOKEN_CONFIG[domain];
  console.log("Generating:", domain, cfg ? "OK" : "MISSING CONFIG");
  if (!cfg) return;
  const items = cfg.source();
  const list = items.length ? items : cfg.fallback || [];

  add(`
    /* =========================================================
     ${label.toUpperCase()}
    ========================================================= */
  `);

  list.forEach((token) => {
    add(`    ${cfg.cssVar(token)}: ${cfg.wpVar(token)};`);
  });
}

/* =========================================================
   RUN TOKEN GENERATION
========================================================= */

generate("colors", "colors");
generate("spacing", "spacing");
generate("radius", "radius");
generate("fontFamilies", "font families");
generate("typography", "typography");

scss += `\n  }\n}\n`;

/* =========================================================
   WRITE FILE
========================================================= */

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, scss);

console.log("✅ FULL design system generated");
