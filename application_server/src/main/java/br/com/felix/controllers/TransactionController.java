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

import br.com.felix.model.Transaction;
import br.com.felix.services.TransactionServices;

@RestController
@RequestMapping("/transaction")
@CrossOrigin( origins = "http://localhost:4200")
public class TransactionController {
	
	@Autowired
	private TransactionServices service;
	
	@GetMapping(
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Transaction> findAll() throws Exception{
		return service.findAll();
	}
	@GetMapping(value = "/userId/{userId}", produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Transaction> findByUserId(@PathVariable(value="userId") Integer userId) throws Exception{
	    return service.findByUserId(userId);
	}
	@GetMapping(value = "/userId/{id}/status/{status}", produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Transaction> findByUserIdAndStatus(
	        @PathVariable(value="id") Long id,
	        @PathVariable(value="status") String status) throws Exception{
	    return service.findByUserIdAndStatus(id,status);
	}
	@GetMapping("/maxId")
    public ResponseEntity<Long> getMaxTransactionId() {
        Long maxId = service.findMaxId();
        return ResponseEntity.ok(maxId);
    }
	@GetMapping(value = "/status/{status}", produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Transaction> findAllByStatus(
	        @PathVariable(value="status") String status) throws Exception{
	    return service.findAllByStatus(status);
	}
	@PostMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Transaction create(@RequestBody Transaction transaction) {
		return service.create(transaction);
	}

	@PutMapping(
		    path = "/{id}",
		    consumes = MediaType.APPLICATION_JSON_VALUE,
		    produces = MediaType.APPLICATION_JSON_VALUE)
		public Transaction update(@PathVariable("id") Long id, @RequestBody Transaction transaction) {
		    return service.update(transaction);
		}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable(value="id") Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();	
		}

}
