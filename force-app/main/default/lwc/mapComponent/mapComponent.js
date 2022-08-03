import { LightningElement, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import LOCATION from '@salesforce/messageChannel/Location__c';




export default class MapComponent extends LightningElement {
    @wire(MessageContext)
    messageContext;
    zoomLevel = 2;
    lat;
    long;
   mapMarkers = [
        {
            location: {
                Latitude: '37.790197',
                Longitude: '-122.396879',
            },
        }
    ];
    center = { 
        location: { Latitude: '40.7831856', Longitude: '-73.9675653' }, 
    };
    subscribeToMessageChannel(){
        this.subscription = subscribe(
            this.messageContext,
            LOCATION,
            (message) => this.handleClick(message)
        );
    }
    connectedCallback(){
        this.subscribeToMessageChannel();
    }
   
    handleClick(message){
       console.log('Message :', message);
       this.lat = message.latitude;
       this.long = message.longitude;
       
       this.mapMarkers = [
        {
            location: {
                Latitude: message.latitude,
                Longitude: message.longitude,
            },
        }
    ];
        
         }
   
}