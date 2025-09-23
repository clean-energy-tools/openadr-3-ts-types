#!/bin/bash

# Structure test script for Go implementation
# Tests file structure and basic Go syntax without requiring Go to be installed

echo "🚀 Running OpenADR 3.1.0 Go types structure tests"
echo "================================================="

# Test directory structure
echo "🧪 Testing directory structure..."

EXPECTED_DIRS=("builder" "package" "test" "docs")
MISSING_DIRS=()

for dir in "${EXPECTED_DIRS[@]}"; do
    if [ ! -d "../$dir" ]; then
        MISSING_DIRS+=("$dir")
    fi
done

if [ ${#MISSING_DIRS[@]} -eq 0 ]; then
    echo "✅ All expected directories exist: ${EXPECTED_DIRS[*]}"
else
    echo "❌ Missing directories: ${MISSING_DIRS[*]}"
    exit 1
fi

# Test builder files
echo "🧪 Testing builder files..."

BUILDER_FILES=("main.go" "common.go" "build_types.go" "build_validation_simple.go" "demo_types.go" "go.mod")
MISSING_BUILDER_FILES=()

for file in "${BUILDER_FILES[@]}"; do
    if [ ! -f "../builder/$file" ]; then
        MISSING_BUILDER_FILES+=("$file")
    fi
done

if [ ${#MISSING_BUILDER_FILES[@]} -eq 0 ]; then
    echo "✅ All builder files exist: ${BUILDER_FILES[*]}"
else
    echo "❌ Missing builder files: ${MISSING_BUILDER_FILES[*]}"
    exit 1
fi

# Test package files
echo "🧪 Testing package files..."

PACKAGE_FILES=("go.mod" "README.md")
MISSING_PACKAGE_FILES=()

for file in "${PACKAGE_FILES[@]}"; do
    if [ ! -f "../package/$file" ]; then
        MISSING_PACKAGE_FILES+=("$file")
    fi
done

if [ ${#MISSING_PACKAGE_FILES[@]} -eq 0 ]; then
    echo "✅ All package files exist: ${PACKAGE_FILES[*]}"
else
    echo "❌ Missing package files: ${MISSING_PACKAGE_FILES[*]}"
    exit 1
fi

# Test Go file syntax (basic check)
echo "🧪 Testing Go file syntax..."

GO_FILES=()
while IFS= read -r -d '' file; do
    GO_FILES+=("$file")
done < <(find .. -name "*.go" -print0)

SYNTAX_ERRORS=0

for file in "${GO_FILES[@]}"; do
    # Basic syntax checks without requiring Go compiler
    
    # Check for package declaration
    if ! grep -q "^package " "$file"; then
        echo "❌ $file: Missing package declaration"
        ((SYNTAX_ERRORS++))
        continue
    fi
    
    # Check for balanced braces (simple check)
    OPEN_BRACES=$(grep -o "{" "$file" | wc -l)
    CLOSE_BRACES=$(grep -o "}" "$file" | wc -l)
    
    if [ "$OPEN_BRACES" -ne "$CLOSE_BRACES" ]; then
        echo "❌ $file: Unbalanced braces (${OPEN_BRACES} open, ${CLOSE_BRACES} close)"
        ((SYNTAX_ERRORS++))
        continue
    fi
    
    # Check for valid Go identifier patterns
    if grep -q "[[:space:]]func[[:space:]]*[0-9]" "$file"; then
        echo "❌ $file: Invalid function names starting with numbers"
        ((SYNTAX_ERRORS++))
        continue
    fi
    
    echo "✅ $(basename "$file") - basic syntax checks passed"
done

if [ $SYNTAX_ERRORS -eq 0 ]; then
    echo "✅ All ${#GO_FILES[@]} Go files passed basic syntax checks"
else
    echo "❌ $SYNTAX_ERRORS Go files have syntax issues"
    exit 1
fi

# Test content structure
echo "🧪 Testing content structure..."

# Check that main.go has a main function
if grep -q "func main()" "../builder/main.go"; then
    echo "✅ Builder main.go contains main function"
else
    echo "❌ Builder main.go missing main function"
    exit 1
fi

# Check that common.go defines expected constants
if grep -q "SpecPath" "../builder/common.go" && grep -q "OutputDir" "../builder/common.go"; then
    echo "✅ common.go contains expected configuration constants"
else
    echo "❌ common.go missing expected configuration constants"
    exit 1
fi

# Check for example file
if [ -f "../example_usage.go" ]; then
    if grep -q "openadr3" "../example_usage.go"; then
        echo "✅ example_usage.go contains OpenADR references"
    else
        echo "❌ example_usage.go missing OpenADR references"
        exit 1
    fi
else
    echo "⚠️ example_usage.go not found (optional)"
fi

# Test module structure
echo "🧪 Testing Go module structure..."

# Check that go.mod files are valid format
for gomod in "../builder/go.mod" "../package/go.mod" "../go.mod"; do
    if [ -f "$gomod" ]; then
        if grep -q "^module " "$gomod" && grep -q "^go " "$gomod"; then
            echo "✅ $(basename "$(dirname "$gomod")")/go.mod has valid format"
        else
            echo "❌ $gomod has invalid format"
            exit 1
        fi
    fi
done

# Final summary
echo ""
echo "📊 Structure Test Results: All tests passed!"
echo "📝 The Go implementation has:"
echo "   • Valid directory structure"
echo "   • All expected files present"
echo "   • Basic Go syntax compliance"
echo "   • Proper module structure"
echo "   • Configuration and examples"
echo ""
echo "💡 To test full functionality:"
echo "   1. Install Go 1.21+"
echo "   2. cd builder && go mod tidy"
echo "   3. go run . -demo"
echo "   4. cd ../test && go test ./..."

exit 0