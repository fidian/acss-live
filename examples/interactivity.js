/*
         * <button onclick="addContent()">Add more content</button>
        <div id="interactiveTarget"></div>
// Optional configuration for acss-live
function addContent() {
    const e = document.getElementById('target');
    const p = document.createElement("p");
    p.classList.add('Fw(b)');
    p.classList.add('C(green)');
    const t = document.createTextNode("Additional content - " + new Date().toString());
    p.appendChild(t);
    e.appendChild(p);
}
*/

/* global document, m, window */
"use strict";

class Interactivity {
    constructor() {
        this.buttons = [
            {
                label: "Add current date",
                callback: () => {
                    console.log("asdf");
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
            }
        ];
        this.additions = [];
    }

    add(content) {
        const classBase = "Trsdu(0.3s) Trstf(eio) Trsp(a)";
        const data = {
            obj: {
                class: `${classBase} Op(0)`
            },
            content
        };
        this.additions.push(data);
        setTimeout(() => {
            data.obj = {
                class: classBase
            };
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
            this.additions.map((item) => m("p", item.obj, item.content))
        ];
    }
}

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
