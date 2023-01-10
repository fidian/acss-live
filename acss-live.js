/* global document, MutationObserver, window */
"use strict";
(function (window, document) {
    // DEBUG_START
    var timerTotals = {};

    function timerStart(name) {
        const start = performance.now();

        return () => {
            if (config.settings.timing) {
                const elapsed = performance.now() - start;
                const totals = timerTotals[name] || [];
                totals.push(elapsed);
                timerTotals[name] = totals;
                console.log(`${name}: ${elapsed}ms`);
            }
        };
    }

    const setupTimerEnd = timerStart("ACSS-SETUP");
    // DEBUG_END

    var config = {
        settings: {
            // DEBUG_START
            // Set to true to show debug. Use your console for filtering.
            // Only honored with NON-MINIFIED builds. Debug code is removed
            // in minified builds.
            debug: false,

            // Set to true to enable timings and performance metrics being
            // logged and sent to the console.
            timings: false,
            // DEBUG_END

            // Set to true if you want to support right to left instead.
            rightToLeft: false,

            // Optional namespace to nest all rules underneath
            namespace: ""
        },

        // Shorthand for really simple lookups
        a: { a: "auto" },
        an: { a: "auto", n: "none" },
        as: { a: "auto", s: "span" },
        cp: { c: "compact" },
        ct: { ct: "contain" },
        f: { f: "fill" },
        hv: { h: "hidden", v: "visible" },
        inv: { i: "invert" },
        inf: { i: "infinite" },
        lr: { end: "$e", l: "left", r: "right", start: "$s" },
        n: { n: "none" },
        nc: { nc: "no-clip" },
        nr: { nr: "normal" },
        re: { re: "reverse" },
        rrss: { ro: "round", re: "repeat", st: "stretch", sp: "space" },
        st: { st: "stretch" },

        // CSS Types
        //
        // There are conflicts for a lot of names. These are preferred and
        // will get one-letter codes when possible.
        //     a: auto, c: center, e: end, l: left, n: none, r: right,
        //     s: start
        // Common conflicts, so use two letter codes consistently
        //     nr: normal, re: repeat, sp: space
        // Skip these
        //     all: all
        // Also, when two or more properties are related and one needs to
        // be bumped to two lettters, the other is bumped to two as well.

        // Not an official name
        align: {
            c: "center",
            e: "end",
            end: "$e",
            j: "justify",
            l: "left",
            mp: "match-parent",
            r: "right",
            s: "start",
            start: "$s"
        },

        // Suite: animation
        animationDirection: {
            a: "alternate",
            are: "alternate-reverse",
            nr: "normal",
            re: "reverse"
        },

        // Suite: animation
        animationFillMode: {
            b: "backwards",
            bt: "both",
            f: "forwards",
            n: "none"
        },

        // Suite: animation
        animationPlayState: {
            pa: "paused",
            ru: "running"
        },

        // Suite: background
        attachment: {
            f: "fixed",
            lo: "local",
            s: "scroll"
        },

        // Not an official name
        axis: {
            bl: "block",
            h: "horizontal",
            il: "inline",
            v: "vertical"
        },

        // Suite: alignment
        baselinePosition: {
            bl: "baseline",
            fi: "first",
            la: "last"
        },

        // Suite: background, not an official name
        bgPosX: {
            c: "center",
            end: "$e",
            l: "left",
            r: "right",
            start: "$s",
            xs: "x-start",
            xe: "x-end"
        },

        // Suite: background, not an official name
        bgPosY: {
            b: "bottom",
            c: "center",
            t: "top",
            ys: "y-start",
            ye: "y-end"
        },

        // Suite: background mask
        bgSize: {
            ct: "contain",
            cv: "cover"
        },

        // Suite: background
        box: {
            bb: "border-box",
            cb: "content-box",
            pb: "padding-box"
        },

        // Not an official name
        breaks: {
            al: "always",
            a: "auto",
            av: "avoid",
            avc: "avoid-column",
            avp: "avoid-page",
            avre: "avoid-region",
            c: "column",
            end: "$e",
            l: "left",
            p: "page",
            r: "right",
            re: "region",
            rec: "recto",
            start: "$s",
            ver: "verso"
        },

        // Suite: background border
        color: {
            cc: "currentcolor",
            n: "none",
            tr: "transparent"
        },

        // Suite: mask
        compositingOperator: {
            a: "add",
            e: "exclude",
            i: "intersect",
            s: "subtract"
        },

        // Not an official name
        containerType: {
            iz: "inline-size",
            nr: "normal",
            z: "size"
        },

        // Suite: alignment
        contentDistribution: {
            spa: "space-around",
            spb: "space-between",
            spe: "space-evenly",
            st: "stretch"
        },

        // Suite: alignment
        contentPosition: {
            c: "center",
            e: "end",
            fe: "flex-end",
            fs: "flex-start",
            s: "start"
        },

        // Suite: animation
        easingFunction: {
            cb: "cubic-bezier(.1,.7,1,.1)",
            ea: "ease",
            ei: "ease-in",
            eio: "ease-in-out",
            eo: "ease-out",
            e: "end",
            jb: "jump-both",
            je: "jump-end",
            jn: "jump-none",
            js: "jump-start",
            li: "linear",
            s: "start",
            se: "step-end",
            ss: "step-start"
        },

        // Suite: flex, not an official name
        flexBasis: {
            cn: "content"
        },

        // Suite: flex, not an official name
        flexDirection: {
            c: "column",
            cre: "column-reverse",
            r: "row",
            rre: "row-reverse"
        },

        // Suite: flex, not an official name
        flexWrap: {
            nw: "nowrap",
            w: "wrap",
            wre: "wrap-reverse"
        },

        // Suite: font fontVariant, not an official name
        fontCaps: {
            apc: "all-petite-caps",
            asc: "all-small-caps",
            pc: "petite-caps",
            sc: "small-caps",
            tc: "titling-caps",
            uni: "unicase"
        },

        // Suite: font, not an official name
        fontFamily: {
            a: 'Arial,"Helvetica Neue",Helvetica,sans-serif',
            cu: "cursive",
            cs: '"Comic Sans MS","Monotype Corsiva",cursive',
            f: "fantasy",
            im: "Impact,Capitals,fantasy",
            mo: "monospace",
            mon: 'Monaco,"Courier New",monospace',
            sf: "serif",
            ssf: "sans-serif",
            tnr: '"Times New Roman",Times,Baskerville,Georgia,serif',
            v: "Verdana,Geneva,sans-serif"
        },

        // Suite: font fontVariant, not an official name
        fontSize: {
            l: "large",
            lr: "larger",
            m: "medium",
            s: "small",
            sr: "smaller",
            xl: "x-large",
            xs: "x-small",
            xxl: "xx-large",
            xxs: "xx-small"
        },

        // Suite: font fontVariant, not an official name
        fontStretch: {
            c: "condensed",
            ec: "extra-condensed",
            ee: "extra-expanded",
            ex: "expanded",
            smc: "semi-condensed",
            sme: "semi-expanded",
            uc: "ultra-condensed",
            ue: "ultra-expanded"
        },

        // Suite: font, not an official name
        fontStyle: {
            i: "italic",
            o: "oblique"
        },

        // Suite: fontVariant, not an official name
        fontVariantAlt: {
            hf: "historical-forms"
        },

        // Suite: font fontVariant, not an official name
        fontVariantEastAsian: {
            fw: "full-width",
            j04: "jis04",
            j78: "jis78",
            j83: "jis83",
            j90: "jis90",
            pw: "proportional-width",
            r: "ruby",
            sim: "simplified",
            tra: "traditional"
        },

        // Suite: fontVariant, not an official name
        fontVariantEmoji: {
            e: "emoji",
            t: "text",
            u: "unicode"
        },

        // Suite: fontVariant, not an official name
        fontVariantLig: {
            cnt: "contextual",
            cl: "common-ligatures",
            dl: "discretionary-ligatures",
            hl: "historical-ligatures",
            ncnt: "no-contextual",
            ncl: "no-common-ligatures",
            ndl: "no-discretionary-ligatures",
            nhl: "no-historical-ligatures"
        },

        // Suite: fontVariant, not an official name
        fontVariantNum: {
            df: "diagonal-fractions",
            ln: "lining-nums",
            on: "oldstyle-nums",
            or: "ordinal",
            pn: "proportional-nums",
            stf: "stacked-fractions",
            sz: "slashed-zero",
            tn: "tabular-nums"
        },

        // Suite: fontVariant, not an official name
        fontVariantPos: {
            sub: "sub",
            sup: "super"
        },

        // Suite: font, not an official name
        fontWeight: {
            b: "bold",
            br: "bolder",
            lir: "lighter"
        },

        // Suite: mask offset
        geometryBox: {
            bb: "border-box",
            cb: "content-box",
            fb: "fill-box",
            mb: "margin-box",
            pb: "padding-box",
            sb: "stroke-box",
            vb: "view-box"
        },

        // Suite: grid, not an official name
        gridBreadth: {
            mac: "max-content",
            mic: "min-content",
            s: "subgrid"
        },

        // Suite: border
        lineStyle: {
            db: "double",
            ds: "dashed",
            dt: "dotted",
            dtds: "dot-dash",
            dtdtds: "dot-dot-dash",
            g: "groove",
            h: "hidden",
            i: "inset",
            n: "none", // Keep this one here - it's used often
            o: "outset",
            r: "ridge",
            s: "solid"
        },

        // Suite: border
        lineWidth: {
            m: "medium",
            tc: "thick",
            tn: "thin"
        },

        // Suite: listStyle
        listStylePosition: {
            i: "inside",
            o: "outside"
        },

        // Suite: listStyle
        listStyleType: {
            ar: "armenian",
            ai: "arabic-indic",
            b: "bengali",
            c: "circle",
            ca: "cambodian",
            cdc: "cjk-decimal",
            ceb: "cjk-earthly-branch",
            chs: "cjk-heavenly-stem",
            ci: "cjk-ideographic",
            d: "disc",
            dc: "decimal",
            dclz: "decimal-leading-zero",
            de: "devanagari",
            dic: "disclosure-closed",
            dio: "disclosure-open",
            ei: "ethiopic-numeric",
            g: "georgian",
            guj: "gujarati",
            gur: "gutmukhi",
            h: "hebrew",
            hi: "hiragana",
            hii: "hiragana-iroha",
            kan: "kannada",
            kat: "katakana",
            kati: "katakana-iroha",
            k: "khmer",
            khgf: "korean-hangul-formal",
            khjf: "korean-hanja-formal",
            khi: "korean-hanja-informal",
            jf: "japanese-formal",
            ji: "japanese-informal",
            l: "lao",
            la: "lower-alpha",
            lar: "lower-armenian",
            lg: "lower-greek",
            ll: "lower-latin",
            lr: "lower-roman",
            ma: "malayam",
            mo: "mongolian",
            my: "myanmar",
            or: "oriya",
            p: "persian",
            s: "square",
            scf: "simp-chinese-formal",
            sci: "simp-chinese-informal",
            ta: "tamil",
            te: "telugu",
            th: "thai",
            ti: "tigetan",
            tcf: "trad-chinese-formal",
            tci: "trad-chinese-informal",
            ua: "upper-alpha",
            uar: "upper-armenian",
            ul: "upper-latin",
            ur: "upper-roman"
        },

        // Suite: mask
        maskingMode: {
            al: "alpha",
            lu: "luminance",
            ms: "match-source"
        },

        // Suite: mask, not an official name
        maskSlice: {
            f: "fill"
        },

        // Suite: mask, not an official name
        maskType: {
            al: "alpha",
            lu: "luminance"
        },

        // Not an official name
        minMax: {
            a: "auto",
            mac: "max-content",
            mic: "min-content"
        },

        // Suite: background
        mixBlendMode: {
            c: "color",
            cob: "color-burn",
            cod: "color-dodge",
            d: "difference",
            dk: "darken",
            e: "exclusion",
            hl: "hard-light",
            h: "hue",
            li: "lighten",
            l: "luminosity",
            m: "multiply",
            o: "overlay",
            pd: "plus-darker",
            pl: "plus-lighter",
            s: "saturation",
            sc: "screen",
            sl: "soft-light"
        },

        // Suite: mask, not an official name
        origin: {
            b: "bottom",
            c: "center",
            end: "$e",
            l: "left",
            r: "right",
            start: "$s",
            t: "top"
        },

        // Suite: overflow
        overflow: {
            a: "auto",
            c: "clip",
            h: "hidden",
            s: "scroll",
            v: "visible"
        },

        // Suite: alignment
        overflowPosition: {
            sa: "safe",
            us: "unsafe"
        },

        // Suite: overflow
        overflowWrap: {
            a: "anywhere",
            bw: "break-word"
        },

        // Not an official name
        pageBreaks: {
            al: "always",
            av: "avoid",
            end: "$e",
            l: "left",
            r: "right",
            start: "$s"
        },

        // Suite: background mask
        repeatStyle: {
            nre: "no-repeat",
            ro: "round",
            re: "repeat", // Conflicts with r: right in suite
            rx: "repeat-x",
            ry: "repeat-y",
            sp: "space"
        },

        // Suite: alignment
        selfPosition: {
            c: "center",
            e: "end",
            fe: "flex-end",
            fs: "flex-start",
            s: "start",
            se: "self-end",
            ss: "self-start"
        },

        // Suite: textDecoration
        textDecLine: {
            b: "blink",
            lt: "line-through",
            n: "none",
            o: "overline",
            u: "underline"
        },

        // Suite: textDecoration
        textDecStyle: {
            db: "double",
            ds: "dashed",
            dt: "dotted",
            s: "solid",
            w: "wavy"
        },

        textEmphasisStyle: {
            c: "circle",
            d: "dot",
            dc: "double-circle",
            f: "filled",
            o: "open",
            s: "sesame",
            t: "triangle"
        },

        transformStyle: {
            f: "flat",
            p: "preserve-3d"
        },

        // Other lookup values

        pseudoClasses: {
            a: "active",
            al: "any-link",
            af: "autofill",
            b: "blank", // Experimental
            c: "checked",
            cu: "current",
            d: "default",
            de: "defined",
            ltr: "dir(ltr)",
            rtl: "dir(rtl)",
            di: "disabled",
            e: "empty",
            en: "enabled",
            fi: "first",
            fc: "first-child",
            fot: "first-of-type",
            f: "focus",
            fv: "focus-visible",
            fw: "focus-within",
            fs: "fullscreen",
            fu: "future",
            // Can not support :has()
            ho: "host",
            // Can not support :host-context()
            // Can not support :host()
            h: "hover",
            ir: "in-range",
            ind: "indeterminate",
            inv: "invalid",
            // Can not support :is()
            // Can not support :lang()
            lc: "last-child",
            lot: "last-of-type",
            l: "left",
            start: "$s", // Typically $s = left
            li: "link",
            lli: "local-link",
            m: "modal",
            // Can not support :not()
            // Can not support :nth-child()
            // Can not support :nth-col()
            // Can not support :nth-last-child()
            // Can not support :nth-last-col()
            // Can not support :nth-last-of-type()
            // Can not support :nth-of-type()
            oc: "only-child",
            oot: "only-of-type",
            o: "optional",
            oor: "out-of-range",
            p: "past",
            pa: "paused",
            pip: "picture-in-picture",
            ps: "placeholder-shown",
            pl: "playing",
            ro: "read-only",
            rw: "read-write",
            req: "required",
            r: "right",
            end: "$e", // Typically $e = right
            rt: "root",
            s: "scope",
            t: "target",
            tw: "target-within",
            ui: "user-invalid", // Experimental
            uv: "user-valid", // Experimental
            va: "valid",
            vi: "visited"
            // Can not support :where()
        },

        pseudoElements: {
            a: "after",
            ba: "backdrop",
            b: "before",
            c: "cue",
            cr: "cue-region",
            fsb: "file-selector-button",
            fl: "first-letter",
            fli: "first-line",
            ge: "grammar-error", // Experimental
            m: "marker",
            // Can not support ::part()
            ph: "placeholder",
            s: "selection",
            // Can not support ::slotted()
            se: "spelling-error", // Experimental
            tt: "target-text" // Experimental
        },

        // Values can be passed as parameters. They also can have spaces,
        // which helps for box-shadow. These values are always searched, so
        // withe C rule, it will first search "color", then fall back to
        // "values", and finally use a value verbatim. Consider these to be
        // global defaults.
        values: {
            inh: "inherit",
            in: "initial",
            rel: "revert-layer",
            rev: "revert",
            un: "unset"
        },

        // Media queries and other at-rules
        atRules: {
            // Color schemes
            dk: "@media(prefers-color-scheme:dark)",
            lt: "@media(prefers-color-scheme:light)",

            // Print version
            p: "@media print",

            // Generally accepted screen sizes
            // S = mobile                         0      -  480px
            // M = landscape mobile, tablets    480.0001 -  768px
            // L = landscape tablets            768.0001 - 1024px
            // D = default / large format      1024.0001 -    ∞
            s: "@media(max-width:480px)",
            sm: "@media(max-width:768px)",
            m: "@media(min-width:480.0001px) and (max-width:768px)",
            sml: "@media(max-width:1024px)",
            ml: "@media(min-width:480.0001px) and (max-width:1024px)",
            l: "@media(min-width:768.0001px) and (max-width:1024px)",
            d: "@media(min-width:1024.0001px)"
        },

        // $s and $e are replaced with left and right
        // (depending on the rightToLeft setting).
        // $_ is replaced with all arguments separated by spaces.
        // $, is replaced witl all arguments separated by commas.
        //
        // Ordered first by individual classes by the CSS full name, not the
        // abbreviation. In cases where it's vendor prefixed, sort by the base
        // name (ignore the vendor prefix). Groups of classes and helpers are
        // added at the end.
        //
        // Proposed: Proposed for inclusion into the CSS spec. Not official,
        // but good browser support.
        //
        // Experimental: This tag means the CSS property is not official.
        //
        // Mixed commas and spaces: This property allows multiple values using
        // both spaces and commas. One was picked, but that may change in the
        // future. It's suggested you use individual properties instead of
        // combined ones.
        classes: {
            Acc: ["accent-color", "a", "color"],
            Ac: [
                "align-content",
                "nr",
                "baselinePosition",
                "contentDistribution",
                "overflowPosition",
                "contentPosition"
            ],
            Ai: [
                "align-items",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition"
            ],
            As: [
                "align-self",
                "a",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition"
            ],
            At: ["align-tracks:$,", "alignment"], // Experimental
            A: ["all"],
            Anim: [
                "animation",
                "easingFunction",
                "inf",
                "animationDirection",
                "animationFillMode",
                "animationPlayState"
            ], // Mixed commas and spaces
            Animc: [
                "animation-composition:$,",
                {
                    ac: "accumulate",
                    a: "add",
                    r: "replace"
                }
            ], // Experimental
            Animdel: ["animation-delay:$,"], // Mixed commas and spaces
            Animdir: ["animation-direction:$,", "animationDirection"],
            Animdur: ["animation-duration:$,"],
            Animfm: ["animation-fill-mode:$,", "animationFillMode"],
            Animic: ["animation-iteration-count:$,", "inf"],
            Animn: ["animation-name:$,", "n"],
            Animps: ["animation-play-state:$,", "animationPlayState"],
            Animt: ["animation-timeline:$,", "an"], // Experimental
            Animtf: ["animation-timing-function:$,", "easingFunction"],
            Ap: [
                "appearance",
                "an",
                {
                    b: "button",
                    c: "checkbox",
                    l: "listbox",
                    ml: "menulist",
                    mlb: "menulist-button",
                    m: "meter",
                    prb: "progress-bar",
                    pb: "push-button",
                    r: "radio",
                    s: "searchfield",
                    sh: "slider-horizontal",
                    sb: "square-button",
                    ta: "textarea",
                    tf: "textfield"
                }
            ],
            Aspr: ["aspect-ratio", "a"],
            Bckdf: ["backdrop-filter", "n"],
            Bfv: ["backface-visibility", "hv"],
            Bg: [
                "background",
                "n",
                "color",
                "bgPosX",
                "bgPosY",
                "a",
                "bgSize",
                "repeatStyle",
                "attachment",
                "box"
            ], // Mixed commas and spaces
            Bga: ["background-attachment:$,", "attachment"],
            Bgbm: ["background-blend-mode:$,", "nr", "mixBlendMode"],
            Bgbk: [
                "background-break",
                {
                    bb: "bounding-box",
                    c: "continuous",
                    eb: "each-box"
                }
            ],
            Bgcp: [
                "-webkit-background-clip:$,;background-clip:$,",
                "box",
                {
                    nc: "no-clip",
                    t: "text"
                }
            ], // Include webkit-background-clip for allowing "text" value
            Bgc: ["background-color", "color"],
            Bgi: ["background-image:$,", "n"],
            Bgo: ["background-origin:$,", "box"],
            Bgp: ["background-position", "bgPosX", "bgPosY"], // Mixed commas and spaces
            Bgpx: ["background-position-x", "bgPosX"], // Mixed commas and spaces
            Bgpy: ["background-position-y", "bgPosY"], // Mixed commas and spaces
            Bgr: ["background-repeat", "repeatStyle"], // Mixed commas and spaces
            Bgz: ["background-size", "a", "bgSize"], // Mixed commas and spaces
            Blkz: ["block-size"],
            Bd: ["border", "lineWidth", "lineStyle", "color"],
            Bdblk: ["border-block", "lineWidth", "lineStyle", "color"],
            Bdblkc: ["border-block-color", "color"],
            Bdblke: ["border-block-end", "lineWidth", "lineStyle", "color"],
            Bdblkec: ["border-block-end-color", "color"],
            Bdblkes: ["border-block-end-style", "lineStyle"],
            Bdblkew: ["border-block-end-width", "lineWidth"],
            Bdblks: ["border-block-start", "lineWidth", "lineStyle", "color"],
            Bdblksc: ["border-block-start-color", "color"],
            Bdblkss: ["border-block-start-style", "lineStyle"],
            Bdblksw: ["border-block-start-width", "lineWidth"],
            Bdblkst: ["border-block-style", "lineStyle"],
            Bdblkw: ["border-block-width", "lineWidth"],
            Bdb: ["border-bottom", "lineWidth", "lineStyle", "color"],
            Bdbc: ["border-bottom-color", "color"],
            Bdblrs: ["border-bottom-left-radius"],
            Bdbstartrs: ["border-bottom-$s-radius"], // Typically $s = left
            Bdbrrs: ["border-bottom-right-radius"],
            Bdbendrs: ["border-bottom-$e-radius"], // Typically $e = right
            Bdbs: ["border-bottom-style", "lineStyle"],
            Bdbw: ["border-bottom-width", "lineWidth"],
            Bdcl: ["border-collapse", { c: "collapse", s: "separate" }],
            Bdc: ["border-color", "color"],
            Bdeers: ["border-end-end-radius"],
            Bdesrs: ["border-end-start-radius"],
            Bdi: ["border-image", "an", "f", "rrss"],
            Bdio: ["border-image-outset"],
            Bdir: ["border-image-repeat", "rrss"],
            Bdisl: ["border-image-slice", { f: "fill" }],
            Bdiso: ["border-image-source", "n"],
            Bdiw: ["border-image-width", "a"],
            Bdinl: ["border-inline", "lineWidth", "lineStyle", "color"],
            Bdinlc: ["border-inline-color", "color"],
            Bdinlend: [
                "border-inline-end",
                "lineWidth",
                "lineStyle",
                "color"
            ],
            Bdinlendc: ["border-inline-end-color", "color"],
            Bdinlends: ["border-inline-end-style", "lineStyle"],
            Bdinlendw: ["border-inline-end-width", "lineWidth"],
            Bdinlstart: [
                "border-inline-start",
                "lineWidth",
                "lineStyle",
                "color"
            ],
            Bdinlstartc: ["border-inline-start-color", "color"],
            Bdinlstarts: ["border-inline-start-style", "lineStyle"],
            Bdinlstartw: ["border-inline-start-width", "lineWidth"],
            Bdinls: ["border-inline-style"],
            Bdinlw: ["border-inline-width", "lineWidth"],
            Bdl: ["border-left", "lineWidth", "lineStyle", "color"],
            Bdstart: ["border-$s", "lineWidth", "lineStyle", "color"], // Typically $s = left
            Bdlc: ["border-left-color", "color"],
            Bdstartc: ["border-$s-color", "color"], // Typically $s = left
            Bdls: ["border-left-style", "lineStyle"],
            Bdstarts: ["border-$s-style", "lineStyle"], // Typically $s = left
            Bdlw: ["border-left-width", "lineWidth"],
            Bdstartw: ["border-$s-width", "lineWidth"], // Typically $s = left
            Bdrs: ["border-radius"],
            Bdr: ["border-right", "lineWidth", "lineStyle", "color"],
            Bdend: ["border-$e", "lineWidth", "lineStyle", "color"], // Typically $e = right
            Bdrc: ["border-right-color", "color"],
            Bdendc: ["border-$e-color", "color"], // Typically $e = right
            Bdrst: ["border-right-style", "lineStyle"],
            Bdends: ["border-$e-style", "lineStyle"], // Typically $e = right
            Bdrw: ["border-right-width", "lineWidth"],
            Bdendw: ["border-$e-width", "lineWidth"], // Typically $e = right
            Bdsp: ["border-spacing", { i: "inherit" }],
            Bdsers: ["border-start-end-radius"],
            Bdssrs: ["border-start-start-radius"],
            Bds: ["border-style", "lineStyle"],
            Bdt: ["border-top", "lineWidth", "lineStyle", "color"],
            Bdtc: ["border-top-color", "color"],
            Bdtlrs: ["border-top-left-radius"],
            Bdtstartrs: ["border-top-$s-radius"], // Typically $s = left
            Bdtrrs: ["border-top-right-radius"],
            Bdtendrs: ["border-top-$e-radius"], // Typically $e = right
            Bdts: ["border-top-style", "lineStyle"],
            Bdtw: ["border-top-width", "lineWidth"],
            Bdw: ["border-width", "lineWidth"],
            B: ["bottom", "a"],
            Bxdb: ["box-decoration-break", { s: "slice", c: "clone" }],
            Bxsh: ["box-shadow:$,", "n", "color", { i: "inset" }],
            Bxz: ["box-sizing", { bb: "border-box", cb: "content-box" }],
            Bka: ["break-after", "breaks"],
            Bkb: ["break-before", "breaks"],
            Bki: [
                "break-inside",
                {
                    a: "auto",
                    av: "avoid",
                    avc: "avoid-column",
                    avp: "avoid-page",
                    avr: "avoid-region"
                }
            ],
            Cps: ["caption-side", { b: "bottom", t: "top" }],
            Carc: ["caret-color", "a", "color"],
            Cl: [
                "clear",
                {
                    b: "both",
                    be: "block-end",
                    bo: "bottom",
                    bs: "block-start",
                    end: "$e",
                    ie: "inline-end",
                    is: "inline-start",
                    l: "left",
                    n: "none",
                    r: "right",
                    start: "$s",
                    t: "top"
                }
            ],
            Cp: ["clip", "a"], // Deprecated, use clip-path
            Cpp: ["clip-path", "n", "geometryBox"],
            C: ["color", "color"],
            Cs: [
                "color-scheme",
                {
                    d: "dark",
                    l: "light",
                    nr: "normal",
                    o: "only"
                }
            ],
            Colmc: ["column-count", "a"],
            Colmf: [
                "column-fill",
                { a: "auto", b: "balance", ba: "balance-all" }
            ],
            Colmg: ["column-gap", "nr"],
            Colmr: ["column-rule", "lineStyle", "color"],
            Colmrc: ["column-rule-color", "color"],
            Colmrs: ["column-rule-style", "lineStyle"],
            Colmrw: ["column-rule-width"],
            Colms: ["column-span", "n"],
            Colmw: [
                "column-width",
                "a",
                { mic: "min-content", mac: "max-content" }
            ], // No real way to specify a shorthand for fit-content() since it's a function.
            Colm: ["columns"],
            Ct: [
                "contain",
                {
                    c: "content",
                    iz: "inline-size",
                    l: "layout",
                    n: "none",
                    p: "paint",
                    s: "style",
                    st: "strict",
                    z: "size"
                }
            ],
            Ctiblkz: ["contain-intrinsic-block-size", "an"],
            Ctih: ["contain-intrinsic-height", "an"],
            Ctiiz: ["contain-intrinsic-inline-size", "an"],
            Ctiz: ["contain-intrinsic-size", "an"],
            Ctiw: ["contain-intrinsic-width", "an"],
            Ctr: ["container", "containerType"],
            Ctrn: ["container-name"],
            Ctrt: ["container-type", "containerType"],
            Cnt: [
                "content",
                {
                    cq: "close-quote",
                    ncq: "no-close-quote",
                    n: "none",
                    nr: "normal",
                    noq: "no-open-quote",
                    oq: "open-quote"
                }
            ],
            Cntv: ["content-visibility", "a", "hv"],
            Coi: ["counter-increment", "n"],
            Cor: ["counter-reset", "n"],
            Cos: ["counter-set", "n"],
            Cur: [
                "cursor",
                {
                    a: "auto",
                    as: "all-scroll",
                    c: "cell",
                    co: "copy",
                    cr: "col-resize",
                    cro: "crosshair",
                    d: "default",
                    er: "e-resize",
                    ewr: "ew-resize",
                    g: "grab",
                    gr: "grabbing",
                    ha: "hand",
                    he: "help",
                    m: "move",
                    na: "not-allowed",
                    nd: "no-drop",
                    ner: "ne-resize",
                    neswr: "nesw-resize",
                    n: "none",
                    nr: "n-resize",
                    nsr: "ns-resize",
                    nwr: "nw-resize",
                    nwser: "nwse-resize",
                    p: "pointer",
                    pr: "progress",
                    rr: "row-resize",
                    ser: "se-resize",
                    sr: "s-resize",
                    swr: "sw-resize",
                    t: "text",
                    vt: "vertical-text",
                    wr: "w-resize",
                    w: "wait",
                    zi: "zoom-in",
                    zo: "zoom-out"
                }
            ],
            Dir: [
                "direction",
                {
                    l: "ltr",
                    r: "rtl"
                }
            ],
            D: [
                "display",
                {
                    b: "block",
                    c: "contents",
                    cp: "compact",
                    f: "flex",
                    fr: "flow-root",
                    g: "grid",
                    ib: "inline-block",
                    if: "inline-flex",
                    ig: "inline-grid",
                    i: "inline",
                    itb: "inline-table",
                    li: "list-item",
                    n: "none",
                    rbbg: "ruby-base-group",
                    rbb: "ruby-base",
                    rb: "ruby",
                    rbtg: "ruby-text-group",
                    rbt: "ruby-text",
                    ri: "run-in",
                    tbclg: "table-column-group",
                    tbcl: "table-column",
                    tbcp: "table-caption",
                    tbc: "table-cell",
                    tbfg: "table-footer-group",
                    tbhg: "table-header-group",
                    tbrg: "table-row-group",
                    tbr: "table-row",
                    tb: "table"
                }
            ],
            Ec: [
                "empty-cells",
                {
                    h: "hide",
                    s: "show"
                }
            ],
            Fil: ["filter", "n"],
            Fx: ["flex", "n", "flexBasis"],
            Fxb: ["flex-basis", "flexBasis"],
            Fxd: ["flex-direction", "flexDirection"],
            Fxf: ["flex-flow", "flexDirection", "flexWrap"],
            Fxg: ["flex-grow"],
            Fxs: ["flex-shrink"],
            Fxw: ["flex-wrap", "flexWrap"],
            Fl: [
                "float",
                {
                    b: "bottom",
                    be: "block-end",
                    bs: "block-start",
                    end: "$e",
                    f: "footnote",
                    ie: "inline-end",
                    is: "inline-start",
                    l: "left",
                    n: "none",
                    r: "right",
                    sb: "snap-block",
                    si: "snap-inline",
                    start: "$s",
                    t: "top"
                }
            ],
            F: [
                "font",
                "nr",
                "fontStyle",
                "fontCaps",
                "fontWeight",
                "fontStretch",
                "fontSize",
                "fontFamily"
            ], // Mixed commas and spaces
            Ff: ["font-family:$,", "fontFamily"],
            Ffs: ["font-feature-settings", "nr"], // Mixed commas and spaces
            Fk: ["font-kearning", "an", "nr"],
            Flo: ["font-language-override", "nr"],
            Foz: ["font-optical-sizing", "an"],
            Fp: [
                "font-palette",
                "nr",
                {
                    d: "dark",
                    l: "light"
                }
            ],
            Fz: ["font-size", "fontSize"],
            Fza: [
                "font-size-adjust",
                {
                    ch: "cap-height",
                    cw: "ch-width",
                    eh: "ex-height",
                    ih: "ic-height",
                    iw: "ic-width",
                    n: "none"
                }
            ],
            Fst: ["font-stretch", "nr", "fontStretch"],
            Fs: ["font-style", "nr", "fontStyle"],
            Fsy: [
                "font-synthesis",
                {
                    n: "none",
                    s: "style",
                    sc: "small-caps",
                    w: "weight"
                }
            ],
            Fv: [
                "font-variant",
                "n",
                "nr",
                "fontVariantAlt",
                "fontCaps",
                "fontVariantEastAsian",
                "fontVariantEmoji",
                "fontVariantLig",
                "fontVariantNum",
                "fontVariantPos"
            ],
            Fva: ["font-variant-alternates", "nr", "fontVariantAlt"],
            Fvc: ["font-variant-caps", "nr", "fontCaps"],
            Fvea: ["font-variant-east-asian", "nr", "fontVariantEastAsian"],
            Fve: ["font-variant-emoji", "nr", "fontVariantEmoji"],
            Fvl: ["font-variant-ligagures", "n", "nr", "fontVariantLig"],
            Fvn: ["font-variant-numeric", "nr", "fontVariantNum"],
            Fvp: ["font-variant-position", "nr", "fontVariantPos"],
            Fvs: ["font-variation-settings:$,", "nr"], // Mixed spaces and commas
            Fw: ["font-weight", "nr", "fontWeight"],
            Fca: [
                "forced-color-adjust",
                "an",
                {
                    ppc: "preserve-parent-color"
                }
            ],
            G: ["gap"],
            Gr: [
                "grid",
                "an",
                "gridBreadth",
                {
                    af: "auto-flow",
                    d: "dense"
                }
            ],
            Gra: ["grid-area", "as"],
            Grac: ["grid-auto-columns", "a", "gridBreadth"],
            Graf: [
                "grid-auto-flow",
                {
                    c: "column",
                    d: "dense",
                    r: "row"
                }
            ],
            Grar: ["grid-auto-rows", "a", "gridBreadth"],
            Grc: ["grid-column", "as"],
            Grce: ["grid-column-end", "as"],
            Grcs: ["grid-column-start", "as"],
            Grr: ["grid-row", "as"],
            Grre: ["grid-row-end", "as"],
            Grrs: ["grid-row-start", "as"],
            Grt: ["grid-template", "an", "gridBreadth"],
            Grta: ["grid-template-areas", "n"],
            Grtc: ["grid-template-columns", "an", "gridBreadth"],
            Grtr: ["grid-template-rows", "an", "gridBreadth"],
            Hp: [
                "hanging-punctuation",
                {
                    ae: "allow-end",
                    f: "first",
                    fe: "force-end",
                    l: "last",
                    n: "none"
                }
            ],
            H: [
                "height",
                {
                    a: "auto",
                    av: "available",
                    bb: "border-box",
                    cb: "content-box",
                    fc: "fit-content",
                    mac: "max-content",
                    mic: "min-content"
                }
            ],
            Hyc: ["hyphenate-character", "a"],
            Hylc: ["hyphenate-limit-chars", "a"],
            Hy: [
                "hyphens",
                "an",
                {
                    m: "manual"
                }
            ],
            Io: [
                "image-orientation",
                "n",
                {
                    f: "flip",
                    fi: "from-image"
                }
            ],
            Irn: [
                "image-rendering",
                "a",
                {
                    ce: "crisp-edges",
                    hq: "high-quality",
                    p: "pixelated",
                    s: "smooth"
                }
            ],
            Irs: [
                "image-resolution",
                {
                    fi: "from-image",
                    s: "snap"
                }
            ], // Experimental
            Inl: [
                "initial-letter",
                {
                    d: "drop",
                    nr: "normal",
                    r: "raise"
                }
            ], // Experimental
            Inla: [
                "initial-letter-align",
                {
                    a: "alphabetic",
                    bb: "border-box",
                    h: "hanging",
                    i: "ideographic",
                    l: "leading"
                }
            ], // Experimental
            Iz: ["inline-size"],
            In: ["inset", "a"],
            Inblk: ["inset-block", "a"],
            Inblke: ["inset-block-end", "a"],
            Inblks: ["inset-block-start", "a"],
            Ini: ["inset-inline", "a"],
            Inie: ["inset-inline-end", "a"],
            Inis: ["inset-inline-start", "a"],
            Is: [
                "isolation",
                {
                    a: "auto",
                    i: "isolate"
                }
            ],
            Jc: [
                "justify-content",
                "nr",
                "contentDistribution",
                "overflowPosition",
                "contentPosition",
                "lr"
            ],
            Ji: [
                "justify-items",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition",
                "lr",
                {
                    le: "legacy"
                }
            ],
            Js: [
                "justify-self",
                "a",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition",
                "lr"
            ],
            Jt: [
                "justify-tracks:$,",
                "nr",
                "contentDistribution",
                "overflowPosition",
                "contentPosition",
                "lr"
            ], // Experimental
            L: ["left", "a"],
            Start: ["$s", "a"], // Typically $s = start
            Lts: ["letter-spacing", "nr"],
            Lb: [
                "line-break",
                "a",
                "nr",
                {
                    an: "anywhere",
                    l: "loose",
                    s: "strict"
                }
            ],
            Lc: [
                "display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp;line-clamp"
            ], // Proposed + Line-clamp requires display:-webkit-box and box-orient to work.
            Lh: ["line-height", "nr"],
            Lhs: ["line-height-step"], // Experimental
            Lis: ["list-style", "n", "listStyleType", "listStylePosition"],
            Lisi: ["list-style-image", "n"],
            Lisp: ["list-style-position", "listStylePosition"],
            List: ["list-style-type", "n", "listStyleType"],
            M: ["margin", "a"],
            Mblk: ["margin-block", "a"],
            Mblke: ["margin-block-end", "a"],
            Mblks: ["margin-block-start", "a"],
            Mb: ["margin-bottom", "a"],
            Mi: ["margin-inline", "a"],
            Mie: ["margin-inline-end", "a"],
            Mis: ["margin-inline-start", "a"],
            Ml: ["margin-left", "a"],
            Mstart: ["margin-$s", "a"], // Typically $s = left
            Mr: ["margin-right", "a"],
            Mend: ["margin-$e", "a"], // Typically $e = right
            Mt: ["margin-top", "a"],
            Mtr: [
                "margin-trim",
                "n",
                {
                    b: "block",
                    be: "block-end",
                    bs: "block-start",
                    i: "inline",
                    ie: "inline-end",
                    is: "inline-start"
                }
            ], // Experimental
            Msk: [
                "mask",
                "n",
                "origin",
                "bgSize",
                "repeatStyle",
                "geometryBox",
                "nc",
                "compositingOperator",
                "maskingMode"
            ], // Mixed commas and spaces
            Mskb: ["mask-border", "an", "maskSlice", "rrss", "maskType"],
            Mskbm: ["mask-border-mode", "maskType"],
            Mskbo: ["mask-border-outset"],
            Mskbr: ["mask-border-repeat", "rrss"],
            Mskbsl: ["mask-border-slice", "maskSlice"],
            Mskbso: ["mask-border-source", "n"],
            Mskbw: ["mask-border-width", "a"],
            Mskc: ["mask-clip:$,", "geometryBox", "nc"],
            Mskco: ["mask-composite:$,", "compositingOperator"],
            Mski: ["mask-image:$,", "n"],
            Mskm: ["mask-mode:$,", "maskingMode"],
            Msko: ["mask-origin:$,", "geometryBox"],
            Mskp: ["mask-position", "origin"], // Mixed commas and spaces
            Mskr: ["mask-repeat:$,", "repeatStyle"], // Mixed commas and spaces
            Mskz: ["mask-size", "a", "bgSize"], // Mixed commas and spaces
            Mskt: ["mask-type", "maskType"],
            Maf: [
                "masonry-auto-flow",
                {
                    df: "definite-first",
                    n: "next",
                    o: "ordered",
                    p: "pack"
                }
            ], // Experimental
            Md: [
                "math-depth",
                {
                    aa: "auto-add"
                }
            ], // Experimental
            Ms: ["math-shift", "nr", "cp"], // Experimental
            Mst: ["math-style", "nr", "cp"], // Experimental
            Mablkz: ["max-block-size", "minMax"],
            Mah: ["max-height", "minMax"],
            Maiz: ["max-inline-size", "minMax"],
            Maw: ["max-width", "minMax"],
            Miblkz: ["min-block-size", "minMax"],
            Mih: ["min-height", "minMax"],
            Miiz: ["min-inline-size", "minMax"],
            Miw: ["min-width", "minMax"],
            Mbm: ["mix-blend-mode", "nr", "mixBlendMode"],
            Objf: [
                "object-fit",
                "n",
                {
                    ct: "contain",
                    cv: "cover",
                    f: "fill",
                    sd: "scale-down"
                }
            ],
            Objp: ["object-position", "origin"],
            Of: ["offset", "an", "origin", "re"],
            Ofa: ["offset-anchor", "a", "origin"],
            Ofd: ["offset-distance"],
            Ofpa: [
                "offset-path",
                "n",
                "geometryBox",
                {
                    cc: "closest-corner",
                    ct: "contain",
                    cs: "closest-side",
                    fc: "farthest-corner",
                    fs: "farthest-side"
                }
            ],
            Ofp: ["offset-position", "a", "origin"], // Experimental
            Ofr: ["offset-rotate", "a", "re"],
            Op: ["opacity"],
            Ord: ["order"],
            Orp: ["orphans"],
            Ol: ["outline", "n", "color", "lineStyle", "lineWidth"],
            Olc: ["outline-color", "color", "inv"],
            Olo: ["outline-offset"],
            Ols: ["outline-style", "lineStyle"],
            Olw: ["outline-width", "lineWidth"],
            Ov: ["overflow", "overflow"],
            Ova: ["overflow-anchor", "an"],
            Ovb: ["overflow-block", "overflow"],
            Ovcm: ["overflow-clip-margin", "box"],
            Ovi: ["overflow-inline", "overflow"],
            Ovw: ["overflow-wrap", "nr", "overflowWrap"],
            Ovx: ["overflow-x", "overflow"],
            Ovy: ["overflow-y", "overflow"],
            Ovsb: ["overscroll-behavior", "an", "ct"],
            Ovsbb: ["overscroll-behavior-block", "an", "ct"],
            Ovsbi: ["overscroll-behavior-inline", "an", "ct"],
            Ovsbx: ["overscroll-behavior-x", "an", "ct"],
            Ovsby: ["overscroll-behavior-y", "an", "ct"],
            P: ["padding"],
            Pblk: ["padding-block"],
            Pblke: ["padding-block-end"],
            Pblks: ["padding-block-start"],
            Pb: ["padding-bottom"],
            Pi: ["padding-inline"],
            Pie: ["padding-inline-end"],
            Pis: ["padding-inline-start"],
            Pl: ["padding-left"],
            Pstart: ["padding-$s"],
            Pr: ["padding-right"],
            Pend: ["padding-$e"],
            Pt: ["padding-top"],
            Pgba: ["page-break-after", "a", "pageBreaks"],
            Pgbb: ["page-break-before", "a", "pageBreaks"],
            Pgbi: [
                "page-break-inside",
                "a",
                {
                    av: "avoid"
                }
            ],
            Po: [
                "paint-order",
                "nr",
                {
                    f: "fill",
                    m: "markers",
                    s: "stroke"
                }
            ],
            Prs: ["perspective", "n"],
            Prso: ["perspective-origin", "origin"],
            Plc: [
                "place-content",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition",
                "contentDistribution",
                "contentPosition",
                "lr"
            ],
            Pli: [
                "place-items",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition",
                "lr"
            ],
            Pls: [
                "place-self",
                "a",
                "nr",
                "st",
                "baselinePosition",
                "overflowPosition",
                "selfPosition",
                "lr"
            ],
            Pe: [
                "pointer-events",
                "an",
                {
                    bb: "bouding-box",
                    f: "fill",
                    p: "painted",
                    s: "stroke",
                    vf: "visiblefill",
                    vp: "visiblepainted",
                    vs: "visiblestroke",
                    v: "visible"
                }
            ],
            Pos: [
                "position",
                {
                    a: "absolute",
                    f: "fixed",
                    r: "relative",
                    s: "static",
                    st: "sticky"
                }
            ],
            Pca: [
                "print-color-adjust",
                {
                    ec: "economy",
                    ex: "exact"
                }
            ],
            Q: [
                "quotes",
                {
                    en: '"“" "”" "‘" "’"',
                    fr: '"«" "»" "‹" "›"',
                    n: "none",
                    ru: '"«" "»" "„" "“"'
                }
            ],
            Rsz: [
                "resize",
                "n",
                "axis",
                {
                    b: "both"
                }
            ],
            R: ["right", "a"],
            End: ["$e", "a"], // Typically $e = end
            Ro: ["rotate", "n"],
            Rowg: ["row-gap", "nr"],
            Ra: [
                "ruby-align",
                {
                    c: "center",
                    sa: "space-around",
                    sb: "space-between",
                    s: "start"
                }
            ], // Experimental
            Rp: [
                "ruby-position",
                {
                    a: "alternate",
                    ic: "inter-character",
                    o: "over",
                    u: "under"
                }
            ],
            S: ["scale", "n"],
            Scrb: [
                "scroll-behavior",
                "a",
                {
                    s: "smooth"
                }
            ],
            Scrm: ["scroll-margin"],
            Scrmblk: ["scroll-margin-block"],
            Scrmblke: ["scroll-margin-block-end"],
            Scrmblks: ["scroll-margin-block-start"],
            Scrmb: ["scroll-margin-bottom"],
            Scrmi: ["scroll-margin-inline"],
            Scrmie: ["scroll-margin-inline-end"],
            Scrmis: ["scroll-margin-inline-start"],
            Scrml: ["scroll-margin-left"],
            Scrmstart: ["scroll-margin-$s"], // Typically $s = left
            Scrmr: ["scroll-margin-right"],
            Scrmend: ["scroll-margin-$e"], // Typically $e = right
            Scrmt: ["scroll-margin-top"],
            Scrp: ["scroll-padding", "a"],
            Scrpblk: ["scroll-padding-block", "a"],
            Scrpblke: ["scroll-padding-block-end", "a"],
            Scrpblks: ["scroll-padding-block-start", "a"],
            Scrpb: ["scroll-padding-bottom", "a"],
            Scrpi: ["scroll-padding-inline", "a"],
            Scrpie: ["scroll-padding-inline-end", "a"],
            Scrpis: ["scroll-padding-inline-start", "a"],
            Scrpl: ["scroll-padding-left", "a"],
            Scrpstart: ["scroll-padding-$s", "a"], // Typically $s = left
            Scrpr: ["scroll-padding-right", "a"],
            Scrpend: ["scroll-padding-$e", "a"], // Typically $e = end
            Scrpt: ["scroll-padding-top", "a"],
            Scrsa: [
                "scroll-snap-align",
                "n",
                {
                    c: "center",
                    e: "end",
                    s: "start"
                }
            ],
            Scrss: [
                "scroll-snap-stop",
                "nr",
                {
                    al: "always"
                }
            ],
            Scrst: [
                "scroll-snap-type",
                "n",
                {
                    b: "both",
                    bl: "block",
                    il: "inline",
                    m: "mandatory",
                    p: "proximity"
                }
            ],
            Scrt: ["scroll-timeline", "n", "axis"], // Experimental
            Scrta: ["scroll-timeline-axis", "axis"], // Experimental
            Scrtn: ["scroll-timeline-name", "n"], // Experimental
            Sbc: ["scrollbar-color", "a", "color"],
            Sbg: [
                "scrollbar-gutter",
                "a",
                {
                    be: "both-edges",
                    s: "stable"
                }
            ],
            Sbw: [
                "scrollbar-width",
                "an",
                {
                    t: "thin"
                }
            ],
            Shpit: ["shape-image-threshold"],
            Shpm: ["shape-margin"],
            Shpo: [
                "shape-outside",
                "n",
                "box",
                {
                    mb: "margin-box"
                }
            ],
            Tbz: ["tab-size"],
            Tbl: [
                "table-layout",
                "a",
                {
                    f: "fixed"
                }
            ],
            Ta: ["text-align", "align"],
            Tal: ["text-align-last", "align"],
            Tci: [
                "text-combine-upright",
                "an",
                {
                    d: "digits"
                }
            ],
            Td: [
                "text-decoration",
                "n",
                "textDecLine",
                "textDecStyle",
                "color"
            ],
            Tdc: ["text-decoration-color", "color"],
            Tdl: ["text-decoration-line", "n", "textDecLine"],
            Tdsk: [
                "text-decoration-skip",
                "an",
                {
                    bd: "box-decoration",
                    e: "edges",
                    lsp: "leading-spaces",
                    o: "objects",
                    sp: "spaces",
                    tsp: "trailing-spaces"
                }
            ],
            Tdski: ["text-decoration-skip-ink", "an"],
            Tds: ["text-decoration-style", "textDecStyle"],
            Tdt: [
                "text-decoration-thickness",
                "a",
                {
                    ff: "from-font"
                }
            ],
            Te: ["text-emphasis", "n", "textEmphasisStyle", "color"],
            Tec: ["text-emphasis-color", "color"],
            Tep: [
                "text-emphasis-position",
                "lr",
                {
                    o: "over",
                    u: "under"
                }
            ],
            Tes: ["text-emphasis-style", "n", "textEmphasisStyle"],
            Tfc: ["-webkot-text-fill-color;text-fill-color", "color"], // Proposed
            Ti: [
                "text-indent",
                {
                    el: "each-line",
                    h: "hanging"
                }
            ],
            Tj: [
                "text-justify",
                "an",
                {
                    ic: "inter-character",
                    iw: "inter-word"
                }
            ],
            To: [
                "text-orientation",
                {
                    m: "mixed",
                    s: "sideways",
                    u: "upright"
                }
            ],
            Tov: [
                "text-overflow",
                {
                    c: "clip",
                    e: "ellipsis"
                }
            ],
            Tren: [
                "text-rendering",
                {
                    a: "auto",
                    gp: "geometricprecision",
                    ol: "optimizelegibility",
                    os: "optimizespeed"
                }
            ],
            Tsh: ["text-shadow", "n", "color"],
            Tza: ["text-size-adjust", "an"], // Experimental
            Tstk: ["-webkit-text-stroke;text-stroke", "lineWidth", "color"], // Proposed
            Tstkc: ["-webkit-text-stroke-color;text-stroke-color", "color"], // Proposed
            Tstkw: ["-webkit-text-stroke-width;text-stroke-width"], // Proposed
            Tt: [
                "text-transform",
                {
                    c: "capitalize",
                    fzk: "full-size-kana",
                    fw: "full-width",
                    l: "lowercase",
                    ma: "math-auto",
                    mb: "math-bold",
                    mbf: "math-bold-franktur",
                    mbi: "math-bold-italic",
                    mbs: "math-bold-script",
                    mbss: "math-bold-sans-serif",
                    mds: "math-double-struck",
                    mf: "math-fraktur",
                    mi: "math-italic",
                    min: "math-initial",
                    ml: "math-looped",
                    mm: "math-monospace",
                    ms: "math-script",
                    mss: "math-sans-serif",
                    mssbi: "math-sans-serif-bold-italic",
                    mssi: "math-sans-serif-italic",
                    mst: "math-stretched",
                    mt: "math-tailed",
                    n: "none",
                    u: "uppercase"
                }
            ],
            Tuo: ["text-underline-offset", "a"],
            Tup: [
                "text-underline-position",
                "a",
                "lr",
                {
                    u: "under"
                }
            ],
            T: ["top", "a"],
            Toa: [
                "touch-action",
                "an",
                {
                    m: "manipulation",
                    pd: "pan-down",
                    pl: "pan-left",
                    pstart: "pan-$s", // Typically $s = left
                    pr: "pan-right",
                    pend: "pan-$e", // Typically $e = right
                    pu: "pan-up",
                    px: "pan-x",
                    py: "pan-y",
                    pz: "pinch-zoom"
                }
            ],
            Trf: ["transform", "n"],
            Trfb: ["transform-box", "geometryBox"], // Includes padding-box and margin-box, but those aren't supported
            Trfo: ["transform-origin", "origin"],
            Trfs: ["transform-style", "transformStyle"],
            Trs: ["transition", "n", "easingFunction"], // Mixed spaces and commas
            Trsde: ["transition-delay:$,"],
            Trsdu: ["transition-duration:$,"],
            Trsp: ["transition-property:$,", "n"], // Don't shortcut "all"
            Trstf: ["transition-timing-function:$,", "easingFunction"],
            Tr: ["translate", "n"],
            Ub: [
                "unicode-bidi",
                "nr",
                {
                    bo: "bidi-override",
                    e: "embed",
                    i: "isolate",
                    io: "isolate-override",
                    p: "plaintext"
                }
            ],
            Us: [
                "user-select",
                "an",
                {
                    ct: "contain",
                    t: "text"
                }
            ], // Don't shortcut all
            Va: [
                "vertical-align",
                {
                    b: "bottom",
                    bl: "baseline",
                    m: "middle",
                    sup: "super",
                    tb: "text-bottom",
                    tt: "text-top"
                }
            ], // Don't shortcut sub
            V: [
                "visibility",
                "hv",
                {
                    c: "collapse"
                }
            ],
            Whs: [
                "white-space",
                {
                    bs: "break-spaces",
                    nr: "normal",
                    nw: "nowrap",
                    pl: "pre-line",
                    p: "pre",
                    pw: "pre-wrap"
                }
            ],
            Wid: ["widows"],
            W: ["width", "minMax"],
            Wc: [
                "will-change",
                "a",
                {
                    cn: "contents",
                    sp: "scroll-position"
                }
            ],
            Wob: [
                "word-break",
                "nr",
                {
                    ba: "break-all",
                    bw: "break-word",
                    ka: "keep-all"
                }
            ],
            Wos: ["word-spacing", "nr"],
            Wow: [
                "word-wrap",
                "n",
                "nr",
                {
                    bw: "break-word",
                    s: "suppress",
                    u: "unrestricted"
                }
            ],
            Wm: [
                "writing-mode",
                {
                    htb: "horizontal-tb",
                    srl: "sideways-rl",
                    slr: "sideways-lr",
                    vlr: "vertical-rl",
                    vrl: "vertical-rl"
                }
            ],
            Z: ["z-index", "a"],
            Zoo: ["zoom:1"],

            // Helpers, shortcuts, combined rules

            Bd1: ["border-width:1px;border-style:solid"],
            Bdb1: ["border-width:0 0 1px;border-style:solid"],
            Bdbrs: ["border-bottom-left-radius;border-bottom-right-radius"],
            Bdend1: ["border-width:0;border-$e-width:1px;border-style:solid"],
            Bdendrs: ["border-top-$e-radius;border-bottom-$e-radius"],
            Bdl1: ["border-width:0;border-left-width:1px;border-style:solid"],
            Bdlrs: ["border-top-left-radius;border-bottom-left-radius"],
            Bdr1: ["border-width:0;border-right-width:1px;border-style:solid"],
            Bdrrs: ["border-top-right-radius;border-bottom-right-radius"],
            Bdstart1: ["border-width:0;border-$s-width:1px;border-style:solid"],
            Bdstartrs: ["border-top-$s-radius;border-bottom-$s-radius"],
            Bdt1: ["border-width:1px 0 0 0;border-style:solid"],
            Bdtrs: ["border-top-left-radius;border-top-right-radius"],
            Bdx: ["border-left;border-right"],
            Bdx1: ["border-width:0 1px;border-style:solid"],
            Bdy: ["border-top;border-bottom"],
            Bdy1: ["border-width:1px 0;border-style:solid"],
            Mx: ["margin-left;margin-right", "a"],
            My: ["margin-top;margin-bottom", "a"],
            Px: ["padding-left;padding-right"],
            Py: ["padding-top;padding-bottom"],

            // Filter
            Blur: ["filter:blur($,)"],
            Brightness: ["filter:brightness($,)"],
            Contrast: ["filter:contrast($,)"],
            Dropshadow: ["filter:drop-shadow($,)"],
            Grayscale: ["filter:grayscale($,)"],
            Huerotate: ["filter:hue-rotate($,)"],
            Invert: ["filter:invert($,)"],
            Opacity: ["filter:opacity($,)"],
            Saturate: ["filter:saturate($,)"],
            Sepia: ["filter:sepia($,)"],

            // SVG
            Fill: ["fill", "color"],
            Stk: ["stroke", "color"],
            Stkw: ["stroke-width", { i: "inherit" }],
            Stklc: [
                "stroke-linecap",
                {
                    b: "butt",
                    i: "inherit",
                    r: "round",
                    s: "square"
                }
            ],
            Stklj: [
                "stroke-linejoin",
                {
                    b: "bevel",
                    i: "inherit",
                    m: "miter",
                    r: "round"
                }
            ],

            // Transform
            Matrix: ["transform:matrix($,)"],
            Matrix3d: ["transform:matrix3d($,)"],
            Rotate: ["transform:rotate($,)"],
            Rotate3d: ["transform:rotate3d($,)"],
            Rotatex: ["transform:rotateX($,)"],
            Rotatey: ["transform:rotateY($,)"],
            Rotatez: ["transform:rotateZ($,)"],
            Scale: ["transform:scale($,)"],
            Scale3d: ["transform:scale3d($,)"],
            Scalex: ["transform:scaleX($,)"],
            Scaley: ["transform:scaleY($,)"],
            Scalez: ["transform:scaleZ($,)"],
            Skew: ["transform:skew($,)"],
            Skewx: ["transform:skewX($,)"],
            Skewy: ["transform:skewY($,)"],
            Translate: ["transform:translate($,)"],
            Translate3d: ["transform:translate3d($,)"],
            Translatex: ["transform:translateX($,)"],
            Translatey: ["transform:translateY($,)"],
            Translatez: ["transform:translateZ($,)"]
        }
    };

    var makeSelector = (sel, pseudoClass, pseudoElement) =>
            "." +
            sel.replace(/[^-_a-zA-Z0-9]/g, (match) => "\\" + match) +
            (pseudoClass
                ? ":" + (config.pseudoClasses[pseudoClass] || pseudoClass)
                : "") +
            (pseudoElement
                ? "::" + (config.pseudoElements[pseudoElement] || pseudoElement)
                : ""),
        rulePattern =
            /^((?:\w|-)*?)(?::(\w+))?([>_+~]|\|\|)?(\w+)(?:\(((?:\w|[,-/#$%])+)\))?(!)?(?::(\w+))?(?:::(\w+))?(?:--(\w+))?$/i,
        //    1----------1    2---2  3-----------3 4---4     5----------------5    6-6     7---7       8---8       9---9
        // 1: parent selector to match an element name, matches \w plus hyphens
        // 2: parent pseudoclass, preferably shorthand from config.pseudoClasses, matches \w+
        // 3: combinator, one of > _ + ~ ||
        //    || is experimental
        // 4: atomic selector, matches \w+
        // 5: atomic values, matches characters from \w plus others that can appear as values.
        // 6: important
        // 7: pseudoclass, matches \w+
        // 8: pseudoelement, matches \w+
        // 9: at-rule / media query / breakpoint, matches \w+
        //
        // "\w+" matches one or more characters from the set of a-z, A-Z, 0-9,
        // and underscore. This is intentionally looser than the spec for a few
        // good reasons. It minifies smaller. \w is compiled and optimized more
        // where as [-a-zA-Z0-9] is not. There's no real reason to forbid it.
        processRule = (className) => {
            // DEBUG_START
            if (config.settings.debug) {
                console.log("ACSS-RULE", "Parsing class name: " + className);
            }
            // DEBUG_END
            var match = className.match(rulePattern);

            if (!match) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", `Did not match pattern`);
                }

                // DEBUG_END

                return;
            }

            // This is the atomic CSS rule definition.
            // Example: ["background-color","color","n"]
            var def = config.classes[match[4]];

            if (!def) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", "No class matches: " + match[4]);
                }

                // DEBUG_END

                return;
            }

            // Build a CSS rule selector out of the bits that match
            var ruleSelector = `${
                    match[1]
                        ? makeSelector(match[1], match[2]) +
                          match[3].replace(/_/, " ")
                        : ""
                }${makeSelector(className, match[7], match[8])}`,
                // Convert the definition to a series of lookup objects
                valueLookup = def
                    .slice(1)
                    .concat("values")
                    .map((stringName) => config[stringName] || stringName)
                    .reduceRight((acc, next) => Object.assign(acc, next), {}),
                // Split multiple rules apart into individual rules.
                // Append $_ if the rule has no value defined
                // Handle !important
                rules = def[0].split(";").map((r) => {
                    if (r.indexOf(":") < 0) {
                        r += ":$_";
                    }

                    if (match[6]) {
                        r += "!important";
                    }

                    return r;
                }),
                // Apply namespace and build the CSS selector
                rule =
                    config.settings.namespace +
                    ruleSelector +
                    `{${rules.join(";")}}`;

            if (match[9]) {
                // Wrap in an atRule if one exists
                rule = `${config.atRules[match[9]] || match[9]}{${rule}}`;
            }

            // Replace $s and $e with left/right based on config
            rule = rule
                .replace(/\$s/g, config.settings.rightToLeft ? "right" : "left")
                .replace(/\$e/g, config.settings.rightToLeft ? "left" : "right")

                // Replace $_ and $, with the list of values
                // Look each one up in valueLookup. If it fails (falsy),
                // use the value verbatim.
                // match[5] are the arguments from the user.
                .replace(/\$([,_])/g, (dollarMatch) =>
                    match[5]
                        .split(",")
                        .map((userValue) =>
                            userValue.indexOf("--")
                                ? valueLookup[userValue] || userValue
                                : `var(${userValue})`
                        )
                        .join(dollarMatch === "$," ? "," : " ")
                );

            // DEBUG_START
            if (config.settings.debug) {
                console.log("ACSS-RULE", "Add rule: " + rule);
            }
            // DEBUG_END

            styleElement.sheet.insertRule(rule);
        },
        // DEBUG_START
        getElementIdentifier = (e) => {
            var s = e.tagName;

            if (e.id) {
                s += "#" + e.id;
            }

            for (var c of e.classList) {
                if (c) {
                    s += "." + c;
                }
            }

            return s;
        },
        // DEBUG_END
        processElements = (list, processedElements, includeChildren) => {
            // Non-recursive
            while (list.length) {
                var node = list.shift();

                if (!processedElements.includes(node)) {
                    processedElements.push(node);

                    // DEBUG_START
                    if (config.settings.debug) {
                        console.log(
                            "ACSS-ELEMENT",
                            "Process element: " + getElementIdentifier(node)
                        );
                    }
                    // DEBUG_END

                    for (var c of node.classList) {
                        if (!definedClasses[c]) {
                            definedClasses[c] = 1;
                            processRule(c);
                        }
                    }

                    if (includeChildren) {
                        for (var child of node.children) {
                            if (child.nodeType === 1) {
                                list.push(child);
                            }
                        }
                    }
                }
            }
        },
        definedClasses = {},
        styleElement = document.createElement("style");

    // Merge default config with any from user
    for (var key of Object.keys(window.acssLiveConfig || {})) {
        Object.assign(config[key], window.acssLiveConfig[key]);
    }

    // DEBUG_START
    if (config.settings.debug) {
        console.log("ACSS-SETUP", "Starting setup");
    }
    // DEBUG_END

    document.head.appendChild(styleElement);

    // DEBUG_START
    if (config.settings.debug) {
        console.log("ACSS-SCAN-DOCUMENT", "Process current elements");
    }
    // DEBUG_END

    processElements([document.documentElement], [], true);

    new MutationObserver((mutations) => {
        // DEBUG_START
        const timerEnd = timerStart("ACSS-MUTATION");

        if (config.settings.debug) {
            console.log("ACSS-MUTATION", "Detected mutations", mutations);
        }
        // DEBUG_END

        var processedElements = [];

        for (var mutation of mutations) {
            // attributes = yes
            // characterData = no, but not monitored
            // childList = no
            if (mutation.type[0] === "a") {
                processElements([mutation.target], processedElements);
            } else {
                // Using mutation.target.querySelectorAll('*') is much slower
                processElements(
                    [...mutation.addedNodes].filter(
                        (node) => node.nodeType === 1
                    ),
                    processedElements,
                    true
                );
            }
        }

        // DEBUG_START
        timerEnd();
        // DEBUG_END
    }).observe(document, {
        attributeFilter: ["class"], // Enables monitoring of attributes
        childList: true,
        subtree: true
    });

    // DEBUG_START
    setupTimerEnd();

    if (config.settings.timing) {
        window.addEventListener("load", () => {
            // I tried adding a setTimeout here to make sure there were no
            // events after page load. There were none, so there's no reason to
            // delay.
            //
            // Normally, using "*" is a security concern. I don't care who gets the
            // timing information.
            window.parent.postMessage({ timerTotals }, "*");
        });
    }
    // DEBUG_END
})(window, document);
