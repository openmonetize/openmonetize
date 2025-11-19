# coding: utf-8

from __future__ import annotations
import pprint
import re  # noqa: F401
import json

from pydantic import BaseModel, ConfigDict, Field
from typing import Any, ClassVar, Dict, List, Optional
from typing_extensions import Self

class CustomEvent(BaseModel):
    """
    CustomEvent
    """
    event_id: str = Field(alias="event_id")
    customer_id: str = Field(alias="customer_id")
    user_id: Optional[str] = Field(default=None, alias="user_id")
    event_type: str = Field(default="CUSTOM", alias="event_type")
    feature_id: str = Field(alias="feature_id")
    unit_type: str = Field(alias="unit_type")
    quantity: float = Field(alias="quantity")
    timestamp: str = Field(alias="timestamp")
    metadata: Optional[Dict[str, Any]] = Field(default=None, alias="metadata")

    __properties: ClassVar[List[str]] = ["event_id", "customer_id", "user_id", "event_type", "feature_id", "unit_type", "quantity", "timestamp", "metadata"]

    model_config = ConfigDict(
        populate_by_name=True,
        validate_assignment=True,
        protected_namespaces=(),
    )

    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.model_dump(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> Optional[Self]:
        """Create an instance of CustomEvent from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self) -> Dict[str, Any]:
        """Return the dictionary representation of the model using alias."""
        _dict = self.model_dump(
            by_alias=True,
            exclude_none=True,
        )
        return _dict

    @classmethod
    def from_dict(cls, obj: Optional[Dict[str, Any]]) -> Optional[Self]:
        """Create an instance of CustomEvent from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return cls.model_validate(obj)

        _obj = cls.model_validate({
            "event_id": obj.get("event_id"),
            "customer_id": obj.get("customer_id"),
            "user_id": obj.get("user_id"),
            "event_type": obj.get("event_type") if obj.get("event_type") is not None else "CUSTOM",
            "feature_id": obj.get("feature_id"),
            "unit_type": obj.get("unit_type"),
            "quantity": obj.get("quantity"),
            "timestamp": obj.get("timestamp"),
            "metadata": obj.get("metadata")
        })
        return _obj
