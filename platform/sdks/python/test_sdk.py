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
