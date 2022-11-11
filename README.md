ACSS-LIVE
=========

This is an in-browser implementaion of Atomic CSS. When gzipped, it is about the same size as most gzipped CSS resources (under 6k), so it's fairly small. The library relies on evergreen browsers and uses `MutationObserver` to detect element changes where new CSS classes may be needed. Each class is generated only once.


Usage
-----

Add this in your `<head>` of your document.

    <script src="https://unpkg.com/acss-live/acss-live.min.js"></script>

Now you can use Atomic CSS within your element's class lists.


Configuring
-----------

Add some JavaScript to set a global object with the sections you want to configure. You only need to add what you think you might need. In this example, it is inlined in the HTML, but you could just as easily put it in an external file. Ensure the `acssLiveConfig` object is created before loading `acss-live.min.js`.

    <script>
    window.acssLiveConfig = {
        // Enable debugging in the console. Only works if you use acss-live.js
        // instead of acss-live.min.js.
        debug: false,

        // Set to true when your language starts on the right and goes left.
        // false: start = left, end = right
        // true: start = right, end = left
        rightToLeft: false,

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

            // Show an icon after a link, but only on the screen
            linkIcon: {
                // A mapping that changes shorthand values into longer forms.
                // Arguments are found with $0, $1, ... in the rules.
                args: {
                    a: "⧉"
                    s: "⧉"
                },

                // The styles to apply as an array
                styles: [
                    "text-decoration: underline",
                    "text-decoration-style: dashed"
                ],

                // Additional rules that need to be created
                '@media only screen': {
                    '[class*=linkIcon]:after': [
                        "content: $0"
                    ]
                }
            }
        },

        // Media queries, breakpoints, and other useful at-rules
        atRules: {
            s: '@media only screen',
            sl: "@media screen and (max-width: 992px)",
            sm: "@media screen and (max-width: 768px)",
            ss: "@media screen and (max-width: 575px)"
        }
    };
    </script>
    <script src="https://unpkg.com/acss-live/acss-live.min.js"></script>


Similarities and Differences
----------------------------

Follows the same shorthand as [Atomizer](https://acss.io/reference.html) with a few tradeoffs:

* This does not change color codes from short to long.
* Atomizer's `Bd` helper (not `Bd(...)` rule) is renamed to `BdAll`.
* Helpers can get arguments, but they get ignored. Extra arguments can be passed to rules and they are likewise ignored.
* Does not consolidate styles in the same way as Atomizer. This will generate one rule per class.
* Renamed `Dropshadow` to `DropShadow` to be consistent with other named filters.
* Removed deprecated flex rules (ones starting with `Fl`) and kept only the ones starting `Fx`.
* Fixed `Matrix3d` and `Rotate3d` to use the 3D transforms instead of 2D.
* Colors and other properties are not restricted to a list.
* `Mw(ini)` changed to `Mw(i)`, similar to `Trsdu(i)` for consistency.
