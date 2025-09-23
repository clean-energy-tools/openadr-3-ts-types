#!/usr/bin/env python3
"""
Test script for generated OpenADR 3.1.0 Python types structure
Tests the file structure and basic Python syntax without requiring pydantic
"""

import sys
from pathlib import Path

# Add the package source to Python path
package_src = Path(__file__).parent.parent / "package" / "src"
sys.path.insert(0, str(package_src))

def test_file_structure():
    """Test that all expected files were generated"""
    print("🧪 Testing file structure...")
    
    generated_dir = package_src / "generated"
    expected_files = ["models.py", "responses.py", "validators.py", "api_types.py", "__init__.py"]
    
    missing_files = []
    for file in expected_files:
        file_path = generated_dir / file
        if not file_path.exists():
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Missing files: {missing_files}")
        return False
    
    print(f"✅ All expected files exist: {expected_files}")
    return True

def test_python_syntax():
    """Test that generated files have valid Python syntax"""
    print("🧪 Testing Python syntax...")
    
    generated_dir = package_src / "generated"
    py_files = list(generated_dir.glob("*.py"))
    
    syntax_errors = []
    for py_file in py_files:
        try:
            with open(py_file, 'r') as f:
                content = f.read()
            
            # Compile to check syntax
            compile(content, str(py_file), 'exec')
            print(f"   ✅ {py_file.name} - valid syntax")
            
        except SyntaxError as e:
            syntax_errors.append(f"{py_file.name}: {e}")
            print(f"   ❌ {py_file.name} - syntax error: {e}")
    
    if syntax_errors:
        print(f"❌ Syntax errors found: {len(syntax_errors)}")
        return False
    
    print(f"✅ All {len(py_files)} Python files have valid syntax")
    return True

def test_content_structure():
    """Test that files contain expected content patterns"""
    print("🧪 Testing content structure...")
    
    generated_dir = package_src / "generated"
    
    # Test models.py
    models_file = generated_dir / "models.py"
    if models_file.exists():
        content = models_file.read_text()
        if "class Program" in content and "class Event" in content:
            print("   ✅ models.py contains expected model classes")
        else:
            print("   ❌ models.py missing expected model classes")
            return False
    
    # Test responses.py  
    responses_file = generated_dir / "responses.py"
    if responses_file.exists():
        content = responses_file.read_text()
        if "ProgramResponse" in content and "EventResponse" in content:
            print("   ✅ responses.py contains expected response types")
        else:
            print("   ❌ responses.py missing expected response types")
            return False
    
    # Test validators.py
    validators_file = generated_dir / "validators.py"
    if validators_file.exists():
        content = validators_file.read_text()
        if "validate_program" in content and "ValidationResult" in content:
            print("   ✅ validators.py contains expected validation functions")
        else:
            print("   ❌ validators.py missing expected validation functions")
            return False
    
    # Test api_types.py
    api_types_file = generated_dir / "api_types.py"
    if api_types_file.exists():
        content = api_types_file.read_text()
        if "SearchAllPrograms" in content and "ParamsQuery" in content:
            print("   ✅ api_types.py contains expected API endpoint types")
        else:
            print("   ❌ api_types.py missing expected API endpoint types")
            return False
    
    # Test __init__.py
    init_file = generated_dir / "__init__.py"
    if init_file.exists():
        content = init_file.read_text()
        if "__all__" in content and "Program" in content:
            print("   ✅ __init__.py contains expected exports")
        else:
            print("   ❌ __init__.py missing expected exports")
            return False
    
    print("✅ All files contain expected content structure")
    return True

def test_type_annotations():
    """Test that files contain type annotations"""
    print("🧪 Testing type annotations...")
    
    generated_dir = package_src / "generated"
    models_file = generated_dir / "models.py"
    
    if models_file.exists():
        content = models_file.read_text()
        
        # Check for common type annotation patterns
        type_patterns = [
            "from typing import",
            ": str =",
            ": Optional[",
            ": List[",
            ": Dict[",
            "Union[",
        ]
        
        found_patterns = []
        for pattern in type_patterns:
            if pattern in content:
                found_patterns.append(pattern)
        
        if len(found_patterns) >= 4:  # Expect at least 4 type annotation patterns
            print(f"   ✅ Found {len(found_patterns)} type annotation patterns")
            print("✅ Files contain proper type annotations")
            return True
        else:
            print(f"   ❌ Only found {len(found_patterns)} type annotation patterns")
            return False
    
    print("❌ models.py not found")
    return False

def main():
    """Run all structure tests"""
    print("🚀 Running OpenADR 3.1.0 Python types structure tests")
    print(f"📁 Testing directory: {package_src}")
    
    tests = [
        test_file_structure,
        test_python_syntax,
        test_content_structure, 
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
        print("🎉 All structure tests passed!")
        print("📝 The generated Python types have:")
        print("   • Valid Python syntax")
        print("   • Expected file structure")
        print("   • Proper content organization")
        print("   • Type annotations")
        print("   • API endpoint parameter and response types")
        print("\n💡 To test full functionality, install pydantic:")
        print("   pip install pydantic>=2.0.0")
        print("   python test_types.py")
        return 0
    else:
        print("💥 Some structure tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())