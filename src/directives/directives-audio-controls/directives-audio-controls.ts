import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[directives-audio-controls]' // Attribute selector
})
export class DirectivesAudioControlsDirective {
@Input('url') url
  constructor() {
    console.log('Hello DirectivesAudioControlsDirective Directive');
  }

}
