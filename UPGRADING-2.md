UPGRADING ACSS-LIVE
===================

2.0.2 -> 2.0.3
--------------

* Changed `Ovw(a)` to `Ovw(an)` for consistency with the other `anywhere` value.

2.0.1 -> 2.0.2
--------------

* Fixed config overrides again.

2.0.0 -> 2.0.1
--------------

* Fixed config overrides and custom lookup tables.
* Changed the shortcut for `reverse` from `r` to `re` so it wouldn't conflict with `right`.
* Changed the shortcut for `transparent` from `t` to `tr` so it wouldn't conflict with `top`.
* Changed the shortcut for `oriya` from `o` to `or` so it wouldn't conflict with `outline`.
* Changed the lookup table `r` to `re` because `reverse` was updated.
* Changed the global default `re` to `rev` → `revert` to not conflict with `reverse`.
* Corrected color values for `Bdinlend`.
* Changed `uc` to `uni` → `unicase` for fonts.
* Changed `Maz` to `Maiz` → `max-inline-size` and `Miz` to `Miiz` → `min-inline-size` for consistency.

1.0.2 to 2.0.0
--------------

* Renamed several classes to not conflict and to better represent the case-insensitive nature of CSS.
    * `BdB` became `Bdb1`
    * `BdX` became `Bdx1`
    * `BdEnd` became `Bdend1`
    * `BdStart` became `Bdstart1`
    * `BdT` became `Bdt1`
    * `BdY` became `Bdy1`
    * `BdAll` became `Bd1`
    * `Ctn` became `Ct` and had a value added (see below)
    * `DropShadow` became `Dropshadow` again
    * `HueRotate` became `Huerotate`
