#!/bin/bash

# Add MIT license headers to Python SDK files (excluding venv)

MIT_HEADER='# Copyright (C) 2025 OpenMonetize
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
'

# Find all .py files excluding venv and add header if missing
find sdks/python -name "*.py" -type f -not -path "*/venv/*" -not -path "*/__pycache__/*" | while read file; do
    if ! grep -q "Copyright (C) 2025 OpenMonetize" "$file"; then
        echo "Adding header to $file"
        # Create temp file with header
        if head -1 "$file" | grep -q "# coding:"; then
            # If file starts with coding declaration, insert header after it
            (head -1 "$file"; echo ""; echo "$MIT_HEADER"; tail -n +2 "$file") > "$file.tmp"
        else
            # Otherwise, prepend header
            (echo "$MIT_HEADER"; cat "$file") > "$file.tmp"
        fi
        mv "$file.tmp" "$file"
    fi
done

echo "Done!"
