/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";


const TESTS = {
    parseInt: {
        description: "parseInt",
        funct(x) {
            return parseInt(x, 10);
        }
    },
    floor: {
        description: "floor",
        funct(x) {
            return Math.floor(x);
        }
    }
    ,
    or0: {
        description: "bitwise or 0",
        funct(x) {
            return x | 0;
        }
    },
    ASR: {
        description: ">>> 0",
        funct(x) {
            return x >>> 0;
        }
    },
    ceil: {
        description: "Math.ceil",
        funct(x) {
            return Math.ceil(x);
        }
    },
    round: {
        description: "Math.round",
        funct(x) {
            return Math.round(x);
        }
    },
    trunc: {
        description: "Math.trunc",
        funct(x) {
            return Math.trunc(x);
        }
    },
    doubleNot: {
        description: "Double Bitwise NOT (~~)",
        funct(x) {
            return ~~x;
        }
    },
    subMod: {
        description: "Subtract Modulus",
        funct(x) {
            return x - (x % 1);
        }
    },
    multiplyFloor: {
        description: "Multiply by Sign and Floor",
        funct(x) {
            return Math.floor(Math.abs(x)) * Math.sign(x);
        }
    },
    exponentialBitwise: {
        description: "Exponential and Bitwise",
        funct(x) {
            return (x * 1e9 | 0) / 1e9;
        }
    }
};


const ICST = {
    VERSION: "0.1.0",
    init() {
        console.clear();
        console.info(`Integer conversion speed test v${ICST.VERSION} started.`);
        $("#version").html(ICST.VERSION);
        $("#navigator").html(navigator.userAgent);
        $("#start_test").click(ICST.runTest);
    },
    runTest() {
        const Iterations = parseInt($("#iterations")[0].value, 10);
        const $results = $("#results");
        $("#results").html("");

        for (let testName in TESTS) {
            $results.append(`<h2>${testName} - ${Iterations} Iterations</h2>`);
            const test = TESTS[testName];
            $results.append(`<code>${test.funct.toString()}</code>`);

            console.assert(test.funct(Math.PI) === 3, "Function does not work correctly!")

            const start = performance.now();

            for (let i = 0; i < Iterations; i++) {
                let _ = test.funct(Math.PI);
            }

            const taken = performance.now() - start;
            const perIter = taken / Iterations;
            $results.append(`<p>${taken}ms for ${Iterations} iterations, ${perIter} per iteration, ${parseInt(1 / perIter / 1000, 10)} iterations per microsecond</p>`);
            $results.append("<hr>");
        }
    }
};

ICST.init();