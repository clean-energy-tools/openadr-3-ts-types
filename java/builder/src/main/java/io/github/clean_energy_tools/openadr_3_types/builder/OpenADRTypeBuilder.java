package io.github.clean_energy_tools.openadr_3_types.builder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.apache.commons.cli.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Main builder class for generating OpenADR 3.1.0 Java types and validation
 */
public class OpenADRTypeBuilder {
    private static final Logger logger = LoggerFactory.getLogger(OpenADRTypeBuilder.class);
    
    private static final String SPEC_PATH = "../../openadr3.1.0.yaml";
    private static final String OUTPUT_DIR = "../package/src/main/java/io/github/clean_energy_tools/openadr_3_types";
    private static final String PACKAGE_NAME = "io.github.clean_energy_tools.openadr_3_types";
    
    public static void main(String[] args) {
        Options options = createOptions();
        CommandLineParser parser = new DefaultParser();
        
        try {
            CommandLine cmd = parser.parse(options, args);
            
            if (cmd.hasOption("help")) {
                printHelp(options);
                return;
            }
            
            boolean generateDemo = cmd.hasOption("demo");
            boolean generateTypes = cmd.hasOption("types") || !generateDemo;
            boolean generateValidation = cmd.hasOption("validation") || !generateDemo;
            
            String outputDir = cmd.getOptionValue("output", OUTPUT_DIR);
            String packageName = cmd.getOptionValue("package", PACKAGE_NAME);
            
            printBanner("OpenADR 3.1.0 Java Code Generation");
            logger.info("Source spec: {}", SPEC_PATH);
            logger.info("Output directory: {}", outputDir);
            logger.info("Package name: {}", packageName);
            
            BuildOptions buildOptions = new BuildOptions(SPEC_PATH, outputDir, packageName);
            
            boolean hasErrors = false;
            
            if (generateDemo) {
                printBanner("Generating demo Java types (no external dependencies)");
                if (!generateDemoTypes(buildOptions)) {
                    hasErrors = true;
                }
            } else {
                if (generateTypes) {
                    if (!checkSpecFile(buildOptions.getSpecPath())) {
                        logger.error("OpenAPI spec file not found: {}", buildOptions.getSpecPath());
                        hasErrors = true;
                    } else {
                        if (!generateSchemaTypes(buildOptions)) {
                            hasErrors = true;
                        }
                        if (!generateApiTypes(buildOptions)) {
                            hasErrors = true;
                        }
                    }
                }
            }
            
            if (generateValidation) {
                if (!generateValidationFunctions(buildOptions)) {
                    hasErrors = true;
                }
            }
            
            if (hasErrors) {
                logger.error("❌ Generation completed with errors");
                System.exit(1);
            } else {
                printSuccess("🎉 All code generation completed successfully!");
                logger.info("To use the generated code:");
                logger.info("  mvn compile");
                logger.info("  mvn test");
            }
            
        } catch (ParseException e) {
            logger.error("Error parsing command line: {}", e.getMessage());
            printHelp(options);
            System.exit(1);
        }
    }
    
    private static Options createOptions() {
        Options options = new Options();
        
        options.addOption(Option.builder("h")
                .longOpt("help")
                .desc("Show help message")
                .build());
                
        options.addOption(Option.builder("d")
                .longOpt("demo")
                .desc("Generate demo types without external dependencies")
                .build());
                
        options.addOption(Option.builder("t")
                .longOpt("types")
                .desc("Generate types from OpenAPI specification")
                .build());
                
        options.addOption(Option.builder("v")
                .longOpt("validation")
                .desc("Generate validation functions")
                .build());
                
        options.addOption(Option.builder("o")
                .longOpt("output")
                .hasArg()
                .argName("directory")
                .desc("Output directory for generated files")
                .build());
                
        options.addOption(Option.builder("p")
                .longOpt("package")
                .hasArg()
                .argName("name")
                .desc("Package name for generated code")
                .build());
        
        return options;
    }
    
    private static void printHelp(Options options) {
        HelpFormatter formatter = new HelpFormatter();
        formatter.printHelp("java -jar openadr3-java-builder.jar", options);
    }
    
    private static void printBanner(String message) {
        System.out.println("🚀 " + message);
        System.out.println("=".repeat(message.length() + 3));
    }
    
    private static void printSuccess(String message) {
        System.out.println("✅ " + message);
    }
    
    private static void printError(String message) {
        System.out.println("❌ " + message);
    }
    
    private static boolean checkSpecFile(String specPath) {
        return Files.exists(Paths.get(specPath));
    }
    
    private static boolean generateDemoTypes(BuildOptions options) {
        try {
            DemoTypeGenerator generator = new DemoTypeGenerator(options);
            return generator.generate();
        } catch (Exception e) {
            logger.error("Demo type generation failed", e);
            return false;
        }
    }
    
    private static boolean generateSchemaTypes(BuildOptions options) {
        try {
            SchemaTypeGenerator generator = new SchemaTypeGenerator(options);
            return generator.generate();
        } catch (Exception e) {
            logger.error("Schema type generation failed", e);
            return false;
        }
    }
    
    private static boolean generateApiTypes(BuildOptions options) {
        try {
            ApiTypeGenerator generator = new ApiTypeGenerator(options);
            return generator.generate();
        } catch (Exception e) {
            logger.error("API type generation failed", e);
            return false;
        }
    }
    
    private static boolean generateValidationFunctions(BuildOptions options) {
        try {
            ValidationGenerator generator = new ValidationGenerator(options);
            return generator.generate();
        } catch (Exception e) {
            logger.error("Validation generation failed", e);
            return false;
        }
    }
}