import { Component } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-atualizar-admin',
  templateUrl: './atualizar-admin.component.html',
  styleUrls: ['./atualizar-admin.component.css']
})
export class AtualizarAdminComponent {
  constructor(private adminService: AdminServiceService, private router: Router, private route: ActivatedRoute) { }

  admin: User = {
    email: '',
    password: ''
  }

  message!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const adminId = +params['id']; // '+' converts the parameter to a number
      this.getAdmin(adminId);
    });
  }

  getAdmin(id: number): void {
    this.adminService.getAdmin(id).subscribe(
      data => {
        this.admin = data;
        // Populate your form here
      },
      error => {
        console.error('Error fetching item data', error);
      }
    );
  }

  returnToHome(): void {
    this.router.navigate(['/admin_homepage'])
  }

  onUpdate(): void {
    this.adminService.updateAdmin(this.admin.id!, this.admin).subscribe(
      response => {
        console.log('Admin updated successfully', response);
        this.returnToHome();
      },
      error => {
        console.error('Error updating admin', error);
        this.message = 'Erro ao atualizar admin.'; 
      }
    );
  }
}
