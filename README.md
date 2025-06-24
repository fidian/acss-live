ACSS-Live
=========

This is an in-browser implementation of Atomic CSS. When gzipped, it is a mere 11k, but can handle nearly every CSS property and value. The library relies on evergreen browsers and uses [MutationObserver] to detect element changes where new CSS classes may be needed. It works even into shadow DOMs, in case you are writing custom elements.

The project was inspired by [acss-browser] - a discussion of differences is included later.

To know more about the CSS properties supported, read the [full listing of supported properties and values](CSS.md).


Usage
-----

Add this in your `<head>` of your document, then you're done. Use the minified version - it is faster and smaller because debugging and timing code is removed from the build. Using the bloated, unminified version is best when diagnosing issues or improving the library.

    <!-- Place this in your document's head. Make sure to include it before
         any custom elements that use shadow roots are created. -->
    <script src="https://cdn.jsdelivr.net/npm/@fidian/acss-live/acss-live.min.js"></script>

Now you can use Atomic CSS within your element's class lists. Configuration is entirely optional and often unnecessary.

    <h1 class="C(red)">Heading in red</h1>

That was easy. How about some borders?
    
    <div class="Bgc(lightblue) Bdw(1px) Bds(s) Bdrs(1em) P(1em) M(1em)"> ... </div>

Fantastic! What about theming? Well, this is much more fun when you set up variables in CSS. Imagine you have variables defined in your stylesheet.

    :root {
        --buttonBackground: blue;
    }

Reference any variable in the Atomic CSS.

    <button class="Bgc(--buttonBackground)">A themed button</button>

The library scans class names for all elements (including ones in closed shadow roots) and will generate a single stylesheet with all of the rules. These rules apply automatically in a trivial amount of time, then the document is watched for attribute changes. Adding new elements or changing an element's class list will be noticed and styles will be generated almost instantly. Duplicate styles aren't added to the generated stylesheet.


Examples
--------

Unless you are serving this README locally, most likely these links will show you the HTML source. Try cloning the repository and check them out to really see what's going on.

* [Demo](examples/demo.html) - Lots of colors, styling, a spinner, two web components, and even a mocked-up version of Clippy.
* [Late Loading Flicker](examples/late-loading-flicker.html) - Shows off a flicker that can happen when JavaScript is loaded late or asynchronously. It's only about a tenth of a second, but that can be unacceptable and moving the JavaScript to the `<head>` and loading it synchronously may also be unacceptable.
* [Late Loading Hide](examples/late-loading-hide.html) - Demonstration of a technique to hide the body content until ACSS-Live has loaded.
* [Timings](examples/timings.html) - Loads the demo page in an iframe, lets it render, then reloads it repeatedly. When done, reports on the amount of time different pieces of code took. This is used to see how fast the library is and to determine if there are alternate ways to make it load or run faster.


Why Do This?
------------

1. Atomic CSS is great because you reduce the total amount of CSS. All CSS is used and no CSS is left behind, unused.
2. The styling is attached to the elements, making maintenance significantly easier. No more worrying about breaking styles by changing DOM structure. CSS is less brittle.
3. It is less work than adding a CSS preprocessor to get similar functionality. It's also difficult when trying to tie Atomic CSS generation into a framework such as Angular, Mithril, or React.
3. There's no penalty or measurable performance impact from having the browser add the classes at render time. Want to prove this yourself? Modify `examples/demo.html` to include as much content as you'd like. Then check out `examples/timings.html` to see how little impact there is when building CSS classes on the fly.
4. The total amount of code is small, easy to extend, and ends up being roughly the same size (or smaller) as the CSS you're replacing. The minified library is about 32k uncompressed. Any reasonably large application already has more CSS than that.


What is Supported
-----------------