* Added the following CSS classes and their values:
    * `:Bgcp` → `-webkit-background-clip:$,;background-clip:$,`
    * `:Tstkc` → `-webkit-text-stroke-color:$_;text-stroke-color:$_`
    * `:Tstkw` → `-webkit-text-stroke-width:$_;text-stroke-width:$_`
    * `:Tstk` → `-webkit-text-stroke:$_;text-stroke:$_`
    * `:Tfc` → `-webkot-text-fill-color:$_;text-fill-color:$_`
    * `:Acc` → `accent-color:$_`
    * `:At` → `align-tracks:$,`
    * `:A` → `all:$_`
    * `:Animc` → `animation-composition:$,`
    * `:Animt` → `animation-timeline:$,`
    * `:Aspr` → `aspect-ratio:$_`
    * `:Bckdf` → `backdrop-filter:$_`
    * `:Bgbm` → `background-blend-mode:$,`
    * `:Blkz` → `block-size:$_`
    * `:Bdblk` → `border-block:$_`
    * `:Bdblkc` → `border-block-color:$_`
    * `:Bdblke` → `border-block-end:$_`
    * `:Bdblkec` → `border-block-end-color:$_`
    * `:Bdblkes` → `border-block-end-style:$_`
    * `:Bdblkew` → `border-block-end-width:$_`
    * `:Bdblks` → `border-block-start:$_`
    * `:Bdblksc` → `border-block-start-color:$_`
    * `:Bdblkss` → `border-block-start-style:$_`
    * `:Bdblksw` → `border-block-start-width:$_`
    * `:Bdblkst` → `border-block-style:$_`
    * `:Bdblkw` → `border-block-width:$_`
    * `:Bdblrs` → `border-bottom-left-radius:$_`
    * `:Bdbrs` → `border-bottom-left-radius:$_;border-bottom-right-radius:$_`
    * `:Bdbrrs` → `border-bottom-right-radius:$_`
    * `:Bdeers` → `border-end-end-radius:$_`
    * `:Bdesrs` → `border-end-start-radius:$_`
    * `:Bdinl` → `border-inline:$_`
    * `:Bdinlc` → `border-inline-color:$_`
    * `:Bdinlend` → `border-inline-end:$_`
    * `:Bdinlendc` → `border-inline-end-color:$_`
    * `:Bdinlends` → `border-inline-end-style:$_`
    * `:Bdinlendw` → `border-inline-end-width:$_`
    * `:Bdinlstart` → `border-inline-start:$_`
    * `:Bdinlstartc` → `border-inline-start-color:$_`
    * `:Bdinlstarts` → `border-inline-start-style:$_`
    * `:Bdinlstartw` → `border-inline-start-width:$_`
    * `:Bdinls` → `border-inline-style:$_`
    * `:Bdinlw` → `border-inline-width:$_`
    * `:Bdl` → `border-left:$_`
    * `:Bdlc` → `border-left-color:$_`
    * `:Bdls` → `border-left-style:$_`
    * `:Bdlw` → `border-left-width:$_`
    * `:Bdr` → `border-right:$_`
    * `:Bdrc` → `border-right-color:$_`
    * `:Bdrst` → `border-right-style:$_`
    * `:Bdrw` → `border-right-width:$_`
    * `:Bdsers` → `border-start-end-radius:$_`
    * `:Bdssrs` → `border-start-start-radius:$_`
    * `:Bdtlrs` → `border-top-left-radius:$_`
    * `:Bdlrs` → `border-top-left-radius:$_;border-bottom-left-radius:$_`
    * `:Bdtrs` → `border-top-left-radius:$_;border-top-right-radius:$_`
    * `:Bdtrrs` → `border-top-right-radius:$_`
    * `:Bdrrs` → `border-top-right-radius:$_;border-bottom-right-radius:$_`
    * `:Bdl1` → `border-width:0;border-left-width:1px;border-style:solid`
    * `:Bdr1` → `border-width:0;border-right-width:1px;border-style:solid`
    * `:Bxdb` → `box-decoration-break:$_`
    * `:Bka` → `break-after:$_`
    * `:Bkb` → `break-before:$_`
    * `:Bki` → `break-inside:$_`
    * `:Carc` → `caret-color:$_`
    * `:Cpp` → `clip-path:$_`
    * `:Cs` → `color-scheme:$_`
    * `:Ctiblkz` → `contain-intrinsic-block-size:$_`
    * `:Ctih` → `contain-intrinsic-height:$_`
    * `:Ctiiz` → `contain-intrinsic-inline-size:$_`
    * `:Ctiz` → `contain-intrinsic-size:$_`
    * `:Ctiw` → `contain-intrinsic-width:$_`
    * `:Ctr` → `container:$_`
    * `:Ctrn` → `container-name:$_`
    * `:Ctrt` → `container-type:$_`
    * `:Cntv` → `content-visibility:$_`
    * `:Cos` → `counter-set:$_`
    * `:Ffs` → `font-feature-settings:$_`
    * `:Fk` → `font-kearning:$_`
    * `:Flo` → `font-language-override:$_`
    * `:Foz` → `font-optical-sizing:$_`
    * `:Fp` → `font-palette:$_`
    * `:Fsy` → `font-synthesis:$_`
    * `:Fva` → `font-variant-alternates:$_`
    * `:Fvc` → `font-variant-caps:$_`
    * `:Fvea` → `font-variant-east-asian:$_`
    * `:Fve` → `font-variant-emoji:$_`
    * `:Fvl` → `font-variant-ligagures:$_`
    * `:Fvn` → `font-variant-numeric:$_`
    * `:Fvp` → `font-variant-position:$_`
    * `:Fvs` → `font-variation-settings:$,`
    * `:Fca` → `forced-color-adjust:$_`
    * `:G` → `gap:$_`
    * `:Gr` → `grid:$_`
    * `:Gra` → `grid-area:$_`
    * `:Grac` → `grid-auto-columns:$_`
    * `:Graf` → `grid-auto-flow:$_`
    * `:Grar` → `grid-auto-rows:$_`
    * `:Grc` → `grid-column:$_`
    * `:Grce` → `grid-column-end:$_`
    * `:Grcs` → `grid-column-start:$_`
    * `:Grr` → `grid-row:$_`
    * `:Grre` → `grid-row-end:$_`
    * `:Grrs` → `grid-row-start:$_`
    * `:Grt` → `grid-template:$_`
    * `:Grta` → `grid-template-areas:$_`
    * `:Grtc` → `grid-template-columns:$_`
    * `:Grtr` → `grid-template-rows:$_`
    * `:Hp` → `hanging-punctuation:$_`
    * `:Hyc` → `hyphenate-character:$_`
    * `:Hylc` → `hyphenate-limit-chars:$_`
    * `:Io` → `image-orientation:$_`
    * `:Irn` → `image-rendering:$_`
    * `:Irs` → `image-resolution:$_`
    * `:Inl` → `initial-letter:$_`
    * `:Inla` → `initial-letter-align:$_`
    * `:Iz` → `inline-size:$_`
    * `:In` → `inset:$_`
    * `:Inblk` → `inset-block:$_`
    * `:Inblke` → `inset-block-end:$_`
    * `:Inblks` → `inset-block-start:$_`
    * `:Ini` → `inset-inline:$_`
    * `:Inie` → `inset-inline-end:$_`
    * `:Inis` → `inset-inline-start:$_`
    * `:Is` → `isolation:$_`
    * `:Ji` → `justify-items:$_`
    * `:Js` → `justify-self:$_`
    * `:Jt` → `justify-tracks:$,`
    * `:L` → `left:$_`
    * `:Lb` → `line-break:$_`
    * `:Lhs` → `line-height-step:$_`
    * `:Mblk` → `margin-block:$_`
    * `:Mblke` → `margin-block-end:$_`
    * `:Mblks` → `margin-block-start:$_`
    * `:Mi` → `margin-inline:$_`
    * `:Mie` → `margin-inline-end:$_`
    * `:Mis` → `margin-inline-start:$_`
    * `:Ml` → `margin-left:$_`
    * `:Mr` → `margin-right:$_`
    * `:Mtr` → `margin-trim:$_`
    * `:Msk` → `mask:$_`
    * `:Mskb` → `mask-border:$_`
    * `:Mskbm` → `mask-border-mode:$_`
    * `:Mskbo` → `mask-border-outset:$_`
    * `:Mskbr` → `mask-border-repeat:$_`
    * `:Mskbsl` → `mask-border-slice:$_`
    * `:Mskbso` → `mask-border-source:$_`
    * `:Mskbw` → `mask-border-width:$_`
    * `:Mskc` → `mask-clip:$,`
    * `:Mskco` → `mask-composite:$,`
    * `:Mski` → `mask-image:$,`
    * `:Mskm` → `mask-mode:$,`
    * `:Msko` → `mask-origin:$,`
    * `:Mskp` → `mask-position:$_`
    * `:Mskr` → `mask-repeat:$,`
    * `:Mskz` → `mask-size:$_`
    * `:Mskt` → `mask-type:$_`
    * `:Maf` → `masonry-auto-flow:$_`
    * `:Md` → `math-depth:$_`
    * `:Ms` → `math-shift:$_`
    * `:Mst` → `math-style:$_`
    * `:Mablkz` → `max-block-size:$_`
    * `:Maiz` → `max-inline-size:$_`
    * `:Miblkz` → `min-block-size:$_`
    * `:Miiz` → `min-inline-size:$_`
    * `:Mbm` → `mix-blend-mode:$_`
    * `:Objp` → `object-position:$_`
    * `:Of` → `offset:$_`
    * `:Ofa` → `offset-anchor:$_`
    * `:Ofd` → `offset-distance:$_`
    * `:Ofpa` → `offset-path:$_`
    * `:Ofp` → `offset-position:$_`
    * `:Ofr` → `offset-rotate:$_`
    * `:Ova` → `overflow-anchor:$_`
    * `:Ovb` → `overflow-block:$_`
    * `:Ovcm` → `overflow-clip-margin:$_`
    * `:Ovi` → `overflow-inline:$_`
    * `:Ovsb` → `overscroll-behavior:$_`
    * `:Ovsbb` → `overscroll-behavior-block:$_`
    * `:Ovsbi` → `overscroll-behavior-inline:$_`
    * `:Ovsbx` → `overscroll-behavior-x:$_`
    * `:Ovsby` → `overscroll-behavior-y:$_`
    * `:Pblk` → `padding-block:$_`
    * `:Pblke` → `padding-block-end:$_`
    * `:Pblks` → `padding-block-start:$_`
    * `:Pi` → `padding-inline:$_`
    * `:Pie` → `padding-inline-end:$_`
    * `:Pis` → `padding-inline-start:$_`
    * `:Pl` → `padding-left:$_`
    * `:Pr` → `padding-right:$_`
    * `:Po` → `paint-order:$_`
    * `:Plc` → `place-content:$_`
    * `:Pli` → `place-items:$_`
    * `:Pls` → `place-self:$_`
    * `:Pca` → `print-color-adjust:$_`
    * `:R` → `right:$_`
    * `:Ro` → `rotate:$_`
    * `:Rowg` → `row-gap:$_`
    * `:Ra` → `ruby-align:$_`
    * `:Rp` → `ruby-position:$_`
    * `:S` → `scale:$_`
    * `:Scrb` → `scroll-behavior:$_`
    * `:Scrm` → `scroll-margin:$_`
    * `:Scrmend` → `scroll-margin-$e:$_`
    * `:Scrmstart` → `scroll-margin-$s:$_`
    * `:Scrmblk` → `scroll-margin-block:$_`
    * `:Scrmblke` → `scroll-margin-block-end:$_`
    * `:Scrmblks` → `scroll-margin-block-start:$_`
    * `:Scrmb` → `scroll-margin-bottom:$_`
    * `:Scrmi` → `scroll-margin-inline:$_`
    * `:Scrmie` → `scroll-margin-inline-end:$_`
    * `:Scrmis` → `scroll-margin-inline-start:$_`
    * `:Scrml` → `scroll-margin-left:$_`
    * `:Scrmr` → `scroll-margin-right:$_`
    * `:Scrmt` → `scroll-margin-top:$_`
    * `:Scrp` → `scroll-padding:$_`
    * `:Scrpend` → `scroll-padding-$e:$_`
    * `:Scrpstart` → `scroll-padding-$s:$_`
    * `:Scrpblk` → `scroll-padding-block:$_`
    * `:Scrpblke` → `scroll-padding-block-end:$_`
    * `:Scrpblks` → `scroll-padding-block-start:$_`
    * `:Scrpb` → `scroll-padding-bottom:$_`
    * `:Scrpi` → `scroll-padding-inline:$_`
    * `:Scrpie` → `scroll-padding-inline-end:$_`
    * `:Scrpis` → `scroll-padding-inline-start:$_`
    * `:Scrpl` → `scroll-padding-left:$_`
    * `:Scrpr` → `scroll-padding-right:$_`
    * `:Scrpt` → `scroll-padding-top:$_`
    * `:Scrsa` → `scroll-snap-align:$_`
    * `:Scrss` → `scroll-snap-stop:$_`
    * `:Scrst` → `scroll-snap-type:$_`
    * `:Scrt` → `scroll-timeline:$_`
    * `:Scrta` → `scroll-timeline-axis:$_`
    * `:Scrtn` → `scroll-timeline-name:$_`
    * `:Sbc` → `scrollbar-color:$_`
    * `:Sbg` → `scrollbar-gutter:$_`
    * `:Sbw` → `scrollbar-width:$_`
    * `:Shpit` → `shape-image-threshold:$_`
    * `:Shpm` → `shape-margin:$_`
    * `:Shpo` → `shape-outside:$_`
    * `:Tci` → `text-combine-upright:$_`
    * `:Tdsk` → `text-decoration-skip:$_`
    * `:Tdski` → `text-decoration-skip-ink:$_`
    * `:Tdt` → `text-decoration-thickness:$_`
    * `:Tec` → `text-emphasis-color:$_`
    * `:Tep` → `text-emphasis-position:$_`
    * `:Tes` → `text-emphasis-style:$_`
    * `:To` → `text-orientation:$_`
    * `:Tza` → `text-size-adjust:$_`
    * `:Tuo` → `text-underline-offset:$_`
    * `:Tup` → `text-underline-position:$_`
    * `:Toa` → `touch-action:$_`
    * `:Trfb` → `transform-box:$_`
    * `:Tr` → `translate:$_`
    * `:Ub` → `unicode-bidi:$_`
    * `:Wc` → `will-change:$_`
