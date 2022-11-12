/* global MutationObserver */
"use strict";
(function (window) {
    function defaultConfig() {
        const classes = {};

        function addClass(selector, def) {
            if (!def.args) {
                def.args = {};
            }

            classes[selector] = def;
        }

        function makeDef(v) {
            if (Array.isArray(v)) {
                return {
                    args: v[1],
                    styles: v[0].split(";")
                };
            }

            return v;
        }

        // Keep the arguments expanded as their own lists. It adds about 2k to
        // the minified version, but gzip compression is able to compress about
        // 10% better, which is not what I had expected.
        const unprocessed = {
            // Animation
            Anim: ["animation:$0", {}],
            Animdel: ["animation-delay:$0", {}],
            AnimDir: [
                "animation-direction:$0",
                {
                    a: "alternate",
                    ar: "alternate-reverse",
                    n: "normal",
                    r: "reverse"
                }
            ],
            Animdur: ["animation-duration:$0", {}],
            Animfm: [
                "animation-fill-mode:$0",
                {
                    b: "backwards",
                    bo: "both",
                    f: "forwards",
                    n: "none"
                }
            ],
            Animic: [
                "animation-iteration-count:$0",
                {
                    i: "infinite"
                }
            ],
            Animn: ["animation-name:$0", { n: "none" }],
            Animps: ["animation-play-state:$0", { p: "paused", r: "running" }],
            Animtf: [
                "animation-timing-function:$0",
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

            // Appearance
            Ap: ["appearance:$0", { a: "auto", n: "none" }],

            // Border shortcuts: 1 pixel solid border
            BdAll: ["border-width:1px;border-style:solid"],
            BdX: [
                "border-top-width:0;border-right-width:1px;border-bottom-width:0;border-left-width:1px;border-style:solid"
            ],
            BdY: [
                "border-top-width:1px;border-right-width:0;border-bottom-width:1px;border-left-width:0;border-style:solid"
            ],
            BdT: [
                "border-top-width:1px;border-right-width:0;border-bottom-width:0;border-left-width:0;border-style:solid"
            ],
            BdEnd: [
                "border-top-width:0px;border-__END__-width:1px;border-bottom-width:0;border-__START__-width:0;border-style:solid"
            ],
            BdB: [
                "border-top-width:0;border-right-width:0;border-bottom-width:1px;border-left-width:0;border-style:solid"
            ],
            BdStart: [
                "border-top-width:0px;border-__END__-width:0;border-bottom-width:0;border-__START__-width:1px;border-style:solid"
            ],

            // Backface
            Bfv: ["backface-visibility:$0", { h: "hidden", v: "visible" }],

            // Background
            Bg: ["background:$0", { n: "none", t: "transparent" }],
            Bga: [
                "background-attachment:$0",
                {
                    f: "fixed",
                    l: "local",
                    s: "scroll"
                }
            ],
            Bgc: [
                "background-color:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bgcp: [
                "background-clip:$0",
                { bb: "border-box", cb: "content-box", pb: "padding-box" }
            ],
            Bgi: ["background-image:$0", { n: "none" }],
            Bgo: [
                "background-origin:$0",
                { bb: "border-box", cb: "content-box", pb: "padding-box" }
            ],
            Bgp: [
                "background-position:$0",
                {
                    start_t: "__START__ 0",
                    end_t: "__END__ 0",
                    start_b: "__START__ 100%",
                    end_b: "__END__ 100%",
                    start_c: "__START__ center",
                    end_c: "__END__ center",
                    c_b: "center 100%",
                    c_t: "center 0",
                    c: "center"
                }
            ],
            Bgpx: [
                "background-position-x:$0",
                { start: "__START__", end: "__END__", c: "center" }
            ],
            Bgpy: [
                "background-position-y:$0",
                {
                    t: "0",
                    c: "50%",
                    b: "100%"
                }
            ],
            Bgr: [
                "background-repeat:$0",
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
                "background-size:$0",
                {
                    a: "auto",
                    ct: "contain",
                    cv: "cover"
                }
            ],

            // This is a hack. It does not make the box grow to 1600px, just
            // enough to fill the container.
            BfcHack: ["display:table-cell;width:1600px;*width:auto;zoom:1"],

            // Border
            Bd: ["border:$0", { n: "none" }],
            Bdx: ["border-__START__:$0;border-__END__:$0", {}],
            Bdy: ["border-top:$0;border-bottom:$0", {}],
            Bdt: ["border-top:$0", {}],
            Bdend: ["border-__END__:$0", {}],
            Bdb: ["border-bottom:$0", {}],
            Bdstart: ["border-__START__:$0", {}],
            Bdcl: [
                "border-collapse:$0",
                {
                    c: "collapse",
                    s: "separate"
                }
            ],
            Bdc: [
                "border-color:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bdct: [
                "border-color-top:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bdcend: [
                "border-color-__END__:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bdcb: [
                "border-color-bottom:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bdcstart: [
                "border-color-__START__:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Bdsp: ["border-spacing:$0 $1", { i: "inherit" }],
            Bds: [
                "border-style:$0",
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
            Bdts: [
                "border-top-style:$0",
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
            Bdends: [
                "border-__END__-style:$0",
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
            Bdbs: [
                "border-bottom-style:$0",
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
            Bdstarts: [
                "border-__START__-style:$0",
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
            Bdw: ["border-width:$0", { m: "medium", t: "thin", th: "thick" }],
            Bdtw: [
                "border-top-width:$0",
                { m: "medium", t: "thin", th: "thick" }
            ],
            Bdendw: [
                "border-__END__-width:$0",
                { m: "medium", t: "thin", th: "thick" }
            ],
            Bdbw: [
                "border-bottom-width:$0",
                { m: "medium", t: "thin", th: "thick" }
            ],
            Bdstartw: [
                "border-__START__-width:$0",
                { m: "medium", t: "thin", th: "thick" }
            ],
            Bdrs: ["border-radius:$0", {}],
            Bdrstend: ["border-radius-top-__END__:$0", {}],
            Bdrsbend: ["border-radius-bottom-__END__:$0", {}],
            Bdrsbstart: ["border-radius-bottom-__START__:$0", {}],
            Bdrststart: ["border-radius-top-__START__:$0", {}],

            // Box shadow
            Bxsh: ["box-shadow:$0", { n: "none" }],

            // Box sizing
            Bxz: [
                "box-sizing:$0",
                { bb: "border-box", cb: "content-box", pb: "padding-box" }
            ],

            // Clear
            Cl: [
                "clear:$0",
                {
                    n: "none",
                    b: "both",
                    start: "__START__",
                    end: "__END__"
                }
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
                },
                styles: ["zoom:1"]
            },

            // Color
            C: [
                "color:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],

            // Columns
            Colm: ["columns:$0", {}],
            Colmc: ["column-count:$0", {}],
            Colmf: [
                "column-fill:$0",
                {
                    a: "auto",
                    b: "balance"
                }
            ],
            Colmg: ["column-gap:$0", {}],
            Colmr: ["column-rule:$0", {}],
            Colmrc: ["column-rule-color:$0", {}],
            Colmrs: [
                "column-rule-style:$0",
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
            Colmrw: ["column-rule-width:$0", {}],
            Colms: [
                "column-span:$0",
                {
                    a: "all",
                    n: "none"
                }
            ],
            Colmw: ["column-width:$0", {}],

            // Contain
            Ctn: [
                "contain:$0",
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
                "content:$0",
                {
                    n: "none",
                    nor: "normal",
                    oq: "open-quote",
                    cq: "close-quote",
                    noq: "no-open-quote",
                    ncq: "no-close-quote"
                }
            ],

            // Cursor
            Cur: [
                "cursor:$0",
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
                    h: "help",
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
                "display:$0",
                {
                    n: "none",
                    b: "block",
                    f: "flex",
                    if: "inline-flex",
                    i: "inline",
                    ib: "inline-block",
                    tb: "table",
                    tbr: "table-row",
                    tbc: "table-cell",
                    li: "list-item",
                    ri: "run-in",
                    cp: "compact",
                    itb: "inline-table",
                    tbcl: "table-column",
                    tbclg: "table-column-group",
                    tbhg: "table-header-group",
                    tbfg: "table-footer-group",
                    tbrg: "table-row-group"
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
            Fil: ["filter:$0", {}],
            Blur: ["filter:blur($0)", {}],
            Brightness: ["filter:brightness($0)", {}],
            Contrast: ["filter:contrast($0)", {}],
            DropShadow: ["filter:drop-shadow($0)", {}],
            Grayscale: ["filter:grayscale($0)", {}],
            HueRotate: ["filter:hue-rotate($0)", {}],
            Invert: ["filter:invert($0)", {}],
            Opacity: ["filter:opacity($0)", {}],
            Saturate: ["filter:saturate($0)", {}],
            Sepia: ["filter:sepia($0)", {}],

            // Flex
            Fx: ["flex:$0", { a: "auto", n: "none" }],
            Fxg: ["flex-grow:$0", {}],
            Fxs: ["flex-shrink:$0", {}],
            Fxb: ["flex-basis:$0", { a: "auto", n: "none" }],
            As: [
                "align-self:$0",
                {
                    a: "auto",
                    b: "baseline",
                    fs: "flex-start",
                    fe: "flex-end",
                    c: "center",
                    s: "stretch"
                }
            ],
            Fxd: [
                "flex-direction:$0",
                {
                    r: "row",
                    rr: "row-reverse",
                    c: "column",
                    cr: "column-reverse"
                }
            ],
            Fxf: [
                "flex-flow:$0",
                {
                    nw: "nowrap",
                    w: "wrap",
                    wr: "wrap-reverse",
                    r: "row",
                    rr: "row-reverse",
                    c: "column",
                    cr: "column-reverse"
                }
            ],
            Ai: [
                "align-items:$0",
                {
                    b: "baseline",
                    fs: "flex-start",
                    fe: "flex-end",
                    c: "center",
                    s: "stretch"
                }
            ],
            Ac: [
                "align-content:$0",
                {
                    sb: "space-between",
                    sa: "space-around",
                    fs: "flex-start",
                    fe: "flex-end",
                    c: "center",
                    s: "stretch"
                }
            ],
            Order: ["order:$0", {}],
            Jc: [
                "justify-content:$0",
                {
                    sb: "space-between",
                    sa: "space-around",
                    se: "space-evenly",
                    fs: "flex-start",
                    fe: "flex-end",
                    c: "center",
                    s: "stretch"
                }
            ],
            Fxw: [
                "flex-wrap:$0",
                { nw: "nowrap", w: "wrap", wr: "wrap-reverse" }
            ],

            // Font
            Ff: [
                "font-family:$0",
                {
                    c: '"Monotype Corsiva", "Comic Sans MS", cursive',
                    f: "Capitals, Impact, fantasy",
                    m: 'Monaco, "Courier New", monospace',
                    s: 'Georgia, "Times New Roman", serif',
                    ss: "Helvetica, Arial, sans-serif"
                }
            ],
            Fw: [
                "font-weight:$0",
                {
                    b: "bold",
                    br: "bolder",
                    lr: "lighter",
                    n: "normal"
                }
            ],
            Fz: ["font-size:$0", {}],
            Fs: [
                "font-style:$0",
                {
                    n: "normal",
                    i: "italic",
                    o: "oblique"
                }
            ],
            Fv: [
                "font-variant:$0",
                {
                    n: "normal",
                    sc: "small-caps"
                }
            ],

            // Height
            H: [
                "height:$0",
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

            // Hidden - signted can't see, screen readers can
            Hidden: [
                "position:absolute!important;*clip:rect(1px 1px 1px 1px);clip:rect(1px,2px,1px,1px);padding:0!important;border:0!important;height:1px!important;width:1px!important;overflow:hidden"
            ],

            // Hyphens
            Hy: [
                "hyphens:$0",
                {
                    a: "auto",
                    m: "manual",
                    n: "normal"
                }
            ],

            // Inline block box
            IbBox: [
                "display:inline-block;*display:inline;zoom:1;vertical-align:top"
            ],

            // Letter spacing
            Lts: ["letter-spacing:$0", { n: "normal" }],

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
                            "display:-webkit-box",
                            "*display:inline",
                            "zoom:1"
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
                styles: ["-webkit-line-clamp:$0", "max-height:$1"],
                args: {}
            },

            // Line height
            Lh: ["line-height:$0", { n: "normal" }],

            // Lists
            List: [
                "list-style-type:$0",
                {
                    n: "none",
                    d: "disc",
                    c: "circle",
                    s: "square",
                    dc: "decimal",
                    dclz: "decimal-leading-zero",
                    lr: "lower-roman",
                    lg: "lower-greek",
                    ll: "lower-latin",
                    ur: "upper-roman",
                    ul: "upper-latin",
                    a: "armenian",
                    g: "georgian",
                    la: "lower-alpha",
                    ua: "upper-alpha"
                }
            ],
            Lisp: [
                "list-style-position:$0",
                {
                    i: "inside",
                    o: "outside"
                }
            ],
            Lisi: ["list-style-image:$0", { n: "none" }],

            // Margins
            M: ["margin:$0", { a: "auto" }],
            Mx: ["margin-__START__:$0;margin-__END__:$0", { a: "auto" }],
            My: ["margin-top:$0;margin-bottom:$0", { a: "auto" }],
            Mt: ["margin-top:$0", { a: "auto" }],
            Mend: ["margin-__END__:$0", { a: "auto" }],
            Mb: ["margin-bottom:$0", { a: "auto" }],
            Mstart: ["margin-__START__:$0", { a: "auto" }],

            // Max/min
            Mah: [
                "max-height:$0",
                {
                    a: "auto",
                    maxc: "max-content",
                    minc: "min-content",
                    fa: "fill-available",
                    fc: "fit-content"
                }
            ],
            Mih: [
                "min-height:$0",
                {
                    a: "auto",
                    maxc: "max-content",
                    minc: "min-content",
                    fa: "fill-available",
                    fc: "fit-content"
                }
            ],
            Maw: [
                "max-width:$0",
                {
                    i: "initial",
                    a: "auto",
                    maxc: "max-content",
                    minc: "min-content",
                    fa: "fill-available",
                    fc: "fit-content"
                }
            ],
            Miw: [
                "min-width:$0",
                {
                    a: "auto",
                    maxc: "max-content",
                    minc: "min-content",
                    fa: "fill-available",
                    fc: "fit-content"
                }
            ],

            // Object
            Objf: [
                "object-fit:$0",
                {
                    ct: "contain",
                    cv: "cover",
                    f: "fill",
                    n: "none",
                    sd: "scale-down"
                }
            ],

            // Offsets
            T: ["top:$0", { a: "auto" }],
            End: ["__END__:$0", { a: "auto" }],
            B: ["bottom:$0", { a: "auto" }],
            Start: ["__START__:$0", { a: "auto" }],

            // Opacity
            Op: ["opacity:$0", {}],

            // Outline
            O: ["outline:$0", { n: "none" }],

            // Overflow
            Ov: [
                "overflow:$0",
                { h: "hidden", v: "visible", a: "auto", s: "scroll" }
            ],
            Ovx: [
                "overflow-x:$0",
                { h: "hidden", v: "visible", a: "auto", s: "scroll" }
            ],
            Ovy: [
                "overflow-y:$0",
                { h: "hidden", v: "visible", a: "auto", s: "scroll" }
            ],
            Ovs: [
                "-webkit-overflow-scrolling:$0",
                {
                    a: "auto",
                    touch: "touch"
                }
            ],

            // Paddings
            P: ["padding:$0", {}],
            Px: ["padding-__START__:$0;padding-__END__:$0", {}],
            Py: ["padding-top:$0;padding-bottom:$0", {}],
            Pt: ["padding-top:$0", {}],
            Pend: ["padding-__END__:$0", {}],
            Pb: ["padding-bottom:$0", {}],
            Pstart: ["padding-__START__:$0", {}],

            // Perspective
            Prs: ["perspective:$0", { n: "none" }],
            Prso: [
                "perspective-origin:$0 $1",
                {
                    start: "__START__",
                    end: "__END__",
                    c: "center",
                    t: "top",
                    b: "bottom"
                }
            ],

            // Pointer events
            Pe: [
                "pointer-events:$0",
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
                "position:$0",
                {
                    a: "absolute",
                    f: "fixed",
                    r: "relative",
                    s: "static",
                    st: "sticky"
                }
            ],

            // Resize
            Rsz: [
                "resize:$0",
                {
                    n: "none",
                    b: "both",
                    h: "horizontal",
                    v: "vertical"
                }
            ],

            // Contain boxes on a row
            Row: [
                "clear:both;display:inline-block;vertical-align:top;width:100%;box-sizing:border-box"
            ],

            // Stretches a box inside its containing block
            StretchedBox: ["position:absolute;top:0;right:0;bottom:0;left:0"],

            // SVG
            Fill: [
                "fill:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Stk: [
                "stroke:$0",
                { n: "none", t: "transparent", cc: "currentColor" }
            ],
            Stkw: ["stroke-width:$0", { i: "inherit" }],
            Stklc: [
                "stroke-linecap:$0",
                {
                    i: "inherit",
                    b: "butt",
                    r: "round",
                    s: "square"
                }
            ],
            Stklj: [
                "stroke-linejoin:$0",
                {
                    i: "inherit",
                    b: "bevel",
                    r: "round",
                    m: "miter"
                }
            ],

            // Table layout
            Tbl: [
                "table-layout:$0",
                {
                    a: "auto",
                    f: "fixed"
                }
            ],

            // Text
            Ta: [
                "text-align:$0",
                {
                    e: "end",
                    j: "justify",
                    mp: "match-parent",
                    s: "start",
                    start: "__START__",
                    end: "__END__",
                    c: "center"
                }
            ],
            Tal: [
                "text-align-last:$0",
                {
                    a: "auto",
                    e: "end",
                    j: "justify",
                    s: "start",

                    start: "__START__",
                    end: "__END__",
                    c: "center"
                }
            ],
            Td: [
                "text-decoration:$0",
                {
                    lt: "line-through",
                    n: "none",
                    o: "overline",
                    u: "underline"
                }
            ],
            Ti: ["text-indent:$0", {}],
            Tov: [
                "text-overflow:$0",
                {
                    c: "clip",
                    e: "ellipsis"
                }
            ],
            Tren: [
                "text-rendering:$0",
                {
                    a: "auto",
                    os: "optimizeSpeed",
                    ol: "optimizeLegibility",
                    gp: "geometricPrecision"
                }
            ],
            Tr: ["text-replace:$0", { n: "none" }],
            Tt: [
                "text-transform:$0",
                {
                    n: "none",
                    c: "capitalize",
                    u: "uppercase",
                    l: "lowercase"
                }
            ],
            Tsh: ["text-shadow:$0", { n: "none" }],

            // Transform
            Trf: ["transform:$0", {}],
            Trfo: [
                "transform-origin:$0 $1",
                {
                    start: "__START__",
                    end: "__END__",
                    c: "center",
                    t: "top",
                    b: "bottom"
                }
            ],
            Trfs: [
                "transform-style:$0",
                {
                    f: "flat",
                    p: "preserve-3d"
                }
            ],
            Matrix: ["transform:matrix($0)", {}],
            Matrix3d: ["transform:matrix3d($0)", {}],
            Rotate: ["transform:rotate($0)", {}],
            Rotate3d: ["transform:rotate3d($0)", {}],
            RotateX: ["transform:rotateX($0)", {}],
            RotateY: ["transform:rotateY($0)", {}],
            RotateZ: ["transform:rotateZ($0)", {}],
            Scale: ["transform:scale($0)", {}],
            Scale3d: ["transform:scale3d($0)", {}],
            ScaleX: ["transform:scaleX($0)", {}],
            ScaleY: ["transform:scaleY($0)", {}],
            Skew: ["transform:skew($0)", {}],
            SkewX: ["transform:skewX($0)", {}],
            SkewY: ["transform:skewY($0)", {}],
            Translate: ["transform:translate($0,$1)", {}],
            Translate3d: ["transform:translate3d($0,$1,$2)", {}],
            TranslateX: ["transform:translateX($0)", {}],
            TranslateY: ["transform:translateY($0)", {}],
            TranslateZ: ["transform:translateZ($0)", {}],

            // Transition
            Trs: ["transition:$0", {}],
            Trsde: [
                "transition-delay:$0",
                {
                    i: "initial"
                }
            ],
            Trsdu: ["transition-duration:$0", {}],
            Trsp: ["transition-property:$0", { a: "all" }],
            Trstf: [
                "transition-timing-function:$0",
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
                "user-select:$0",
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
                "vertical-align:$0",
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
            V: ["visibility:$0", { h: "hidden", v: "visible", c: "collapse" }],

            // White space
            Whs: [
                "white-space:$0",
                {
                    n: "normal",
                    p: "pre",
                    nw: "nowrap",
                    pw: "pre-wrap",
                    pl: "pre-line"
                }
            ],
            Whsc: [
                "white-space-collapse:$0",
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
                "width:$0",
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

            // Word break
            Wob: [
                "word-break:$0",
                {
                    ba: "break-all",
                    ka: "keep-all",
                    n: "normal"
                }
            ],

            // Word wrap
            Wow: [
                "word-wrap:$0",
                {
                    bw: "break-word",
                    n: "normal"
                }
            ],

            // Z-index
            Z: ["z-index:$0", { a: "auto" }]
        };

        for (const [k, v] of Object.entries(unprocessed)) {
            addClass(k, makeDef(v));
        }

        return {
            // DEBUG_START
            // Set to true to show debug. Use your console for filtering.
            // Only honored with NON-MINIFIED builds.
            debug: false,
            // DEBUG_END

            // Set to true if you want to support right to left instead.
            rightToLeft: false,

            // __START__ and __END__ are replaced with left and right
            // (depending on the rightToLeft setting).
            // $0 through $9 are replaced with arguments
            classes,

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
                inh: "inherit"
            },

            // Media queries and other at-rules
            atRules: {
                dark: "@media(prefers-color-scheme:dark)",
                light: "@media(prefers-color-scheme:light)",
                p: "@media print"
            },

            // Optional namespace to nest all rules underneath
            namespace: ""
        };
    }

    const config = merge(defaultConfig(), window.acssLiveConfig || {});

    // DEBUG_START
    if (config.debug) {
        console.log("ACSS-SETUP", "Starting setup");
        console.time("ACSS-SETUP");
    }
    // DEBUG_END

    // Modifies the destination object
    function merge(dest, src) {
        for (const [k, v] of Object.entries(src)) {
            if (v && typeof v === "object") {
                if (!v || typeof v !== "object") {
                    dest[k] = {};
                }

                merge(dest[k], v);
            } else {
                dest[k] = v;
            }
        }

        return dest;
    }

    function addRule(atRule, ruleSelector, rules, args, values, important) {
        let rule =
            config.namespace +
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
            .replace(/__START__/g, config.rightToLeft ? "right" : "left")
            .replace(/__END__/g, config.rightToLeft ? "left" : "right")
            .replace(/\$([0-9]+)/g, (paramNumber) => {
                const v = (values.split(",") || [])[+paramNumber[1]];

                if (v[0] === "-" && v[1] === "-") {
                    return `val(${v})`;
                }

                return args[v] || config.values[v] || v;
            });

        // DEBUG_START
        if (config.debug) {
            console.log("ACSS-RULE", `Add rule: ${rule}`);
        }
        // DEBUG_END

        styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }

    function makeSelector(sel, pseudoClass, pseudoElement) {
        sel = sel.replace(/[^-_a-zA-Z0-9]/g, (match) => `\\${match}`);
        pseudoClass = config.pseudoClasses[pseudoClass] || pseudoClass || "";
        pseudoElement =
            config.pseudoElements[pseudoElement] || pseudoElement || "";

        return sel + pseudoClass + pseudoElement;
    }

    const rulePattern =
        /^(?:([a-zA-Z][-_a-zA-Z0-9]+?)(?::([a-z]+))?([>_+~]))?([-a-zA-Z0-9]+)(?:\(([-_,.#$/%0-9a-zA-Z]+)\))?(!)?(?::([a-z]+))?(?:::([a-z]+))?(?:--([a-zA-Z0-9]+))?$/;
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

    function processRule(selector) {
        // DEBUG_START
        if (config.debug) {
            console.log("ACSS-RULE", `Parsing selector: ${selector}`);
            console.time("ACSS-RULE");
        }
        // DEBUG_END

        const match = selector.match(rulePattern);

        if (!match) {
            // DEBUG_START
            if (config.debug) {
                console.log("ACSS-RULE", `Did not match pattern`);
                console.timeEnd("ACSS-RULE");
            }
            // DEBUG_END

            return;
        }

        const def = config.classes[match[4]];

        if (!def) {
            // DEBUG_START
            if (config.debug) {
                console.log("ACSS-RULE", `No class matches: ${match[4]}`);
                console.timeEnd("ACSS-RULE");
            }
            // DEBUG_END

            return;
        }

        const parentSelector = match[1]
            ? makeSelector(match[1], match[2]) + match[3]
            : "";
        const ruleSelector =
            parentSelector + "." + makeSelector(selector, match[7], match[8]);

        if (def.styles) {
            addRule(
                match[9],
                ruleSelector,
                def.styles,
                def.args,
                match[5],
                match[6]
            );
        }

        if (def.addRules) {
            for (const [atRule, ruleSet] of Object.entries(def.addRules)) {
                for (const [addSel, addStyles] of Object.entries(ruleSet)) {
                    addRule(atRule, addSel, addStyles, {});
                }
            }
        }

        // DEBUG_START
        if (config.debug) {
            console.timeEnd("ACSS-RULE");
        }
        // DEBUG_END
    }

    // DEBUG_START
    function getElementIdentifier(e) {
        let s = e.tagName;

        if (e.id) {
            s += `#${e.id}`;
        }

        for (const c of e.classList || []) {
            s += `.${c}`;
        }

        return s;
    }
    // DEBUG_END

    function processElement(e, elementMap) {
        if (elementMap.has(e)) {
            // DEBUG_START
            console.log(
                "ACSS-ELEMENT",
                `Already scanned: ${getElementIdentifier(e)}`
            );
            // DEBUG_END
        } else {
            // DEBUG_START
            if (config.debug) {
                console.log(
                    "ACSS-ELEMENT",
                    `Process element: ${getElementIdentifier(e)}`
                );
            }
            // DEBUG_END

            elementMap.set(e, 0);

            for (const c of e.classList || []) {
                if (!definedClasses[c]) {
                    definedClasses[c] = 1;
                    processRule(c);
                }
            }
        }
    }

    function processElementAndChildren(node, elementMap) {
        const list = [node];

        while (list.length) {
            const n = list.shift();
            processElement(n, elementMap);
            iterateNodeList(n.children, (child) => {
                list.push(child);
            });
        }
    }

    function iterateNodeList(nodes, callback) {
        if (!nodes) {
            return;
        }

        for (let i = 0; i < nodes.length; i += 1) {
            if (nodes[i].nodeType === 1) {
                callback(nodes[i]);
            }
        }
    }

    const document = window.document;
    const definedClasses = {};
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;

    if (document.body) {
        // DEBUG_START
        if (config.debug) {
            console.log("ACSS-SETUP", "Process current elements");
            console.time("ACSS-SCAN-BODY");
        }
        // DEBUG_END

        processElementAndChildren(document.body, new Map());

        // DEBUG_START
        if (config.debug) {
            console.timeEnd("ACSS-SCAN-BODY");
        }
        // DEBUG_END
    }

    const mutationInstance = new MutationObserver((mutations) => {
        if (config.debug) {
            console.log("ACSS-MUTATION", "Detected mutations", mutations);
            console.time("ACSS-MUTATION");
        }

        const elementMap = new Map();

        for (const mutation of mutations) {
            // characterData
            if (mutation.type[2] === "a") {
                processElement(mutation.target, elementMap);
            }

            iterateNodeList(mutation.addedNodes, (n) =>
                processElementAndChildren(n, elementMap)
            );
        }

        // DEBUG_START
        if (config.debug) {
            console.timeEnd("ACSS-MUTATION");
        }
        // DEBUG_END
    });

    mutationInstance.observe(document, {
        attributeFilter: ["class"],
        childList: true,
        subtree: true
    });

    // DEBUG_START
    if (config.debug) {
        console.timeEnd("ACSS-SETUP");
    }
    // DEBUG_END
})(this);
