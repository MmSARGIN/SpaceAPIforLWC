import { LightningElement, wire } from 'lwc';
import SpaceRequest from '@salesforce/apex/SpaceRequest.getData';
import getPerson from '@salesforce/apex/SpaceRequest.getPerson';
import {publish, MessageContext } from "lightning/messageService";
import LOCATION from '@salesforce/messageChannel/Location__c';





export default class SpaceComponent extends LightningElement {
    people;
    latLong;
    lat;
    long;
    repos;
    repos2;
    data;
    data2;
    @wire(MessageContext)
    messageContext;
        
    
    connectedCallback(){
        
        SpaceRequest()
        .then(res => {
            let data = JSON.parse(res);
        
            this.repos = data;
            this.latLong = {lat : data.iss_position.latitude, long: data.iss_position.longitude};
            this.lat = this.latLong.lat;
            this.long = this.latLong.long;
            const payload = {
                operator : 'location',
                latitude : this.lat,
                longitude : this.long
            }
            publish(this.messageContext, LOCATION, payload);
            
            
        })
        getPerson()
        .then(response => {
            let data2 = JSON.parse(response);
            
            this.repos2 = data2;
            this.people = data2.people;
           
        })
        
        

        this.people = [];
        this.latLong = {};
        this.lat = '';
        this.long = '';
        this.repos = {};
        this.repos2 = {};
    }
    handleRefresh(){
        this.connectedCallback();
         }
}