* Removed the following CSS classes:
    * `:Bgcp` → `background-clip:$_`
    * `:Bdendi` → `border-$e-image:$_`
    * `:Bdstarti` → `border-$s-image:$_`
    * `:Bdbendi` → `border-bottom-$e-image:$_`
    * `:Bdbstarti` → `border-bottom-$s-image:$_`
    * `:Bdbi` → `border-bottom-image:$_`
    * `:Bdbk` → `border-break:$_`
    * `:Bdci` → `border-corner-image:$_`
    * `:Bdf` → `border-fit:$_`
    * `:Bdlen` → `border-length:$_`
    * `:Bdtendi` → `border-top-$e-image:$_`
    * `:Bdtstarti` → `border-top-$s-image:$_`
    * `:Bdti` → `border-top-image:$_`
    * `:Fef` → `font-effect:$_`
    * `:Fem` → `font-emphasize:$_`
    * `:Femp` → `font-emphasize-position:$_`
    * `:Fems` → `font-emphasize-style:$_`
    * `:Fsm` → `font-smooth:$_`
    * `:Mar` → `max-resolution:$_`
    * `:Mir` → `min-resolution:$_`
    * `:Ovs` → `overflow-style:$_`
    * `:Th` → `text-height:$_`
    * `:To` → `text-outline:$_`
    * `:Tr` → `text-replace:$_`
    * `:Whsc` → `white-space-collapse:$_`
