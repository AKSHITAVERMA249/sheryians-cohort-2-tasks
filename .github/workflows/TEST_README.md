# GitHub Action Deploy Workflow Tests

This directory contains unit tests for the GitHub Action workflow that deploys 'task-' prefixed folders to GitHub Pages.

## Test Coverage

The test suite covers the following scenarios:

### 1. **Only 'task-' Prefixed Folders Are Processed**
- Tests that only folders starting with 'task-' (lowercase) are identified and processed
- Verifies that folders without the 'task-' prefix are ignored
- Ensures case-sensitivity (e.g., 'Task-' folders are not processed)
- Validates that variations like 'task-1', 'task-2', 'task-folder-4' are all correctly identified

### 2. **All Contents Are Copied Accurately**
- Tests that all files and subdirectories within 'task-' folders are copied
- Verifies content integrity (file contents remain unchanged)
- Tests various file types (HTML, CSS, JS, images, JSON, markdown)
- Ensures deeply nested directory structures are preserved
- Validates multiple 'task-' folders are processed correctly

### 3. **Correct Directory Structure in '_site'**
- Tests that the `_site` directory is created
- Verifies that each 'task-' folder gets its own subdirectory in `_site`
- Ensures complex nested directory structures are recreated correctly
- Validates that the directory hierarchy is preserved
- Tests multiple levels of nesting

### Bonus Tests

#### 4. **Empty 'task-' Folders**
- Tests that empty 'task-' folders are handled gracefully
- Verifies that the folder structure is still created even if empty

#### 5. **Special Characters in Filenames**
- Tests files with spaces, dashes, underscores, and multiple dots
- Ensures special characters don't break the copy operation

## Running the Tests

### Prerequisites
- Bash shell (available on macOS, Linux, and WSL on Windows)
- No external dependencies required (uses only standard Unix utilities)

### Execute the Test Suite

```bash
# From the repository root
./.github/workflows/test-deploy.sh
```

Or from anywhere:

```bash
bash /path/to/.github/workflows/test-deploy.sh
```

## Test Output

The test script provides colored output:
- ✓ PASS (green): Test passed successfully
- ✗ FAIL (red): Test failed with details about what went wrong

### Example Output

```
========================================
GitHub Action Deploy Workflow Tests
========================================

Test 1: Identifying and processing only 'task-' prefixed subfolders
✓ PASS: Only 'task-' prefixed folders are processed

Test 2: Accurately copying all contents from 'task-' subfolders
✓ PASS: All contents are copied accurately

Test 3: Creating correct target directory structure in '_site'
✓ PASS: Target directory structure is created correctly

Bonus Test: Handling empty 'task-' folder
✓ PASS: Empty 'task-' folders are handled correctly

Bonus Test: Handling files with special characters
✓ PASS: Files with special characters are handled correctly

========================================
Test Summary
========================================
Tests Run:    5
Tests Passed: 5
Tests Failed: 0

All tests passed!
```

## How Tests Work

Each test:
1. Creates a temporary test environment
2. Sets up test fixtures (folders and files)
3. Executes the deployment logic from the GitHub Action
4. Verifies the expected outcomes
5. Cleans up the temporary environment

The tests are isolated and don't affect your actual repository contents.

## Integration with CI/CD

You can integrate these tests into your GitHub Actions workflow:

```yaml
- name: Run Unit Tests
  run: ./.github/workflows/test-deploy.sh
```

Add this step before the actual deployment to ensure the logic is working correctly.

## Troubleshooting

If a test fails:
1. Check the error message for which assertion failed
2. The test will indicate what was expected vs. what was found
3. Verify the deployment logic in `deploy.yml` matches the test expectations

## Modifying Tests

To add new test cases:
1. Create a new function following the naming pattern `test_<description>()`
2. Use the `setup_test_env()` and `cleanup_test_env()` helpers
3. Set `result="PASS"` initially and change to `"FAIL"` if assertions fail
4. Call `print_test_result()` at the end
5. Add the function call to the main test execution section

## Test Philosophy

These tests validate:
- **Correctness**: The right folders are processed
- **Completeness**: All contents are copied
- **Structure**: Directory hierarchies are preserved
- **Robustness**: Edge cases are handled gracefully
