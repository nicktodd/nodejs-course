const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Memory leak storage - this will grow infinitely
let memoryLeak = [];
let requestCount = 0;
let blockedRequests = 0;

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'running', 
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        requestCount: requestCount
    });
});

// Endpoint that causes memory leaks
app.get('/api/memory-leak', (req, res) => {
    requestCount++;
    
    // Deliberately create memory leak - store large objects that never get cleaned up
    for (let i = 0; i < 1000; i++) {
        memoryLeak.push({
            data: 'x'.repeat(10000), // 10KB of data per object
            timestamp: new Date(),
            randomData: Math.random().toString(36).repeat(100),
            request: requestCount,
            iteration: i
        });
    }
    
    res.json({
        message: 'Memory leak endpoint hit',
        requestNumber: requestCount,
        memoryLeakSize: memoryLeak.length,
        memoryUsage: process.memoryUsage()
    });
});

// Endpoint that blocks the event loop
app.get('/api/blocking', (req, res) => {
    requestCount++;
    blockedRequests++;
    
    // Simulate heavy CPU-bound operation that blocks the event loop
    const start = Date.now();
    const duration = Math.random() * 2000 + 1000; // 1-3 seconds of blocking
    
    // Busy wait to block the event loop
    while (Date.now() - start < duration) {
        // Intentionally doing nothing but consuming CPU
        Math.random() * Math.random();
    }
    
    res.json({
        message: 'Blocking operation completed',
        requestNumber: requestCount,
        blockedFor: duration,
        totalBlockedRequests: blockedRequests
    });
});

// Endpoint that randomly fails
app.get('/api/random-fail', (req, res) => {
    requestCount++;
    
    const shouldFail = Math.random() < 0.3; // 30% chance of failure
    
    if (shouldFail) {
        const errorTypes = [
            { status: 500, message: 'Internal Server Error' },
            { status: 502, message: 'Bad Gateway' },
            { status: 503, message: 'Service Unavailable' },
            { status: 429, message: 'Too Many Requests' }
        ];
        
        const error = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        return res.status(error.status).json({
            error: error.message,
            requestNumber: requestCount,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({
        message: 'Success!',
        requestNumber: requestCount,
        timestamp: new Date().toISOString()
    });
});

// Endpoint that gets slower over time
app.get('/api/degrading', (req, res) => {
    requestCount++;
    
    // Response time increases with request count
    const delay = Math.min(requestCount * 10, 5000); // Max 5 second delay
    
    setTimeout(() => {
        res.json({
            message: 'Degrading performance endpoint',
            requestNumber: requestCount,
            delayMs: delay,
            timestamp: new Date().toISOString()
        });
    }, delay);
});

// Endpoint that simulates database connection issues
app.get('/api/db-connection', (req, res) => {
    requestCount++;
    
    // Simulate connection pool exhaustion after many requests
    if (requestCount > 50 && Math.random() < 0.5) {
        return res.status(503).json({
            error: 'Database connection pool exhausted',
            requestNumber: requestCount,
            activeConnections: 'MAX_REACHED'
        });
    }
    
    // Simulate slow database queries that get slower under load
    const queryTime = Math.min(requestCount * 20, 3000);
    
    setTimeout(() => {
        res.json({
            message: 'Database query completed',
            requestNumber: requestCount,
            queryTimeMs: queryTime,
            connectionStatus: 'OK'
        });
    }, queryTime);
});

// Simple working endpoint for comparison
app.get('/api/healthy', (req, res) => {
    requestCount++;
    res.json({
        message: 'This endpoint works fine',
        requestNumber: requestCount,
        timestamp: new Date().toISOString()
    });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
    res.json({
        message: 'Artillery Load Testing Demo API',
        version: '1.0.0',
        endpoints: {
            '/health': 'Health check and system stats',
            '/api/healthy': 'Working endpoint for comparison',
            '/api/memory-leak': 'Creates memory leaks (will crash eventually)',
            '/api/blocking': 'Blocks event loop with CPU-intensive operations',
            '/api/random-fail': 'Randomly fails 30% of requests',
            '/api/degrading': 'Gets slower with each request',
            '/api/db-connection': 'Simulates database connection issues'
        },
        usage: {
            'Start server': 'npm start',
            'Run light test': 'npm run test:light',
            'Run all tests': 'npm run test:all',
            'Automated testing': 'npm run test:automated'
        }
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Deliberately Failing API Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API docs: http://localhost:${PORT}/`);
    console.log(`This API is designed to fail under load for testing purposes!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Server shutting down gracefully...');
    process.exit(0);
});







