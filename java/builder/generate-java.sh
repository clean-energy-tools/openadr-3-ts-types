#!/bin/bash

# OpenADR 3.1.0 Java Code Generation Script
# Uses Swagger Codegen 3.x (supports default: null for arrays)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
SPEC_FILE="${PROJECT_ROOT}/openadr3.1.0.yaml"
OUTPUT_DIR="${SCRIPT_DIR}/../package"
JAR_FILE="${SCRIPT_DIR}/swagger-codegen-cli-3.0.46.jar"
JAR_URL="https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.46/swagger-codegen-cli-3.0.46.jar"

echo "🚀 OpenADR 3.1.0 Java Code Generation"
echo "======================================"

# Check if specification exists
if [ ! -f "${SPEC_FILE}" ]; then
    echo "❌ OpenAPI specification not found: ${SPEC_FILE}"
    exit 1
fi

# Download Swagger Codegen JAR if not present
if [ ! -f "${JAR_FILE}" ]; then
    echo "📥 Downloading Swagger Codegen CLI..."
    curl -o "${JAR_FILE}" "${JAR_URL}"
    echo "✅ Downloaded Swagger Codegen CLI"
fi

# Clean output directory
echo "🧹 Cleaning output directory..."
rm -rf "${OUTPUT_DIR}/src" "${OUTPUT_DIR}/docs" "${OUTPUT_DIR}/.swagger-codegen"
rm -f "${OUTPUT_DIR}"/*.md "${OUTPUT_DIR}"/*.xml "${OUTPUT_DIR}"/*.gradle* "${OUTPUT_DIR}"/*.sbt "${OUTPUT_DIR}"/.gitignore "${OUTPUT_DIR}"/.travis.yml "${OUTPUT_DIR}"/git_push.sh

# Generate Java code
echo "⚙️  Generating Java code from OpenAPI specification..."
echo "📄 Spec: ${SPEC_FILE}"
echo "📁 Output: ${OUTPUT_DIR}"

java -jar "${JAR_FILE}" generate \
    -i "${SPEC_FILE}" \
    -l java \
    -o "${OUTPUT_DIR}" \
    --invoker-package io.github.clean_energy_tools.openadr_3_types.client \
    --model-package io.github.clean_energy_tools.openadr_3_types.model \
    --api-package io.github.clean_energy_tools.openadr_3_types.api \
    --group-id io.github.clean-energy-tools \
    --artifact-id openadr-3-types \
    --artifact-version 3.1.0

# Count generated files
JAVA_FILES=$(find "${OUTPUT_DIR}/src" -name "*.java" | wc -l)
MODEL_FILES=$(find "${OUTPUT_DIR}/src" -path "*/model/*.java" | wc -l)
API_FILES=$(find "${OUTPUT_DIR}/src" -path "*/api/*.java" | wc -l)

echo ""
echo "✅ Java code generation completed successfully!"
echo "📊 Generated Files:"
echo "   • Total Java files: ${JAVA_FILES}"
echo "   • Model classes: ${MODEL_FILES}" 
echo "   • API interfaces: ${API_FILES}"
echo ""
echo "📂 Output structure:"
find "${OUTPUT_DIR}/src" -type d | head -10

echo ""
echo "🎯 Next steps:"
echo "   • Review generated code in: ${OUTPUT_DIR}/src/"
echo "   • Build with: cd ${OUTPUT_DIR} && mvn compile"
echo "   • Test with: cd ${OUTPUT_DIR} && mvn test"