# coding: utf-8

from __future__ import annotations
import pprint
import re  # noqa: F401
import json

from pydantic import BaseModel, ConfigDict, Field
from typing import Any, ClassVar, Dict, List, Optional
from typing_extensions import Self

class ImageGenerationEvent(BaseModel):
    """
    ImageGenerationEvent
    """
    event_id: str = Field(alias="event_id")
    customer_id: str = Field(alias="customer_id")
    user_id: Optional[str] = Field(default=None, alias="user_id")
    event_type: str = Field(default="IMAGE_GENERATION", alias="event_type")
    feature_id: str = Field(alias="feature_id")
    provider: str = Field(alias="provider")
    model: str = Field(alias="model")
    image_count: int = Field(alias="image_count")
    image_size: Optional[str] = Field(default=None, alias="image_size")
    quality: Optional[str] = Field(default=None, alias="quality")
    timestamp: str = Field(alias="timestamp")
    metadata: Optional[Dict[str, Any]] = Field(default=None, alias="metadata")

    __properties: ClassVar[List[str]] = ["event_id", "customer_id", "user_id", "event_type", "feature_id", "provider", "model", "image_count", "image_size", "quality", "timestamp", "metadata"]

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
        """Create an instance of ImageGenerationEvent from a JSON string"""
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
        """Create an instance of ImageGenerationEvent from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return cls.model_validate(obj)

        _obj = cls.model_validate({
            "event_id": obj.get("event_id"),
            "customer_id": obj.get("customer_id"),
            "user_id": obj.get("user_id"),
            "event_type": obj.get("event_type") if obj.get("event_type") is not None else "IMAGE_GENERATION",
            "feature_id": obj.get("feature_id"),
            "provider": obj.get("provider"),
            "model": obj.get("model"),
            "image_count": obj.get("image_count"),
            "image_size": obj.get("image_size"),
            "quality": obj.get("quality"),
            "timestamp": obj.get("timestamp"),
            "metadata": obj.get("metadata")
        })
        return _obj
