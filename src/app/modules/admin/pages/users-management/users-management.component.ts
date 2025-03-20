import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = '';
  showModal: boolean = false;
  isEditing: boolean = false;
  newUser: User = this.getEmptyUser();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openCreateModal(): void {
    this.newUser = this.getEmptyUser();
    this.isEditing = false;
    this.showModal = true;
  }

  editUser(user: User): void {
    this.newUser = { ...user };
    this.isEditing = true;
    this.showModal = true;
  }

  saveUser(): void {
    if (this.isEditing) {
      this.usersService.updateUser(this.newUser.id, this.newUser).subscribe(() => {
        this.loadUsers();
        this.showModal = false;
      });
    } else {
      this.usersService.createUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.showModal = false;
      });
    }
  }

  deleteUser(userId: number): void {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      this.usersService.deleteUser(userId).subscribe(() => this.loadUsers());
    }
  }

  private getEmptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      role: 'Customer',
      status: 'Active',
      address: {
        street: '',
        number: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        geolocation: { lat: 0, long: 0 }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
