const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutomatedTesting {
    constructor() {
        this.reportsDir = path.join(__dirname, '..', 'reports');
        this.testsDir = path.join(__dirname, '..', 'tests');
        this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Ensure reports directory exists
        if (!fs.existsSync(this.reportsDir)) {
            fs.mkdirSync(this.reportsDir, { recursive: true });
        }
    }

    async runTest(testFile, testName) {
        return new Promise((resolve, reject) => {
            console.log(`\nStarting ${testName}...`);
            console.log(`Test file: ${testFile}`);
            console.log('-'.repeat(60));

            const outputFile = path.join(this.reportsDir, `${testName}-${this.timestamp}.json`);
            const reportFile = path.join(this.reportsDir, `${testName}-${this.timestamp}.html`);

            // Run artillery with output to JSON
            const artilleryProcess = spawn('artillery', [
                'run',
                path.join(this.testsDir, testFile),
                '--output',
                outputFile
            ], {
                stdio: 'inherit',
                shell: true
            });

            artilleryProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(`${testName} completed successfully`);
                    
                    // Generate HTML report
                    const reportProcess = spawn('artillery', [
                        'report',
                        outputFile,
                        '--output',
                        reportFile
                    ], {
                        stdio: 'inherit',
                        shell: true
                    });

                    reportProcess.on('close', (reportCode) => {
                        if (reportCode === 0) {
                            console.log(`Report generated: ${reportFile}`);
                        }
                        resolve({ success: true, outputFile, reportFile });
                    });

                    reportProcess.on('error', (error) => {
                        console.log(`Report generation failed: ${error.message}`);
                        resolve({ success: true, outputFile, reportFile: null });
                    });
                } else {
                    console.log(`${testName} failed with exit code ${code}`);
                    resolve({ success: false, code });
                }
            });

            artilleryProcess.on('error', (error) => {
                console.error(`Failed to start ${testName}: ${error.message}`);
                reject(error);
            });
        });
    }

    async runAllTests() {
        const tests = [
            { file: 'light-load.yml', name: 'light-load' },
            { file: 'medium-load.yml', name: 'medium-load' },
            { file: 'heavy-load.yml', name: 'heavy-load' }
        ];

        console.log('Artillery Automated Testing Suite');
        console.log('='.repeat(60));
        console.log(`Started at: ${new Date().toISOString()}`);
        console.log(`Reports will be saved to: ${this.reportsDir}`);

        const results = [];

        for (const test of tests) {
            try {
                const result = await this.runTest(test.file, test.name);
                results.push({ ...test, ...result });
                
                // Wait between tests to let the server recover
                if (test !== tests[tests.length - 1]) {
                    console.log('\nWaiting 10 seconds before next test...');
                    await this.sleep(10000);
                }
            } catch (error) {
                console.error(`Error running ${test.name}:`, error.message);
                results.push({ ...test, success: false, error: error.message });
            }
        }

        this.generateSummaryReport(results);
        return results;
    }

    generateSummaryReport(results) {
        console.log('\nTEST SUMMARY');
        console.log('='.repeat(60));
        
        results.forEach(result => {
            const status = result.success ? 'PASSED' : 'FAILED';
            console.log(`${status} ${result.name}`);
            if (result.outputFile) {
                console.log(`   Results: ${result.outputFile}`);
            }
            if (result.reportFile) {
                console.log(`   Report: ${result.reportFile}`);
            }
        });

        const passed = results.filter(r => r.success).length;
        const total = results.length;
        
        console.log('-'.repeat(60));
        console.log(`Overall: ${passed}/${total} tests completed successfully`);
        console.log(`Finished at: ${new Date().toISOString()}`);
        
        // Generate summary JSON
        const summaryFile = path.join(this.reportsDir, `test-summary-${this.timestamp}.json`);
        fs.writeFileSync(summaryFile, JSON.stringify({
            timestamp: this.timestamp,
            summary: { passed, total, success_rate: (passed / total) * 100 },
            results
        }, null, 2));
        
        console.log(`Summary saved to: ${summaryFile}`);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// CLI execution
if (require.main === module) {
    const tester = new AutomatedTesting();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Run all tests
        tester.runAllTests().then(() => {
            console.log('\nAll tests complete!');
            process.exit(0);
        }).catch(error => {
            console.error('Testing suite failed:', error);
            process.exit(1);
        });
    } else {
        // Run specific test
        const testName = args[0];
        const testFile = `${testName}.yml`;
        
        tester.runTest(testFile, testName).then(result => {
            if (result.success) {
                console.log(`\n${testName} test complete!`);
                process.exit(0);
            } else {
                console.log(`\n${testName} test failed!`);
                process.exit(1);
            }
        }).catch(error => {
            console.error(`${testName} test failed:`, error);
            process.exit(1);
        });
    }
}

module.exports = AutomatedTesting;