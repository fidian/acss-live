#!/usr/bin/env node

"use strict";

function fail(message, input, expected, match) {
    console.log(`FAIL: ${message}`);
    console.log(`Input: ${input}`);

    for (let i = 0; i <= 9; i += 1) {
        if (!compare(expected[i], match[i])) {
            console.log(`[${i}]: want "${expected[i]}", got "${match[i]}"`);
        }
    }

    console.log();
}

function compare(a, b) {
    if (!a) {
        if (!b) {
            return true;
        }

        return false;
    }

    if (!b) {
        return false;
    }

    return a === b;
}

function check(pattern, input, expected) {
    const match = input.match(pattern);

    if (!match) {
        if (expected) {
            fail("Pattern did not match, but expected it to match", input, expected, []);
        }

        return;
    }

    if (!expected) {
        fail("Pattern matched, but expected it to not match", input, [], match);

        return;
    }

    for (let i = 0; i <= 9; i += 1) {
        if (!compare(expected[i], match[i])) {
            fail(`Failed matching at index ${i}`, input, expected, match);

            return;
        }
    }
}

const regexp = /^(?:([-a-z0-9]*)(?::([-a-z0-9]+))?([>_+~]|\|\|))?(\w+)(?:\(((?:\w|[,-/#$%])+)\))?(!)?(?::(\w+))?(?:::(\w+))?(?:--(\w+))?$/i;

// 0 = the matched string - untested
// 1 = parent selector
// 2 = parent pseudoclass
// 3 = combinator
// 4 = selector
// 5 = values
// 6 = important
// 7 = pseudoclass
// 8 = pseudoelement
// 9 = atRule
check(regexp, "D(n)", ["D(n)", "", "", "", "D", "n", "", "", ""]);
check(regexp, "D(n)!", ["D(n)!", "", "", "", "D", "n", "!", "", ""]);
check(regexp, "D(n):h", ["D(n):h", "", "", "", "D", "n", "", "h", ""]);
check(regexp, "D(n)::x", ["D(n)::x", "", "", "", "D", "n", "", "", "x"]);
check(regexp, "D::x", ["D::x", "", "", "", "D", "", "", "", "x"]);
check(regexp, "M", ["M", "", "", "", "M", "", "", "", ""]);
check(regexp, "a_M", ["a_M", "a", "", "_", "M", "", "", "", ""]);
check(regexp, ":b_M", [":b_M", "", "b", "_", "M", "", "", "", ""]);
check(regexp, "a:b_M", ["a:b_M", "a", "b", "_", "M", "", "", "", ""]);
check(regexp, "a:b_M(d)", ["a:b_M(d)", "a", "b", "_", "M", "d", "", "", ""]);
check(regexp, "a>M", ["a>M", "a", "", ">", "M", "", "", "", ""]);
check(regexp, ":b>M", [":b>M", "", "b", ">", "M", "", "", "", ""]);
check(regexp, "a:b>M", ["a:b>M", "a", "b", ">", "M", "", "", "", ""]);
