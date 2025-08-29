"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cool_math_lib_1 = require("cool-math-lib");
console.log((0, cool_math_lib_1.add)(2, 3)); // typed as number
cool_math_lib_1.calculator.setMode("scientific"); // only accepts "scientific" | "basic"
console.log(cool_math_lib_1.calculator.mode);
