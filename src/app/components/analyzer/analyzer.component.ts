import { Component, OnInit } from '@angular/core';

import {
    SpacesMessagesService,
} from 'spaces-ng/';

import { TcIndicatorService } from 'threatconnect-ng';

import { TransferService } from '../../services/transfer.service';
import { Item } from '../../interfaces';

declare var $:any;

@Component({
  selector: 'analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.less']
})
export class AnalyzerComponent implements OnInit {
    private text: string;
    private owner: string;
    public title: string;
    public groups: Item[] = [];
    public documentIndicators: string[];
    public matchingIndicators: Item[] = [];
    public similarIndicators: Item[] = [];
    public matchingTags: string[] = [];
    public similarTags: string[] = [];

    constructor(
        private messages: SpacesMessagesService,
        private tcInd: TcIndicatorService,
        private transfer: TransferService,
    ) { }

    ngOnInit() {
        this.text = this.transfer.getValue('text');
        this.owner = this.transfer.getValue('owner');
        this.title = this.transfer.getValue('title');
        this.groups = this.transfer.groups;
        this.startAnalysis();
    }

    private parseIndicators() {
        /* Parse indicators from the document. */
        // TODO: implement
        this.documentIndicators = ['1.2.3.4'];
    }

    private getIndicators() {
        this.tcInd.getAll('Indicator', 1000, 0, this.owner)
            .subscribe(
            res => {
                    for (var i = res.indicator.length - 1; i >= 0; i--) {
                        if (this.documentIndicators.indexOf(res.indicator[i].summary) !== -1) {
                            this.matchingIndicators.push({
                                id: res.indicator[i].id,
                                name: res.indicator[i].summary
                            })
                        }
                    }
                }, err => {
                    console.error('Error', err);
                    this.messages.showError('Failed', 'Loading indicators');
                }
            );
    }

    private getTags() {
        // TODO: implement
        return;
    }

    startAnalysis() {
        this.parseIndicators();
        this.getIndicators();
        this.getTags();
    }

}
