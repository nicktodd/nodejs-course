# Playwright Debugging & Troubleshooting Lab

This lab will help you master debugging and troubleshooting API tests using Playwright and VS Code. You can use any previous Playwright lab tests as your starting point—no extra files required.


## Warm-Up: Why Debugging Matters
- **Exercise:** Run a failing API test with only a vague error message (e.g., comment out a required field or use an incorrect endpoint in a test).
- **How:**
	1. Open any Playwright test file from a previous lab.
	2. Intentionally break a test (e.g., change an endpoint or expected value).
	3. Run `npm test` and observe the error message.
- **Discussion:** What extra information (logs, stack trace, request/response details) would help you diagnose the issue?
- **Goal:** Understand the importance of good logging and debugging.

## Using Playwright’s Debugging Tools


### Exercise 1: Debug Mode
- **How to Run in Debug Mode:**
	1. Open your terminal in the lab folder.
	2. Run `npx playwright test --debug`.
	3. Playwright will launch an interactive UI. Tests will pause before each step.
	4. Use the UI controls to step through each test action (Step, Resume, Pause, etc.).
	5. Watch the request/response details and see exactly where the failure occurs.
- **Tip:** You can hover over variables and see their values at each step.
- **Goal:** Practice pausing and investigating API calls in debug mode.


### Exercise 2: Breakpoints
- **How to Add a Breakpoint:**
	1. Open your test file in VS Code.
	2. Add a line with `debugger;` inside an async test function (e.g., just before an API call or assertion).
	3. Alternatively, click to the left of a line number in VS Code to set a breakpoint.
	4. Run your test in debug mode (`npx playwright test --debug`) or attach the VS Code debugger (see next exercise).
	5. When execution hits the breakpoint, the test will pause and you can inspect variables, call stack, and request/response objects.
- **Goal:** Learn to pause tests and inspect runtime state.

## Debugging API Tests in VS Code


### Exercise 3: Attaching Debugger
- **How to Configure VS Code Debugger:**
	1. In VS Code, go to the Run & Debug panel (Ctrl+Shift+D).
	2. Click "create a launch.json file" if you don't have one.
	3. Add this configuration for Playwright:
		 ```json
		 {
			 "type": "node",
			 "request": "launch",
			 "name": "Debug Playwright Test",
			 "program": "${workspaceFolder}/node_modules/.bin/playwright",
			 "args": ["test", "lab.spec.ts"],
			 "console": "integratedTerminal"
		 }
		 ```
	4. Set breakpoints in your test file.
	5. Click the green "Start Debugging" button.
	6. The test will run and pause at your breakpoints, allowing you to inspect variables and step through code.


### Exercise 4: Live Edit
- **How to Live Edit and Debug:**
	1. In your test, intentionally introduce a bug (e.g., send `{ texxt: "hello" }` instead of `{ text: "hello" }`).
	2. Run the test in debug mode or with the VS Code debugger attached.
	3. When the test fails, edit the code to fix the bug.
	4. Re-run the test (you do not need to restart the server or debugger).
- **Goal:** Practice quick edit-and-debug cycles in VS Code.

## Playwright Trace Viewer


### Exercise 5: Capture and Inspect Traces
- **How to Enable and Use Trace Viewer:**
	1. In `playwright.config.ts`, set `trace: 'on-first-retry'` in the `use` section.
	2. Run a test that fails: `npm test`.
	3. After the test run, Playwright will save a trace file (e.g., `playwright-report/trace.zip`).
	4. Open the trace viewer: `npx playwright show-trace playwright-report/trace.zip`.
	5. Inspect each step, including request/response details, timing, and screenshots.


### Exercise 6: Replay Execution
- **How to Replay in Trace Viewer:**
	1. Open the trace file as above.
	2. Use the Trace Viewer UI to step through each test action.
	3. Review the timeline, network requests, and console logs for each step.
- **Goal:** Use traces for timing and deep inspection.

## Verbose Logging in Playwright


### Exercise 7: Enable Verbose Logs
- **How to Enable Verbose Logging:**
	1. In your terminal, run `DEBUG=pw:api npx playwright test` (Linux/macOS) or `$env:DEBUG='pw:api'; npx playwright test` (Windows PowerShell).
	2. Alternatively, run `npx playwright test --verbose`.
	3. Compare the output to a normal test run—note the extra details about API calls and responses.


### Exercise 8: Log Requests/Responses
- **How to Log Requests/Responses:**
	1. In your test, add `console.log(await response.json())` after each API call.
	2. Run your test: `npm test > api-test.log` to save output to a file.
	3. Review the log file for request/response details.
- **Goal:** Understand different levels of logging detail.

## Custom Logging Strategies


### Exercise 9: Structured Logging
- **How to Add Structured Logs:**
	1. Use `console.log(JSON.stringify({ request, response }))` in your test.
	2. Save logs to a file: `npm test > structured.log`.
	3. Use a tool like `jq` to parse and review logs: `jq . structured.log`.
- **Goal:** Learn structured, machine-readable logs for CI/CD pipelines.

## Monitoring API Test Execution


### Exercise 10: Simulate CI Logs
- **How to Simulate CI Logging:**
	1. Run your tests: `npm test > ci-output.log`.
	2. Open the log file and review the output format.
	3. Discuss how these logs would be used in CI tools like GitHub Actions or Jenkins (e.g., for test summary, error reporting).


### Exercise 11: Add Alerts
- **How to Mock Alerts:**
	1. After a test run, check the number of failed tests in the output.
	2. If more than 20% failed, print a message: `console.log('ALERT: More than 20% of API tests failed!')`.
	3. Discuss how this could be integrated with a real dashboard or monitoring tool.
- **Goal:** Connect debugging to real-world monitoring workflows.

---

**Tip:** Use any previous Playwright lab test files for these exercises. No additional files are required unless you want to create your own failing tests for practice.
