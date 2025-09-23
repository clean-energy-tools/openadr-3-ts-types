#!/usr/bin/env python3
"""
Generate Python types for OpenADR 3.1.0 API endpoints (parameters and responses)
"""

from pathlib import Path
from typing import Dict, List, Any
from extract_api_types import extract_api_operations, load_openapi_spec, pascal_case, snake_case, Operation, Parameter
from common import SPEC_PATH, OUTPUT_DIR, ensure_output_dir

def format_python_type(schema: Dict[str, Any]) -> str:
    """Convert OpenAPI schema to Python type annotation"""
    if not schema:
        return "Any"
    
    schema_type = schema.get('type')
    schema_format = schema.get('format')
    schema_ref = schema.get('$ref')
    
    if schema_ref:
        # Extract component name from $ref
        component_name = schema_ref.split('/')[-1]
        return pascal_case(component_name)
    
    if schema_type == 'string':
        if schema_format == 'date-time':
            return "datetime"
        elif schema_format == 'date':
            return "date"
        else:
            return "str"
    elif schema_type == 'integer':
        return "int"
    elif schema_type == 'number':
        return "float"
    elif schema_type == 'boolean':
        return "bool"
    elif schema_type == 'array':
        items_schema = schema.get('items', {})
        item_type = format_python_type(items_schema)
        return f"List[{item_type}]"
    elif schema_type == 'object':
        return "Dict[str, Any]"
    else:
        return "Any"

def generate_parameter_class(operation: Operation) -> str:
    """Generate parameter class for an operation"""
    if not operation.parameters:
        return ""
    
    class_name = f"{pascal_case(operation.operation_id)}Params"
    
    # Group parameters by location
    query_params = [p for p in operation.parameters if p.location == 'query']
    path_params = [p for p in operation.parameters if p.location == 'path']
    header_params = [p for p in operation.parameters if p.location == 'header']
    
    lines = []
    
    if query_params:
        lines.append(f"class {class_name}Query(BaseModel):")
        lines.append('    """Query parameters"""')
        lines.append('    model_config = ConfigDict(extra="forbid")')
        lines.append("")
        
        for param in query_params:
            python_type = format_python_type(param.schema)
            field_name = snake_case(param.name)
            
            if param.required:
                if param.description:
                    field_def = f'{field_name}: {python_type} = Field(..., description="{param.description}")'
                else:
                    field_def = f"{field_name}: {python_type}"
            else:
                if param.description:
                    field_def = f'{field_name}: Optional[{python_type}] = Field(None, description="{param.description}")'
                else:
                    field_def = f"{field_name}: Optional[{python_type}] = None"
            
            lines.append(f"    {field_def}")
        lines.append("")
    
    if path_params:
        lines.append(f"class {class_name}Path(BaseModel):")
        lines.append('    """Path parameters"""')
        lines.append('    model_config = ConfigDict(extra="forbid")')
        lines.append("")
        
        for param in path_params:
            python_type = format_python_type(param.schema)
            field_name = snake_case(param.name)
            
            if param.description:
                field_def = f'{field_name}: {python_type} = Field(..., description="{param.description}")'
            else:
                field_def = f"{field_name}: {python_type}"
            
            lines.append(f"    {field_def}")
        lines.append("")
    
    return "\n".join(lines)

def generate_request_body_class(operation: Operation) -> str:
    """Generate request body class for an operation"""
    if not operation.request_body:
        return ""
    
    class_name = f"{pascal_case(operation.operation_id)}Body"
    schema = operation.request_body.schema
    
    if schema.get('$ref'):
        # Reference to existing schema - create alias
        ref_type = format_python_type(schema)
        return f"{class_name} = {ref_type}\n"
    else:
        # Inline schema - create class
        lines = [
            f"class {class_name}(BaseModel):",
            '    """Request body"""',
            '    model_config = ConfigDict(extra="forbid")',
            "",
        ]
        
        properties = schema.get('properties', {})
        required = schema.get('required', [])
        
        for prop_name, prop_schema in properties.items():
            python_type = format_python_type(prop_schema)
            field_name = snake_case(prop_name)
            
            if prop_name in required:
                field_def = f"{field_name}: {python_type}"
            else:
                field_def = f"{field_name}: Optional[{python_type}] = None"
            
            prop_desc = prop_schema.get('description')
            if prop_desc:
                field_def += f' = Field(..., description="{prop_desc}")'
            
            lines.append(f"    {field_def}")
        
        lines.append("")
        return "\n".join(lines)

