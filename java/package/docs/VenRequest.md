

# VenRequest

## oneOf schemas
* [BlVenRequest](BlVenRequest.md)
* [VenVenRequest](VenVenRequest.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.VenRequest;
import io.github.clean_energy_tools.openadr_3_types.model.BlVenRequest;
import io.github.clean_energy_tools.openadr_3_types.model.VenVenRequest;

public class Example {
    public static void main(String[] args) {
        VenRequest exampleVenRequest = new VenRequest();

        // create a new BlVenRequest
        BlVenRequest exampleBlVenRequest = new BlVenRequest();
        // set VenRequest to BlVenRequest
        exampleVenRequest.setActualInstance(exampleBlVenRequest);
        // to get back the BlVenRequest set earlier
        BlVenRequest testBlVenRequest = (BlVenRequest) exampleVenRequest.getActualInstance();

        // create a new VenVenRequest
        VenVenRequest exampleVenVenRequest = new VenVenRequest();
        // set VenRequest to VenVenRequest
        exampleVenRequest.setActualInstance(exampleVenVenRequest);
        // to get back the VenVenRequest set earlier
        VenVenRequest testVenVenRequest = (VenVenRequest) exampleVenRequest.getActualInstance();
    }
}
```


