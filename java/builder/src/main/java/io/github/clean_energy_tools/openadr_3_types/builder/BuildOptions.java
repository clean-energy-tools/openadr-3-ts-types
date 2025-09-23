package io.github.clean_energy_tools.openadr_3_types.builder;

/**
 * Configuration options for OpenADR type generation
 */
public class BuildOptions {
    private final String specPath;
    private final String outputDir;
    private final String packageName;
    private final boolean withValidation;
    private final boolean withBuilders;
    
    public BuildOptions(String specPath, String outputDir, String packageName) {
        this(specPath, outputDir, packageName, true, true);
    }
    
    public BuildOptions(String specPath, String outputDir, String packageName, 
                       boolean withValidation, boolean withBuilders) {
        this.specPath = specPath;
        this.outputDir = outputDir;
        this.packageName = packageName;
        this.withValidation = withValidation;
        this.withBuilders = withBuilders;
    }
    
    public String getSpecPath() {
        return specPath;
    }
    
    public String getOutputDir() {
        return outputDir;
    }
    
    public String getPackageName() {
        return packageName;
    }
    
    public boolean isWithValidation() {
        return withValidation;
    }
    
    public boolean isWithBuilders() {
        return withBuilders;
    }
    
    public String getModelPackage() {
        return packageName + ".model";
    }
    
    public String getApiPackage() {
        return packageName + ".api";
    }
    
    public String getValidationPackage() {
        return packageName + ".validation";
    }
    
    @Override
    public String toString() {
        return "BuildOptions{" +
                "specPath='" + specPath + '\'' +
                ", outputDir='" + outputDir + '\'' +
                ", packageName='" + packageName + '\'' +
                ", withValidation=" + withValidation +
                ", withBuilders=" + withBuilders +
                '}';
    }
}