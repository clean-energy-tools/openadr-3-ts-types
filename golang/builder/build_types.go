package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// GenerateSchemaTypes generates Go types from components/schemas using oapi-codegen
func GenerateSchemaTypes(opts BuildOptions) error {
	PrintBanner("Generating Go types from OpenADR 3.1.0 schemas")
	
	// Check if oapi-codegen is available
	if err := checkOapiCodegen(); err != nil {
		return fmt.Errorf("oapi-codegen not available: %w", err)
	}
	
	// Ensure output directory exists
	if err := EnsureOutputDir(opts.OutputDir); err != nil {
		return err
	}
	
	// Generate types using oapi-codegen
	outputFile := filepath.Join(opts.OutputDir, "models.go")
	
	args := []string{
		"-generate", "types",
		"-package", opts.PackageName,
		"-o", outputFile,
	}
	
	if opts.WithTags {
		args = append(args, "-include-tags")
	}
	
	args = append(args, opts.SpecPath)
	
	cmd := exec.Command("oapi-codegen", args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	PrintInfo(fmt.Sprintf("Running: oapi-codegen %s", strings.Join(args, " ")))
	
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to generate schema types: %w", err)
	}
	
	PrintSuccess(fmt.Sprintf("Generated schema types: %s", outputFile))
	return nil
}

// GenerateClientTypes generates Go client types for API endpoints using oapi-codegen
func GenerateClientTypes(opts BuildOptions) error {
	PrintBanner("Generating Go client types for API endpoints")
	
	// Generate client code for API endpoints
	outputFile := filepath.Join(opts.OutputDir, "client.go")
	
	args := []string{
		"-generate", "client",
		"-package", opts.PackageName,
		"-o", outputFile,
		opts.SpecPath,
	}
	
	cmd := exec.Command("oapi-codegen", args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	PrintInfo(fmt.Sprintf("Running: oapi-codegen %s", strings.Join(args, " ")))
	
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to generate client types: %w", err)
	}
	
	PrintSuccess(fmt.Sprintf("Generated client types: %s", outputFile))
	return nil
}

// GenerateServerTypes generates Go server types for API endpoints using oapi-codegen
func GenerateServerTypes(opts BuildOptions) error {
	PrintBanner("Generating Go server types for API endpoints")
	
	// Generate server stubs for API endpoints
	outputFile := filepath.Join(opts.OutputDir, "server.go")
	
	args := []string{
		"-generate", "server",
		"-package", opts.PackageName,
		"-o", outputFile,
		opts.SpecPath,
	}
	
	cmd := exec.Command("oapi-codegen", args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	PrintInfo(fmt.Sprintf("Running: oapi-codegen %s", strings.Join(args, " ")))
	
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to generate server types: %w", err)
	}
	
	PrintSuccess(fmt.Sprintf("Generated server types: %s", outputFile))
	return nil
}

// checkOapiCodegen verifies that oapi-codegen is installed and available
func checkOapiCodegen() error {
	cmd := exec.Command("oapi-codegen", "-help")
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("oapi-codegen not found - install with: go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest")
	}
	return nil
}

// This main function was moved to main.go to avoid conflicts