import { Injectable } from '@angular/core';

import {
    SpacesMessagesService,
} from 'spaces-ng/';

import { TcGroupService } from 'threatconnect-ng';

import { Item } from '../interfaces';

@Injectable()
export class TransferService {
    private text: string = '';
    private owner: string;
    private title: string;
    public groups: Item[] = [];

    constructor(
        private messages: SpacesMessagesService,
        private tcGroup: TcGroupService,
    ) { }

    setValue(valueName: string, value: string) {
        this[valueName] = value;
    }

    getValue(valueName: string) {
        return this[valueName];
    }

    private getGroupNames() {
        this.tcGroup.getAll(1000, 0, this.owner)
            .subscribe(
                res => {
                    for (var i = res.group.length - 1; i >= 0; i--) {
                        this.groups.push({
                            id: res.group[i].id,
                            name: res.group[i].name.toLowerCase()
                        })
                    }
                },
                err => {
                    console.error('Error', err);
                    this.messages.showError('Failed', 'Loading groups');
                }
            );
    }

    startTransfer() {
        this.getGroupNames();
    }
}
