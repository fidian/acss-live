/* global document, MutationObserver, window */
"use strict";
(function (window, document) {
    var config = {
        settings: {
            // DEBUG_START
            // Set to true to show debug. Use your console for filtering.
            // Only honored with NON-MINIFIED builds.
            debug: false,
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
            i: "initial",
            a: "auto",
            maxc: "max-content",
            minc: "min-content",
            fa: "fill-available",
            fc: "fit-content"
        },

        overflow: { h: "hidden", v: "visible", a: "auto", s: "scroll" },

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
            fi: "first",
            fc: "first-child",
            fot: "first-of-type",
            fs: "fullscreen",
            f: "focus",
            fw: "focus-within",
            fv: "focus-visible",
            h: "hover",
            ind: "indeterminate",
            ir: "in-range",
            inv: "invalid",
            lc: "last-child",
            lot: "last-of-type",
            l: "left",
            li: "link",
            oc: "only-child",
            oot: "only-of-type",
            o: "optional",
            oor: "out-of-range",
            ps: "placeholder-shown",
            ro: "read-only",
            rw: "read-write",
            req: "required",
            r: "right",
            rt: "root",
            s: "scope",
            t: "target",
            va: "valid",
            vi: "visited"
        },

        pseudoElements: {
            b: "before",
            a: "after",
            fl: "first-letter",
            fli: "first-line",
            ph: "placeholder"
        },

        // Values can be passed as parameters. They also can have spaces,
        // which helps for box-shadow.
        values: {
            in: "initial",
            inh: "inherit",
            re: "revert",
            rel: "revert-layer",
            un: "unset"
        },

        // Media queries and other at-rules
        atRules: {
            // Color schemes
            dark: "@media(prefers-color-scheme:dark)",
            light: "@media(prefers-color-scheme:light)",

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
                    cb: "cubic-bezier(0.1, 0.7, 1.0, 0.1)",
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
                    c: "continuous",
                    bb: "bounding-box",
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
                    start_t: "_S_ 0",
                    end_t: "_E_ 0",
                    start_b: "_S_ 100%",
                    end_b: "_E_ 100%",
                    start_c: "_S_ center",
                    end_c: "_E_ center",
                    c_b: "center 100%",
                    c_t: "center 0",
                    c: "center"
                }
            ],
            Bgpx: [
                "background-position-x",
                { start: "_S_", end: "_E_", c: "center" }
            ],
            Bgpy: [
                "background-position-y",
                {
                    t: "0",
                    c: "50%",
                    b: "100%"
                }
            ],
            Bgr: [
                "background-repeat",
                {
                    nr: "no-repeat",
                    rx: "repeat-x",
                    ry: "repeat-y",
                    r: "repeat",
                    s: "space",
                    ro: "round"
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
            BdX: ["border-width:0 1px;border-style:solid"],
            BdY: ["border-width:1px 0;border-style:solid"],
            BdT: ["border-width:1px 0 0 0;border-style:solid"],
            BdEnd: ["border-width:0;border-_E_-width:1px;border-style:solid"],
            BdB: ["border-width:0 0 1px;border-style:solid"],
            BdStart: ["border-width:0;border-_S_-width:1px;border-style:solid"],

            // Border
            Bd: ["border", "n"],
            Bdb: ["border-bottom"],
            Bdend: ["border-_E_"],
            Bdstart: ["border-_S_"],
            Bdt: ["border-top"],
            Bdx: ["border-_S_;border-_E_"],
            Bdy: ["border-top;border-bottom"],
            Bdbk: [
                "border-break",
                {
                    c: "close"
                }
            ],
            Bdcl: [
                "border-collapse",
                {
                    c: "collapse",
                    s: "separate"
                }
            ],
            Bdc: ["border-color", "colors"],
            Bdtc: ["border-top-color", "colors"],
            Bdendc: ["border-_E_-color", "colors"],
            Bdbc: ["border-bottom-color", "colors"],
            Bdstartc: ["border-_S_-color", "colors"],
            Bdi: ["border-image", "n"],
            Bdti: ["border-top-image", "n"],
            Bdendi: ["border-_E_-image", "n"],
            Bdbi: ["border-bottom-image", "n"],
            Bdstarti: ["border-_S_-image", "n"],
            Bdci: ["border-corner-image", "cn"],
            Bdtstarti: ["border-top-_S_-image", "cn"],
            Bdtendi: ["border-top-_E_-image", "cn"],
            Bdbstarti: ["border-bottom-_S_-image", "cn"],
            Bdbendi: ["border-bottom-_E_-image", "cn"],
            Bdsp: ["border-spacing", { i: "inherit" }],
            Bds: ["border-style", "borderStyle"],
            Bdts: ["border-top-style", "borderStyle"],
            Bdends: ["border-_E_-style", "borderStyle"],
            Bdbs: ["border-bottom-style", "borderStyle"],
            Bdstarts: ["border-_S_-style", "borderStyle"],
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
            Bdlen: ["border-length", "a"],
            Bdw: ["border-width", "thickness"],
            Bdtw: ["border-top-width", "thickness"],
            Bdendw: ["border-_E_-width", "thickness"],
            Bdbw: ["border-bottom-width", "thickness"],
            Bdstartw: ["border-_S_-width", "thickness"],
            Bdrs: ["border-radius"],
            Bdrsstart: ["border-radius-top-_S_;border-radius-bottom-_S_"],
            Bdrsend: ["border-radius-top-_E_;border-radius-bottom-_E_"],
            Bdrst: ["border-radius-top-_E_;border-radius-top-_S_"],
            Bdrsb: ["border-radius-bottom-_E_;border-radius-bottom-_S_"],
            Bdrstend: ["border-radius-top-_E_"],
            Bdrsbend: ["border-radius-bottom-_E_"],
            Bdrsbstart: ["border-radius-bottom-_S_"],
            Bdrststart: ["border-radius-top-_S_"],

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
            Colm: ["columns"],
            Colmc: ["column-count"],
            Colmf: [
                "column-fill",
                {
                    a: "auto",
                    b: "balance"
                }
            ],
            Colmg: ["column-gap"],
            Colmr: ["column-rule"],
            Colmrc: ["column-rule-color"],
            Colmrs: [
                "column-rule-style",
                {
                    d: "dotted",
                    da: "dashed",
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
            Colms: [
                "column-span",
                {
                    a: "all",
                    n: "none"
                }
            ],
            Colmw: ["column-width"],

            // Contain
            Ctn: [
                "contain",
                {
                    n: "none",
                    st: "strict",
                    c: "content",
                    z: "size",
                    l: "layout",
                    s: "style",
                    p: "paint"
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
                    cr: "col-resize",
                    co: "copy",
                    cro: "crosshair",
                    d: "default",
                    er: "e-resize",
                    ewr: "ew-resize",
                    g: "grab",
                    gr: "grabbing",
                    ha: "hand",
                    he: "help",
                    m: "move",
                    n: "none",
                    nd: "no-drop",
                    na: "not-allowed",
                    nr: "n-resize",
                    ner: "ne-resize",
                    neswr: "nesw-resize",
                    nwser: "nwse-resize",
                    nsr: "ns-resize",
                    nwr: "nw-resize",
                    p: "pointer",
                    pr: "progress",
                    rr: "row-resize",
                    sr: "s-resize",
                    ser: "se-resize",
                    swr: "sw-resize",
                    t: "text",
                    vt: "vertical-text",
                    w: "wait",
                    wr: "w-resize",
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
                    rbb: "ruby-base",
                    rbbg: "ruby-base-group",
                    rbt: "ruby-text",
                    rbtg: "ruby-text-group",
                    rb: "ruby",
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
                    start: "_S_",
                    end: "_E_",
                    n: "none"
                }
            ],
            Cl: [
                "clear",
                {
                    n: "none",
                    b: "both",
                    start: "_S_",
                    end: "_E_"
                }
            ],

            // Font
            Fef: [
                "font-effect",
                {
                    n: "none",
                    eg: "engrave",
                    eb: "emboss",
                    o: "outline"
                }
            ],
            Fem: ["font-emphasize"],
            Femp: [
                "font-emphasize-position",
                {
                    b: "before",
                    a: "after"
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
                    e: "expanded",
                    ec: "extra-condensed",
                    ee: "extra-expanded",
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
                    a: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                    c: "cursive",
                    cs: '"Comic Sans MS", "Monotype Corsiva", cursive',
                    f: "fantasy",
                    i: "Impact, Capitals, fantasy",
                    m: "monospace",
                    mo: 'Monaco, "Courier New", monospace',
                    s: "serif",
                    ss: "sans-serif",
                    t: '"Times New Roman", Times, Baskerville, Georgia, serif',
                    v: "Verdana, Geneva, sans-serif"
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
                    n: "normal",
                    i: "italic",
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

            // LineClamp
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
                styles: ["-webkit-line-clamp", "max-height:$1"]
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
                "perspective-origin $1",
                {
                    start: "_S_",
                    end: "_E_",
                    c: "center",
                    t: "top",
                    b: "bottom"
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
                    v: "visible",
                    vf: "visibleFill",
                    vp: "visiblePainted",
                    vs: "visibleStroke"
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
                    n: "none",
                    b: "both",
                    h: "horizontal",
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
                    i: "inherit",
                    b: "butt",
                    r: "round",
                    s: "square"
                }
            ],
            Stklj: [
                "stroke-linejoin",
                {
                    i: "inherit",
                    b: "bevel",
                    r: "round",
                    m: "miter"
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
                    k: "kashida",
                    ic: "inter-cluster",
                    ii: "inter-ideograph",
                    iw: "inter-word",
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
                    os: "optimizeSpeed",
                    ol: "optimizeLegibility",
                    gp: "geometricPrecision"
                }
            ],
            Tt: [
                "text-transform",
                {
                    n: "none",
                    c: "capitalize",
                    u: "uppercase",
                    l: "lowercase"
                }
            ],
            Tsh: ["text-shadow", "n"],

            // Transform
            Trf: ["transform"],
            Trfo: [
                "transform-origin $1",
                {
                    start: "_S_",
                    end: "_E_",
                    c: "center",
                    t: "top",
                    b: "bottom"
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
                    eo: "ease-out",
                    eio: "ease-in-out",
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
                    t: "text",
                    to: "toggle"
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
                    t: "top",
                    tb: "text-bottom",
                    tt: "text-top"
                }
            ],

            // Visibility
            V: ["visibility", { h: "hidden", v: "visible", c: "collapse" }],

            // White space
            Whs: [
                "white-space",
                {
                    n: "normal",
                    p: "pre",
                    nw: "nowrap",
                    pw: "pre-wrap",
                    pl: "pre-line"
                }
            ],
            Whsc: [
                "white-space-collapse",
                {
                    l: "loose",
                    bs: "break-strict",
                    ba: "break-all",
                    ka: "keep-all",
                    n: "normal"
                }
            ],

            // Width
            W: [
                "width",
                {
                    a: "auto",
                    bb: "border-box",
                    cb: "content-box",
                    av: "available",
                    minc: "min-content",
                    maxc: "max-content",
                    fc: "fit-content"
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
                    n: "none",
                    nm: "normal",
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
                .replace(/\$([0-9]+)/g, (paramNumber) => {
                    var v = (values.split(",") || [])[+paramNumber[1]];

                    if (v[0] === "-" && v[1] === "-") {
                        return `val(${v})`;
                    }

                    return args[v] || config.values[v] || v;
                });

            // DEBUG_START
            if (config.settings.debug) {
                console.log("ACSS-RULE", `Add rule: ${rule}`);
            }
            // DEBUG_END

            ((styleSheet) =>
                styleSheet.insertRule(rule, styleSheet.cssRules.length))(
                styleElement.sheet
            );
        },
        makeSelector = (sel, pseudoClass, pseudoElement) => {
            sel = sel.replace(/[^-_a-zA-Z0-9]/g, (match) => `\\${match}`);
            pseudoClass =
                config.pseudoClasses[pseudoClass] || pseudoClass || "";
            pseudoElement =
                config.pseudoElements[pseudoElement] || pseudoElement || "";

            return sel + pseudoClass + pseudoElement;
        },
        processRule = (selector) => {
            // DEBUG_START
            if (config.settings.debug) {
                console.log("ACSS-RULE", `Parsing selector: ${selector}`);
                console.time("ACSS-RULE");
            }
            // DEBUG_END

            var match = selector.match(rulePattern);

            if (!match) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", `Did not match pattern`);
                    console.timeEnd("ACSS-RULE");
                }
                // DEBUG_END

                return;
            }

            var def = config.classes[match[4]];

            if (!def) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log("ACSS-RULE", `No class matches: ${match[4]}`);
                    console.timeEnd("ACSS-RULE");
                }
                // DEBUG_END

                return;
            }

            var parentSelector = match[1]
                ? makeSelector(match[1], match[2]) + match[3]
                : "";
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
            if (config.settings.debug) {
                console.timeEnd("ACSS-RULE");
            }
            // DEBUG_END
        },
        // DEBUG_START
        getElementIdentifier = (e) => {
            var s = e.tagName;

            if (e.id) {
                s += `#${e.id}`;
            }

            loop(e.classList, (c) => {
                if (c) {
                    s += `.${c}`;
                }
            });

            return s;
        },
        // DEBUG_END
        processElement = (e, elementMap) => {
            if (elementMap.includes(e)) {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log(
                        "ACSS-ELEMENT",
                        `Already scanned: ${getElementIdentifier(e)}`
                    );
                }
                // DEBUG_END
            } else {
                // DEBUG_START
                if (config.settings.debug) {
                    console.log(
                        "ACSS-ELEMENT",
                        `Process element: ${getElementIdentifier(e)}`
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
            }
        },
        processElementAndChildren = (node, elementMap) => {
            // Non-recursive
            var list = [node];

            while (list.length) {
                processElement(list[0], elementMap);
                iterateNodeList(list.shift().children, (child) => {
                    list.push(child);
                });
            }
        },
        iterateNodeList = (nodes, callback) => {
            loop(nodes, (node) => {
                if (node.nodeType === 1) {
                    callback(node);
                }
            });
        },
        rulePattern =
            /^(?:([a-zA-Z][-_a-zA-Z0-9]+?)(?::([a-z]+))?([>_+~]))?([-a-zA-Z0-9]+)(?:\(([-_,.#$/%0-9a-zA-Z]+)\))?(!)?(?::([a-z]+))?(?:::([a-z]+))?(?:--([a-zA-Z0-9]+))?$/,
        //       1-----------------------1    2------2  3------3  4-------------4     5--------------------5    6-6     7-------7      8------8       9------------9
        // 1: parent selector
        // 2: parent pseudoclass
        // 3: parent separator
        // 4: atomic selector
        // 5: atomic values
        // 6: important
        // 7: pseudoclass
        // 8: pseudoelement
        // 9: at-rule / media query / breakpoint
        body = document.body,
        definedClasses = {},
        styleElement = document.createElement("style");

    document.head.appendChild(styleElement);

    // Merge default config with any from user
    loop(config, (configValue, configKey) => {
        loop((window.acssLiveConfig || {})[configKey], (v, k) => {
            configValue[k] = v;
        });
    });

    // DEBUG_START
    if (config.settings.debug) {
        console.log("ACSS-SETUP", "Starting setup");
        console.time("ACSS-SETUP");
    }
    // DEBUG_END

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

    if (body) {
        // DEBUG_START
        if (config.settings.debug) {
            console.log("ACSS-SETUP", "Process current elements");
            console.time("ACSS-SCAN-BODY");
        }
        // DEBUG_END

        processElementAndChildren(body, []);

        // DEBUG_START
        if (config.settings.debug) {
            console.timeEnd("ACSS-SCAN-BODY");
        }
        // DEBUG_END
    }

    new MutationObserver((mutations) => {
        var elementMap = [];

        // DEBUG_START
        if (config.settings.debug) {
            console.log("ACSS-MUTATION", "Detected mutations", mutations);
            console.time("ACSS-MUTATION");
        }
        // DEBUG_END

        loop(mutations, (mutation) => {
            // ch[a]racterData
            if (mutation.type[2] === "a") {
                processElement(mutation.target, elementMap);
            }

            iterateNodeList(mutation.addedNodes, (n) =>
                processElementAndChildren(n, elementMap)
            );
        });

        // DEBUG_START
        if (config.settings.debug) {
            console.timeEnd("ACSS-MUTATION");
        }
        // DEBUG_END
    }).observe(document, {
        attributeFilter: ["class"],
        childList: true,
        subtree: true
    });

    // DEBUG_START
    if (config.settings.debug) {
        console.timeEnd("ACSS-SETUP");
    }
    // DEBUG_END
})(window, document);
