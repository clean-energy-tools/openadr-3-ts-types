

# ValuesMapValuesInner

## anyOf schemas
* [BigDecimal](BigDecimal.md)
* [Boolean](Boolean.md)
* [Integer](Integer.md)
* [Point](Point.md)
* [String](String.md)

## Example
```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.model.ValuesMapValuesInner;
import io.github.clean_energy_tools.openadr_3_types.model.BigDecimal;
import io.github.clean_energy_tools.openadr_3_types.model.Boolean;
import io.github.clean_energy_tools.openadr_3_types.model.Integer;
import io.github.clean_energy_tools.openadr_3_types.model.Point;
import io.github.clean_energy_tools.openadr_3_types.model.String;

public class Example {
    public static void main(String[] args) {
        ValuesMapValuesInner exampleValuesMapValuesInner = new ValuesMapValuesInner();

        // create a new BigDecimal
        BigDecimal exampleBigDecimal = new BigDecimal();
        // set ValuesMapValuesInner to BigDecimal
        exampleValuesMapValuesInner.setActualInstance(exampleBigDecimal);
        // to get back the BigDecimal set earlier
        BigDecimal testBigDecimal = (BigDecimal) exampleValuesMapValuesInner.getActualInstance();

        // create a new Boolean
        Boolean exampleBoolean = new Boolean();
        // set ValuesMapValuesInner to Boolean
        exampleValuesMapValuesInner.setActualInstance(exampleBoolean);
        // to get back the Boolean set earlier
        Boolean testBoolean = (Boolean) exampleValuesMapValuesInner.getActualInstance();

        // create a new Integer
        Integer exampleInteger = new Integer();
        // set ValuesMapValuesInner to Integer
        exampleValuesMapValuesInner.setActualInstance(exampleInteger);
        // to get back the Integer set earlier
        Integer testInteger = (Integer) exampleValuesMapValuesInner.getActualInstance();

        // create a new Point
        Point examplePoint = new Point();
        // set ValuesMapValuesInner to Point
        exampleValuesMapValuesInner.setActualInstance(examplePoint);
        // to get back the Point set earlier
        Point testPoint = (Point) exampleValuesMapValuesInner.getActualInstance();

        // create a new String
        String exampleString = new String();
        // set ValuesMapValuesInner to String
        exampleValuesMapValuesInner.setActualInstance(exampleString);
        // to get back the String set earlier
        String testString = (String) exampleValuesMapValuesInner.getActualInstance();
    }
}
```


