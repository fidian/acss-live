/* global document, m, window */
"use strict";

class Interactivity {
    constructor() {
        this.buttons = [
            {
                label: "Add current date",
                callback: () => {
                    this.add(m("tt", new Date().toString()));
                }
            },
            {
                label: "Add rainbow",
                callback: () => {
                    this.add(
                        m("span", { class: "Fw(b) Fz(9em) Bgc(black)" }, [
                            m("span", { class: "C(red)" }, "R"),
                            m("span", { class: "C(orange)" }, "A"),
                            m("span", { class: "C(yellow)" }, "I"),
                            m("span", { class: "C(green)" }, "N"),
                            m("span", { class: "C(blue)" }, "B"),
                            m("span", { class: "C(indigo)" }, "O"),
                            m("span", { class: "C(violet)" }, "W")
                        ])
                    );
                }
            },
            {
                label: "Explain: This was loaded after?",
                callback: () => {
                    this.add([
                        m(
                            "span",
                            { class: "Fw(b) Fz(1.2em)" },
                            "How was this loaded?"
                        ),
                        m("br"),
                        [
                            "When the document loaded in the browser, the ",
                            m("tt", "load"),
                            " event was fired, which loaded ",
                            m(
                                "a",
                                {
                                    href: "https://mithril.js.org/"
                                },
                                "Mithril.js"
                            ),
                            " via a ",
                            m("tt", "<script>"),
                            " tag. After that loaded, Mithril's was told to render a component into a blank element added to the bottom of the document. ",
                            m("br"),
                            m(
                                "span",
                                {
                                    class: "C(white) Fz(2em) Tsh(outlineShadow)"
                                },
                                "Presto!"
                            )
                        ]
                    ]);
                }
            }
        ];
        this.additions = [];
    }

    add(content) {
        const classBase = "Trsdu(0.2s) Trstf(eo) Trsp(a)";
        const data = {
            class: `${classBase} Op(0)`,
            content
        };
        this.additions.push(data);
        setTimeout(() => {
            data.class = classBase;
            m.redraw();
        }, 100);
    }

    view() {
        return [
            m("p", [
                "This paragram of content was added ",
                m("span", { class: "Fs(i) Fw(b)" }, "after"),
                " the page was loaded. You can press buttons to perform additional changes on this pagel"
            ]),
            m(
                "p",
                this.buttons.map((b) =>
                    m(
                        "button",
                        {
                            onclick: b.callback
                        },
                        b.label
                    )
                )
            ),
            this.additions.map((item) =>
                m("p", { class: item.class }, item.content)
            )
        ];
    }
}

if (!window.acssLiveConfig) {
    window.acssLiveConfig = {};
}

if (!window.acssLiveConfig.values) {
    window.acssLiveConfig.values = {};
}

// Necessary because the example pages don't define this value.
window.acssLiveConfig.values.outlineShadow = "-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 0 #000, -1px -1px 0 #000";

window.addEventListener("load", () => {
    const interactivityDiv = document.createElement("div");
    document.body.appendChild(interactivityDiv);

    const mithrilScript = document.createElement("script");
    mithrilScript.src = "https://unpkg.com/mithril@2.2.2/mithril.js";
    mithrilScript.addEventListener("load", () => {
        m.mount(interactivityDiv, Interactivity);
    });
    document.head.appendChild(mithrilScript);
});
