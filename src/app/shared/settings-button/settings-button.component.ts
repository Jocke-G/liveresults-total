import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lrt-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss']
})
export class SettingsButtonComponent{

  @Output() clickSettings: EventEmitter<void> = new EventEmitter();

  dragging=false;

  onClick($event: MouseEvent): void {
    if(this.dragging) {
      this.dragging = false;
      return;
    }

    this.clickSettings.emit();
  }

  onDragStart($event: any): void {
    this.dragging = true;
  }
}
