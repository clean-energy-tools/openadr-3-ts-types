

# ProgramRequestPayloadDescriptorsInner

## anyOf schemas
* [EventPayloadDescriptor](EventPayloadDescriptor.md)
* [ReportPayloadDescriptor](ReportPayloadDescriptor.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.ProgramRequestPayloadDescriptorsInner;
import io.github.clean_energy_tools.openadr_3_types.model.EventPayloadDescriptor;
import io.github.clean_energy_tools.openadr_3_types.model.ReportPayloadDescriptor;

public class Example {
    public static void main(String[] args) {
        ProgramRequestPayloadDescriptorsInner exampleProgramRequestPayloadDescriptorsInner = new ProgramRequestPayloadDescriptorsInner();

        // create a new EventPayloadDescriptor
        EventPayloadDescriptor exampleEventPayloadDescriptor = new EventPayloadDescriptor();
        // set ProgramRequestPayloadDescriptorsInner to EventPayloadDescriptor
        exampleProgramRequestPayloadDescriptorsInner.setActualInstance(exampleEventPayloadDescriptor);
        // to get back the EventPayloadDescriptor set earlier
        EventPayloadDescriptor testEventPayloadDescriptor = (EventPayloadDescriptor) exampleProgramRequestPayloadDescriptorsInner.getActualInstance();

        // create a new ReportPayloadDescriptor
        ReportPayloadDescriptor exampleReportPayloadDescriptor = new ReportPayloadDescriptor();
        // set ProgramRequestPayloadDescriptorsInner to ReportPayloadDescriptor
        exampleProgramRequestPayloadDescriptorsInner.setActualInstance(exampleReportPayloadDescriptor);
        // to get back the ReportPayloadDescriptor set earlier
        ReportPayloadDescriptor testReportPayloadDescriptor = (ReportPayloadDescriptor) exampleProgramRequestPayloadDescriptorsInner.getActualInstance();
    }
}
```


