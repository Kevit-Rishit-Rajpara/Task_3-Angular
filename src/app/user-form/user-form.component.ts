import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userDataForm: FormGroup;
  qualification = '';
  editMode = localStorage.getItem("editMode");
  editedData: any;
  hobbyList = [
    { id: 1, label: 'cricket' },
    { id: 2, label: 'music' },
    { id: 3, label: 'travelling' },
    { id: 4, label: 'finance' },
    { id: 5, label: 'others' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Form Init");
    
    this.userDataForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      number: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[6-9]{1}?[0-9]{9}$'),
      ]),
      schoolName: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      percentage: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      hobby: new FormGroup({
        cricket: new FormControl(null),
        travelling: new FormControl(null),
        music: new FormControl(null),
        finance: new FormControl(null),
        others: new FormControl(null),
      }),
      gender: new FormControl(null, Validators.required),
      address: new FormControl(null),
      summary: new FormControl(null),
      id: new FormControl(null),
    });
    this.userDataForm.get('qualification')?.setValue('SSC');

    if (this.editMode) {
      this.dataService
        .fetchData(+localStorage.getItem('diplayIndex'))
        .subscribe((response: any) => {
          this.userDataForm.setValue(response);
          this.onSavetoLocal();
          this.retriveFromLocal();
        });
    }
    this.retriveFromLocal();

  }

  onSavetoLocal() {
    localStorage.setItem('formData', JSON.stringify(this.userDataForm.value));
  }

  retriveFromLocal() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
      this.userDataForm.patchValue(formData);
    }
  }

  changeQua(e: any) {
    this.qualification = e.target.value;
  }

  onReset() {
    localStorage.removeItem('formData');
    console.log(this.userDataForm.value.qualification);
    
    this.ngOnInit()
  }
  onBack() {
    this.router.navigate(['/userList']);
  }

  onSubmit(data: any) {
    if (!this.userDataForm.valid) {
      alert('Please enter Valid Data');
    } else {
      if (this.editMode) {
        this.dataService
          .putData(this.userDataForm.value)
          .subscribe((response: any) => {
            console.log('Data Updated Successfully!');
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
              title: 'Data Updated Successfully',
            });
          });
        this.router.navigate(['/userList']);
      } else {
        this.dataService
          .postData(this.userDataForm.value)
          .subscribe((response: any) => {
            console.log('Data Added Succesfully in DB.JSON');
          });
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
          title: 'Data Saved Successfully',
        });
        this.router.navigate(['/userList']);
      }
    }
  }
}
