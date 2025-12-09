import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService, DashboardStats } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
  
  showBroadcastModal = false;
  notificationType = 'ANNOUNCEMENT';
  notificationTitle = '';
  notificationMessage = '';
  
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loading = false;
  }
  
  openBroadcastModal() {
    this.showBroadcastModal = true;
  }
  
  closeBroadcastModal() {
    this.showBroadcastModal = false;
    this.notificationType = 'ANNOUNCEMENT';
    this.notificationTitle = '';
    this.notificationMessage = '';
  }
  
  sendBroadcast() {
    if (!this.notificationTitle || !this.notificationMessage) return;
    
    this.adminService.broadcastNotification(
      this.notificationType,
      this.notificationTitle,
      this.notificationMessage
    ).subscribe({
      next: () => {
        alert('Notification sent to all users!');
        this.closeBroadcastModal();
      },
      error: (err) => alert('Failed to send notification')
    });
  }
}