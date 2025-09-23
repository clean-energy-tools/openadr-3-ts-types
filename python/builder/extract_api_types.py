#!/usr/bin/env python3
"""
Extract API endpoint parameter and response types from OpenAPI specification
"""

import yaml
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class Parameter:
    name: str
    location: str  # query, path, header
    required: bool
    schema: Dict[str, Any]
    description: Optional[str] = None

@dataclass
class RequestBody:
    content_type: str
    schema: Dict[str, Any]
    description: Optional[str] = None

@dataclass
class Response:
    status_code: str
    content_type: Optional[str]
    schema: Optional[Dict[str, Any]]
    description: Optional[str] = None

@dataclass
class Operation:
    method: str
    path: str
    operation_id: str
    parameters: List[Parameter]
    request_body: Optional[RequestBody]
    responses: List[Response]
    summary: Optional[str] = None
    description: Optional[str] = None

def load_openapi_spec(spec_path: Path) -> Dict[str, Any]:
    """Load the OpenAPI specification"""
    with open(spec_path, 'r') as f:
        return yaml.safe_load(f)

def extract_parameters(params: List[Dict[str, Any]]) -> List[Parameter]:
    """Extract parameter information"""
    parameters = []
    for param in params or []:
        parameters.append(Parameter(
            name=param.get('name', ''),
            location=param.get('in', 'query'),
            required=param.get('required', False),
            schema=param.get('schema', {}),
            description=param.get('description')
        ))
    return parameters

def extract_request_body(request_body: Optional[Dict[str, Any]]) -> Optional[RequestBody]:
    """Extract request body information"""
    if not request_body:
        return None
    
    content = request_body.get('content', {})
    for content_type, content_info in content.items():
        return RequestBody(
            content_type=content_type,
            schema=content_info.get('schema', {}),
            description=request_body.get('description')
        )
    return None

def extract_responses(responses: Dict[str, Any]) -> List[Response]:
    """Extract response information"""
    response_list = []
    for status_code, response_info in responses.items():
        content = response_info.get('content', {})
        if content:
            for content_type, content_info in content.items():
                response_list.append(Response(
                    status_code=status_code,
                    content_type=content_type,
                    schema=content_info.get('schema'),
                    description=response_info.get('description')
                ))
        else:
            # Handle references to components/responses
            response_list.append(Response(
                status_code=status_code,
                content_type=None,
                schema=None,
                description=response_info.get('description')
            ))
    return response_list

def extract_api_operations(spec: Dict[str, Any]) -> List[Operation]:
    """Extract all API operations from the OpenAPI spec"""
    operations = []
    paths = spec.get('paths', {})
    
    for path, path_info in paths.items():
        # Extract path-level parameters
        path_parameters = extract_parameters(path_info.get('parameters', []))
        
        # Process each HTTP method
        for method in ['get', 'post', 'put', 'delete', 'patch']:
            if method not in path_info:
                continue
                
            operation_info = path_info[method]
            operation_id = operation_info.get('operationId', f"{method}{path.replace('/', '_').replace('{', '_').replace('}', '_')}")
            
            # Combine path and operation parameters
            operation_parameters = path_parameters + extract_parameters(operation_info.get('parameters', []))
            
            operations.append(Operation(
                method=method.upper(),
                path=path,
                operation_id=operation_id,
                parameters=operation_parameters,
                request_body=extract_request_body(operation_info.get('requestBody')),
                responses=extract_responses(operation_info.get('responses', {})),
                summary=operation_info.get('summary'),
                description=operation_info.get('description')
            ))
    
    return operations

def pascal_case(name: str) -> str:
    """Convert snake_case or camelCase to PascalCase"""
    if not name:
        return ""
    
    # Handle camelCase (like operationId)
    words = []
    current_word = ""
    
    for char in name:
        if char.isupper() and current_word:
            words.append(current_word)
            current_word = char
        elif char in '_-':
            if current_word:
                words.append(current_word)
            current_word = ""
        else:
            current_word += char
    
    if current_word:
        words.append(current_word)
    
    return ''.join(word.capitalize() for word in words)

def snake_case(name: str) -> str:
    """Convert PascalCase or camelCase to snake_case"""
    result = []
    for i, char in enumerate(name):
        if char.isupper() and i > 0:
            result.append('_')
        result.append(char.lower())
    return ''.join(result)

if __name__ == "__main__":
    from common import SPEC_PATH
    
    print("🔍 Extracting API operations from OpenADR specification...")
    
    spec = load_openapi_spec(SPEC_PATH)
    operations = extract_api_operations(spec)
    
    print(f"📊 Found {len(operations)} API operations:")
    
    for op in operations[:5]:  # Show first 5 as example
        print(f"  • {op.method} {op.path} ({op.operation_id})")
        if op.parameters:
            print(f"    Parameters: {len(op.parameters)}")
        if op.request_body:
            print(f"    Request Body: {op.request_body.content_type}")
        print(f"    Responses: {len(op.responses)}")
        print()