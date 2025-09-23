

# MqttNotifierBindingObjectAuthentication

Authentication method supported for connection to MQTT broker

## oneOf schemas
* [MqttNotifierAuthenticationAnonymous](MqttNotifierAuthenticationAnonymous.md)
* [MqttNotifierAuthenticationCertificate](MqttNotifierAuthenticationCertificate.md)
* [MqttNotifierAuthenticationOauth2BearerToken](MqttNotifierAuthenticationOauth2BearerToken.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.MqttNotifierBindingObjectAuthentication;
import io.github.clean_energy_tools.openadr_3_types.model.MqttNotifierAuthenticationAnonymous;
import io.github.clean_energy_tools.openadr_3_types.model.MqttNotifierAuthenticationCertificate;
import io.github.clean_energy_tools.openadr_3_types.model.MqttNotifierAuthenticationOauth2BearerToken;

public class Example {
    public static void main(String[] args) {
        MqttNotifierBindingObjectAuthentication exampleMqttNotifierBindingObjectAuthentication = new MqttNotifierBindingObjectAuthentication();

        // create a new MqttNotifierAuthenticationAnonymous
        MqttNotifierAuthenticationAnonymous exampleMqttNotifierAuthenticationAnonymous = new MqttNotifierAuthenticationAnonymous();
        // set MqttNotifierBindingObjectAuthentication to MqttNotifierAuthenticationAnonymous
        exampleMqttNotifierBindingObjectAuthentication.setActualInstance(exampleMqttNotifierAuthenticationAnonymous);
        // to get back the MqttNotifierAuthenticationAnonymous set earlier
        MqttNotifierAuthenticationAnonymous testMqttNotifierAuthenticationAnonymous = (MqttNotifierAuthenticationAnonymous) exampleMqttNotifierBindingObjectAuthentication.getActualInstance();

        // create a new MqttNotifierAuthenticationCertificate
        MqttNotifierAuthenticationCertificate exampleMqttNotifierAuthenticationCertificate = new MqttNotifierAuthenticationCertificate();
        // set MqttNotifierBindingObjectAuthentication to MqttNotifierAuthenticationCertificate
        exampleMqttNotifierBindingObjectAuthentication.setActualInstance(exampleMqttNotifierAuthenticationCertificate);
        // to get back the MqttNotifierAuthenticationCertificate set earlier
        MqttNotifierAuthenticationCertificate testMqttNotifierAuthenticationCertificate = (MqttNotifierAuthenticationCertificate) exampleMqttNotifierBindingObjectAuthentication.getActualInstance();

        // create a new MqttNotifierAuthenticationOauth2BearerToken
        MqttNotifierAuthenticationOauth2BearerToken exampleMqttNotifierAuthenticationOauth2BearerToken = new MqttNotifierAuthenticationOauth2BearerToken();
        // set MqttNotifierBindingObjectAuthentication to MqttNotifierAuthenticationOauth2BearerToken
        exampleMqttNotifierBindingObjectAuthentication.setActualInstance(exampleMqttNotifierAuthenticationOauth2BearerToken);
        // to get back the MqttNotifierAuthenticationOauth2BearerToken set earlier
        MqttNotifierAuthenticationOauth2BearerToken testMqttNotifierAuthenticationOauth2BearerToken = (MqttNotifierAuthenticationOauth2BearerToken) exampleMqttNotifierBindingObjectAuthentication.getActualInstance();
    }
}
```


