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

import br.com.felix.model.TransactionLine;
import br.com.felix.services.TransactionLineServices;

@RestController
@RequestMapping("/transactionLine")
@CrossOrigin( origins = "http://localhost:4200")
public class TransactionLineController {
	
	@Autowired
	private TransactionLineServices service;
	
	@GetMapping(
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<TransactionLine> findAll() throws Exception{
		return service.findAll();
	}
	@GetMapping(value = "/id/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
	public TransactionLine findById(@PathVariable(value="id") Long id) throws Exception{
	    return service.findById(id);
	}
	@GetMapping("/maxId")
    public ResponseEntity<Long> getMaxTransactionLineId() {
        Long maxId = service.findMaxId();
        return ResponseEntity.ok(maxId);
    }
	@PostMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public TransactionLine create(@RequestBody TransactionLine transactionLine) {
		return service.create(transactionLine);
	}
	@PutMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public TransactionLine update(@RequestBody TransactionLine transactionLine) {
		return service.update(transactionLine);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable(value="id") Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();	
		}

}