def generate_response_types(operation: Operation) -> str:
    """Generate response types for an operation"""
    if not operation.responses:
        return ""
    
    class_name = pascal_case(operation.operation_id)
    lines = []
    
    # Success response type
    success_responses = [r for r in operation.responses if r.status_code.startswith('2')]
    if success_responses:
        success_response = success_responses[0]  # Take first success response
        if success_response.schema:
            response_type = format_python_type(success_response.schema)
        else:
            response_type = "Dict[str, Any]"
        
        lines.append(f"{class_name}Response = {response_type}")
        lines.append("")
    
    # Error response types
    error_responses = [r for r in operation.responses if not r.status_code.startswith('2')]
    if error_responses:
        lines.append(f"class {class_name}Error(BaseModel):")
        lines.append('    """Error response"""')
        lines.append('    model_config = ConfigDict(extra="forbid")')
        lines.append("")
        lines.append("    status: int")
        lines.append("    error: str")
        lines.append("    message: str")
        lines.append("    details: Optional[Dict[str, Any]] = None")
        lines.append("")
    
    return "\n".join(lines)

def generate_api_types() -> bool:
    """Generate API parameter and response types"""
    
    print("🔧 Loading OpenAPI specification...")
    spec = load_openapi_spec(SPEC_PATH)
    operations = extract_api_operations(spec)
    
    print(f"📊 Processing {len(operations)} API operations...")
    
    # Generate the API types file
    lines = [
        '"""',
        'OpenADR 3.1.0 API Endpoint Types',
        'Auto-generated from OpenAPI specification - do not edit manually',
        '"""',
        "",
        "from datetime import datetime, date",
        "from typing import Dict, Any, Union, Optional, List",
        "from pydantic import BaseModel, Field, ConfigDict",
        "from .models import *",
        "",
    ]
    
    # Generate types for each operation
    for operation in operations:
        lines.append(f"# {operation.method} {operation.path} - {operation.operation_id}")
        if operation.summary:
            lines.append(f"# {operation.summary}")
        lines.append("")
        
        # Parameter types
        param_class = generate_parameter_class(operation)
        if param_class:
            lines.append(param_class)
        
        # Request body types
        body_class = generate_request_body_class(operation)
        if body_class:
            lines.append(body_class)
        
        # Response types
        response_types = generate_response_types(operation)
        if response_types:
            lines.append(response_types)
        
        lines.append("")
    
    # Write to file
    api_types_file = OUTPUT_DIR / "api_types.py"
    api_types_file.write_text("\n".join(lines))
    
    print(f"✅ Generated API types: {api_types_file}")
    return True

def generate_api_operations_index() -> bool:
    """Generate an index of all API operations"""
    
    spec = load_openapi_spec(SPEC_PATH)
    operations = extract_api_operations(spec)
    
    lines = [
        '"""',
        'OpenADR 3.1.0 API Operations Index',
        'Auto-generated from OpenAPI specification - do not edit manually',
        '"""',
        "",
        "from typing import Dict, List, Any",
        "",
        "# API Operations Registry",
        "API_OPERATIONS = {",
    ]
    
    for operation in operations:
        # Escape quotes and newlines in summary
        summary = (operation.summary or "").replace('"', '\\"').replace('\n', ' ').strip()
        op_dict = [
            f'    "{operation.operation_id}": {{',
            f'        "method": "{operation.method}",',
            f'        "path": "{operation.path}",',
            f'        "summary": "{summary}",',
            f'        "parameters": {len(operation.parameters)},',
            f'        "has_body": {operation.request_body is not None},',
            f'        "response_codes": {[r.status_code for r in operation.responses]},',
            f'    }},',
        ]
        lines.extend(op_dict)
    
    lines.extend([
        "}",
        "",
        f"# Total operations: {len(operations)}",
        f"TOTAL_OPERATIONS = {len(operations)}",
    ])
    
    index_file = OUTPUT_DIR / "api_operations.py"
    index_file.write_text("\n".join(lines))
    
    print(f"✅ Generated operations index: {index_file}")
    return True

def main():
    """Generate API endpoint types"""
    print("🚀 Generating OpenADR 3.1.0 API endpoint types...")
    
    ensure_output_dir()
    
    success = True
    
    if not generate_api_types():
        success = False
    
    if not generate_api_operations_index():
        success = False
    
    if success:
        print("\n🎉 API types generated successfully!")
        print("📝 Generated:")
        print("   • Parameter types for all endpoints")
        print("   • Request body types for POST/PUT operations")
        print("   • Response types for all operations")
        print("   • API operations registry")
    else:
        print("\n❌ API type generation failed!")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())