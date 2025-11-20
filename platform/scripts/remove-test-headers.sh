#!/bin/bash

# Remove MIT license headers from Python SDK test files

# The MIT header is 13 lines (including the blank line after)
# Line 1: # coding: utf-8
# Line 2: (blank)
# Lines 3-13: MIT header
# Line 14: (blank)

find platform/sdks/python/test -name "*.py" -type f | while read file; do
    if grep -q "Copyright (C) 2025 OpenMonetize" "$file" || grep -q "THE SOFTWARE IS PROVIDED" "$file"; then
        echo "Removing header from $file"
        # If file starts with "# coding: utf-8", keep first line, then remove until we find the docstring
        if head -1 "$file" | grep -q "# coding:"; then
            # Find the first line that doesn't start with # (excluding blank lines)
            # Keep the coding line, skip everything until the docstring
            awk 'NR==1 {print; next} /^"""/ || /^import/ || /^from/ || /^class/ || /^def/ {p=1} p' "$file" > "$file.tmp"
            mv "$file.tmp" "$file"
        else
            # Skip lines until we hit the docstring or import
            awk '/^"""/ || /^import/ || /^from/ || /^class/ || /^def/ {p=1} p' "$file" > "$file.tmp"
            mv "$file.tmp" "$file"
        fi
    fi
done

echo "Done removing headers from test files!"
