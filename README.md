ACSS-LIVE
=========

This is an in-browser implementation of Atomic CSS. When gzipped, it is about the same size as most gzipped CSS resources (under 6k), so it's fairly small even though it can handle all of the CSS you can imagine. The library relies on evergreen browsers and uses `MutationObserver` to detect element changes where new CSS classes may be needed. Each class is generated only once.

The project was inspired by [atomizer-browser](https://github.com/acss-io/acss-browser) - a discussion of the differences is farther below.


Usage
-----

Add this in your `<head>` of your document, then you're done.

    <script src="https://cdn.jsdelivr.net/npm/@fidian/acss-live/acss-live.min.js"></script>

Now you can use Atomic CSS within your element's class lists. Configuration is optional.

I recommend using the minified version because it provides a minor speed boost due to the lack of debugging code.


What is Supported
-----------------

Everything from [Atomic CSS Reference](https://acss.io/reference.html), including a parent selector, parent pseudoclass, descendant selector, atomic class, parameters, pseudoclass, pseudoelement, and at-rule. Any exceptions are called out farther below.


Troubleshooting
---------------

If you are not getting the classes you expect, try these steps:

1. Use the non-minified build to allow debugging to work.
2. Enable `debug: true` in your `acssLiveConfig` - see below or look at the debugging example.
3. Search the console messages for the CSS rules you expected to have added.

If you see the rule in the console, then the browser was instructed to add it. When you inspect the target element and it still does not have the class, then the browser found the rule to be invalid. For instance `D(asdf)` would get changed into the CSS rule `.D\(asdf\) { display: asdf }`, but the browser will silently reject it. When inspecting the element, you may only see that the class was defined and no rules were included. If this happens to you, *please look at the generated CSS in the console* and confirm the values are correctly spelled and that they work if you were to copy and paste the CSS definition into a `<style>` tag.


Configuring
-----------

Add some JavaScript to set a global object with the sections you want to configure. You only need to add what you think you might need. In this example, it is inlined in the HTML, but you could just as easily put it in an external file. Ensure the `acssLiveConfig` object is created before loading `acss-live.min.js`.

    <script>
    window.acssLiveConfig = {
        // Settings where the values are not objects.
        settings: {
            // Enable debugging in the console. Only works if you use
            // acss-live.js instead of acss-live.min.js.
            debug: false,

            // Set to true when your language starts on the right and goes
            // left.
            // false: start = left, end = right
            // true: start = right, end = left
            rightToLeft: false,

            // Optional namespace to nest all rules under. Defaults to no
            // namespace. When used with "#example ", the class "D(b)" will
            // generate a CSS selector of "#example .D\(b\)". You can use this
            // to change the specificity of rules, making Atomic rules take a
            // higher priority, or to enable ACSS classes only underneath
            // specific elements. Please note the trailing space!
            namespace: "body "
        },

        // Values that you could use as shorthands in rules. This is a great
        // way to define your color palette. These are NOT the same as CSS
        // variables. You would use them like the following classes:
        // Bgc(buttonColor) Bgc(buttonColorHover):h
        values: {
            buttonColor: "#0a95ff",
            buttonColorHover: "#0074cc"
        }

        // Add additional CSS classes and their rules. Here, we make up rules
        // in order to show off the different things that are supported.
        classes: {
            // Multiple styles with no parameters
            // Same as Bdr(4px) Bdw(1px) Bds(s) Bdc(black)
            roundedBox: ['border-radius: 4px; border: 1px solid black'],

            // Anchor to the top right of the parent. In "left to right"
            // languages the right is the "end". __START__ and __END__ are
            // replaced with left and right according to the config.
            // Same as Pos(a) T(0) End(0)
            anchorTopEnd: ['position: absolute; top: 0; __END__: 0']

            // Shows how to use a parameter. This parameter is mapped against
            // the object, which provides a shorthand way to use standard
            // values.
            // box(m) is the same as Bds(s) Bdc(black) Bdw(3px)
            box: ["border-style: solid; border-color: black; border-width: $0", {
                s: '1px',
                m: '3px',
                l: '5px'
            }]

            // Maybe you would like to use something that looks up colors?
            // This technique will look up the "colors" property in the config
            // and use that for shorthand values. You can specify any property.
            // C() is a much shorter method of doing the same thing.
            Color: ["color:$0", 'colors'],

            // Show an icon after a link, but only on the screen
            linkIcon: {
                // A mapping that changes shorthand values into longer forms.
                // Arguments are found with $0, $1, ... in the rules.
                args: {
                    s: "⧉" // double squares
                },

                // The styles to apply as an array
                styles: [
                    "text-decoration: underline",
                    "text-decoration-style: dashed"
                ],

                // Additional rules that need to be created
                '@media only screen': {
                    '[class*=linkIcon]:after': [
                        'content: "$0"'
                    ]
                }
            }
        },

        // Media queries, breakpoints, and other useful at-rules
        atRules: {
            s: '@media only screen',

            // Generally accepted screen sizes
            // S = mobile
            // M = tablets
            // L = small screens, eg. laptops
            // Default is desktop / tv / large format
            s: "@media(max-width:480px)",
            sm: "@media(max-width:768px)",
            m: "@media(min-width:481px)and(max-width:768px)",
            sml: "@media(max-width:1024px)",
            ml: "@media(min-width:481px)and(max-width:1024px)",
            l: "@media(min-width:1025)and(max-width:1024px)"
        },

        // Set up your own colors. These are merged with the internal list of
        // allowed color values and are used for all rules that use colors.
        colors: {
            b: "blue",
            g: "green",
            o: "orange",
            r: "red",
            y: "yellow"

            // Or colors from your own theme
            gray1: "#ededff",
            gray2: "#d2e0e7",
            alert: "#f7213d"
        }
    };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@fidian/acss-live/acss-live.min.js"></script>


Similarities and Differences
----------------------------

Follows the same shorthand as [Atomizer](https://acss.io/reference.html) and [acss-browser](https://github.com/acss-io/acss-browser) with a few trade-offs:

* This does not change color codes from short to long.
* Atomizer's `Bd` helper (not `Bd(...)` rule) is renamed to `BdAll` to not conflict with `Bd`.
* Helpers can get arguments, but they get ignored. Extra arguments can be passed to rules and they are likewise ignored.
* Does not consolidate styles in the same way as Atomizer. This will generate one rule per class.
* Renamed `Dropshadow` to `DropShadow` to be consistent with other named filters.
* Removed deprecated flex rules (ones starting with `Fl`) and kept only the ones starting `Fx`.
* Fixed `Matrix3d` and `Rotate3d` to use the 3D transforms instead of 2D.
* Colors and other properties are not restricted to a list.
* `Mw(ini)` changed to `Mw(i)`, similar to `Trsdu(i)` for consistency.
* Old IE hacks (star hacks and `Zoom`) are removed.

This project's code is under 50k of source, under 20k minified, under 6k gzipped. Compare this to acss-browser's nearly 800k of source and just under 200k minified. This size comes with a price, and the biggest is that style parameters are not validated in any way. If you type it, the rule will be added. A few of the items from the above list also cut the size down. Any helper or rule can take any number of parameters and this library won't validate that you have the right amount.

There are a couple things that I believe are better.

* Breakpoints are renamed as atRules because they are media queries or other at-rules according to the CSS spec. More than just breakpoints can be used, such as `--p` at the end of a rule to enable it only for print.
* The list of colors is split out to a separate list. Adding colors as colors instead of custom values is now possible.
* Defining new classes has less boilerplate.
