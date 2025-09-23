package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	var (
		generateTypes      = flag.Bool("types", true, "Generate Go types from OpenAPI schemas")
		generateValidation = flag.Bool("validation", true, "Generate validation functions")
		generateDemo       = flag.Bool("demo", false, "Generate demo types without external dependencies")
		outputDir          = flag.String("output", OutputDir, "Output directory for generated files")
		packageName        = flag.String("package", PackageName, "Package name for generated code")
	)
	flag.Parse()

	opts := BuildOptions{
		SpecPath:       SpecPath,
		OutputDir:      *outputDir,
		PackageName:    *packageName,
		WithTags:       true,
		WithValidation: true,
	}

	PrintBanner("OpenADR 3.1.0 Go Code Generation")
	PrintInfo(fmt.Sprintf("Source spec: %s", opts.SpecPath))
	PrintInfo(fmt.Sprintf("Output directory: %s", opts.OutputDir))
	PrintInfo(fmt.Sprintf("Package name: %s", opts.PackageName))

	var hasErrors bool

	if *generateDemo {
		PrintBanner("Generating demo Go types (no external dependencies)")
		if err := generateDemoTypes(opts); err != nil {
			PrintError(fmt.Sprintf("Demo generation failed: %v", err))
			hasErrors = true
		}
	} else {
		if *generateTypes {
			// Check if spec file exists
			if err := CheckSpecFile(opts.SpecPath); err != nil {
				PrintError(err.Error())
				hasErrors = true
			} else {
				// Generate types using oapi-codegen
				if err := GenerateSchemaTypes(opts); err != nil {
					PrintError(fmt.Sprintf("Schema generation failed: %v", err))
					hasErrors = true
				}

				if err := GenerateClientTypes(opts); err != nil {
					PrintError(fmt.Sprintf("Client generation failed: %v", err))
					hasErrors = true
				}

				if err := GenerateServerTypes(opts); err != nil {
					PrintError(fmt.Sprintf("Server generation failed: %v", err))
					hasErrors = true
				}
			}
		}
	}

	if *generateValidation {
		// Generate validation functions
		if err := GenerateValidationSimple(opts); err != nil {
			PrintError(fmt.Sprintf("Validation generation failed: %v", err))
			hasErrors = true
		}
	}

	if hasErrors {
		PrintError("Generation completed with errors")
		os.Exit(1)
	} else {
		PrintSuccess("🎉 All code generation completed successfully!")
		PrintInfo("To use the generated code:")
		PrintInfo("  go mod tidy")
		PrintInfo("  go test ./...")
	}
}