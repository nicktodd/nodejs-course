# Artillery Load Testing Demo

A comprehensive demonstration of Artillery load testing with a deliberately failing API. This project showcases how APIs can fail under load and demonstrates various automation strategies for performance testing.

## Project Overview

This demo includes:
- **Failing API**: Express.js server with endpoints designed to fail under load
- **Artillery Tests**: Multiple test configurations for different load scenarios  
- **Automation Scripts**: Various ways to automate and monitor load testing
- **Reporting**: Automated HTML and JSON report generation

## Project Structure

```
artillery/
├── server.js              # Deliberately failing API server
├── package.json           # Dependencies and npm scripts
├── tests/                 # Artillery test configurations
│   ├── light-load.yml     # 5 requests/sec for 30s
│   ├── medium-load.yml    # 10-20 requests/sec for 90s
│   └── heavy-load.yml     # 20-100 requests/sec for 240s
├── scripts/               # Automation scripts
│   ├── automated-test.js  # Node.js automation script
│   ├── run-tests.sh       # Bash automation script (Linux/Mac)
│   └── run-tests.bat      # Batch automation script (Windows)
└── reports/               # Generated test reports (created automatically)
```

## Quick Start

### 1. Install Dependencies

```bash
cd demos/artillery
npm install
```

### 2. Install Artillery Globally

```bash
npm install -g artillery@latest
# or
npm run install-artillery
```

### 3. Start the Failing API

```bash
npm start
```

The server will start on `http://localhost:3000` with these endpoints:

- `GET /health` - Health check and system stats
- `GET /api/healthy` - Working endpoint for comparison
- `GET /api/memory-leak` - Creates memory leaks (will crash eventually)
- `GET /api/blocking` - Blocks event loop with CPU operations
- `GET /api/random-fail` - Randomly fails 30% of requests
- `GET /api/degrading` - Gets slower with each request
- `GET /api/db-connection` - Simulates database connection issues

### 4. Run Tests

**Single Test:**
```bash
npm run test:light    # Light load test
npm run test:medium   # Medium load test  
npm run test:heavy    # Heavy load test (will cause failures!)
```

**All Tests:**
```bash
npm run test:all      # Run all tests sequentially
```

**Automated Testing:**
```bash
npm run test:automated    # Run automated test suite with reporting
```

## API Failure Mechanisms

The demo API includes several deliberate failure modes:

### 1. Memory Leaks (`/api/memory-leak`)
- Stores large objects in memory that are never garbage collected
- Each request adds ~10MB of leaked memory
- Eventually causes out-of-memory crashes

### 2. Event Loop Blocking (`/api/blocking`)  
- Performs CPU-intensive synchronous operations
- Blocks the event loop for 1-3 seconds per request
- Causes request queuing and timeouts under load

### 3. Random Failures (`/api/random-fail`)
- 30% chance of returning HTTP 500, 502, 503, or 429 errors
- Simulates unreliable external dependencies
- Tests error handling and retry logic

### 4. Performance Degradation (`/api/degrading`)
- Response time increases with each request (10ms per request)
- Simulates resource exhaustion scenarios
- Maxes out at 5-second response times

### 5. Connection Pool Exhaustion (`/api/db-connection`)
- Simulates database connection pool limits
- Fails with 503 errors after 50 requests
- Response times increase under load

## Artillery Test Configurations

### Light Load Test (`light-load.yml`)
- **Duration:** 30 seconds
- **Rate:** 5 requests/second
- **Purpose:** Baseline functionality testing
- **Expected:** Should pass with minimal issues

### Medium Load Test (`medium-load.yml`) 
- **Duration:** 90 seconds (60s ramp + 30s sustained)
- **Rate:** 10-20 requests/second
- **Purpose:** Moderate stress testing
- **Expected:** Some failures, noticeable performance degradation

### Heavy Load Test (`heavy-load.yml`)
- **Duration:** 240 seconds with increasing load
- **Rate:** 20-100 requests/second  
- **Purpose:** Maximum stress testing
- **Expected:** Significant failures, potential server crash

## Automation Examples

### 1. npm Scripts Automation

The `package.json` includes several automation scripts:

```bash
# Single tests
npm run test:light
npm run test:medium  
npm run test:heavy

# Sequential testing
npm run test:all

# Full automation with reporting
npm run test:automated

# Generate reports
npm run test:with-reports
```

