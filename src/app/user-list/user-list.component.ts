import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  usersDataArray: any[] = [];
  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('editMode');   
    localStorage.removeItem('diplayIndex');   
    localStorage.removeItem('formData');   
    this.dataService.getData().subscribe((response: any) => {
      this.usersDataArray = response;
    });
  }

  onAddUser() {
    this.router.navigate(['/userForm']);
  }

  onLogout() {
    localStorage.removeItem('isAuthenticated')
    this.authService.logout();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Loged Out',
    });
    this.router.navigate(['/login']);
  }

  displayDetail(index: number) {
    localStorage.setItem('editMode', 'true');
    localStorage.setItem('diplayIndex', this.usersDataArray[index].id);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'info',
      title: this.usersDataArray[index].name + "'s Details",
    });
    this.router.navigate(['/user/' + this.usersDataArray[index].id]);
  }

  onDelete(event, index: number) {
    event.stopPropagation();
    this.dataService
      .deleteData(this.usersDataArray[index].id)
      .subscribe((response: any) => {
        console.log(response);
        console.log('Deleted Succesfully');
        this.dataService.getData().subscribe((response: any) => {
          this.usersDataArray = response;
        });
      });
  }
}
