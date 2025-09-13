# Test Image File

This is a placeholder for a test image file. 

For the lab, you'll need to create a small JPG image file named `test-image.jpg` in this folder.
You can use any image, but it should be relatively small (less than 1MB) for testing purposes.

When running tests that upload images, the test will look for this file as a fixture to use
for image upload testing.

## Why the Tests Still Work Without an Actual Image

The tests are designed to be resilient - if no actual image file is found, they will create
a small placeholder text file with a .jpg extension. While this isn't a real image file, it's
enough for testing the API endpoints that handle file uploads.

For a real implementation, you would want to use an actual JPG image file here.