declare module "cool-math-lib" {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export function subtract(a: number, b: number): number;

  export type MathMode = "scientific" | "basic";

  export const calculator: {
    mode: MathMode;
    setMode: (mode: MathMode) => void;
  };
}
