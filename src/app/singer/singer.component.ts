import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SongService } from './../services/song.service';
import { LocationService } from './../services/location.service';

@Component({
    selector: 'app-singer',
    templateUrl: './singer.component.html',
    styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
    title = 'kDJgo';
    search: any = '';
    songs: any = [];
    locations: any = [];
    selectedSong: any = false;
    selectedLocation: any = '';

    modalRef: BsModalRef;

    songTerm$ = new Subject<string>();

    constructor(
        private songService: SongService,
        private locationService: LocationService,
        private modalService: BsModalService,
    ) {
        this.songService.search(this.songTerm$).subscribe(songs => { 
            this.songs = songs;
        });
    }

    ngOnInit() {
        this.locationService.getLocations().subscribe(locations => {
            this.locations = locations;
        });
    }

    openModal(template: TemplateRef<any>, song) {
        this.selectedSong = song;
        this.modalRef = this.modalService.show(template);
    }

    setLocation(location) {
        this.selectedLocation = location.name;
    }

    selectSong(song) {
        this.selectedSong = song;
    }

    singIt() {
        this.modalRef.hide();
    }

}
