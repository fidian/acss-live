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

        // Colors
        colors: {
            cc: "currentColor",
            i: "invert", // for outline-color
            n: "none",
            t: "transparent"
        },

        // Border styles
        borderStyle: {
            db: "double",
            ds: "dashed",
            dt: "dotted",
            dtds: "dot-dash",
            dtdtds: "dot-dot-dash",
            g: "groove",
            h: "hidden",
            i: "inset",
            n: "none",
            o: "outset",
            r: "ridge",
            s: "solid",
            w: "wave"
        },

        minMax: {
            a: "auto",
            fa: "fill-available",
            fc: "fit-content",
            i: "initial",
            maxc: "max-content",
            minc: "min-content"
        },

        overflow: {
            a: "auto",
            h: "hidden",
            s: "scroll",
            v: "visible"
        },

        thickness: {
            m: "medium",
            tc: "thick",
            tn: "thin"
        },

        // Shorthand for really simple lookups
        a: { a: "auto" },
        an: { a: "auto", n: "none" },
        cn: { c: "continue", n: "none" },
        n: { n: "none" },

        pseudoClasses: {
            a: "active",
            c: "checked",
            d: "default",
            di: "disabled",
            e: "empty",
            en: "enabled",
            fc: "first-child",
            f: "focus",
            fi: "first",
            fot: "first-of-type",
            fs: "fullscreen",
            fv: "focus-visible",
            fw: "focus-within",
            h: "hover",
            ind: "indeterminate",
            inv: "invalid",
            ir: "in-range",
            lc: "last-child",
            li: "link",
            l: "left",
            lot: "last-of-type",
            oc: "only-child",
            o: "optional",
            oor: "out-of-range",
            oot: "only-of-type",
            ps: "placeholder-shown",
            req: "required",
            ro: "read-only",
            r: "right",
            rt: "root",
            rw: "read-write",
            s: "scope",
            t: "target",
            va: "valid",
            vi: "visited"
        },

        pseudoElements: {
            a: "after",
            b: "before",
            fl: "first-letter",
            fli: "first-line",
            ph: "placeholder"
        },

        // Values can be passed as parameters. They also can have spaces,
        // which helps for box-shadow.
        values: {
            inh: "inherit",
            in: "initial",
            rel: "revert-layer",
            re: "revert",
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
            // S = mobile
            // M = tablets
            // L = small screens, eg. laptops
            // Default is desktop / tv / large format
            s: "@media(max-width:480px)",
            sm: "@media(max-width:768px)",
            m: "@media(min-width:480.9999px) and (max-width:768px)",
            sml: "@media(max-width:1024px)",
            ml: "@media(min-width:480.9999px) and (max-width:1024px)",
            l: "@media(min-width:768.9999px) and (max-width:1024px)"
        },

        // _S_ and _E_ are replaced with left and right
        // (depending on the rightToLeft setting).
        // $0 through $9 are replaced with arguments
        //
        // Keep the arguments expanded as their own lists. It adds about 2k to
        // the minified version, but gzip compression is able to compress about
        // 10% better, which is not what I had expected.
        classes: {
            // Animation
            Anim: ["animation"],
            Animdel: ["animation-delay"],
            Animdir: [
                "animation-direction",
                {
                    a: "alternate",
                    ar: "alternate-reverse",
                    n: "normal",
                    r: "reverse"
                }
            ],
            Animdur: ["animation-duration"],
            Animfm: [
                "animation-fill-mode",
                {
                    b: "backwards",
                    bt: "both",
                    f: "forwards",
                    n: "none"
                }
            ],
            Animic: [
                "animation-iteration-count",
                {
                    i: "infinite"
                }
            ],
            Animn: ["animation-name", "n"],
            Animps: ["animation-play-state", { p: "paused", r: "running" }],
            Animtf: [
                "animation-timing-function",
                {
                    cb: "cubic-bezier(.1,.7,1,.1)",
                    e: "ease",
                    ei: "ease-in",
                    eio: "ease-in-out",
                    eo: "ease-out",
                    l: "linear",
                    se: "step-end",
                    ss: "step-start"
                }
            ],

            // Appearance
            Ap: ["appearance", "an"],

            // Backface
            Bfv: ["backface-visibility", { h: "hidden", v: "visible" }],

            // Background
            Bg: ["background", { n: "none", t: "transparent" }],
            Bga: [
                "background-attachment",
                {
                    f: "fixed",
                    l: "local",
                    s: "scroll"
                }
            ],
            Bgbk: [
                "background-break",
                {
                    bb: "bounding-box",
                    c: "continuous",
                    eb: "each-box"
                }
            ],
            Bgc: ["background-color", "colors"],
            Bgcp: [
                "background-clip",
                {
                    bb: "border-box",
                    cb: "content-box",
                    nc: "no-clip",
                    pb: "padding-box"
                }
            ],
            Bgi: ["background-image", "n"],
            Bgo: [
                "background-origin",
                { bb: "border-box", cb: "content-box", pb: "padding-box" }
            ],
            Bgp: [
                "background-position",
                {
                    c_b: "center 100%",
                    c: "center",
                    c_t: "center 0",
                    end_b: "_E_ 100%",
                    end_c: "_E_ center",
                    end_t: "_E_ 0",
                    start_b: "_S_ 100%",
                    start_c: "_S_ center",
                    start_t: "_S_ 0"
                }
            ],
            Bgpx: [
                "background-position-x",
                {
                    c: "center",
                    end: "_E_",
                    start: "_S_"
                }
            ],
            Bgpy: [
                "background-position-y",
                {
                    b: "100%",
                    c: "50%",
                    t: "0"
                }
            ],
            Bgr: [
                "background-repeat",
                {
                    nr: "no-repeat",
                    ro: "round",
                    r: "repeat",
                    rx: "repeat-x",
                    ry: "repeat-y",
                    s: "space"
                }
            ],
            Bgz: [
                "background-size",
                {
                    a: "auto",
                    ct: "contain",
                    cv: "cover"
                }
            ],

            // This is a hack. It does not make the box grow to 1600px, just
            // enough to fill the container.
            BfcHack: ["display:table-cell;width:1600px"],

            // Border shortcuts: 1 pixel solid border
            BdAll: ["border-width:1px;border-style:solid"],
            BdB: ["border-width:0 0 1px;border-style:solid"],
            BdEnd: ["border-width:0;border-_E_-width:1px;border-style:solid"],
            BdStart: ["border-width:0;border-_S_-width:1px;border-style:solid"],
            BdT: ["border-width:1px 0 0 0;border-style:solid"],
            BdX: ["border-width:0 1px;border-style:solid"],
            BdY: ["border-width:1px 0;border-style:solid"],

            // Border
            Bdb: ["border-bottom"],
            Bdbc: ["border-bottom-color", "colors"],
            Bdbendi: ["border-bottom-_E_-image", "cn"],
            Bdbendrs: ["border-radius-bottom-_E_"],
            Bdbi: ["border-bottom-image", "n"],
            Bdbk: ["border-break", { c: "close" }],
            Bd: ["border", "n"],
            Bdbrs: ["border-radius-bottom-_E_;border-radius-bottom-_S_"],
            Bdbs: ["border-bottom-style", "borderStyle"],
            Bdbstarti: ["border-bottom-_S_-image", "cn"],
            Bdbstartrs: ["border-radius-bottom-_S_"],
            Bdbw: ["border-bottom-width", "thickness"],
            Bdc: ["border-color", "colors"],
            Bdci: ["border-corner-image", "cn"],
            Bdcl: ["border-collapse", { c: "collapse", s: "separate" }],
            Bdend: ["border-_E_"],
            Bdendc: ["border-_E_-color", "colors"],
            Bdendi: ["border-_E_-image", "n"],
            Bdendrs: ["border-radius-top-_E_;border-radius-bottom-_E_"],
            Bdends: ["border-_E_-style", "borderStyle"],
            Bdendw: ["border-_E_-width", "thickness"],
            Bdf: [
                "border-fit",
                {
                    c: "clip",
                    of: "overflow",
                    ow: "overwrite",
                    r: "repeat",
                    sc: "scale",
                    sp: "space",
                    st: "stretch"
                }
            ],
            Bdi: ["border-image", "n"],
            Bdlen: ["border-length", "a"],
            Bdrs: ["border-radius"],
            Bds: ["border-style", "borderStyle"],
            Bdsp: ["border-spacing", { i: "inherit" }],
            Bdstart: ["border-_S_"],
            Bdstartc: ["border-_S_-color", "colors"],
            Bdstarti: ["border-_S_-image", "n"],
            Bdstartrs: ["border-radius-top-_S_;border-radius-bottom-_S_"],
            Bdstarts: ["border-_S_-style", "borderStyle"],
            Bdstartw: ["border-_S_-width", "thickness"],
            Bdt: ["border-top"],
            Bdtc: ["border-top-color", "colors"],
            Bdtendi: ["border-top-_E_-image", "cn"],
            Bdtendrs: ["border-radius-top-_E_"],
            Bdti: ["border-top-image", "n"],
            Bdtrs: ["border-radius-top-_E_;border-radius-top-_S_"],
            Bdts: ["border-top-style", "borderStyle"],
            Bdtstarti: ["border-top-_S_-image", "cn"],
            Bdtstartrs: ["border-radius-top-_S_"],
            Bdtw: ["border-top-width", "thickness"],
            Bdw: ["border-width", "thickness"],
            Bdx: ["border-_S_;border-_E_"],
            Bdy: ["border-top;border-bottom"],

            // Box shadow
            Bxsh: ["box-shadow", "n"],

            // Box sizing
            Bxz: [
                "box-sizing",
                { bb: "border-box", cb: "content-box", pb: "padding-box" }
            ],

            // Clearfix
            Cf: {
                addRules: {
                    "": {
                        ".Cf:before": ['content:" "', "display:table"],
                        ".Cf:after": [
                            'content:" "',
                            "display:table",
                            "clear:both"
                        ]
                    }
                }
            },

            // Color
            C: ["color", "colors"],

            // Clip
            Cp: ["clip", "a"],

            // Columns
            Colmc: ["column-count"],
            Colm: ["columns"],
            Colmf: ["column-fill", { a: "auto", b: "balance" }],
            Colmg: ["column-gap"],
            Colmrc: ["column-rule-color"],
            Colmr: ["column-rule"],
            Colmrs: [
                "column-rule-style",
                {
                    da: "dashed",
                    d: "dotted",
                    do: "double",
                    g: "groove",
                    h: "hidden",
                    i: "inset",
                    n: "none",
                    o: "outset",
                    r: "ridge",
                    s: "solid"
                }
            ],
            Colmrw: ["column-rule-width"],
            Colms: ["column-span", { a: "all", n: "none" }],
            Colmw: ["column-width"],

            // Contain
            Ctn: [
                "contain",
                {
                    c: "content",
                    l: "layout",
                    n: "none",
                    p: "paint",
                    s: "style",
                    st: "strict",
                    z: "size"
                }
            ],

            // Content
            Cnt: [
                "content",
                {
                    cq: "close-quote",
                    ncq: "no-close-quote",
                    n: "none",
                    no: "normal",
                    noq: "no-open-quote",
                    oq: "open-quote"
                }
            ],

            // Counter
            Coi: ["counter-increment"],
            Cor: ["counter-reset"],

            // Cursor
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

            // Display
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

            // Ellipsis - single line with ellipsis (see also LineClamp)
            Ell: {
                addRules: {
                    "": {
                        ".Ell:after": [
                            'content:""',
                            "font-size:0",
                            "visibility:hidden",
                            "display:inline-block",
                            "overflow:hidden",
                            "height:0",
                            "width:0"
                        ]
                    }
                },
                styles: [
                    "max-width:100%",
                    "white-space:nowrap",
                    "overflow:hidden",
                    "text-overflow:ellipsis",
                    "hyphens:none"
                ]
            },

            // Filter
            Fil: ["filter"],
            Blur: ["filter:blur($0)"],
            Brightness: ["filter:brightness($0)"],
            Contrast: ["filter:contrast($0)"],
            DropShadow: ["filter:drop-shadow($0)"],
            Grayscale: ["filter:grayscale($0)"],
            HueRotate: ["filter:hue-rotate($0)"],
            Invert: ["filter:invert($0)"],
            Opacity: ["filter:opacity($0)"],
            Saturate: ["filter:saturate($0)"],
            Sepia: ["filter:sepia($0)"],

            // Flex
            Fx: ["flex", "an"],
            Fxg: ["flex-grow"],
            Fxs: ["flex-shrink"],
            Fxb: ["flex-basis", "an"],
            As: [
                "align-self",
                {
                    a: "auto",
                    b: "baseline",
                    c: "center",
                    fe: "flex-end",
                    fs: "flex-start",
                    s: "stretch"
                }
            ],
            Fxd: [
                "flex-direction",
                {
                    c: "column",
                    cr: "column-reverse",
                    r: "row",
                    rr: "row-reverse"
                }
            ],
            Fxf: [
                "flex-flow",
                {
                    c: "column",
                    cr: "column-reverse",
                    nw: "nowrap",
                    r: "row",
                    rr: "row-reverse",
                    wr: "wrap-reverse",
                    w: "wrap"
                }
            ],
            Ai: [
                "align-items",
                {
                    b: "baseline",
                    c: "center",
                    fe: "flex-end",
                    fs: "flex-start",
                    s: "stretch"
                }
            ],
            Ac: [
                "align-content",
                {
                    c: "center",
                    fe: "flex-end",
                    fs: "flex-start",
                    sa: "space-around",
                    sb: "space-between",
                    s: "stretch"
                }
            ],
            Ord: ["order"],
            Jc: [
                "justify-content",
                {
                    c: "center",
                    fe: "flex-end",
                    fs: "flex-start",
                    sa: "space-around",
                    sb: "space-between",
                    se: "space-evenly",
                    s: "stretch"
                }
            ],
            Fxw: ["flex-wrap", { nw: "nowrap", w: "wrap", wr: "wrap-reverse" }],

            // Floating elements
            Fl: [
                "float",
                {
                    end: "_E_",
                    n: "none",
                    start: "_S_"
                }
            ],
            Cl: [
                "clear",
                {
                    b: "both",
                    end: "_E_",
                    n: "none",
                    start: "_S_"
                }
            ],

            // Font
            Fef: [
                "font-effect",
                {
                    eb: "emboss",
                    eg: "engrave",
                    n: "none",
                    o: "outline"
                }
            ],
            Fem: ["font-emphasize"],
            Femp: [
                "font-emphasize-position",
                {
                    a: "after",
                    b: "before"
                }
            ],
            Fems: [
                "font-emphasize-style",
                {
                    ac: "accent",
                    c: "circle",
                    ds: "disc",
                    dt: "dot",
                    n: "none"
                }
            ],
            Fsm: [
                "font-smooth",
                {
                    a: "auto",
                    aw: "always",
                    n: "never"
                }
            ],
            Fst: [
                "font-stretch",
                {
                    c: "condensed",
                    ec: "extra-condensed",
                    ee: "extra-expanded",
                    e: "expanded",
                    n: "normal",
                    sc: "semi-condensed",
                    se: "semi-expanded",
                    uc: "ultra-condensed",
                    ue: "ultra-expanded"
                }
            ],
            Ff: [
                "font-family",
                {
                    a: 'Arial,"Helvetica Neue",Helvetica,sans-serif',
                    c: "cursive",
                    cs: '"Comic Sans MS","Monotype Corsiva",cursive',
                    f: "fantasy",
                    i: "Impact,Capitals,fantasy",
                    m: "monospace",
                    mo: 'Monaco,"Courier New",monospace',
                    s: "serif",
                    ss: "sans-serif",
                    t: '"Times New Roman",Times,Baskerville,Georgia,serif',
                    v: "Verdana,Geneva,sans-serif"
                }
            ],
            Fw: [
                "font-weight",
                {
                    b: "bold",
                    br: "bolder",
                    lr: "lighter",
                    n: "normal"
                }
            ],
            Fz: ["font-size"],
            Fza: ["font-size-adjust", "n"],
            Fs: [
                "font-style",
                {
                    i: "italic",
                    n: "normal",
                    o: "oblique"
                }
            ],
            Fv: [
                "font-variant",
                {
                    n: "normal",
                    sc: "small-caps"
                }
            ],

            // Height
            H: [
                "height",
                {
                    a: "auto",
                    av: "available",
                    bb: "border-box",
                    cb: "content-box",
                    fc: "fit-content",
                    maxc: "max-content",
                    minc: "min-content"
                }
            ],
            Mah: ["max-height", "minMax"],
            Mih: ["min-height", "minMax"],

            // Hidden - signted can't see, screen readers can
            Hidden: [
                "position:absolute!important;clip:rect(1px,2px,1px,1px);padding:0!important;border:0!important;height:1px!important;width:1px!important;overflow:hidden"
            ],

            // Hyphens
            Hy: [
                "hyphens",
                {
                    a: "auto",
                    m: "manual",
                    n: "normal"
                }
            ],

            // Inline block box
            IbBox: ["display:inline-block;vertical-align:top"],

            // Letter spacing
            Lts: ["letter-spacing", { n: "normal" }],

            // LineClamp(numberOfLines)
            LineClamp: {
                addRules: {
                    "": {
                        "[class*=LineClamp]": [
                            "display:-webkit-box",
                            "-webkit-box-orient:vertical",
                            "overflow:hidden"
                        ],
                        "a[class*=LineClamp]": [
                            "display:inline-block",
                            "display:-webkit-box"
                        ],
                        "a[class*=LineClamp]:after": [
                            'content:"."',
                            "font-size:0",
                            "visibility:hidden",
                            "display:inline-block",
                            "overflow:hidden",
                            "height:0",
                            "width:0"
                        ]
                    },
                    "@supports (display:-moz-box)": {
                        "[class*=LineClamp]": ["display:block"]
                    }
                },
                styles: ["-webkit-line-clamp", "max-height:$0em"]
            },

            // Line height
            Lh: ["line-height", { n: "normal" }],

            // Lists
            Lis: ["list-style", "n"],
            List: [
                "list-style-type",
                {
                    a: "armenian",
                    c: "circle",
                    dc: "decimal",
                    dclz: "decimal-leading-zero",
                    d: "disc",
                    g: "georgian",
                    la: "lower-alpha",
                    lg: "lower-greek",
                    ll: "lower-latin",
                    lr: "lower-roman",
                    n: "none",
                    s: "square",
                    ua: "upper-alpha",
                    ul: "upper-latin",
                    ur: "upper-roman"
                }
            ],
            Lisp: [
                "list-style-position",
                {
                    i: "inside",
                    o: "outside"
                }
            ],
            Lisi: ["list-style-image", "n"],

            // Margins
            M: ["margin", "a"],
            Mx: ["margin-_S_;margin-_E_", "a"],
            My: ["margin-top;margin-bottom", "a"],
            Mt: ["margin-top", "a"],
            Mend: ["margin-_E_", "a"],
            Mb: ["margin-bottom", "a"],
            Mstart: ["margin-_S_", "a"],

            // Object
            Objf: [
                "object-fit",
                {
                    ct: "contain",
                    cv: "cover",
                    f: "fill",
                    n: "none",
                    sd: "scale-down"
                }
            ],

            // Offsets
            T: ["top", "a"],
            End: ["_E_", "a"],
            B: ["bottom", "a"],
            Start: ["_S_", "a"],

            // Opacity
            Op: ["opacity"],

            // Orientation
            Ori: [
                "orientation",
                {
                    l: "landscape",
                    p: "portrait"
                }
            ],

            // Outline
            Ol: ["outline", "n"],
            Olc: ["outline-color", "colors"],
            Olo: ["outline-offset"],
            Ols: ["outline-style", "borderStyle"],
            Olw: ["outline-width", "thickness"],

            // Overflow
            Ov: ["overflow", "overflow"],
            Ovx: ["overflow-x", "overflow"],
            Ovy: ["overflow-y", "overflow"],
            Ovs: [
                "overflow-style",
                {
                    a: "auto",
                    m: "move",
                    mq: "marquee",
                    p: "panner",
                    s: "scrollbar"
                }
            ],

            // Paddings
            P: ["padding"],
            Px: ["padding-_S_;padding-_E_"],
            Py: ["padding-top;padding-bottom"],
            Pt: ["padding-top"],
            Pend: ["padding-_E_"],
            Pb: ["padding-bottom"],
            Pstart: ["padding-_S_"],

            // Perspective
            Prs: ["perspective", "n"],
            Prso: [
                "perspective-origin:$0 $1",
                {
                    b: "bottom",
                    c: "center",
                    end: "_E_",
                    start: "_S_",
                    t: "top"
                }
            ],

            // Pointer events
            Pe: [
                "pointer-events",
                {
                    a: "auto",
                    all: "all",
                    f: "fill",
                    n: "none",
                    p: "painted",
                    s: "stroke",
                    vf: "visibleFill",
                    vp: "visiblePainted",
                    vs: "visibleStroke",
                    v: "visible"
                }
            ],

            // Position
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

            // Print
            Pgbb: [
                "page-break-before",
                {
                    al: "always",
                    au: "auto",
                    end: "_E_",
                    start: "_S_"
                }
            ],
            Pgbi: [
                "page-break-inside",
                {
                    au: "auto",
                    av: "avoid"
                }
            ],
            Pgba: [
                "page-break-after",
                {
                    al: "always",
                    au: "auto",
                    end: "_E_",
                    start: "_S_"
                }
            ],
            Orp: ["orphans"],
            Wid: ["widows"],

            // Quotes
            Q: [
                "quotes",
                {
                    en: '"“" "”" "‘" "’"',
                    fr: '"«" "»" "‹" "›"',
                    n: "none",
                    ru: '"«" "»" "„" "“"'
                }
            ],

            // Resize
            Rsz: [
                "resize",
                {
                    b: "both",
                    h: "horizontal",
                    n: "none",
                    v: "vertical"
                }
            ],

            // Resolution
            Mar: ["max-resolution"],
            Mir: ["min-resolution"],

            // Contain boxes on a row
            Row: [
                "clear:both;display:inline-block;vertical-align:top;width:100%;box-sizing:border-box"
            ],

            // Stretches a box inside its containing block
            StretchedBox: ["position:absolute;top:0;right:0;bottom:0;left:0"],

            // SVG
            Fill: ["fill", "colors"],
            Stk: ["stroke", "colors"],
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

            // Table layout
            Tbl: [
                "table-layout",
                {
                    a: "auto",
                    f: "fixed"
                }
            ],
            Cps: [
                "caption-side",
                {
                    b: "bottom",
                    t: "top"
                }
            ],
            Ec: [
                "empty-cells",
                {
                    h: "hide",
                    s: "show"
                }
            ],

            // Text
            Ta: [
                "text-align",
                {
                    c: "center",
                    e: "end",
                    end: "_E_",
                    j: "justify",
                    mp: "match-parent",
                    s: "start",
                    start: "_S_"
                }
            ],
            Tal: [
                "text-align-last",
                {
                    a: "auto",
                    c: "center",
                    e: "end",
                    end: "_E_",
                    j: "justify",
                    s: "start",
                    start: "_S_"
                }
            ],
            Td: [
                "text-decoration",
                {
                    l: "line-through",
                    n: "none",
                    o: "overline",
                    u: "underline"
                }
            ],
            Te: [
                "text-emphasis",
                {
                    a: "after",
                    ac: "accent",
                    b: "before",
                    c: "circle",
                    ds: "disc",
                    dt: "dot",
                    n: "none"
                }
            ],
            Th: [
                "text-height",
                {
                    a: "auto",
                    f: "font-size",
                    m: "max-size",
                    t: "text-size"
                }
            ],
            Ti: ["text-indent"],
            Tj: [
                "text-justify",
                {
                    a: "auto",
                    d: "distribute",
                    ic: "inter-cluster",
                    ii: "inter-ideograph",
                    iw: "inter-word",
                    k: "kashida",
                    t: "tibetan"
                }
            ],
            To: ["text-outline", "n"],
            Tov: [
                "text-overflow",
                {
                    c: "clip",
                    e: "ellipsis"
                }
            ],
            Tr: ["text-replace", "n"],
            Tren: [
                "text-rendering",
                {
                    a: "auto",
                    gp: "geometricPrecision",
                    ol: "optimizeLegibility",
                    os: "optimizeSpeed"
                }
            ],
            Tt: [
                "text-transform",
                {
                    c: "capitalize",
                    l: "lowercase",
                    n: "none",
                    u: "uppercase"
                }
            ],
            Tsh: ["text-shadow", "n"],

            // Transform
            Trf: ["transform"],
            Trfo: [
                "transform-origin:$0 $1",
                {
                    b: "bottom",
                    c: "center",
                    end: "_E_",
                    start: "_S_",
                    t: "top"
                }
            ],
            Trfs: [
                "transform-style",
                {
                    f: "flat",
                    p: "preserve-3d"
                }
            ],
            Matrix: ["transform:matrix($0)"],
            Matrix3d: ["transform:matrix3d($0)"],
            Rotate: ["transform:rotate($0)"],
            Rotate3d: ["transform:rotate3d($0)"],
            RotateX: ["transform:rotateX($0)"],
            RotateY: ["transform:rotateY($0)"],
            RotateZ: ["transform:rotateZ($0)"],
            Scale: ["transform:scale($0)"],
            Scale3d: ["transform:scale3d($0)"],
            ScaleX: ["transform:scaleX($0)"],
            ScaleY: ["transform:scaleY($0)"],
            ScaleZ: ["transform:scaleZ($0)"],
            Skew: ["transform:skew($0)"],
            SkewX: ["transform:skewX($0)"],
            SkewY: ["transform:skewY($0)"],
            Translate: ["transform:translate($0,$1)"],
            Translate3d: ["transform:translate3d($0,$1,$2)"],
            TranslateX: ["transform:translateX($0)"],
            TranslateY: ["transform:translateY($0)"],
            TranslateZ: ["transform:translateZ($0)"],

            // Transition
            Trs: ["transition"],
            Trsde: [
                "transition-delay",
                {
                    i: "initial"
                }
            ],
            Trsdu: ["transition-duration"],
            Trsp: ["transition-property", { a: "all" }],
            Trstf: [
                "transition-timing-function",
                {
                    e: "ease",
                    ei: "ease-in",
                    eio: "ease-in-out",
                    eo: "ease-out",
                    l: "linear",
                    se: "step-end",
                    ss: "step-start"
                }
            ],

            // User select
            Us: [
                "user-select",
                {
                    a: "all",
                    el: "element",
                    els: "elements",
                    n: "none",
                    to: "toggle",
                    t: "text"
                }
            ],

            // Vertical align
            Va: [
                "vertical-align",
                {
                    b: "bottom",
                    bl: "baseline",
                    m: "middle",
                    sub: "sub",
                    sup: "super",
                    tb: "text-bottom",
                    t: "top",
                    tt: "text-top"
                }
            ],

            // Visibility
            V: [
                "visibility",
                {
                    c: "collapse",
                    h: "hidden",
                    v: "visible"
                }
            ],

            // White space
            Whs: [
                "white-space",
                {
                    n: "normal",
                    nw: "nowrap",
                    pl: "pre-line",
                    p: "pre",
                    pw: "pre-wrap"
                }
            ],
            Whsc: [
                "white-space-collapse",
                {
                    ba: "break-all",
                    bs: "break-strict",
                    ka: "keep-all",
                    l: "loose",
                    n: "normal"
                }
            ],

            // Width
            W: [
                "width",
                {
                    a: "auto",
                    av: "available",
                    bb: "border-box",
                    cb: "content-box",
                    fc: "fit-content",
                    maxc: "max-content",
                    minc: "min-content"
                }
            ],
            Maw: ["max-width", "minMax"],
            Miw: ["min-width", "minMax"],

            // Word break
            Wob: [
                "word-break",
                {
                    ba: "break-all",
                    ka: "keep-all",
                    n: "normal"
                }
            ],

            // Word spacing
            Wos: ["word-spacing"],

            // Word wrap
            Wow: [
                "word-wrap",
                {
                    bw: "break-word",
                    nm: "normal",
                    n: "none",
                    s: "suppress",
                    u: "unrestricted"
                }
            ],

            // Writing mode
            Wm: [
                "writing-mode",
                {
                    btl: "bt-lr",
                    btr: "bt-rl",
                    lrb: "lr-bt",
                    lrt: "lr-tb",
                    rlb: "rl-bt",
                    rlt: "rl-tb",
                    tbl: "tb-lr",
                    tbr: "tb-rl"
                }
            ],

            // Z-index
            Z: ["z-index", "a"],

            // Zoom
            Zoo: ["zoom:1"]
        }
    };

    var loop = (thing, cb) => {
            for (var [key, value] of Object.entries(thing || {})) {
                cb(value, key);
            }
        },
        addRule = (atRule, ruleSelector, rules, args, values, important) => {
            var rule =
                config.settings.namespace +
                ruleSelector +
                "{" +
                rules
                    .map((r) => {
                        if (important && r.substr(-10) !== "!important") {
                            r += "!important";
                        }

                        return r;
                    })
                    .join(";") +
                "}";

            if (atRule) {
                rule = `${config.atRules[atRule] || atRule}{${rule}}`;
            }

            rule = rule
                .replace(/_S_/g, config.settings.rightToLeft ? "right" : "left")
                .replace(/_E_/g, config.settings.rightToLeft ? "left" : "right")
                .replace(/\$\d/g, (paramNumber) => {
                    var v = (values.split(",") || [])[+paramNumber[1]] || "";

                    if (v.match(/^--/)) {
                        return `var(${v})`;
                    }

                    return args[v] || config.values[v] || v;
                });

            // DEBUG_START
            if (config.settings.debug) {
                console.log("ACSS-RULE", "Add rule: " + rule);
            }
            // DEBUG_END

            ((styleSheet) =>
                styleSheet.insertRule(rule, styleSheet.cssRules.length))(
                styleElement.sheet
            );
        },
        makeSelector = (sel, pseudoClass, pseudoElement) => {
            sel = sel.replace(/[^-_a-zA-Z0-9]/g, (match) => "\\" + match);
            pseudoClass = pseudoClass
                ? ":" + (config.pseudoClasses[pseudoClass] || pseudoClass)
                : "";
            pseudoElement = pseudoElement
                ? "::" + (config.pseudoElements[pseudoElement] || pseudoElement)
                : "";

            return sel + pseudoClass + pseudoElement;
        },
        processRule = (selector) => {
            // DEBUG_START
            const timerEnd = timerStart("ACSS-RULE");

            if (config.settings.debug) {
                console.log("ACSS-RULE", "Parsing selector: " + selector);
            }
            // DEBUG_END
            var match = selector.match(rulePattern);

            if (!match) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", `Did not match pattern`);
                }

                timerEnd();
                // DEBUG_END

                return;
            }

            var def = config.classes[match[4]];

            if (!def) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", "No class matches: " + match[4]);
                }

                timerEnd();
                // DEBUG_END

                return;
            }

            var parentSelector =
                match[1] && makeSelector(match[1], match[2]) + match[3];
            var ruleSelector =
                parentSelector +
                "." +
                makeSelector(selector, match[7], match[8]);

            if (def.styles) {
                addRule(
                    match[9],
                    ruleSelector,
                    def.styles,
                    config[`${def.args}`] || def.args || {},
                    match[5],
                    match[6]
                );
            }

            loop(def.addRules, (ruleSet, atRule) => {
                loop(ruleSet, (addStyles, addSel) => {
                    addRule(atRule, addSel, addStyles, {});
                });
            });

            // DEBUG_START
            timerEnd();
            // DEBUG_END
        },
        // DEBUG_START
        getElementIdentifier = (e) => {
            var s = e.tagName;

            if (e.id) {
                s += "#" + e.id;
            }

            loop(e.classList, (c) => {
                if (c) {
                    s += "." + c;
                }
            });

            return s;
        },
        // DEBUG_END
        processElement = (e, elementMap) => {
            // DEBUG_START
            if (config.settings.debug) {
                console.log(
                    "ACSS-ELEMENT",
                    "Process element: " + getElementIdentifier(e)
                );
            }
            // DEBUG_END

            elementMap.push(e);

            loop(e.classList, (c) => {
                if (!definedClasses[c]) {
                    definedClasses[c] = 1;
                    processRule(c);
                }
            });
        },
        processElementsAndChildren = (list, processedList) => {
            // Non-recursive
            while (list.length) {
                var node = list.shift(),
                    nodeType = node.nodeType;

                if ((nodeType === 1 || nodeType === 9) && !processedList.includes(node)) {
                    processElement(node, processedList);

                    for (var child of node.children) {
                        list.push(child);
                    }
                }
            }
        },
        rulePattern =
            /^((?:\w|-)*?)(?::(\w+))?([>_+~])?(\w+)(?:\(((?:\w|[,-/#$%])+)\))?(!)?(?::(\w+))?(?:::(\w+))?(?:--(\w+))?$/i,
        //    1----------1    2---2  3------3 4---4     5----------------5    6-6     7---7       8---8       9---9
        // 1: parent selector to match an element name, matches \w plus hyphens
        // 2: parent pseudoclass, preferably shorthand from config.pseudoClasses, matches \w+
        // 3: parent separator, one of > _ + ~
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
        definedClasses = {},
        styleElement = document.createElement("style");

    // Merge default config with any from user
    loop(config, (configValue, configKey) => {
        loop((window.acssLiveConfig || {})[configKey], (v, k) => {
            configValue[k] = v;
        });
    });

    // DEBUG_START
    if (config.settings.debug) {
        console.log("ACSS-SETUP", "Starting setup");
    }
    // DEBUG_END

    document.head.appendChild(styleElement);

    // Expand rules
    loop(config.classes, (v, k) => {
        if (Array.isArray(v)) {
            v = {
                args: v[1],
                styles: v[0]
                    .split(";")
                    .map((r) => (r.match(/:/) ? r : r + ":$0"))
            };
        }

        config.classes[k] = v;
    });

    // DEBUG_START
    const documentTimerEnd = timerStart("ACSS-SCAN-DOCUMENT");

    if (config.settings.debug) {
        console.log("ACSS-SCAN-DOCUMENT", "Process current elements");
    }
    // DEBUG_END

    processElementsAndChildren([document.documentElement], []);

    // DEBUG_START
    documentTimerEnd();
    // DEBUG_END

    new MutationObserver((mutations) => {
        var processedElements = [];

        // DEBUG_START
        const timerEnd = timerStart("ACSS-MUTATION");

        if (config.settings.debug) {
            console.log("ACSS-MUTATION", "Detected mutations", mutations);
        }
        // DEBUG_END

        for (var mutation of mutations) {
            // attributes = yes
            // characterData = no, but not monitored
            // childList = no
            if (mutation.type[0] === "a") {
                processElement(mutation.target, processedElements);
            }

            // Using mutation.target.querySelectorAll('*') is much slower
            processElementsAndChildren([...mutation.addedNodes], processedElements);
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
