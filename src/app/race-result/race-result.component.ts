import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'race-result.component.html',
    styleUrls:['race-result.component.css']
})
export class RaceResultComponent implements OnInit{
    private race_id:string;
    private race_data:any;
    public isLoading:boolean=false;
    public isLoaded=false;
    constructor(private route:ActivatedRoute,private http:HttpClient){

    }

    ngOnInit(){
        this.isLoading=true;
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            this.race_id=paramMap.get('race_id');
            this.http.get("http://localhost:3000/api/get_one_result/"+this.race_id).subscribe((result)=>{
                this.isLoading=false;
                this.isLoaded=true;
                this.race_data=result;
            });
        });
    }
}