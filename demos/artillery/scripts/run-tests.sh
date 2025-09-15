#!/bin/bash

# Artillery Load Testing Automation Script
# This script demonstrates different ways to automate Artillery testing

set -e  # Exit on any error

echo "Artillery Load Testing Automation Demo"
echo "=========================================="

# Configuration
API_URL="http://localhost:3000"
REPORTS_DIR="./reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if server is running
check_server() {
    echo -e "${BLUE}Checking if API server is running...${NC}"
    if curl -s "$API_URL/health" > /dev/null; then
        echo -e "${GREEN}Server is running${NC}"
        return 0
    else
        echo -e "${RED}Server is not running${NC}"
        echo -e "${YELLOW}Start the server with: npm start${NC}"
        return 1
    fi
}

# Function to run a single test with reporting
run_test_with_report() {
    local test_name=$1
    local test_file="tests/${test_name}.yml"
    local output_file="${REPORTS_DIR}/${test_name}_${TIMESTAMP}.json"
    local report_file="${REPORTS_DIR}/${test_name}_${TIMESTAMP}.html"
    
    echo -e "${BLUE}Running ${test_name} test...${NC}"
    
    # Run Artillery test with JSON output
    if artillery run "$test_file" --output "$output_file"; then
        echo -e "${GREEN}${test_name} test completed${NC}"
        
        # Generate HTML report
        if artillery report "$output_file" --output "$report_file"; then
            echo -e "${GREEN}Report generated: ${report_file}${NC}"
        else
            echo -e "${YELLOW}Failed to generate HTML report${NC}"
        fi
        
        return 0
    else
        echo -e "${RED}${test_name} test failed${NC}"
        return 1
    fi
}

# Function to run continuous monitoring
run_continuous_monitoring() {
    echo -e "${BLUE}Starting continuous monitoring (Ctrl+C to stop)...${NC}"
    
    local counter=1
    while true; do
        echo -e "${YELLOW}Running monitoring cycle ${counter}...${NC}"
        
        # Run light load test for monitoring
        local monitor_output="${REPORTS_DIR}/monitor_${counter}_${TIMESTAMP}.json"
        
        if artillery run tests/light-load.yml --output "$monitor_output"; then
            echo -e "${GREEN}Monitoring cycle ${counter} completed${NC}"
            
            # Extract key metrics (simplified - in real scenario you'd parse JSON properly)
            echo -e "${BLUE}Quick metrics from cycle ${counter}:${NC}"
            if command -v jq > /dev/null; then
                jq '.aggregate | {scenarios: .scenariosCompleted, requests: .requestsCompleted, errors: .errors}' "$monitor_output" 2>/dev/null || echo "   Raw output saved to $monitor_output"
            else
                echo "   Raw output saved to $monitor_output"
            fi
        else
            echo -e "${RED}Monitoring cycle ${counter} failed${NC}"
        fi
        
        counter=$((counter + 1))
        sleep 30  # Wait 30 seconds between monitoring cycles
    done
}

# Function to run load test suite with different intensities
run_graduated_load_test() {
    echo -e "${BLUE}Running graduated load test suite...${NC}"
    
    local tests=("light-load" "medium-load" "heavy-load")
    local failed_tests=()
    
    for test in "${tests[@]}"; do
        echo -e "${YELLOW}Waiting 15 seconds before ${test} test...${NC}"
        sleep 15
        
        if run_test_with_report "$test"; then
            echo -e "${GREEN}${test} completed successfully${NC}"
        else
            echo -e "${RED}${test} failed${NC}"
            failed_tests+=("$test")
        fi
    done
    
    # Summary
    echo -e "${BLUE}Load Test Suite Summary:${NC}"
    echo "Total tests: ${#tests[@]}"
    echo "Failed tests: ${#failed_tests[@]}"
    
    if [ ${#failed_tests[@]} -eq 0 ]; then
        echo -e "${GREEN}All tests passed!${NC}"
        return 0
    else
        echo -e "${RED}Failed tests: ${failed_tests[*]}${NC}"
        return 1
    fi
}

# Function to run performance regression test
run_regression_test() {
    echo -e "${BLUE}Running performance regression test...${NC}"
    
    local baseline_file="${REPORTS_DIR}/baseline_${TIMESTAMP}.json"
    local current_file="${REPORTS_DIR}/current_${TIMESTAMP}.json"
    
    echo "Creating baseline measurement..."
    artillery run tests/medium-load.yml --output "$baseline_file"
    
    echo "Waiting 30 seconds..."
    sleep 30
    
    echo "Running current measurement..."
    artillery run tests/medium-load.yml --output "$current_file"
    
    echo -e "${GREEN}Regression test data saved${NC}"
    echo "Baseline: $baseline_file"
    echo "Current: $current_file"
    echo -e "${YELLOW}Compare these files to detect performance regressions${NC}"
}

# Main menu
show_menu() {
    echo
    echo "Choose an automation scenario:"
    echo "1) Single test with report generation"
    echo "2) Full graduated load test suite"
    echo "3) Continuous monitoring"
    echo "4) Performance regression test"
    echo "5) Quick health check"
    echo "6) Exit"
    echo
}

# Create reports directory
mkdir -p "$REPORTS_DIR"

# Check if server is running
if ! check_server; then
    exit 1
fi

# Main execution
if [ $# -eq 0 ]; then
    # Interactive mode
    while true; do
        show_menu
        read -p "Enter your choice (1-6): " choice
        
        case $choice in
            1)
                echo "Available tests: light-load, medium-load, heavy-load"
                read -p "Enter test name: " test_name
                run_test_with_report "$test_name"
                ;;
            2)
                run_graduated_load_test
                ;;
            3)
                run_continuous_monitoring
                ;;
            4)
                run_regression_test
                ;;
            5)
                curl -s "$API_URL/health" | jq '.' 2>/dev/null || curl -s "$API_URL/health"
                ;;
            6)
                echo -e "${GREEN}Goodbye!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid choice${NC}"
                ;;
        esac
    done
else
    # Command line mode
    case $1 in
        "suite")
            run_graduated_load_test
            ;;
        "monitor")
            run_continuous_monitoring
            ;;
        "regression")
            run_regression_test
            ;;
        *)
            run_test_with_report "$1"
            ;;
    esac
fi