import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import LOCATION from '@salesforce/messageChannel/Location__c';

export default class TextLocation extends LightningElement {
    @wire(MessageContext)
    messageContext;
    lat;
    long;
    subscribeToMessageChannel(){
        this.subscription = subscribe(
            this.messageContext,
            LOCATION,
            (message) =>{
                console.log('message',message);
                this.lat = message.latitude;
                this.long = message.longitude;
            }
        );
        
    }
    connectedCallback(){
        this.subscribeToMessageChannel();
    }
}