#!/usr/bin/env python3
"""
Example usage of OpenADR 3.1.0 Python types including API endpoint types
"""

import sys
from pathlib import Path
from typing import Dict, Any

# Add the package source to Python path for demo
package_src = Path(__file__).parent / "package" / "src"
sys.path.insert(0, str(package_src))

def example_core_models():
    """Example using core OpenADR models"""
    print("🔧 Core Models Example")
    print("=" * 50)
    
    try:
        from generated.models import Program, Event, Ven, ProgramType, ObjectType
        from generated.validators import validate_program
        from datetime import datetime
        
        # Create a program
        program_data = {
            "id": "program-123",
            "created_date_time": datetime.now(),
            "modification_date_time": datetime.now(),
            "program_name": "Peak Demand Response",
            "program_long_name": "Commercial Peak Demand Response Program",
            "retailer_name": "Pacific Gas & Electric",
            "retailer_long_name": "Pacific Gas & Electric Company",
            "program_type": ProgramType.DEMAND_RESPONSE,
            "country": "US",
            "principal_subdivision": "CA"
        }
        
        # Validate using validator function
        result = validate_program(program_data)
        if result.success:
            program: Program = result.data
            print(f"✅ Program created: {program.program_name}")
            print(f"   ID: {program.id}")
            print(f"   Type: {program.program_type}")
            print(f"   Country: {program.country}")
        else:
            print(f"❌ Validation failed: {result.errors}")
            
    except ImportError as e:
        print(f"⚠️  Cannot demonstrate core models: {e}")
        print("   This requires pydantic to be installed")

def example_api_parameters():
    """Example using API parameter types"""
    print("\n🔧 API Parameters Example")
    print("=" * 50)
    
    try:
        from generated.api_types import (
            SearchAllProgramsParamsQuery,
            SearchProgramByProgramIdParamsPath,
            CreateProgramBody
        )
        
        # Query parameters for GET /programs
        query_params_data = {
            "skip": 10,
            "limit": 25,
            "targets": ["commercial", "residential"]
        }
        
        query_params = SearchAllProgramsParamsQuery(**query_params_data)
        print(f"✅ Query params: skip={query_params.skip}, limit={query_params.limit}")
        print(f"   Targets: {query_params.targets}")
        
        # Path parameters for GET /programs/{programID}
        path_params_data = {
            "program_i_d": "program-123"
        }
        
        path_params = SearchProgramByProgramIdParamsPath(**path_params_data)
        print(f"✅ Path params: program_id={path_params.program_i_d}")
        
    except ImportError as e:
        print(f"⚠️  Cannot demonstrate API parameters: {e}")
        print("   This requires pydantic to be installed")

def example_api_responses():
    """Example using API response types"""
    print("\n🔧 API Responses Example")
    print("=" * 50)
    
    try:
        from generated.api_types import (
            SearchAllProgramsResponse,
            CreateProgramResponse,
            SearchAllProgramsError
        )
        from generated.models import Program, ProgramType
        from datetime import datetime
        
        # Success response - list of programs
        programs_data = [
            {
                "id": "program-1",
                "created_date_time": datetime.now(),
                "modification_date_time": datetime.now(),
                "program_name": "Program One",
                "retailer_name": "Utility Co",
                "program_type": ProgramType.DEMAND_RESPONSE,
                "country": "US"
            }
        ]
        
        print(f"✅ Response would contain {len(programs_data)} programs")
        
        # Error response
        error_data = {
            "status": 400,
            "error": "Bad Request",
            "message": "Invalid query parameters",
            "details": {"field": "limit", "issue": "exceeds maximum"}
        }
        
        error_response = SearchAllProgramsError(**error_data)
        print(f"✅ Error response: {error_response.status} - {error_response.error}")
        print(f"   Message: {error_response.message}")
        
    except ImportError as e:
        print(f"⚠️  Cannot demonstrate API responses: {e}")
        print("   This requires pydantic to be installed")

def example_api_operations_registry():
    """Example using the API operations registry"""
    print("\n🔧 API Operations Registry Example")
    print("=" * 50)
    
    try:
        from generated.api_operations import API_OPERATIONS, TOTAL_OPERATIONS
        
        print(f"📊 Total API operations: {TOTAL_OPERATIONS}")
        print("\n📋 Sample operations:")
        
        # Show some example operations
        samples = ["searchAllPrograms", "createProgram", "searchAllEvents", "createVen"]
        
        for op_id in samples:
            if op_id in API_OPERATIONS:
                op = API_OPERATIONS[op_id]
                print(f"  • {op['method']} {op['path']}")
                print(f"    Operation: {op_id}")
                print(f"    Summary: {op['summary']}")
                print(f"    Parameters: {op['parameters']}, Has Body: {op['has_body']}")
                print(f"    Response Codes: {op['response_codes']}")
                print()
        
        # Group operations by method
        methods = {}
        for op_id, op_info in API_OPERATIONS.items():
            method = op_info['method']
            methods[method] = methods.get(method, 0) + 1
        
        print("📈 Operations by HTTP method:")
        for method, count in sorted(methods.items()):
            print(f"   {method}: {count} operations")
            
    except ImportError as e:
        print(f"⚠️  Cannot demonstrate operations registry: {e}")

def example_type_safety():
    """Example showing type safety benefits"""
    print("\n🔧 Type Safety Example")
    print("=" * 50)
    
    # This shows what IDE and type checkers would catch
    print("🎯 Type hints provide excellent IDE support:")
    print("   • Auto-completion for model fields")
    print("   • Type checking for parameter validation")
    print("   • Documentation strings in tooltips")
    print("   • Error detection before runtime")
    print()
    print("Example with type annotations:")
    print("""
    from generated.models import Program
    from generated.api_types import SearchAllProgramsParamsQuery
    
    def search_programs(params: SearchAllProgramsParamsQuery) -> List[Program]:
        # IDE knows params.skip is Optional[int]
        # IDE knows params.limit has constraints (≤ 50)
        # IDE knows return type is List[Program]
        pass
    """)

def main():
    """Run all examples"""
    print("🚀 OpenADR 3.1.0 Python Types Usage Examples")
    print("=" * 60)
    
    example_core_models()
    example_api_parameters()
    example_api_responses()
    example_api_operations_registry()
    example_type_safety()
    
    print("\n🎉 Examples completed!")
    print("\n💡 To run with full functionality:")
    print("   pip install pydantic>=2.0.0")
    print("   python example_usage.py")

if __name__ == "__main__":
    main()