/**
 * Created by Michael on 7/31/16.
 */

import {Directive, ElementRef, Renderer, Input, HostBinding} from '@angular/core';
import {IModalShown} from "./interfaces";

@Directive({
    selector: '[modal-show]'
})
export class ModalDirective {

    @Input('modal-show') modalShow: IModalShown;

    @HostBinding('class.open') get setState() {
        return this.modalShow.show;
    }

    constructor(private _el: ElementRef,
                private _renderer: Renderer) {}

}