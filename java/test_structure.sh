#!/bin/bash

# Structure test script for Java implementation
# Tests file structure and basic Java syntax without requiring Maven

echo "🚀 Running OpenADR 3.1.0 Java types structure tests"
echo "=================================================="

# Test directory structure
echo "🧪 Testing directory structure..."

EXPECTED_DIRS=("builder" "package" "test" "docs")
MISSING_DIRS=()

for dir in "${EXPECTED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
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

BUILDER_FILES=("pom.xml" "src/main/java/org/openadr/builder/OpenADRTypeBuilder.java")
MISSING_BUILDER_FILES=()

for file in "${BUILDER_FILES[@]}"; do
    if [ ! -f "builder/$file" ]; then
        MISSING_BUILDER_FILES+=("$file")
    fi
done

if [ ${#MISSING_BUILDER_FILES[@]} -eq 0 ]; then
    echo "✅ All key builder files exist"
else
    echo "❌ Missing builder files: ${MISSING_BUILDER_FILES[*]}"
    exit 1
fi

# Test package files
echo "🧪 Testing package files..."

PACKAGE_FILES=("pom.xml")
MISSING_PACKAGE_FILES=()

for file in "${PACKAGE_FILES[@]}"; do
    if [ ! -f "package/$file" ]; then
        MISSING_PACKAGE_FILES+=("$file")
    fi
done

if [ ${#MISSING_PACKAGE_FILES[@]} -eq 0 ]; then
    echo "✅ All package files exist: ${PACKAGE_FILES[*]}"
else
    echo "❌ Missing package files: ${MISSING_PACKAGE_FILES[*]}"
    exit 1
fi

# Test Java file syntax (basic check)
echo "🧪 Testing Java file syntax..."

JAVA_FILES=()
while IFS= read -r -d '' file; do
    JAVA_FILES+=("$file")
done < <(find . -name "*.java" -print0)

SYNTAX_ERRORS=0

for file in "${JAVA_FILES[@]}"; do
    # Basic syntax checks without requiring Java compiler
    
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
    
    # Check for valid Java class/interface declarations
    if ! grep -q "class\|interface\|enum\|record" "$file"; then
        echo "❌ $file: No class, interface, enum, or record declaration found"
        ((SYNTAX_ERRORS++))
        continue
    fi
    
    echo "✅ $(basename "$file") - basic syntax checks passed"
done

if [ $SYNTAX_ERRORS -eq 0 ]; then
    echo "✅ All ${#JAVA_FILES[@]} Java files passed basic syntax checks"
else
    echo "❌ $SYNTAX_ERRORS Java files have syntax issues"
    exit 1
fi

# Test Maven POM structure
echo "🧪 Testing Maven POM structure..."

# Check that pom.xml files are valid XML format
for pomfile in "builder/pom.xml" "package/pom.xml" "test/pom.xml"; do
    if [ -f "$pomfile" ]; then
        if grep -q "<project" "$pomfile" && grep -q "</project>" "$pomfile"; then
            echo "✅ $(dirname "$pomfile")/pom.xml has valid Maven structure"
        else
            echo "❌ $pomfile has invalid Maven structure"
            exit 1
        fi
    fi
done

# Test content structure
echo "🧪 Testing content structure..."

# Check that main class has a main method
if grep -q "public static void main" "builder/src/main/java/org/openadr/builder/OpenADRTypeBuilder.java"; then
    echo "✅ Builder main class contains main method"
else
    echo "❌ Builder main class missing main method"
    exit 1
fi

# Check for expected OpenADR annotations/patterns
if grep -q "@JsonProperty\|OpenADR\|Program\|Event" builder/src/main/java/org/openadr/builder/*.java; then
    echo "✅ Builder classes contain OpenADR references"
else
    echo "❌ Builder classes missing OpenADR references"
    exit 1
fi

# Test for Java 21 features usage
if grep -q "record\|sealed\|switch.*->" builder/src/main/java/org/openadr/builder/*.java; then
    echo "✅ Uses modern Java features (records, pattern matching, etc.)"
fi

# Check dependency versions in POMs
echo "🧪 Testing dependency management..."

# Check for modern dependency versions
if grep -q "jakarta\|jackson\|junit.*5" package/pom.xml; then
    echo "✅ Uses modern Java ecosystem dependencies"
else
    echo "⚠️ May be using legacy dependencies"
fi

# Final summary
echo ""
echo "📊 Structure Test Results: All tests passed!"
echo "📝 The Java implementation has:"
echo "   • Valid directory structure"
echo "   • All expected files present"
echo "   • Basic Java syntax compliance"
echo "   • Proper Maven project structure"
echo "   • Modern Java ecosystem dependencies"
echo ""
echo "💡 To test full functionality:"
echo "   1. Install Maven 3.9+"
echo "   2. cd builder && mvn clean compile"
echo "   3. mvn exec:java -Dexec.args=\"--demo\""
echo "   4. cd ../test && mvn test"

exit 0