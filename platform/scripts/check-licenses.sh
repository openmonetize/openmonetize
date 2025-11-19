#!/bin/bash

# Check if addlicense is installed
if ! command -v addlicense &> /dev/null; then
    echo "addlicense could not be found. Installing..."
    go install github.com/google/addlicense@v1.0.0
fi

# Define the holder and license
HOLDER="Click-to-Burn Inc."
LICENSE="apache"

# Function to run the check
run_check() {
    echo "Checking license headers..."
    addlicense -check -c "$HOLDER" -l "$LICENSE" -ignore "**/node_modules/**" -ignore "**/dist/**" -ignore "**/.git/**" .
}

# Function to run the fix
run_fix() {
    echo "Adding license headers..."
    addlicense -c "$HOLDER" -l "$LICENSE" -ignore "**/node_modules/**" -ignore "**/dist/**" -ignore "**/.git/**" .
}

if [ "$1" == "fix" ]; then
    run_fix
else
    run_check
fi
