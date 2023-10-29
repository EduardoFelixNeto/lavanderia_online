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

import br.com.felix.model.Item;
import br.com.felix.services.ItemServices;

@RestController
@RequestMapping("/item")
@CrossOrigin( origins = "http://localhost:4200")
public class ItemController {
	
	@Autowired
	private ItemServices service;
	
	@GetMapping(
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Item> findAll() throws Exception{
		return service.findAll();
	}
	
	@GetMapping(value = "/{id}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Item findById(@PathVariable(value="id") Long id) throws Exception{
		return service.findById(id);
	}
	
	@PostMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Item create(@RequestBody Item item) {
		return service.create(item);
	}
	
	@PutMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public Item update(@RequestBody Item item) {
		return service.update(item);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable(value="id") Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();	
		}
	
}