Everything from [Atomic CSS Reference](https://acss.io/reference.html), including a parent selector, parent pseudoclass, descendant selector, atomic class, parameters, pseudoclass, pseudoelement, and at-rule. Any exceptions are called out farther below. Also, almost everything related to CSS from [Emmet](https://docs.emmet.io/cheat-sheet/) is included.

There are potentially changes to some of the selectors and values. This was done intentionally for consistency throughout.


Troubleshooting
---------------

First, it's most likely that your CSS class is not being generated due to invalid syntax. Check [CSS.md](css.md) for syntax, supported rules, and supported value shorthands.

If that does not help and you need more information, try these steps:

1. Use the non-minified build to allow debugging and timing to work.
2. Enable `debug: true` in your `acssLiveConfig` - see below or look at the debugging example.
3. Search the console messages for the CSS rules you expected to have added.
4. Remember to switch back to the minified build. It's noticeably faster.

If you see the rule in the console during step 3, then the browser was instructed to add it. When you inspect the target element and it still does not have the class, then the browser found the rule to be invalid. For instance `D(asdf)` would get changed into the CSS rule `.D\(asdf\) { display: asdf }`, but the browser will silently reject it. When inspecting the element, you may only see that the class was defined and no rules were included. If this happens to you, *please look at the generated CSS in the console* and confirm the values are correctly spelled and that they work if you were to copy and paste the CSS definition into a `<style>` tag.


Configuring (Probably Unnecessary)
----------------------------------

Add some JavaScript to set a global object with the sections you want to configure. You only need to add what you think you might need. In this example, it is inlined in the HTML, but you could just as easily put it in an external file. Ensure `acssLiveConfig` object is created before loading `acss-live.min.js`.

Most of the things listed below are defaults. You do *NOT* need to include everything. Only configure the properties you need to change.

    <script>
    // This is a large example.
    window.acssLiveConfig = {
        // Settings where the values are not objects.
        settings: {
            // Enable debugging in the console. Only works if you use
            // acss-live.js instead of acss-live.min.js.
            debug: false,

            // Enable logging of timing metrics. Only works if you use
            // acss-live.js instead of acss-live.min.js.
            timing: false,

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
        // variables. CSS variables are actually better because they allow
        // theming and overrides more easily. You would use them like the
        // following classes: // Bgc(buttonColor) Bgc(buttonColorHover):h
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
            // "border-width" has no value and the arguments to the box()
            // class will be automatically appended.
            // box(m) is the same as Bds(s) Bdc(black) Bdw(3px)
            box: ["border-style: solid; border-color: black; border-width", {
                s: '1px',
                m: '3px',
                l: '5px'
            }]

            // Maybe you would like to use something that looks up colors?
            // This technique will look up the "colors" property in the config
            // and use that for shorthand values. You can specify any property.
            // C() is a much shorter method of doing the same thing.
            Color: ["color", 'color']

            // Some CSS properties allow multiple values. $_ is replaced with
            // all values separated by spaces and $, is replaced with all
            // values separated by commas. When you don't specify a value
            // for a property, $_ is automatically appended.
            BackgroundImage: ["background-image:$,"],
            SansSerif: ["font: \"Arial\" $_, "Helvetica Neue" $_"],
        },

        // Media queries, breakpoints, and other useful at-rules. These are
        // specified using two hyphens after the Atomic class, so D(n)--s
        // will hide an element if being displayed on a small screen.
        atRules: {
            s: '@media only screen',

            // Generally accepted screen sizes. There's more defined in
            // acss-live.js and they are shown in examples/media-queries.html
            //
            // S = mobile
            // M = tablets
            // L = small screens, eg. laptops
            // Default is desktop / tv / large format
            s: "@media(max-width:480px)",
            m: "@media(min-width:481px) and (max-width:768px)",
            l: "@media(min-width:1025) and (max-width:1024px)"
        },

        // Set up your own colors. These are merged with the internal list of
        // allowed color values and are used for all rules that use colors.
        color: {
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


Similarities and Differences vs Atomizer
----------------------------------------

First off, I think [Atomizer] is a fantastic tool. I don't want to downplay the work that team has produced. [acss-browser] is built off of Atomizer and is a fun experiment but is quite heavy for what it provides.

This tool follows the same shorthand as [Atomizer] and [acss-browser] with a few trade-offs:

* This does not change color codes from short to long because the point isn't to make tiny stylesheets, it is to style in the browser.
* Atomizer's `Bd` helper (not `Bd(...)` rule) is renamed to `Bd1` to not conflict with `Bd`.
* Helpers can get arguments, but they get ignored. Extra arguments can be passed to rules and they are likewise ignored. This isn't a syntax checker.
* Does not consolidate styles in the same way as Atomizer. This will generate one rule per class instead of trying to minify the generated CSS.
* Changed all classes to have a single capital letter first followed by all lowercase. CSS in the browser is case-insensitive and the capital letter just helps make sure that you meant to use Atomic CSS.
* Removed deprecated flex rules (ones starting with `Fl`) and kept only the ones starting `Fx`.
* Dropped many CSS properties because they aren't supported by browsers.
* Fixed `Matrix3d` and `Rotate3d` to use the 3D transforms instead of 2D.
* Colors and other properties are not restricted to a list. This may be good or bad, depending on how you see it.
* Old IE hacks (star hacks and `zoom: 1` rules) are removed.
* Removed combined values for `Bgp`. Use commas instead of underlines.
* Renamed border classes to use `1` at the end, like `Bdstart1` for consistency and to not conflict because CSS is case-insensitive.
* Removed various complex rules, combined styles, and hacks. If you want to add them to your `acssLiveConfig` object (when possible) or your site's CSS, I have included examples of both for each removed item.
    * `BfcHack` - The styles supplied don't adequately solve the needs.

          // CSS
          .BfcHack { display: table-cell; width: 1600px; }

          // acssLiveConfig's classes object
          BfcHack: ["display:table-cell;width:1600px"]

    * `Clearfix` - If your layout uses floating elements, either leverage `C(b)` on the next element or add the style back in.

          // CSS
          .Cf:before { content: " "; display: "table"; }
          .Cf:after { content: " "; display: "table"; clear: both; }

    * `Ell` - Use `Tov(e)` for ellipsis instead.

          // CSS
          .Ell { max-width: 100%; white-space: nowrap; overflow: hidden;
              text-overflow: ellipsis; hyphens: none }
          .Ell:after { content: ""; font-size: 0; visibility: hidden;
              display: inline-block; overflow: hidden; height: 0; width: 0 }

          // acssLiveConfig classes object can only do the first part
          Ell: ["max-width:100%;white-space:nowrap;overflow:hidden;" +
              "text-overflow:ellipsis;hyphens:none"]

    * `Hidden` - Hides content but keeps it available for screen readers. Use the [`hidden` HTML attribute](https://caniuse.com/hidden).

          // CSS
          .Hidden { position: absolute!important; clip: rect(1px,2px,1px,1px);
              padding: 0!important; border: 0!important; height: 1px!important;
              width: 1px!important; overflow: hidden }

          // acssLiveConfig's classes object
          Hidden: ["position:absolute!important;clip:rect(1px,2px,1px,1px);" +
              "padding:0!important;border:0!important;height:1px!important;" +
              "width:1px!important;overflow:hidden"]

    * `IbBox` - Use `D(ib) Va(t)`.

          // CSS
          IbBox: { display: inline-block; vertical-align: top }

          // acssLiveConfig's classes object
          IbBox: ["display:inline-block;vertical-align:top"]

    * `LineClamp` - Use `Lc()`, which is [supported in modern browsers](https://caniuse.com/css-line-clamp) even though it's only proposed to be added to the CSS spec.

          // CSS - note that the .LineClamp class needs both N and H changed.
          [class*=LineClamp] { display: -webkit-box; -webkit-box-orient:vertical;
              overflow:hidden }
          a[class*=LineClamp] { display: inline-block; display: -webkit-box; }
          a[class*=LineClamp]:after { content: "."; font-size: 0;
              visibility: hidden; display: inline-block; overflow: hidden;
              height: 0; width: 0; }
          @supports (display:-moz-box) {
              [class*=LineClamp] { display: block }
          }
          .LineClamp(N,H) { -webkit-line-clamp: N; max-height: H }

    * `Row` - Use `C(b) D(ib) Va(t) W(100%) Bxz(bb)`.

          // CSS
          .Row { clear: both; display: inline-block; vertical-align: top;
              width: 100%; box-sizing: border-box }

          // acssLiveConfig's classes object
          Row: ["clear:both;display:inline-block;vertical-align:top;width:100%;box-sizing:border-box"]

    * `StretchedBox` - Use `Pos(a) T(0) B(0) Start(0) End(0)` to keep with ACSS philosophy of single, reusable classes.

          // CSS
          .StretchedBox: { position: absolute; top: 0; right: 0; bottom: 0;
              left: 0 }

          // acssLiveConfig's classes object
          StretchedBox: ["position:absolute;top:0;right:0;bottom:0;left:0"]

Finally, let's talk about size. This project's code is pretty large for a simple library - about 80k of source. Thankfully it shrinks well using about 32k minified and about 10k compressed. Compare this to [acss-browser]'s nearly 800k of source and just under 200k minified. This size comes with a price, and the biggest is that style parameters are not validated in any way. If you type it, the rule will be added. A few of the differences listed above also cut the size down. Any helper or rule can take any number of parameters and this library won't validate that you have the right amount. Also, since this targets the browser instead of attempting to write out a minified CSS file, the code generator doesn't need to combine rules to make the output smaller.

Even with the above considerations, there are a couple things that I believe are better.

* Breakpoints are renamed as `atRules` because they are media queries or other at-rules according to the CSS spec. More than just breakpoints can be used, such as `--p` at the end of a rule to enable it only for print.
* The list of colors is split out to a separate list. Adding colors as `color` configuration property instead of mandating custom values is now possible, though you may wish to use CSS variables (eg. `C(--errorRed)`) for an easier way to set a palette.
* Defining new classes has less boilerplate and can use multiple lookup tables.
* Color codes with opacity, such as `#00112233` (in "#rrggbbaa" format) are allowed.
* Added support for `D(g)`, producing `display: grid`, plus added CSS support for the rest of the grid properties.
* Updated the list of properties to more closely match [Emmet](https://docs.emmet.io/cheat-sheet/).
* Added some default media breakpoints (`--s`, `--m`, `--l`, `--d`) for responsive design as well as color scheme detection (`--dk`, `--lt`) and print layout (`--p`).


Upgrading
---------

### Version 3

Version 3 allows styling to go into shadow DOMs by linking the stylesheet to each shadow root. No changes are necessary to handle the update, though now all custom elements that use a shadow root could now get more styling. In order for this to work, ACSS-Live needs to be set up and working before any shadow roots are attached.

### Version 2

Version 2 was a major change with nearly doubling the amount of CSS this can handle. Atomic classes were changed, values were changed, `$0` through `$9` were removed, `$_` and `$,` were added, and a fairly thorough scrubbing of all CSS classes was performed. More lookup tables were made, many of which are intentionally mirroring the CSS spec's naming, and now lookup tables can be cascaded.

When upgrading to this version, go through your CSS carefully. There's detailed notes about the changes in [UPGRADING-2.md](UPGRADING-2.md).

[acss-browser]: https://github.com/acss-io/acss-browser
[Atomizer]: https://acss.io/reference.html
[MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