* Changed values for the following CSS classes
    * `:Ac` → `align-content:$_`
        * Added:
            * `bl` → `baseline`
            * `e` → `end`
            * `fi` → `first`
            * `la` → `last`
            * `nr` → `normal`
            * `sa` → `safe`
            * `s` → `start`
            * `se` → `space-evenly`
            * `us` → `unsafe`
        * Changed:
            * `sa` became `spa` → `space-around`
            * `sb` became `spb` → `space-between`
            * `s` became `st` → `stretch`
    * `:Ai` → `align-items:$_`
        * Added:
            * `e` → `end`
            * `fi` → `first`
            * `la` → `last`
            * `nr` → `normal`
            * `sa` → `safe`
            * `se` → `self-end`
            * `ss` → `self-start`
            * `s` → `start`
            * `us` → `unsafe`
        * Changed:
            * `b` became `bl` → `baseline`
            * `s` became `st` → `stretch`
    * `:As` → `align-self:$_`
        * Added:
            * `e` → `end`
            * `fi` → `first`
            * `la` → `last`
            * `nr` → `normal`
            * `sa` → `safe`
            * `se` → `self-end`
            * `ss` → `self-start`
            * `s` → `start`
            * `us` → `unsafe`
        * Changed:
            * `b` became `bl` → `baseline`
            * `s` became `st` → `stretch`
    * `:Anim` → `animation:$_`
        * Added:
            * `a` → `alternate`
            * `are` → `alternate-reverse`
            * `b` → `backwards`
            * `bt` → `both`
            * `cb` → `cubic-bezier(.1,.7,1,.1)`
            * `ea` → `ease`
            * `ei` → `ease-in`
            * `eio` → `ease-in-out`
            * `eo` → `ease-out`
            * `e` → `end`
            * `f` → `forwards`
            * `i` → `infinite`
            * `jb` → `jump-both`
            * `je` → `jump-end`
            * `jn` → `jump-none`
            * `js` → `jump-start`
            * `li` → `linear`
            * `n` → `none`
            * `nr` → `normal`
            * `pa` → `paused`
            * `re` → `reverse`
            * `ru` → `running`
            * `s` → `start`
            * `se` → `step-end`
            * `ss` → `step-start`
    * `:Animdir` → `animation-direction:$,`
        * Changed:
            * `ar` became `are` → `alternate-reverse`
            * `n` became `nr` → `normal`
            * `r` became `re` → `reverse`
    * `:Animn` → `animation-name:$_`
        * Added:
            * `n` → `none`
    * `:Animps` → `animation-play-state:$_`
        * Changed:
            * `p` became `pa` → `paused`
            * `r` became `ru` → `running`
    * `:Animt` → `animation-timeline:$,`
        * Added:
            * `a` → `auto`
    * `:Animtf` → `animation-timing-function:$,`
        * Added:
            * `e` → `end`
            * `jb` → `jump-both`
            * `je` → `jump-end`
            * `jn` → `jump-none`
            * `js` → `jump-start`
            * `s` → `start`
        * Changed:
            * `e` became `ea` → `ease`
            * `l` became `li` → `linear`
    * `:Ap` → `appearance:$_`
        * Added:
            * `b` → `button`
            * `c` → `checkbox`
            * `l` → `listbox`
            * `ml` → `menulist`
            * `mlb` → `menulist-button`
            * `m` → `meter`
            * `prb` → `progress-bar`
            * `pb` → `push-button`
            * `r` → `radio`
            * `s` → `searchfield`
            * `sh` → `slider-horizontal`
            * `sb` → `square-button`
            * `ta` → `textarea`
            * `tf` → `textfield`
    * `:Bg` → `background:$_`
        * Added:
            * `end` → `$e`
            * `start` → `$s`
            * `a` → `auto`
            * `bb` → `border-box`
            * `b` → `bottom`
            * `c` → `center`
            * `ct` → `contain`
            * `cb` → `content-box`
            * `cv` → `cover`
            * `cc` → `currentcolor`
            * `f` → `fixed`
            * `l` → `left`
            * `lo` → `local`
            * `nre` → `no-repeat`
            * `pb` → `padding-box`
            * `re` → `repeat`
            * `rx` → `repeat-x`
            * `ry` → `repeat-y`
            * `r` → `right`
            * `ro` → `round`
            * `s` → `scroll`
            * `sp` → `space`
            * `t` → `top`
            * `xe` → `x-end`
            * `xs` → `x-start`
            * `ye` → `y-end`
            * `ys` → `y-start`
        * Changed:
            * `t` became `tr` → `transparent`
    * `:Bga` → `background-attachment:$,`
        * Changed:
            * `l` became `lo` → `local`
    * `:Bgc` → `background-color:$_`
        * Changed
            * `t` became `tr` → `transparent`
        * Removed
            * `i` → `invert`
    * `:Bgp` → `background-position:$_`
        * Because multiple values can be specified now with commas, removed combined values.
        * Added:
            * `end` → `$e`
            * `start` → `$s`
            * `b` → `bottom`
            * `l` → `left`
            * `r` → `right`
            * `t` → `top`
            * `xe` → `x-end`
            * `xs` → `x-start`
            * `ye` → `y-end`
            * `ys` → `y-start`
        * Removed:
            * `end_t` → `$e 0`
            * `end_b` → `$e 100%`
            * `end_c` → `$e center`
            * `start_t` → `$s 0`
            * `start_b` → `$s 100%`
            * `start_c` → `$s center`
            * `c_t` → `center 0`
            * `c_b` → `center 100%`
    * `:Bgpx` → `background-position-x:$_`
        * Added:
            * `l` → `left`
            * `r` → `right`
            * `xe` → `x-end`
            * `xs` → `x-start`
    * `:Bgpy` → `background-position-y:$_`
        * Changed percentages to words to more closely match other values.
        * Added:
            * `b` → `bottom`
            * `c` → `center`
            * `t` → `top`
            * `ye` → `y-end`
            * `ys` → `y-start`
        * Removed:
            * `t` → `0`
            * `b` → `100%`
            * `c` → `50%`
    * `:Bgr` → `background-repeat:$_`
        * Changed:
            * `nr` became `nre` → `no-repeat`
            * `r` became `re` → `repeat`
            * `s` became `sp` → `space`
    * `:Bd` → `border:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Bdend` → `border-$e:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Bdendc` → `border-$e-color:$_`
        * Changed:
            * `t` became `t` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Bdends` → `border-$e-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Bdstart` → `border-$s:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Bdstartc` → `border-$s-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Bdstarts` → `border-$s-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Bdb` → `border-bottom:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Bdbc` → `border-bottom-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Bdbs` → `border-bottom-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Bdc` → `border-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Bdi` → `border-image:$_`
        * Added:
            * `a` → `auto`
            * `f` → `fill`
            * `re` → `repeat`
            * `ro` → `round`
            * `sp` → `space`
            * `st` → `stretch`
    * `:Bdir` → `border-image-repeat:$_`
        * Changed:
            * `r` became `re` → `repeat`
            * `s` became `sp` → `space`
    * `:Bdisl` → `border-image-slice:$_`
        * Added:
            * `f` → `fill`
    * `:Bds` → `border-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Bdt` → `border-top:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Bdtc` → `border-top-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Bdts` → `border-top-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Bxsh` → `box-shadow:$,`
        * Added:
            * `i` → `inset`
            * `tr` → `transparent`
    * `:Bxz` → `box-sizing:$_`
        * Removed:
            * `pb` → `padding-box`
    * `:Cl` → `clear:$_`
        * Added:
            * `be` → `block-end`
            * `bs` → `block-start`
            * `bo` → `bottom`
            * `ie` → `inline-end`
            * `is` → `inline-start`
            * `l` → `left`
            * `r` → `right`
            * `t` → `top`
    * `:C` → `color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Colmc` → `column-count:$_`
        * Added:
            * `a` → `auto`
    * `:Colmf` → `column-fill:$_`
        * Added:
            * `ba` → `balance-all`
    * `:Colmg` → `column-gap:$_`
        * Added:
            * `nr` → `normal`
    * `:Colmr` → `column-rule:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tr` → `transparent`
    * `:Colmrc` → `column-rule-color:$_`
        * Added:
            * `cc` → `currentcolor`
            * `n` → `none`
            * `tr` → `transparent`
    * `:Colmrs` → `column-rule-style:$_`
        * Added:
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
        * Changed
            * `da` became `ds` → `dashed`
            * `d` became `dt` → `dotted`
            * `do` became `db` → `double`
    * `:Colms` → `column-span:$_`
        * Removed:
            * `a` → `all`
    * `:Colmw` → `column-width:$_`
        * Added:
            * `a` → `auto`
            * `mac` → `max-content`
            * `mic` → `min-content`
    * `:Ct` → `contain:$_`
        * Added:
            * `iz` → `inline-size`
    * `:Cnt` → `content:$_`
        * Changed:
            * `no` became `nr` → `normal`
    * `:Coi` → `counter-increment:$_`
        * Added:
            * `n` → `none`
    * `:Cor` → `counter-reset:$_`
        * Added:
            * `n` → `none`
    * `:Fill` → `fill:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Fil` → `filter:$_`
        * Added:
            * `n` → `none`
    * `:Fx` → `flex:$_`
        * Added:
            * `cn` → `content`
        * Removed:
            * `a` → `auto`
    * `:Fxb` → `flex-basis:$_`
        * Added:
            * `cn` → `content`
        * Removed:
            * `a` → `auto`
            * `n` → `none`
    * `:Fxd` → `flex-direction:$_`
        * Changed:
            * `cr` became `cre` → `column-reverse`
            * `rr` became `rre` → `row-reverse`
    * `:Fxf` → `flex-flow:$_`
        * Changed:
            * `cr` became `cre` → `column-reverse`
            * `rr` became `rre` → `row-reverse`
            * `wr` became `wre` → `wrap-reverse`
    * `:Fxw` → `flex-wrap:$_`
        * Changed:
            * `wr` became `wre` → `wrap-reverse`
    * `:Fl` → `float:$_`
        * Added:
            * `be` → `block-end`
            * `bs` → `block-start`
            * `b` → `bottom`
            * `f` → `footnote`
            * `ie` → `inline-end`
            * `is` → `inline-start`
            * `l` → `left`
            * `r` → `right`
            * `sb` → `snap-block`
            * `si` → `snap-inline`
            * `t` → `top`
    * `:F` → `font:$_`
        * Added:
            * `cs` → `"Comic Sans MS","Monotype Corsiva",cursive`
            * `tnr` → `"Times New Roman",Times,Baskerville,Georgia,serif`
            * `apc` → `all-petite-caps`
            * `asc` → `all-small-caps`
            * `a` → `Arial,"Helvetica Neue",Helvetica,sans-serif`
            * `b` → `bold`
            * `br` → `bolder`
            * `c` → `condensed`
            * `cu` → `cursive`
            * `ex` → `expanded`
            * `ec` → `extra-condensed`
            * `ee` → `extra-expanded`
            * `f` → `fantasy`
            * `im` → `Impact,Capitals,fantasy`
            * `i` → `italic`
            * `l` → `large`
            * `lr` → `larger`
            * `lir` → `lighter`
            * `m` → `medium`
            * `mon` → `Monaco,"Courier New",monospace`
            * `mo` → `monospace`
            * `nr` → `normal`
            * `o` → `oblique`
            * `pc` → `petite-caps`
            * `ssf` → `sans-serif`
            * `smc` → `semi-condensed`
            * `sme` → `semi-expanded`
            * `sf` → `serif`
            * `s` → `small`
            * `sc` → `small-caps`
            * `sr` → `smaller`
            * `tc` → `titling-caps`
            * `uc` → `ultra-condensed`
            * `ue` → `ultra-expanded`
            * `uni` → `unicase`
            * `v` → `Verdana,Geneva,sans-serif`
            * `xl` → `x-large`
            * `xs` → `x-small`
            * `xxl` → `xx-large`
            * `xxs` → `xx-small`
    * `:Ff` → `font-family:$,`
        * Changed:
        * `t` became `tnr` → `"Times New Roman",Times,Baskerville,Georgia,serif`
        * `c` became `cu` → `cursive`
        * `i` became `im` → `Impact,Capitals,fantasy`
        * `mo` became `mon` → `Monaco,"Courier New",monospace`
        * `m` became `mo` → `monospace`
        * `ss` became `ssf` → `sans-serif`
        * `s` became `sf` → `serif`
    * `:Fz` → `font-size:$_`
        * Added:
            * `l` → `large`
            * `lr` → `larger`
            * `m` → `medium`
            * `s` → `small`
            * `sr` → `smaller`
            * `xl` → `x-large`
            * `xs` → `x-small`
            * `xxl` → `xx-large`
            * `xxs` → `xx-small`
    * `:Fza` → `font-size-adjust:$_`
        * Added:
            * `ch` → `cap-height`
            * `cw` → `ch-width`
            * `eh` → `ex-height`
            * `ih` → `ic-height`
            * `iw` → `ic-width`
    * `:Fst` → `font-stretch:$_`
        * Changed:
            * `e` became `ex` → `expanded`
            * `n` became `nr` → `normal`
            * `sc` became `smc` → `semi-condensed`
            * `se` became `sme` → `semi-expanded`
    * `:Fs` → `font-style:$_`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Fv` → `font-variant:$_`
        * Added:
            * `apc` → `all-petite-caps`
            * `asc` → `all-small-caps`
            * `cl` → `common-ligatures`
            * `cnt` → `contextual`
            * `df` → `diagonal-fractions`
            * `dl` → `discretionary-ligatures`
            * `e` → `emoji`
            * `fw` → `full-width`
            * `hf` → `historical-forms`
            * `hl` → `historical-ligatures`
            * `j04` → `jis04`
            * `j78` → `jis78`
            * `j83` → `jis83`
            * `j90` → `jis90`
            * `ln` → `lining-nums`
            * `ncl` → `no-common-ligatures`
            * `ncnt` → `no-contextual`
            * `ndl` → `no-discretionary-ligatures`
            * `nhl` → `no-historical-ligatures`
            * `n` → `none`
            * `on` → `oldstyle-nums`
            * `or` → `ordinal`
            * `pc` → `petite-caps`
            * `pn` → `proportional-nums`
            * `pw` → `proportional-width`
            * `r` → `ruby`
            * `sim` → `simplified`
            * `sz` → `slashed-zero`
            * `stf` → `stacked-fractions`
            * `sub` → `sub`
            * `sup` → `super`
            * `tn` → `tabular-nums`
            * `t` → `text`
            * `tc` → `titling-caps`
            * `tra` → `traditional`
            * `uni` → `unicase`
            * `u` → `unicode`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Fw` → `font-weight:$_`
        * Changed:
            * `lr` became `lir` → `lighter`
            * `n` became `nr` → `normal`
    * `:H` → `height:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
    * `:Hy` → `hyphens:$_`
        * Added:
            * `n` → `none`
        * Removed:
            * `n` → `normal`
    * `:Jc` → `justify-content:$_`
        * Added:
            * `end` → `$e`
            * `start` → `$s`
            * `e` → `end`
            * `l` → `left`
            * `nr` → `normal`
            * `r` → `right`
            * `sa` → `safe`
            * `s` → `start`
            * `us` → `unsafe`
        * Changed:
            * `sa` became `spa` → `space-around`
            * `sb` became `spb` → `space-between`
            * `se` became `spe` → `space-evenly`
            * `s` became `st` → `stretch`
    * `:Lts` → `letter-spacing:$_`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Lh` → `line-height:$_`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Lis` → `list-style:$_`
        * Added:
            * `ai` → `arabic-indic`
            * `ar` → `armenian`
            * `b` → `bengali`
            * `ca` → `cambodian`
            * `c` → `circle`
            * `cdc` → `cjk-decimal`
            * `ceb` → `cjk-earthly-branch`
            * `chs` → `cjk-heavenly-stem`
            * `ci` → `cjk-ideographic`
            * `dc` → `decimal`
            * `dclz` → `decimal-leading-zero`
            * `de` → `devanagari`
            * `d` → `disc`
            * `dic` → `disclosure-closed`
            * `dio` → `disclosure-open`
            * `ei` → `ethiopic-numeric`
            * `g` → `georgian`
            * `guj` → `gujarati`
            * `gur` → `gutmukhi`
            * `h` → `hebrew`
            * `hi` → `hiragana`
            * `hii` → `hiragana-iroha`
            * `i` → `inside`
            * `jf` → `japanese-formal`
            * `ji` → `japanese-informal`
            * `kan` → `kannada`
            * `kat` → `katakana`
            * `kati` → `katakana-iroha`
            * `k` → `khmer`
            * `khgf` → `korean-hangul-formal`
            * `khjf` → `korean-hanja-formal`
            * `khi` → `korean-hanja-informal`
            * `l` → `lao`
            * `la` → `lower-alpha`
            * `lar` → `lower-armenian`
            * `lg` → `lower-greek`
            * `ll` → `lower-latin`
            * `lr` → `lower-roman`
            * `ma` → `malayam`
            * `mo` → `mongolian`
            * `my` → `myanmar`
            * `or` → `oriya`
            * `o` → `outside`
            * `p` → `persian`
            * `scf` → `simp-chinese-formal`
            * `sci` → `simp-chinese-informal`
            * `s` → `square`
            * `ta` → `tamil`
            * `te` → `telugu`
            * `th` → `thai`
            * `ti` → `tigetan`
            * `tcf` → `trad-chinese-formal`
            * `tci` → `trad-chinese-informal`
            * `ua` → `upper-alpha`
            * `uar` → `upper-armenian`
            * `ul` → `upper-latin`
            * `ur` → `upper-roman`
    * `:List` → `list-style-type:$_`
        * Added:
            * `ai` → `arabic-indic`
            * `b` → `bengali`
            * `ca` → `cambodian`
            * `cdc` → `cjk-decimal`
            * `ceb` → `cjk-earthly-branch`
            * `chs` → `cjk-heavenly-stem`
            * `ci` → `cjk-ideographic`
            * `de` → `devanagari`
            * `dic` → `disclosure-closed`
            * `dio` → `disclosure-open`
            * `ei` → `ethiopic-numeric`
            * `guj` → `gujarati`
            * `gur` → `gutmukhi`
            * `h` → `hebrew`
            * `hi` → `hiragana`
            * `hii` → `hiragana-iroha`
            * `jf` → `japanese-formal`
            * `ji` → `japanese-informal`
            * `kan` → `kannada`
            * `kat` → `katakana`
            * `kati` → `katakana-iroha`
            * `k` → `khmer`
            * `khgf` → `korean-hangul-formal`
            * `khjf` → `korean-hanja-formal`
            * `khi` → `korean-hanja-informal`
            * `l` → `lao`
            * `lar` → `lower-armenian`
            * `ma` → `malayam`
            * `mo` → `mongolian`
            * `my` → `myanmar`
            * `or` → `oriya`
            * `p` → `persian`
            * `scf` → `simp-chinese-formal`
            * `sci` → `simp-chinese-informal`
            * `ta` → `tamil`
            * `te` → `telugu`
            * `th` → `thai`
            * `ti` → `tigetan`
            * `tcf` → `trad-chinese-formal`
            * `tci` → `trad-chinese-informal`
            * `uar` → `upper-armenian`
        * Changed:
            * `a` became `ar` → `armenian`
    * `:Mah` → `max-height:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
        * Removed:
            * `fa` → `fill-available`
            * `fc` → `fit-content`
            * `i` → `initial`
    * `:Maw` → `max-width:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
        * Removed:
            * `fa` → `fill-available`
            * `fc` → `fit-content`
            * `i` → `initial`
    * `:Mih` → `min-height:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
        * Removed:
            * `fa` → `fill-available`
            * `fc` → `fit-content`
            * `i` → `initial`
    * `:Miw` → `min-width:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
        * Removed:
            * `fa` → `fill-available`
            * `fc` → `fit-content`
            * `i` → `initial`
    * `:Ol` → `outline:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `dt` → `dotted`
            * `db` → `double`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `m` → `medium`
            * `o` → `outset`
            * `r` → `ridge`
            * `s` → `solid`
            * `tc` → `thick`
            * `tn` → `thin`
            * `tr` → `transparent`
    * `:Olc` → `outline-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
    * `:Ols` → `outline-style:$_`
        * Removed:
            * `w` → `wave`
    * `:Ov` → `overflow:$_`
        * Added:
            * `c` → `clip`
    * `:Ovw` → `overflow-wrap:$_`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Ovx` → `overflow-x:$_`
        * Added:
            * `c` → `clip`
    * `:Ovy` → `overflow-y:$_`
        * Added:
            * `c` → `clip`
    * `:Pgba` → `page-break-after:$_`
        * Added:
            * `av` → `avoid`
            * `l` → `left`
            * `r` → `right`
        * Changed:
            * `au` became `a` → `auto`
    * `:Pgbb` → `page-break-before:$_`
        * Added:
            * `av` → `avoid`
            * `l` → `left`
            * `r` → `right`
        * Changed:
            * `au` became `a` → `auto`
    * `:Pgbi` → `page-break-inside:$_`
        * Changed:
            * `au` became `a` → `auto`
    * `:Prso` → `perspective-origin:$_`
        * Added:
            * `l` → `left`
            * `r` → `right`
    * `:Pe` → `pointer-events:$_`
        * Added:
            * `bb` → `bouding-box`
        * Removed:
            * `all` → `all` (no savings)
    * `:Rsz` → `resize:$_`
        * Added:
            * `bl` → `block`
            * `il` → `inline`
    * `:Stk` → `stroke:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Ta` → `text-align:$_`
        * Added:
            * `l` → `left`
            * `r` → `right`
    * `:Tal` → `text-align-last:$_`
        * Added:
            * `l` → `left`
            * `mp` → `match-parent`
            * `r` → `right`
        * Removed:
            * `a` → `auto`
    * `:Td` → `text-decoration:$_`
        * Added:
            * `cc` → `currentcolor`
            * `ds` → `dashed`
            * `dt` → `dotted`
            * `db` → `double`
            * `s` → `solid`
            * `tr` → `transparent`
            * `w` → `wavy`
        * Changed:
            * `l` became `lt` → `line-through`
    * `:Tdc` → `text-decoration-color:$_`
        * Changed:
            * `t` became `tr` → `transparent`
        * Removed:
            * `i` → `invert`
    * `:Tds` → `text-decoration-style:$_`
        * Added:
            * `w` → `wavy`
        * Removed:
            * `dtds` → `dot-dash`
            * `dtdtds` → `dot-dot-dash`
            * `g` → `groove`
            * `h` → `hidden`
            * `i` → `inset`
            * `n` → `none`
            * `o` → `outset`
            * `r` → `ridge`
            * `w` → `wave`
    * `:Te` → `text-emphasis:$_`
        * Added:
            * `cc` → `currentcolor`
            * `d` → `dot`
            * `dc` → `double-circle`
            * `f` → `filled`
            * `o` → `open`
            * `s` → `sesame`
            * `tr` → `transparent`
            * `t` → `triangle`
        * Removed:
            * `ac` → `accent`
            * `a` → `after`
            * `b` → `before`
            * `ds` → `disc`
            * `dt` → `dot`
    * `:Ti` → `text-indent:$_`
        * Added:
            * `el` → `each-line`
            * `h` → `hanging`
    * `:Tj` → `text-justify:$_`
        * Added:
            * `ic` → `inter-character`
            * `n` → `none`
        * Removed:
            * `d` → `distribute`
            * `ic` → `inter-cluster`
            * `ii` → `inter-ideograph`
            * `k` → `kashida`
            * `t` → `tibetan`
    * `:Tsh` → `text-shadow:$_`
        * Added:
            * `cc` → `currentcolor`
            * `tr` → `transparent`
    * `:Tt` → `text-transform:$_`
        * Added:
            * `fzk` → `full-size-kana`
            * `fw` → `full-width`
            * `ma` → `math-auto`
            * `mb` → `math-bold`
            * `mbf` → `math-bold-franktur`
            * `mbi` → `math-bold-italic`
            * `mbss` → `math-bold-sans-serif`
            * `mbs` → `math-bold-script`
            * `mds` → `math-double-struck`
            * `mf` → `math-fraktur`
            * `min` → `math-initial`
            * `mi` → `math-italic`
            * `ml` → `math-looped`
            * `mm` → `math-monospace`
            * `mss` → `math-sans-serif`
            * `mssbi` → `math-sans-serif-bold-italic`
            * `mssi` → `math-sans-serif-italic`
            * `ms` → `math-script`
            * `mst` → `math-stretched`
            * `mt` → `math-tailed`
    * `:Trf` → `transform:$_`
        * Added:
            * `n` → `none`
    * `:Trfo` → `transform-origin:$_`
        * Added:
            * `l` → `left`
            * `r` → `right`
    * `:Trs` → `transition:$_`
        * Added:
            * `cb` → `cubic-bezier(.1,.7,1,.1)`
            * `ea` → `ease`
            * `ei` → `ease-in`
            * `eio` → `ease-in-out`
            * `eo` → `ease-out`
            * `e` → `end`
            * `jb` → `jump-both`
            * `je` → `jump-end`
            * `jn` → `jump-none`
            * `js` → `jump-start`
            * `li` → `linear`
            * `n` → `none`
            * `s` → `start`
            * `se` → `step-end`
            * `ss` → `step-start`
    * `:Trsde` → `transition-delay:$,`
        * Removed:
            * `i` → `initial`
    * `:Trsp` → `transition-property:$_`
        * Added:
            * `n` → `none`
        * Removed:
            * `a` → `all`
    * `:Trstf` → `transition-timing-function:$_`
        * Added:
            * `cb` → `cubic-bezier(.1,.7,1,.1)`
            * `e` → `end`
            * `jb` → `jump-both`
            * `je` → `jump-end`
            * `jn` → `jump-none`
            * `js` → `jump-start`
            * `s` → `start`
        * Changed:
            * `e` became `ea` → `ease`
            * `l` became `li` → `linear`
    * `:Us` → `user-select:$_`
        * Added:
            * `a` → `auto`
            * `ct` → `contain`
        * Removed:
            * `a` → `all`
            * `el` → `element`
            * `els` → `elements`
            * `to` → `toggle`
    * `:Va` → `vertical-align:$_`
        * Removed:
            * `sub` → `sub`
            * `t` → `top`
    * `:Whs` → `white-space:$_`
        * Added:
            * `bs` → `break-spaces`
        * Changed:
            * `n` became `nr` → `normal`
    * `:W` → `width:$_`
        * Changed:
            * `maxc` became `mac` → `max-content`
            * `minc` became `mic` → `min-content`
        * Removed:
            * `av` → `available`
            * `bb` → `border-box`
            * `cb` → `content-box`
            * `fc` → `fit-content`
    * `:Wob` → `word-break:$_`
        * Added:
            * `bw` → `break-word`
        * Changed:
            * `n` became `nr` → `normal`
    * `:Wos` → `word-spacing:$_`
        * Added:
            * `nr` → `normal`
    * `:Wow` → `word-wrap:$_`
        * Changed:
            * `nm` became `nr` → `normal`
    * `:Wm` → `writing-mode:$_`
        * Added:
            * `htb` → `horizontal-tb`
            * `slr` → `sideways-lr`
            * `srl` → `sideways-rl`
            * `vlr` → `vertical-rl`
            * `vrl` → `vertical-rl`
        * Removed:
            * `btl` → `bt-lr`
            * `btr` → `bt-rl`
            * `lrb` → `lr-bt`
            * `lrt` → `lr-tb`
            * `rlb` → `rl-bt`
            * `rlt` → `rl-tb`
            * `tbl` → `tb-lr`
            * `tbr` → `tb-rl`
* Added new pseudo classes:
    * `:end` → `:$e`
    * `:start` → `:$s`
    * `:al` → `:any-link`
    * `:af` → `:autofill`
    * `:b` → `:blank`
    * `:cu` → `:current`
    * `:de` → `:defined`
    * `:ltr` → `:dir(ltr)`
    * `:rtl` → `:dir(rtl)`
    * `:fu` → `:future`
    * `:ho` → `:host`
    * `:lli` → `:local-link`
    * `:m` → `:modal`
    * `:p` → `:past`
    * `:pa` → `:paused`
    * `:pip` → `:picture-in-picture`
    * `:pl` → `:playing`
    * `:tw` → `:target-within`
    * `:ui` → `:user-invalid`
    * `:uv` → `:user-valid`
* Added new pseudo elements:
    * `::ba` → `::backdrop`
    * `::c` → `::cue`
    * `::cr` → `::cue-region`
    * `::fsb` → `::file-selector-button`
    * `::ge` → `::grammar-error`
    * `::m` → `::marker`
    * `::s` → `::selection`
    * `::se` → `::spelling-error`
    * `::tt` → `::target-text`
