import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  @Output() editData = new EventEmitter<Object>();
  sharedData = {
    name: null,
    dob: null,
    email: null,
    number: null,
    schoolName: null,
    qualification: null,
    percentage: null,
    hobby: {
      cricket: null,
      travelling: null,
      music: null,
      finance: null,
      others: null,
    },
    gender: null,
    address: null,
    summary: null,
    id: null,
  };
  editMode = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService
      .fetchData(+localStorage.getItem('diplayIndex'))
      .subscribe((response: any) => {
        this.sharedData = response;
      });
  }

  onEdit(data: any) {
    this.dataService.editId = this.sharedData.id;
    this.router.navigate(['/editUser/' + this.dataService.editId]);
  }

  getKeysWithTrueValues(obj: { [key: string]: boolean }): string[] {
    return Object.keys(obj).filter((key) => obj[key] === true);
  }

  onGoBack() {
    this.router.navigate(['/userList']);
  }
}
