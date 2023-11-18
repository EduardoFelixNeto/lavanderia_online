package br.com.felix.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.RevenueReportDTO;
import br.com.felix.model.Transaction;
import br.com.felix.repositories.TransactionRepository;

@Service
public class TransactionServices {

	@Autowired
	TransactionRepository repository;
	
	public List<Transaction> findAll() {
		return repository.findAll();
	}
	
	public Long findMaxId() {
        return repository.findTopByOrderByIdDesc().map(Transaction::getId).orElse(0L);
    }
	
	public Transaction findById(Long id) {
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public List<Transaction> findByUserIdAndStatus(Long id, String status) {
	    return repository.findByUserIdAndStatus(id, status);
	}
	
	public List<Transaction> findByUserId(Integer userId) {
	    return repository.findByUserId(userId);
	}

	
	public Transaction create(Transaction transaction) {
		
		return repository.save(transaction);
	}
	
	public Transaction update(Transaction transaction) {
		
		var entity = repository.findById(transaction.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		
		entity.setUserId(transaction.getUserId());
		entity.setStatus(transaction.getStatus());
		entity.setTerm(transaction.getTerm());
		entity.setAmount(transaction.getAmount());
		entity.setIsPaid(transaction.getIsPaid());
		entity.setTransactionDate(transaction.getTransactionDate());
		
		return repository.save(transaction);
	}
	
	public void delete(Long id) {

		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		repository.delete(entity);
	}

	public List<Transaction> findAllByStatus(String status) {
		return repository.findAllByStatus(status);
	}
	
	public List<RevenueReportDTO> calculateRevenue(LocalDate startDate, LocalDate endDate) {
        List<Transaction> transactions = repository.findByTransactionDateBetween(startDate, endDate);
        
        // Create a map to keep track of daily revenue and count of orders
        Map<LocalDate, DailyStats> dailyStatsMap = new HashMap<>();

        // Aggregate revenue and count of orders by day
        for (Transaction transaction : transactions) {
            LocalDate date = transaction.getTransactionDate(); // assuming you have a getTransactionDate method
            double amount = transaction.getAmount();

            DailyStats stats = dailyStatsMap.getOrDefault(date, new DailyStats());
            stats.totalRevenue += amount;
            stats.ordersCount++;
            dailyStatsMap.put(date, stats);
        }

        // Convert to List<RevenueReportDTO>
        List<RevenueReportDTO> revenueReport = new ArrayList<>();
        for (Map.Entry<LocalDate, DailyStats> entry : dailyStatsMap.entrySet()) {
            LocalDate date = entry.getKey();
            DailyStats stats = entry.getValue();
            double averageOrderValue = (stats.ordersCount > 0) ? stats.totalRevenue / stats.ordersCount : 0;

            revenueReport.add(new RevenueReportDTO(date, stats.totalRevenue, stats.ordersCount, averageOrderValue));
        }
        
        revenueReport.sort(Comparator.comparing(RevenueReportDTO::getDate));

        return revenueReport;
    }

    // Helper class to hold daily statistics
    private static class DailyStats {
        double totalRevenue = 0;
        int ordersCount = 0;
    }

}
