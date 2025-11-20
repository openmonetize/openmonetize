# Copyright (C) 2025 OpenMonetize
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

import sys
import os

# Add the SDK path to sys.path
sys.path.append(os.path.join(os.getcwd(), "openmonetize"))

try:
    from openmonetize import EventsApi, CustomEvent, ImageGenerationEvent, TokenUsageEvent, ApiClient
    print("Successfully imported EventsApi and models")
except ImportError as e:
    print(f"Failed to import: {e}")
    sys.exit(1)

try:
    client = ApiClient()
    events_api = EventsApi(client)
    print("Successfully instantiated EventsApi")
except Exception as e:
    print(f"Failed to instantiate EventsApi: {e}")
    sys.exit(1)

try:
    event = CustomEvent(
        event_id="test-event-1",
        customer_id="cust-123",
        feature_id="feat-abc",
        unit_type="images",
        quantity=1,
        timestamp="2023-01-01T00:00:00Z"
    )
    print(f"Successfully created CustomEvent: {event}")
except Exception as e:
    print(f"Failed to create CustomEvent: {e}")
    sys.exit(1)

print("Python SDK verification passed!")
