package br.com.felix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.Item;
import br.com.felix.repositories.ItemRepository;

@Service
public class ItemServices {
	
	@Autowired
	ItemRepository repository;
	
	public List<Item> findAll() {
		return repository.findAll();
	}
	
	public Item findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public Item create(Item item) {
		return repository.save(item);
	}
	
	public Item update(Item item) {
		var entity = repository.findById(item.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		entity.setName(item.getName());
		entity.setTerm(item.getTerm());
		entity.setAmount(item.getAmount());
		entity.setCreatedAt(item.getCreatedAt());
		entity.setUpdatedAt(item.getUpdatedAt());
		return repository.save(item);
	}
	
	public void delete(Long id) {
		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		repository.delete(entity);
	}
}
