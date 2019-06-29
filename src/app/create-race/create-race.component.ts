import { Component } from '@angular/core';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-create-race',
    templateUrl: 'create-race.component.html',
    styleUrls: ['create-race.component.css']
})
export class CreateRaceComponent {

    private race: {
        title:string,
        author: string,
        data: string
    };

    constructor(private http: HttpClient) {

    }

    save_race(race_title, race_author, race_data) {
        if (race_title === "" || race_author === "" || race_data === "") {
            swal("Error!!", "Fields cannot be empty!!", "error");
            return;
        }

        this.race = {
            title:race_title,
            author: race_author,
            data: race_data
        };

        this.http.post<any>("/api/post_race", this.race).subscribe((result) => {
            if (result.msg === "done") {
                swal("Success!!!", "Race data has been saved to server!!", "success");
            }
            else {
                swal("Error!!", "Unknown error occured!!", "error");
            }
        });
    }
}