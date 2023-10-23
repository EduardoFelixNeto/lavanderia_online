package br.com.felix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.felix.model.Customer;
import br.com.felix.services.CustomerServices;

@RestController
@RequestMapping("/customer")
@CrossOrigin( origins = "http://localhost:4200")
public class CustomerController {
	
	@Autowired
	private CustomerServices service;
	
	@GetMapping(
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Customer> findAll() throws Exception{
		return service.findAll();
	}
	@GetMapping(value = "/{id}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Customer findById(@PathVariable(value="id") Long id) throws Exception{
		return service.findById(id);
	}
	@PostMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Customer create(@RequestBody Customer customer) {
		return service.create(customer);
	}

	@PutMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Customer update(@RequestBody Customer customer) {
		return service.update(customer);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable(value="id") Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();	
		}

}
