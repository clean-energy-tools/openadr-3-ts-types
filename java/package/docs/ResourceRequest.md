

# ResourceRequest

## oneOf schemas
* [BlResourceRequest](BlResourceRequest.md)
* [VenResourceRequest](VenResourceRequest.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.ResourceRequest;
import io.github.clean_energy_tools.openadr_3_types.model.BlResourceRequest;
import io.github.clean_energy_tools.openadr_3_types.model.VenResourceRequest;

public class Example {
    public static void main(String[] args) {
        ResourceRequest exampleResourceRequest = new ResourceRequest();

        // create a new BlResourceRequest
        BlResourceRequest exampleBlResourceRequest = new BlResourceRequest();
        // set ResourceRequest to BlResourceRequest
        exampleResourceRequest.setActualInstance(exampleBlResourceRequest);
        // to get back the BlResourceRequest set earlier
        BlResourceRequest testBlResourceRequest = (BlResourceRequest) exampleResourceRequest.getActualInstance();

        // create a new VenResourceRequest
        VenResourceRequest exampleVenResourceRequest = new VenResourceRequest();
        // set ResourceRequest to VenResourceRequest
        exampleResourceRequest.setActualInstance(exampleVenResourceRequest);
        // to get back the VenResourceRequest set earlier
        VenResourceRequest testVenResourceRequest = (VenResourceRequest) exampleResourceRequest.getActualInstance();
    }
}
```


