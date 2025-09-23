package main

import (
	"fmt"
	"os"
	"path/filepath"
)

// Configuration for OpenADR Go build scripts
const (
	// Path to the OpenADR 3.1.0 specification
	SpecPath = "../../openadr3.1.0.yaml"
	
	// Output directory for generated types
	OutputDir = "../package/generated"
	
	// Package name for generated code
	PackageName = "openadr3"
)

// BuildOptions contains configuration for type generation
type BuildOptions struct {
	SpecPath     string
	OutputDir    string
	PackageName  string
	WithTags     bool
	WithValidation bool
}

// DefaultBuildOptions returns the default build configuration
func DefaultBuildOptions() BuildOptions {
	return BuildOptions{
		SpecPath:       SpecPath,
		OutputDir:      OutputDir,
		PackageName:    PackageName,
		WithTags:       true,
		WithValidation: true,
	}
}

// EnsureOutputDir creates the output directory if it doesn't exist
func EnsureOutputDir(outputDir string) error {
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory %s: %w", outputDir, err)
	}
	return nil
}

// CheckSpecFile verifies the OpenAPI specification file exists
func CheckSpecFile(specPath string) error {
	if _, err := os.Stat(specPath); os.IsNotExist(err) {
		return fmt.Errorf("OpenAPI specification file not found: %s", specPath)
	}
	return nil
}

// GetAbsolutePath converts a relative path to absolute
func GetAbsolutePath(path string) (string, error) {
	absPath, err := filepath.Abs(path)
	if err != nil {
		return "", fmt.Errorf("failed to get absolute path for %s: %w", path, err)
	}
	return absPath, nil
}

// PrintBanner prints a formatted banner message
func PrintBanner(message string) {
	fmt.Printf("🚀 %s\n", message)
	fmt.Println("=" + string(make([]byte, len(message)+3)))
}

// PrintSuccess prints a success message
func PrintSuccess(message string) {
	fmt.Printf("✅ %s\n", message)
}

// PrintError prints an error message
func PrintError(message string) {
	fmt.Printf("❌ %s\n", message)
}

// PrintInfo prints an info message
func PrintInfo(message string) {
	fmt.Printf("📝 %s\n", message)
}