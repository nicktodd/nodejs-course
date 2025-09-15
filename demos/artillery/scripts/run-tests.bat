@echo off
REM Artillery Load Testing Automation Script for Windows
REM This script demonstrates different ways to automate Artillery testing on Windows

setlocal enabledelayedexpansion

echo Artillery Load Testing Automation Demo
echo ==========================================

REM Configuration
set API_URL=http://localhost:3000
set REPORTS_DIR=.\reports
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

REM Create reports directory
if not exist "%REPORTS_DIR%" mkdir "%REPORTS_DIR%"

REM Check if server is running
echo Checking if API server is running...
curl -s "%API_URL%/health" >nul 2>&1
if %errorlevel% equ 0 (
    echo Server is running
) else (
    echo Server is not running
    echo Start the server with: npm start
    exit /b 1
)

REM Function to run a single test with reporting
:run_test_with_report
set test_name=%1
set test_file=tests\%test_name%.yml
set output_file=%REPORTS_DIR%\%test_name%_%TIMESTAMP%.json
set report_file=%REPORTS_DIR%\%test_name%_%TIMESTAMP%.html

echo Running %test_name% test...

REM Run Artillery test with JSON output
artillery run "%test_file%" --output "%output_file%"
if %errorlevel% equ 0 (
    echo %test_name% test completed
    
    REM Generate HTML report
    artillery report "%output_file%" --output "%report_file%"
    if %errorlevel% equ 0 (
        echo Report generated: %report_file%
    ) else (
        echo Failed to generate HTML report
    )
) else (
    echo %test_name% test failed
    exit /b 1
)
goto :eof

REM Function to run graduated load test
:run_graduated_load_test
echo Running graduated load test suite...

set tests=light-load medium-load heavy-load
set failed_tests=

for %%t in (%tests%) do (
    echo Waiting 15 seconds before %%t test...
    timeout /t 15 /nobreak >nul
    
    call :run_test_with_report %%t
    if !errorlevel! neq 0 (
        set failed_tests=!failed_tests! %%t
    )
)

echo Load Test Suite Summary:
if "%failed_tests%"=="" (
    echo All tests passed!
) else (
    echo Failed tests:%failed_tests%
    exit /b 1
)
goto :eof

REM Main menu
:show_menu
echo.
echo Choose an automation scenario:
echo 1) Single test with report generation
echo 2) Full graduated load test suite  
echo 3) Quick health check
echo 4) Exit
echo.
goto :eof

REM Main execution
if "%1"=="" (
    REM Interactive mode
    :menu_loop
    call :show_menu
    set /p choice="Enter your choice (1-4): "
    
    if "!choice!"=="1" (
        echo Available tests: light-load, medium-load, heavy-load
        set /p test_name="Enter test name: "
        call :run_test_with_report !test_name!
        goto :menu_loop
    ) else if "!choice!"=="2" (
        call :run_graduated_load_test
        goto :menu_loop
    ) else if "!choice!"=="3" (
        curl -s "%API_URL%/health"
        goto :menu_loop
    ) else if "!choice!"=="4" (
        echo Goodbye!
        exit /b 0
    ) else (
        echo Invalid choice
        goto :menu_loop
    )
) else (
    REM Command line mode
    if "%1"=="suite" (
        call :run_graduated_load_test
    ) else (
        call :run_test_with_report %1
    )
)