import { Component, OnInit } from '@angular/core';

import {
    SpacesMessagesService,
} from 'spaces-ng/';

import { MainComponent } from '../../main.component';
import { TransferService } from '../../services/transfer.service';

declare var $:any;

@Component({
    selector: 'uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.less']
})
export class UploaderComponent implements OnInit {
    public owner: string = '';
    public title: string = '';

    constructor(
        private messages: SpacesMessagesService,
        private mainComponent: MainComponent,
        private transfer: TransferService
    ) { }

    ngOnInit() {
    }

    uploadFile(fileInput: any) {
        let _this = this;
        let reader = new FileReader();
        reader.readAsText(fileInput.target.files[0]);

        // put the file's text into the text area
        reader.onload = function(evt) {
            _this.transfer.setValue('text', reader.result);
        };
        reader.onerror = function (evt) {
            _this.messages.showError('Unable to read file', "Error reading file:" + evt.target + ".")
            console.error(evt);
        };
    }

    startTransfer() {
        this.transfer.setValue('owner', this.owner);
        this.transfer.setValue('title', this.title);

        if (this.owner === '') {
            this.messages.showError('No owner', 'Please enter a ThreatConnect owner you would like to explore')
            return;
        }

        if (this.transfer.getValue('text') === '' && this.title === '') {
            this.messages.showError('No input', 'Please enter a headline you would like to explore or upload a document')
            return;
        }

        this.transfer.startTransfer();
        let _this = this;

        window.setTimeout(function() {
            _this.mainComponent.router.navigate(['analyze']);
        }, 5000)
    }

}
