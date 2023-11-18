package br.com.felix.model;

import java.time.LocalDate;

public class RevenueReportDTO {
    
    private LocalDate date;
    private Double totalRevenue;
    private Integer ordersCount; // Assuming you want to include this
    private Double averageOrderValue; // Assuming you want to include this

    // Constructor for date and total revenue only
    public RevenueReportDTO(LocalDate date, Double totalRevenue) {
        this.date = date;
        this.totalRevenue = totalRevenue;
    }

    // Constructor for all fields
    public RevenueReportDTO(LocalDate date, Double totalRevenue, Integer ordersCount, Double averageOrderValue) {
        this.date = date;
        this.totalRevenue = totalRevenue;
        this.ordersCount = ordersCount;
        this.averageOrderValue = averageOrderValue;
    }

    // Getters and Setters for all fields
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Integer getOrdersCount() {
        return ordersCount;
    }

    public void setOrdersCount(Integer ordersCount) {
        this.ordersCount = ordersCount;
    }

    public Double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(Double averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }
}
