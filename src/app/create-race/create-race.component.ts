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

        var ul="http://localhost:3000/api/post_race/?title="+this.race.title+"&author="+this.race.author+"&data="+this.race.data;

        this.http.get<any>(ul).subscribe((result) => {
            if (result.msg === "done") {
                swal("Success!!!", "Race data has been saved to server!!", "success");
            }
            else {
                swal("Error!!", "Unknown error occured!!", "error");
            }
        });
    }
}