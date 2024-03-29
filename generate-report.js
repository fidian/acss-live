#!/usr/bin/env node

/**
 * Run this to parse acss-live.js, which will look for the config data.
 * After loading the config, this generates the CSS report to standard
 * out and also checks for errors.
 */

"use strict";

const fsPromises = require('fs').promises;

function sortDeepValue(a, b) {
    return a[1][0].localeCompare(b[1][0]);
}

function sortShallowValue(a, b) {
    return a[1].localeCompare(b[1]);
}

fsPromises.readFile('./acss-live.js').then((data) => data.toString()).then((data) => {
    data = data.split('var config = ')[1];
    data = data.split(';\n')[0];

    let config;
    // eslint-disable-next-line no-eval
    eval(`config = ${data}`);

    console.log("Supported CSS");
    console.log("=============");
    console.log("");
    console.log("This is a list of all supported CSS in the current version of the library.");
    console.log("");
    console.log("Global Default Values");
    console.log("---------------------");
    console.log("");
    console.log("These can be used for any CSS rule.");
    console.log("");

    for (const [k, v] of Object.entries(config.values).sort(sortShallowValue)) {
        console.log("* `" + k + "` → `" + v + "`");
    }

    console.log("");
    console.log("");
    console.log("CSS Classes");
    console.log("-----------");
    console.log("");

    for (const [shortcut, def] of Object.entries(config.classes).sort(sortDeepValue)) {
        const cssRules = def.shift().split(';').map((x) => x.indexOf(':') < 0 ? `${x}:$_` : x);
        console.log("* `" + shortcut + "(…)` → `" + cssRules.join(";") + "`");
        const allowed = new Map();

        for (const lookup of def) {
            let lookupActual = lookup;

            if (typeof lookupActual === "string") {
                lookupActual = config[lookupActual];
            }

            if (!lookup) {
                console.error(`Invalid lookup value found for "${shortcut}", was trying to find "${lookup}"`);
                throw new Error("Abort - problem with config");
            }

            for (const [lookupKey, lookupValue] of Object.entries(config[lookup] || lookup)) {
                if (config.values[lookupKey]) {
                    console.error(`Conflict - "${shortcut}" has a value "${lookupKey}" that conflicts with a global value`);
                    throw new Error("Abort - conflict with global default value");
                }

                if (allowed.has(lookupKey) && allowed.get(lookupKey) !== lookupValue) {
                    console.error(`Conflict - "${shortcut}" has conflicting values for shortcut "${lookupKey}": ${allowed.get(lookupKey)} and ${lookupValue}`);
                    throw new Error("Abort - conflict with config");
                }

                allowed.set(lookupKey, lookupValue);
            }
        }

        for (const [allowedKey, allowedValue] of Array.from(allowed).sort(sortShallowValue)) {
            console.log("    * `" + allowedKey + "` → `" + allowedValue + "`");
        }
    }

    console.log("");
    console.log("Pseudo Classes");
    console.log("--------------");
    console.log("");

    for (const [k, v] of Object.entries(config.pseudoClasses).sort(sortShallowValue)) {
        console.log("* `:" + k + "` → `:" + v + "`");
    }

    console.log("");
    console.log("Pseudo Elements");
    console.log("---------------");
    console.log("");

    for (const [k, v] of Object.entries(config.pseudoElements).sort(sortShallowValue)) {
        console.log("* `::" + k + "` → `::" + v + "`");
    }

    console.log("");
    console.log("At Rules (Media Queries)");
    console.log("------------------------");
    console.log("");

    for (const [k, v] of Object.entries(config.atRules).sort(sortShallowValue)) {
        console.log("* `--" + k + "` → `" + v + " { ... }`");
    }
});
