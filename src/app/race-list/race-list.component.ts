import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-race-list',
    templateUrl: 'race-list.component.html',
    styleUrls: ['race-list.component.css']
})
export class RaceListComponent implements OnInit{
    public isLoading=false;
    public race_arr:any;

    constructor(private http:HttpClient){

    }
    ngOnInit(){
        //console.log(new Date().getTime());
        this.isLoading=true;
        this.http.get('http://localhost:3000/api/get_all_race').subscribe((result)=>{
            this.race_arr=result;
            this.isLoading=false;
        });
    }
}