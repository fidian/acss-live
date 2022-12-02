/* global document, m, window */

"use strict";

class Controls {
    constructor() {
        this.reloadNumber = 100;
        this.reloadMax = 100;
        this.mode = "CONFIG";
        this.timerTotals = [];
        window.addEventListener("message", (e) => this.onMessage(e), false);
    }

    onMessage(event) {
        if (this.mode !== "RUNNING") {
            return;
        }

        this.timerTotals.push(event.data.timerTotals);

        if (this.reloadNumber < this.reloadMax) {
            this.reloadNumber += 1;
            this.reloadIframe();
        } else {
            this.mode = "STATS";
        }

        m.redraw();
    }

    reloadIframe() {
        const iframe = document.getElementsByTagName("iframe")[0];
        const src = iframe.src;
        iframe.src = null;
        iframe.src = src;
    }

    start() {
        this.reloadNumber = 1;
        this.timerTotals = [];
        this.mode = "RUNNING";
        this.reloadIframe();
    }

    view() {
        switch (this.mode) {
            case "STATS":
                return this.viewStats();

            case "RUNNING":
                return this.viewRunning();

            default:
                return this.viewConfig();
        }
    }

    viewConfig() {
        return [
            m("h1", "Timings and Performance"),
            m("p", [
                "Test ACSS-Live performance by repeatedly reloading the demo page ",
                m("input", {
                    type: "number",
                    value: this.reloadMax,
                    class: "W(3em)",
                    onblur: (e) => {
                        const v = e.target.value;
                        const vNum = Math.max(Math.floor(+v || 1), 1);
                        this.reloadMax = vNum;
                    }
                }),
                this.reloadCount === 1 ? " time. " : " times. This will run ",
                m(
                    "span",
                    {
                        class: "Fs(i)"
                    },
                    "much slower"
                ),
                " when dev tools are loaded. Make sure you have your dev tools closed and reload the page if you want the most speed. ",
                m(
                    "button",
                    {
                        onclick: () => this.start()
                    },
                    "Start"
                )
            ])
        ];
    }

    viewRunning() {
        return [
            m("h1", "RUNNING"),
            m("p", `Running ${this.reloadNumber} out of ${this.reloadMax}.`)
        ];
    }

    viewStats() {
        const keys = [];

        for (const v of this.timerTotals) {
            for (const k of Object.keys(v)) {
                if (!keys.includes(k)) {
                    keys.push(k);
                    keys.sort();
                }
            }
        }

        return [
            m("h1", `${this.reloadMax} Reloads Completed`),
            m("table", [
                m(
                    "tr",
                    {
                        class: "C(white) Bgc(black)"
                    },
                    [m("th", "Name"), m("th", "Per Load"), m("th", "Per Call")]
                ),
                ...keys.map((key) => this.viewTimerTotal(key))
            ])
        ];
    }

    viewTimerTotal(key) {
        return m("tr", [
            m("th", { class: "Va(t)" }, key),
            m("td", this.viewTimerTotalStats(key, true)),
            m("td", this.viewTimerTotalStats(key, false))
        ]);
    }

    getTimes(key, perLoad) {
        const resultsPerLoad = this.timerTotals.map((obj) => obj[key] || []);

        if (perLoad) {
            return resultsPerLoad.map((list) =>
                list.reduce((acc, next) => acc + next, 0)
            );
        }

        return resultsPerLoad.reduce((acc, next) => [...acc, ...next], []);
    }

    ms(n) {
        return `${Math.round(n * 1000) / 1000}ms`;
    }

    viewTimerTotalStats(key, perLoad) {
        const times = this.getTimes(key, perLoad);
        const sum = times.reduce((acc, next) => acc + next, 0);
        const mean = sum / times.length;
        const deviancesSquared = times.map((x) => Math.pow(x - mean, 2));
        const deviancesSquaredSum = deviancesSquared.reduce(
            (acc, next) => acc + next,
            0
        );
        const stdDev = deviancesSquaredSum / times.length;
        const min = Math.min(...times);
        const max = Math.max(...times);

        return [
            m(
                "span",
                {
                    class: "Fw(b)"
                },
                `${times.length} @ ${this.ms(mean)} ± ${this.ms(stdDev)}`
            ),
            m("br"),
            m(
                "table",
                Object.entries({
                    Count: times.length,
                    Total: this.ms(sum),
                    Mean: this.ms(mean),
                    StdDev: this.ms(stdDev),
                    Min: this.ms(min),
                    Max: this.ms(max)
                }).map((entry) =>
                    m("tr", [m("td", entry[0]), m("td", entry[1])])
                )
            )
        ];
    }
}

window.addEventListener("load", () => {
    const root = document.getElementsByClassName("controls")[0];
    m.mount(root, Controls);
});
