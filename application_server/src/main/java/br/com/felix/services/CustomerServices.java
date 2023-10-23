package br.com.felix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.Customer;
import br.com.felix.repositories.CustomerRepository;

@Service
public class CustomerServices {

	@Autowired
	CustomerRepository repository;
	
	public List<Customer> findAll() {
		return repository.findAll();
	}
	
	public Customer findById(Long id) {
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public Customer create(Customer customer) {
		
		return repository.save(customer);
	}
	
	public Customer update(Customer customer) {
		
		var entity = repository.findById(customer.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		
		entity.setEmail(customer.getEmail());
		entity.setPassword(customer.getPassword());
		entity.setProfile(customer.getProfile());
		
		return repository.save(customer);
	}
	
	public void delete(Long id) {

		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		repository.delete(entity);
	}
	
}
