package br.com.felix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.felix.exceptions.ResourceNotFoundException;
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

}
