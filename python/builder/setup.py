#!/usr/bin/env python3
"""
Setup script for OpenADR 3 Python type generation environment
"""

import subprocess
import sys
import os
from pathlib import Path

def create_venv():
    """Create virtual environment if it doesn't exist"""
    venv_path = Path(__file__).parent / "venv"
    
    if venv_path.exists():
        print("✅ Virtual environment already exists")
        return venv_path
    
    print("🔧 Creating virtual environment...")
    try:
        subprocess.check_call([sys.executable, "-m", "venv", str(venv_path)])
        print("✅ Virtual environment created")
        return venv_path
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create virtual environment: {e}")
        return None

def install_requirements():
    """Install required packages for type generation"""
    venv_path = create_venv()
    if not venv_path:
        return False
    
    # Use virtual environment python and pip
    venv_python = venv_path / "bin" / "python"
    if not venv_python.exists():
        venv_python = venv_path / "Scripts" / "python.exe"  # Windows
    
    requirements_file = Path(__file__).parent / "requirements.txt"
    
    print("📦 Installing Python type generation dependencies...")
    try:
        subprocess.check_call([
            str(venv_python), "-m", "pip", "install", "-r", str(requirements_file)
        ])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def check_datamodel_codegen():
    """Check if datamodel-code-generator is available"""
    venv_path = Path(__file__).parent / "venv"
    datamodel_codegen = venv_path / "bin" / "datamodel-codegen"
    if not datamodel_codegen.exists():
        datamodel_codegen = venv_path / "Scripts" / "datamodel-codegen.exe"  # Windows
    
    try:
        result = subprocess.run(
            [str(datamodel_codegen), "--version"], 
            capture_output=True, text=True, check=True
        )
        print(f"✅ datamodel-code-generator version: {result.stdout.strip()}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ datamodel-code-generator not found")
        return False

def main():
    """Setup the build environment"""
    print("🚀 Setting up OpenADR 3 Python type generation environment")
    
    success = True
    
    if not install_requirements():
        success = False
    
    if not check_datamodel_codegen():
        success = False
    
    if success:
        print("\n🎉 Setup completed successfully!")
        print("To generate types:")
        print("  source venv/bin/activate  # On Linux/Mac") 
        print("  venv\\Scripts\\activate     # On Windows")
        print("  python build_types.py")
    else:
        print("\n💥 Setup failed!")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())