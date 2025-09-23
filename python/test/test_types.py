#!/usr/bin/env python3
"""
Test script for generated OpenADR 3.1.0 Python types
"""

import sys
from pathlib import Path

# Add the package source to Python path
package_src = Path(__file__).parent.parent / "package" / "src"
sys.path.insert(0, str(package_src))

def test_imports():
    """Test that all generated modules can be imported"""
    print("🧪 Testing imports...")
    
    try:
        from generated.models import Program, Event, Report, Ven
        from generated.responses import ProgramResponse, EventResponse
        from generated.validators import validate_program, ValidationResult
        print("✅ All imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False

def test_program_validation():
    """Test Program validation"""
    print("🧪 Testing Program validation...")
    
    try:
        from generated.validators import validate_program
        
        # Valid program data
        program_data = {
            "id": "test-program-1", 
            "created_date_time": "2024-01-01T00:00:00Z",
            "modification_date_time": "2024-01-01T00:00:00Z",
            "program_name": "Test Program",
            "program_long_name": "Test Demand Response Program", 
            "retailer_name": "Test Utility",
            "retailer_long_name": "Test Utility Company",
            "program_type": "PRICING_TARIFF",
            "country": "US",
            "principal_subdivision": "CA"
        }
        
        result = validate_program(program_data)
        
        if result.success:
            print(f"✅ Program validation successful: {result.data.program_name}")
            return True
        else:
            print(f"❌ Program validation failed: {result.errors}")
            return False
            
    except Exception as e:
        print(f"❌ Program validation test failed: {e}")
        return False

def test_type_annotations():
    """Test that type annotations are working"""
    print("🧪 Testing type annotations...")
    
    try:
        from generated.models import Program
        from typing import get_type_hints
        
        hints = get_type_hints(Program)
        print(f"✅ Type hints available for Program: {len(hints)} fields")
        return True
        
    except Exception as e:
        print(f"❌ Type annotations test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Running OpenADR 3.1.0 Python types test suite")
    
    tests = [
        test_imports,
        test_program_validation, 
        test_type_annotations,
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print("💥 Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())