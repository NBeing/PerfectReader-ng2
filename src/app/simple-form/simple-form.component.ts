import {
    Component,
    OnInit,
    Inject,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'

import { Subject } from "rxjs/Subject"

@Component({
    //encapsulation: ViewEncapsulation.Native
    selector: 'app-simple-form',
    templateUrl: './simple-form.component.html',
    styles: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {

    @Input() message;

    @Output() update = new EventEmitter();

    // selected = true;
    items = new Subject();

    constructor( @Inject('mail') private mail, @Inject('http') private http) { }

    ngOnInit() {
        this.items = this.http.getParagraphs()
            .flatMap((item) => item)
            .map((e) => { return e.paragraph })
            .reduce((acc, cur) => ([...acc, cur]), [])
            .do((x) => { console.log(x); return x })
    }

    // toggleSelected() {
    //     this.selected = !this.selected;
    //     console.log(this.selected)
    // }

    // onClick(event, value) {
    //     console.log(event, value);
    // }
}
