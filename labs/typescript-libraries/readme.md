# Lab 1 – Library Selection and Evaluation

### Goal  
Compare two libraries that solve a similar problem and decide which one to adopt based on **TypeScript support** and ecosystem health.  

### Instructions  
1. Compare **Day.js** and **Luxon** — two date/time libraries.  
2. Run the following commands to gather information:  
   ```bash
   npm info dayjs
   npm info luxon
   npm info @types/dayjs
   npm info @types/luxon
   ```  

You may also wish to review the documentation located here:

- [Day.js Documentation](https://day.js.org/docs/en/installation/installation)
- [Luxon Documentation](https://moment.github.io/luxon/#/)


3. Answer these questions:  
   - Does the library ship with built-in TypeScript definitions?  
   - If not, are types available via DefinitelyTyped (`@types/...`)?  
   - How active is the library (latest release date, open issues)?  
   - What are the weekly npm download numbers?  
   - Which license is used?  
4. Write a **short summary (4–5 sentences)** recommending which library you would choose for a new TypeScript project and why.  

---

# Lab 2 – Typing in the Wild (Custom Declaration File)

### Goal  
Use a library **without built-in TypeScript types**, and add your own `.d.ts` declaration file so that TypeScript can provide autocomplete and type safety.  

### Instructions  
1. Install the **nanoid** library, which has no bundled TypeScript types:  
   ```bash
   npm install nanoid
   ```  

2. Try using it in a TypeScript file (`index.ts`):  
    ```ts
    import { nanoid } from "nanoid";

    const id = nanoid();
    console.log("Generated ID:", id);
    ```  
   When you open or run this file, **TypeScript will show an error similar to:**

   ```
   Cannot find module 'nanoid' or its corresponding type declarations.
   ```

   This happens because the `nanoid` library does **not** include built-in TypeScript type definitions, and there is no `@types/nanoid` package available. TypeScript cannot provide type checking or autocomplete for this library until you add a custom declaration file. We will fix this later.

3. Set up your project to run TypeScript files directly:
    - Install the required tools:
       ```bash
       npm install ts-node typescript --save-dev
       ```
    - Add `"type": "module"` to your `package.json` to avoid ES module warnings:
       ```json
       {
          "type": "module",
          // ...other package.json fields...
       }
       ```
    - Now you can run your TypeScript file using:
       ```bash
       npx ts-node index.ts
       ```

Note that the code still runs OK. There are no Typescript types, but it can still run the JavaScript.

4. Create a file `nanoid.d.ts` in your project root with this minimal declaration:  
    ```ts
    declare module "nanoid" {
       export function nanoid(size?: number): string;
    }
    ```  
    - Re-run the command or check in VS Code. You should now get **no errors** and autocomplete should show the optional `size` argument.

5. Modify your `index.ts` to use the type information:  
   ```ts
   import { nanoid } from "nanoid";

   const id: string = nanoid(12); // 12-character ID
   console.log("Generated ID:", id);
   ```  