### 2. Node.js Automation Script

Run the advanced automation script:

```bash
node scripts/automated-test.js           # Run all tests
node scripts/automated-test.js light-load # Run specific test
```

Features:
- Automatic report generation
- Error handling and recovery
- JSON and HTML output
- Test result summaries
- Configurable delays between tests

### 3. Shell Script Automation (Linux/Mac)

```bash
chmod +x scripts/run-tests.sh

# Interactive mode
./scripts/run-tests.sh

# Command line mode  
./scripts/run-tests.sh light-load      # Single test
./scripts/run-tests.sh suite           # Full suite
./scripts/run-tests.sh monitor         # Continuous monitoring
./scripts/run-tests.sh regression      # Regression testing
```

### 4. Batch Script Automation (Windows)

```cmd
# Interactive mode
scripts\run-tests.bat

# Command line mode
scripts\run-tests.bat light-load       # Single test
scripts\run-tests.bat suite            # Full suite
```

## Advanced Automation Patterns

### Continuous Integration Integration

Add to your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Load Tests
  run: |
    npm start &
    sleep 5
    npm run test:automated
    pkill node
```

### Monitoring and Alerting

```bash
# Continuous monitoring every 30 seconds
./scripts/run-tests.sh monitor
```

### Performance Regression Detection

```bash
# Compare performance over time
./scripts/run-tests.sh regression
```

### Custom Automation Examples

**Scheduled Testing:**
```bash
# Run tests every hour
0 * * * * cd /path/to/artillery && npm run test:automated
```

**Slack Integration:**
```bash
# Send results to Slack
npm run test:automated && curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Load tests completed successfully"}' \
    YOUR_SLACK_WEBHOOK_URL
```

## Understanding Results

### Key Metrics to Monitor

1. **Response Times:**
   - `http.response_time.min/max/mean` - Response time statistics
   - `http.response_time.p95/p99` - Percentile response times

2. **Request Success:**
   - `http.requests` - Total requests sent
   - `http.responses` - Total responses received
   - `http.codes.200/500/etc` - Response code breakdown

3. **Errors:**
   - `errors.*` - Error counts by type
   - `http.request_rate` - Requests per second achieved

### Typical Failure Patterns

**Memory Leak Endpoint:**
- Response times increase over time
- Eventually stops responding (OOM crash)

**Blocking Endpoint:**
- High response times (1-3+ seconds)
- Low throughput under load

**Random Fail Endpoint:**
- ~30% error rate
- Mix of 500, 502, 503, 429 responses

## Customization

### Adding New Test Scenarios

Create new YAML files in `tests/`:

```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Custom test scenario"
    flow:
      - get:
          url: "/api/your-endpoint"
```

### Adding New Failure Modes

Extend `server.js` with additional failing endpoints:

```javascript
app.get('/api/new-failure', (req, res) => {
    // Your failure simulation here
});
```

### Custom Automation

Extend `scripts/automated-test.js` or create new automation scripts using the provided patterns.

## 🎓 Learning Objectives

This demo teaches:

1. **Load Testing Fundamentals:**
   - How to configure Artillery tests
   - Understanding load testing metrics
   - Interpreting test results

2. **API Failure Modes:**
   - Common ways APIs fail under load
   - Performance degradation patterns
   - Error handling strategies

3. **Test Automation:**
   - npm script automation
   - Shell script automation
   - Node.js automation patterns
   - CI/CD integration approaches

4. **Monitoring and Reporting:**
   - Automated report generation
   - Continuous monitoring strategies
   - Performance regression detection

## Important Notes

- **Server Crashes:** The heavy load test is designed to crash the server - this is intentional!
- **Resource Usage:** Tests will consume CPU and memory - monitor your system
- **Network Impact:** Tests generate significant network traffic
- **Production Warning:** Never run these tests against production systems

## Additional Resources

- [Artillery Documentation](https://artillery.io/docs/)
- [Node.js Performance Best Practices](https://nodejs.org/en/docs/guides/simple-profiling/)
- [Express.js Performance Tips](https://expressjs.com/en/advanced/best-practice-performance.html)

## Contributing

Feel free to extend this demo with:
- Additional failure modes
- More sophisticated automation scripts  
- Integration with monitoring tools
- Custom reporting formats

---
