import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Task_2';

  currentMsgFromChild1ToChild2: any;
  fwdMsgToSib2($event: any) { this.currentMsgFromChild1ToChild2 = $event; }
  
}
