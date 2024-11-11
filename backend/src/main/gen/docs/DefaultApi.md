# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUsersFetchAllGet**](DefaultApi.md#apiUsersFetchAllGet) | **GET** /api/users/fetch/all | List all users |


<a id="apiUsersFetchAllGet"></a>
# **apiUsersFetchAllGet**
> apiUsersFetchAllGet()

List all users

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    try {
      apiInstance.apiUsersFetchAllGet();
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#apiUsersFetchAllGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

