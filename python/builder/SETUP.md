# OpenADR 3 Python Builder Setup

## Prerequisites

This builder requires Python 3.11+ and the ability to install Python packages.

## Installation Options

### Option 1: Using pip with virtual environment (Recommended)

```bash
# Install python3-venv if needed (Ubuntu/Debian)
sudo apt install python3.12-venv

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# OR: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### Option 2: Using pipx (if available)

```bash
# Install pipx if needed
sudo apt install pipx

# Install datamodel-code-generator globally
pipx install datamodel-code-generator[all]

# Install other dependencies
pip install --user pyyaml typer rich
```

### Option 3: System packages (with --break-system-packages)

```bash
# Install dependencies (use with caution)
pip3 install --break-system-packages -r requirements.txt
```

## Generate Types

Once dependencies are installed:

```bash
python build_types.py
```

## Test Generated Types

```bash
cd ../test
python test_types.py
```

## Dependencies

The type generation requires:

- `datamodel-code-generator>=0.25.0` - Main OpenAPI to Pydantic converter
- `pydantic>=2.0.0` - For generated models
- `pyyaml>=6.0` - For YAML parsing
- `typer>=0.12.0` - For CLI interface
- `rich>=13.0.0` - For pretty console output

## Troubleshooting

### "externally-managed-environment" error

This is a Python security feature. Use a virtual environment or pipx instead of system pip.

### "datamodel-codegen command not found"

Ensure `datamodel-code-generator` is installed and in your PATH. If using a virtual environment, make sure it's activated.

### Permission errors

Don't use `sudo pip`. Use virtual environments or `--user` flag instead.