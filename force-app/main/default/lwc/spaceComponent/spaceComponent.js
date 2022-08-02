import { LightningElement } from 'lwc';
import SpaceRequest from '@salesforce/apex/SpaceRequest.getData';
import getPerson from '@salesforce/apex/SpaceRequest.getPerson';





export default class SpaceComponent extends LightningElement {
    people;
    latLong;
    lat;
    long;
    repos;
    repos2;
    data;
    data2;
    
        
    
    connectedCallback(){
        
        SpaceRequest()
        .then(res => {
            let data = JSON.parse(res);
            console.log(data)
            this.repos = data;
            this.latLong = {lat : data.iss_position.latitude, long: data.iss_position.longitude};
            this.lat = this.latLong.lat;
            this.long = this.latLong.long;
            console.log('latlong : ', this.latLong)
            console.log('lat :', this.lat)
            console.log('long : ', this.long)
            console.log('repos : ' , this.repos)
        })
        getPerson()
        .then(response => {
            let data2 = JSON.parse(response);
            console.log(data2);
            this.repos2 = data2;
            this.people = data2.people;
            console.log('people :' ,this.people)
            console.log('repos2 :', this.repos2 )
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
