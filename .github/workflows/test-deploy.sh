#!/bin/bash
# Unit tests for the GitHub Action deploy workflow
# This script tests the folder processing logic

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to print test results
print_test_result() {
    local test_name="$1"
    local result="$2"
    TESTS_RUN=$((TESTS_RUN + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Helper function to setup test environment
setup_test_env() {
    TEST_DIR=$(mktemp -d)
    cd "$TEST_DIR"
}

# Helper function to cleanup test environment
cleanup_test_env() {
    if [ -d "$TEST_DIR" ]; then
        rm -rf "$TEST_DIR"
    fi
}

# Test 1: GitHub Action correctly identifies and processes only 'task-' prefixed subfolders
test_only_task_prefixed_folders() {
    echo -e "\n${YELLOW}Test 1: Identifying and processing only 'task-' prefixed subfolders${NC}"
    
    setup_test_env
    
    # Create various folders: some with 'task-' prefix, some without
    mkdir -p task-1/content
    mkdir -p task-2/content
    mkdir -p task1/content
    mkdir -p other-folder/content
    mkdir -p Task-3/content  # Wrong case
    mkdir -p task-folder-4/content
    
    # Create files in each folder
    echo "content1" > task-1/content/file1.txt
    echo "content2" > task-2/content/file2.txt
    echo "task content" > task1/content/file.txt
    echo "other content" > other-folder/content/file.txt
    echo "wrong case" > Task-3/content/file.txt
    echo "content4" > task-folder-4/content/file4.txt
    
    # Run the deployment logic
    mkdir _site
    for folder in task-*; do
        if [ -d "$folder" ]; then
            mkdir -p "_site/$folder"
            cp -r "$folder"/* "_site/$folder/"
        fi
    done
    
    # Verify only 'task-' prefixed folders were copied
    local result="PASS"
    
    # Should exist
    if [ ! -d "_site/task-1" ]; then
        echo "  Expected _site/task-1 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-2" ]; then
        echo "  Expected _site/task-2 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-folder-4" ]; then
        echo "  Expected _site/task-folder-4 to exist"
        result="FAIL"
    fi
    
    # Should NOT exist
    if [ -d "_site/task1" ]; then
        echo "  Expected _site/task1 to NOT exist"
        result="FAIL"
    fi
    
    if [ -d "_site/other-folder" ]; then
        echo "  Expected _site/other-folder to NOT exist"
        result="FAIL"
    fi
    
    if [ -d "_site/Task-3" ]; then
        echo "  Expected _site/Task-3 (wrong case) to NOT exist"
        result="FAIL"
    fi
    
    # Count the number of folders in _site
    folder_count=$(find _site -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
    if [ "$folder_count" != "3" ]; then
        echo "  Expected exactly 3 folders in _site, found $folder_count"
        result="FAIL"
    fi
    
    cleanup_test_env
    print_test_result "Only 'task-' prefixed folders are processed" "$result"
}

# Test 2: GitHub Action accurately copies all contents from identified 'task-' subfolders
test_copy_all_contents() {
    echo -e "\n${YELLOW}Test 2: Accurately copying all contents from 'task-' subfolders${NC}"
    
    setup_test_env
    
    # Create day folders with various content types
    mkdir -p task-1/css
    mkdir -p task-1/js
    mkdir -p task-1/images
    mkdir -p task-1/nested/deeply/nested
    
    # Create various file types
    echo "html content" > task-1/index.html
    echo "css content" > task-1/css/style.css
    echo "js content" > task-1/js/script.js
    echo "image data" > task-1/images/logo.png
    echo "nested content" > task-1/nested/deeply/nested/file.txt
    echo "readme" > task-1/README.md
    
    # Create a second day folder
    mkdir -p task-2/assets
    echo "page content" > task-2/page.html
    echo "asset content" > task-2/assets/data.json
    
    # Run the deployment logic
    mkdir _site
    for folder in task-*; do
        if [ -d "$folder" ]; then
            mkdir -p "_site/$folder"
            cp -r "$folder"/* "_site/$folder/"
        fi
    done
    
    # Verify all contents were copied
    local result="PASS"
    
    # Check task-1 files
    if [ ! -f "_site/task-1/index.html" ]; then
        echo "  Expected _site/task-1/index.html to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-1/css/style.css" ]; then
        echo "  Expected _site/task-1/css/style.css to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-1/js/script.js" ]; then
        echo "  Expected _site/task-1/js/script.js to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-1/images/logo.png" ]; then
        echo "  Expected _site/task-1/images/logo.png to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-1/nested/deeply/nested/file.txt" ]; then
        echo "  Expected _site/task-1/nested/deeply/nested/file.txt to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-1/README.md" ]; then
        echo "  Expected _site/task-1/README.md to exist"
        result="FAIL"
    fi
    
    # Check task-2 files
    if [ ! -f "_site/task-2/page.html" ]; then
        echo "  Expected _site/task-2/page.html to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-2/assets/data.json" ]; then
        echo "  Expected _site/task-2/assets/data.json to exist"
        result="FAIL"
    fi
    
    # Verify content integrity
    if [ "$(cat _site/task-1/index.html)" != "html content" ]; then
        echo "  Content of _site/task-1/index.html doesn't match"
        result="FAIL"
    fi
    
    if [ "$(cat _site/task-1/nested/deeply/nested/file.txt)" != "nested content" ]; then
        echo "  Content of nested file doesn't match"
        result="FAIL"
    fi
    
    if [ "$(cat _site/task-2/assets/data.json)" != "asset content" ]; then
        echo "  Content of _site/task-2/assets/data.json doesn't match"
        result="FAIL"
    fi
    
    cleanup_test_env
    print_test_result "All contents are copied accurately" "$result"
}

# Test 3: GitHub Action correctly creates the target directory structure within '_site'
test_directory_structure() {
    echo -e "\n${YELLOW}Test 3: Creating correct target directory structure in '_site'${NC}"
    
    setup_test_env
    
    # Create day folders with complex directory structures
    mkdir -p task-test1/level1/level2/level3
    mkdir -p task-test2/src/components
    mkdir -p task-test2/src/utils
    mkdir -p task-test2/public/assets/images
    
    # Create files to populate the directories
    echo "deep file" > task-test1/level1/level2/level3/deep.txt
    echo "component" > task-test2/src/components/Button.js
    echo "util" > task-test2/src/utils/helper.js
    echo "image" > task-test2/public/assets/images/icon.png
    
    # Run the deployment logic
    mkdir _site
    for folder in task-*; do
        if [ -d "$folder" ]; then
            mkdir -p "_site/$folder"
            cp -r "$folder"/* "_site/$folder/"
        fi
    done
    
    # Verify directory structure
    local result="PASS"
    
    # Check that _site was created
    if [ ! -d "_site" ]; then
        echo "  Expected _site directory to exist"
        result="FAIL"
    fi
    
    # Check task-test1 structure
    if [ ! -d "_site/task-test1" ]; then
        echo "  Expected _site/task-test1 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test1/level1" ]; then
        echo "  Expected _site/task-test1/level1 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test1/level1/level2" ]; then
        echo "  Expected _site/task-test1/level1/level2 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test1/level1/level2/level3" ]; then
        echo "  Expected _site/task-test1/level1/level2/level3 to exist"
        result="FAIL"
    fi
    
    # Check task-test2 structure
    if [ ! -d "_site/task-test2" ]; then
        echo "  Expected _site/task-test2 to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/src" ]; then
        echo "  Expected _site/task-test2/src to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/src/components" ]; then
        echo "  Expected _site/task-test2/src/components to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/src/utils" ]; then
        echo "  Expected _site/task-test2/src/utils to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/public" ]; then
        echo "  Expected _site/task-test2/public to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/public/assets" ]; then
        echo "  Expected _site/task-test2/public/assets to exist"
        result="FAIL"
    fi
    
    if [ ! -d "_site/task-test2/public/assets/images" ]; then
        echo "  Expected _site/task-test2/public/assets/images to exist"
        result="FAIL"
    fi
    
    # Verify files are in the correct locations
    if [ ! -f "_site/task-test1/level1/level2/level3/deep.txt" ]; then
        echo "  Expected file in nested structure to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-test2/src/components/Button.js" ]; then
        echo "  Expected _site/task-test2/src/components/Button.js to exist"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-test2/public/assets/images/icon.png" ]; then
        echo "  Expected _site/task-test2/public/assets/images/icon.png to exist"
        result="FAIL"
    fi
    
    cleanup_test_env
    print_test_result "Target directory structure is created correctly" "$result"
}

# Additional edge case tests
test_empty_task_folder() {
    echo -e "\n${YELLOW}Bonus Test: Handling empty 'task-' folder${NC}"
    
    setup_test_env
    
    # Create an empty day folder
    mkdir -p task-empty
    
    # Run the deployment logic
    mkdir _site
    for folder in task-*; do
        if [ -d "$folder" ]; then
            mkdir -p "_site/$folder"
            cp -r "$folder"/* "_site/$folder/" 2>/dev/null || true
        fi
    done
    
    # Verify empty folder is still created in _site
    local result="PASS"
    
    if [ ! -d "_site/task-empty" ]; then
        echo "  Expected _site/task-empty to exist even if empty"
        result="FAIL"
    fi
    
    cleanup_test_env
    print_test_result "Empty 'task-' folders are handled correctly" "$result"
}

test_special_characters_in_files() {
    echo -e "\n${YELLOW}Bonus Test: Handling files with special characters${NC}"
    
    setup_test_env
    
    # Create folder with files containing special characters
    mkdir -p task-special
    echo "content" > "task-special/file with spaces.txt"
    echo "content" > "task-special/file-with-dashes.txt"
    echo "content" > "task-special/file_with_underscores.txt"
    echo "content" > "task-special/file.multiple.dots.txt"
    
    # Run the deployment logic
    mkdir _site
    for folder in task-*; do
        if [ -d "$folder" ]; then
            mkdir -p "_site/$folder"
            cp -r "$folder"/* "_site/$folder/"
        fi
    done
    
    # Verify all files were copied
    local result="PASS"
    
    if [ ! -f "_site/task-special/file with spaces.txt" ]; then
        echo "  Expected file with spaces to be copied"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-special/file-with-dashes.txt" ]; then
        echo "  Expected file with dashes to be copied"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-special/file_with_underscores.txt" ]; then
        echo "  Expected file with underscores to be copied"
        result="FAIL"
    fi
    
    if [ ! -f "_site/task-special/file.multiple.dots.txt" ]; then
        echo "  Expected file with multiple dots to be copied"
        result="FAIL"
    fi
    
    cleanup_test_env
    print_test_result "Files with special characters are handled correctly" "$result"
}

# Main test execution
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}GitHub Action Deploy Workflow Tests${NC}"
echo -e "${YELLOW}========================================${NC}"

# Run all tests
test_only_task_prefixed_folders
test_copy_all_contents
test_directory_structure
test_empty_task_folder
test_special_characters_in_files

# Print summary
echo -e "\n${YELLOW}========================================${NC}"
echo -e "${YELLOW}Test Summary${NC}"
echo -e "${YELLOW}========================================${NC}"
echo -e "Tests Run:    $TESTS_RUN"
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
else
    echo -e "${GREEN}Tests Failed: $TESTS_FAILED${NC}"
fi

# Exit with appropriate code
if [ $TESTS_FAILED -gt 0 ]; then
    exit 1
else
    echo -e "\n${GREEN}All tests passed!${NC}"
    exit 0
fi
