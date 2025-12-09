package com.revcart.admin.service;

import com.revcart.admin.client.OrderServiceClient;
import com.revcart.admin.client.ProductServiceClient;
import com.revcart.admin.client.UserServiceClient;
import com.revcart.admin.dto.DashboardStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {
    
    @Autowired
    private ProductServiceClient productServiceClient;
    
    @Autowired
    private OrderServiceClient orderServiceClient;
    
    @Autowired
    private UserServiceClient userServiceClient;
    
    public DashboardStats getDashboardStats() {
        try {
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            
            Long totalProducts = restTemplate.getForObject("http://localhost:8083/products/count", Long.class);
            Long totalOrders = restTemplate.getForObject("http://localhost:8085/orders/count", Long.class);
            Long totalUsers = restTemplate.getForObject("http://localhost:8082/users/count", Long.class);
            Double totalRevenue = restTemplate.getForObject("http://localhost:8085/orders/revenue", Double.class);
            
            return new DashboardStats(
                totalProducts != null ? totalProducts : 0,
                totalOrders != null ? totalOrders : 0,
                totalUsers != null ? totalUsers : 0,
                totalRevenue != null ? totalRevenue : 0.0
            );
        } catch (Exception e) {
            System.err.println("Error fetching dashboard stats: " + e.getMessage());
            e.printStackTrace();
            return new DashboardStats(0, 0, 0, 0.0);
        }
    }
    
    public List<?> getRecentOrders() {
        return orderServiceClient.getRecentOrders();
    }
    
    public Object getSalesAnalytics() {
        return orderServiceClient.getSalesAnalytics();
    }
    
    public Object getTopProducts() {
        return productServiceClient.getTopProducts();
    }
    
    public Object getOrderStats() {
        return orderServiceClient.getOrderStats();
    }
    
    public Object getTodayMetrics() {
        try {
            return orderServiceClient.getTodayMetrics();
        } catch (Exception e) {
            System.err.println("Error fetching today metrics: " + e.getMessage());
            java.util.Map<String, Object> fallback = new java.util.HashMap<>();
            fallback.put("todayOrders", 0);
            fallback.put("todayRevenue", 0.0);
            fallback.put("pendingDeliveries", 0);
            return fallback;
        }
    }
}
