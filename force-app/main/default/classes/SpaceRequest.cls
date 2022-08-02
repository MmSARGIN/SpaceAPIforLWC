public with sharing class SpaceRequest {
 @AuraEnabled
 public static string getData(){
    try {
        Http http = New Http();
        HttpRequest req = New HttpRequest();
        String endpoint = 'http://api.open-notify.org/iss-now.json';

        req.setEndpoint(endpoint);
        req.setMethod('GET');
        

        HttpResponse res = http.send(req);

        String data = res.getBody();
        System.debug('Status Code : '+ res.getStatusCode());
        System.debug('Response BODY: '+ res.getBody());
        return data;

    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
 }
 @AuraEnabled
 public static string getPerson(){
    try {
        Http http = New Http();
        HttpRequest request = New HttpRequest();
        String endPoint = 'http://api.open-notify.org/astros.json';

        request.setEndpoint(endPoint);
        request.setMethod('GET');
        

        HttpResponse response = http.send(request);

        String person = response.getBody();
        System.debug('Status Code : '+ response.getStatusCode());
        System.debug('Response BODY: '+ response.getBody());
        return person;

    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
 }
}
