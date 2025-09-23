

# NotificationObject

the object that is the subject of the notification.

## oneOf schemas
* [Event](Event.md)
* [Program](Program.md)
* [Report](Report.md)
* [Resource](Resource.md)
* [Subscription](Subscription.md)
* [Ven](Ven.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.NotificationObject;
import io.github.clean_energy_tools.openadr_3_types.model.Event;
import io.github.clean_energy_tools.openadr_3_types.model.Program;
import io.github.clean_energy_tools.openadr_3_types.model.Report;
import io.github.clean_energy_tools.openadr_3_types.model.Resource;
import io.github.clean_energy_tools.openadr_3_types.model.Subscription;
import io.github.clean_energy_tools.openadr_3_types.model.Ven;

public class Example {
    public static void main(String[] args) {
        NotificationObject exampleNotificationObject = new NotificationObject();

        // create a new Event
        Event exampleEvent = new Event();
        // set NotificationObject to Event
        exampleNotificationObject.setActualInstance(exampleEvent);
        // to get back the Event set earlier
        Event testEvent = (Event) exampleNotificationObject.getActualInstance();

        // create a new Program
        Program exampleProgram = new Program();
        // set NotificationObject to Program
        exampleNotificationObject.setActualInstance(exampleProgram);
        // to get back the Program set earlier
        Program testProgram = (Program) exampleNotificationObject.getActualInstance();

        // create a new Report
        Report exampleReport = new Report();
        // set NotificationObject to Report
        exampleNotificationObject.setActualInstance(exampleReport);
        // to get back the Report set earlier
        Report testReport = (Report) exampleNotificationObject.getActualInstance();

        // create a new Resource
        Resource exampleResource = new Resource();
        // set NotificationObject to Resource
        exampleNotificationObject.setActualInstance(exampleResource);
        // to get back the Resource set earlier
        Resource testResource = (Resource) exampleNotificationObject.getActualInstance();

        // create a new Subscription
        Subscription exampleSubscription = new Subscription();
        // set NotificationObject to Subscription
        exampleNotificationObject.setActualInstance(exampleSubscription);
        // to get back the Subscription set earlier
        Subscription testSubscription = (Subscription) exampleNotificationObject.getActualInstance();

        // create a new Ven
        Ven exampleVen = new Ven();
        // set NotificationObject to Ven
        exampleNotificationObject.setActualInstance(exampleVen);
        // to get back the Ven set earlier
        Ven testVen = (Ven) exampleNotificationObject.getActualInstance();
    }
}
```


