"""
Common configuration for OpenADR Python build scripts
"""

import os
from pathlib import Path

# Path to the OpenADR 3.1.0 specification
SPEC_PATH = Path(__file__).parent.parent.parent / "openadr3.1.0.yaml"

# Output directory for generated types
OUTPUT_DIR = Path(__file__).parent.parent / "package" / "src" / "generated"

# Package source directory
PACKAGE_SRC_DIR = Path(__file__).parent.parent / "package" / "src"

# Generation options
GENERATION_OPTIONS = {
    "snake_case_field": True,
    "use_title_if_available": True,
    "use_default_kwonly": True,
    "use_subclass_enum": True,
    "use_union_operator": True,
    "target_python_version": "3.11",
    "use_standard_collections": True,
    "use_schema_description": True,
    "use_field_description": True,
    "field_constraints": True,
    "validation": True,
}

def ensure_output_dir():
    """Ensure the output directory exists"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    return OUTPUT_DIR