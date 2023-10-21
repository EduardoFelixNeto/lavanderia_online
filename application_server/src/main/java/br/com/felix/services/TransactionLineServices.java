package br.com.felix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.TransactionLine;
import br.com.felix.repositories.TransactionLineRepository;

@Service
public class TransactionLineServices {

	@Autowired
	TransactionLineRepository repository;
	
	public List<TransactionLine> findAll() {
		return repository.findAll();
	}
	
	public Long findMaxId() {
        return repository.findTopByOrderByIdDesc().map(TransactionLine::getId).orElse(0L);
    }
	
	public TransactionLine findById(Long id) {
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public TransactionLine create(TransactionLine transactionLine) {
		
		return repository.save(transactionLine);
	}
	
	public TransactionLine update(TransactionLine transactionLine) {
		
		var entity = repository.findById(transactionLine.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		
		entity.setTransactionId(transactionLine.getTransactionId());
		entity.setUserId(transactionLine.getUserId());
		entity.setItemId(transactionLine.getItemId());
		entity.setQuantity(transactionLine.getQuantity());
		entity.setTerm(transactionLine.getTerm());
		entity.setTotalAmount(transactionLine.getTotalAmount());
		
		return repository.save(transactionLine);
	}
	
	public void delete(Long id) {

		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		repository.delete(entity);
	}

}
