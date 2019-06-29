import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

@Component({
    templateUrl: 'race.component.html'
})
export class RaceComponent implements OnInit {
    public isLoading = false;
    public race: any;
    public isRacing = false;
    public race_id: string;

    //for color
    private isMatched: boolean;

    //for user taking race
    public user: {
        name: string,
        email: string
    }


    // for spliting the array
    private past: string;
    private present: string;
    private future: string;
    private current_word: number = 0;
    public words_arr: any;
    public no_of_words: number;
    public input_text: string;


    //codes for timer
    private msec = 0;
    private sec = 0;
    private min = 0;
    private timer = setInterval(() => {
        if (this.isRacing) {
            this.msec += 50;
            if (this.msec == 1000) {
                this.sec++;
                this.msec = 0;
            }
            if (this.sec == 60) {
                this.min++;
                this.sec = 0;
            }
        }
    }, 50);

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {

    }
    ngOnInit() {
        swal("Guidelines:", "You have to type each word in the box.\nThe timer will start when you press first key the box.\nAt the end of each word press SPACE");
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.isLoading = true;
            this.race_id = paramMap.get('race_id');
            this.http.get<any>('http://localhost:3000/api/get_one_race/' + this.race_id).subscribe((result) => {
                this.isLoading = false;
                if (result.id) {
                    this.race = result;
                    this.no_of_words = result.race_data.split(' ').length;
                    this.words_arr = result.race_data.split(' ');
                    this.past = this.words_arr.slice(0, this.current_word).join(" ");
                    this.present = this.words_arr[this.current_word];
                    this.future = this.words_arr.slice(this.current_word + 1, this.words_arr.length).join(" ");
                } else {
                    swal("Error!!", "Something went wrong!!", "error");
                }
            });
        });
    }

    on_key_up(event) {
        if (!this.isRacing) {
            this.isRacing = true;
        }

        if (event.key === " ") {
            // checking if the word is correct if pressed space
            if (this.present === this.input_text.slice(0, this.input_text.length - 1)) {
                this.current_word++;
                this.input_text = "";
                this.past = this.words_arr.slice(0, this.current_word).join(" ");
                this.present = this.words_arr[this.current_word];
                this.future = this.words_arr.slice(this.current_word + 1, this.words_arr.length).join(" ");
            }
            //reached at the end of race
            if (this.current_word == this.no_of_words) {
                clearInterval(this.timer);
                swal("Great!!", "You completed this race in " + this.min + " min, " + this.sec + "." + this.msec + " sec!!!\nYour data is being sent to the server!!!", "success");
                //sending result to server
                this.http.post('/api/post_result', {
                    name: this.user.name,
                    email: this.user.email,
                    race_id: this.race_id,
                    min: this.min,
                    sec: this.sec,
                    msec: this.msec
                }).subscribe((result) => {
                    this.router.navigate(['/race-result',this.race_id]);
                });
                return;
            }
        }

        //checking the typed is correct or not
        if (this.current_word < this.no_of_words) {
            var present_part = this.present.slice(0, this.input_text.length);
            if (present_part === this.input_text && this.input_text !== "") {
                this.isMatched = true;
            }
            else {
                this.isMatched = false;
            }
        }
    }

    get_color() {
        if (this.isMatched) {
            return "green";
        } else {
            return "red";
        }
    }

    save_user(user_name, user_email) {
        this.user = {
            name: user_name,
            email: user_email
        }
    }

}