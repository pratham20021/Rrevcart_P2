import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService, DashboardStats } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  totalProducts = 0;
  totalOrders = 0;
  totalUsers = 0;
  totalRevenue = 0;
  loading = true;
  
  todayOrders = 0;
  todayRevenue = 0;
  pendingDeliveries = 0;
  newCustomers = 0;
  
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loading = false;
  }
}