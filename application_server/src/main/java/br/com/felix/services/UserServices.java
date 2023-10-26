package br.com.felix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.User;
import br.com.felix.repositories.UserRepository;

@Service
public class UserServices {

	@Autowired
	UserRepository repository;
	
	public List<User> findAll() {
		return repository.findAll();
	}
	
	public User findById(Long id) {
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public User create(User user) {
		
		return repository.save(user);
	}
	
	public User update(User user) {
		
		var entity = repository.findById(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		
		entity.setEmail(user.getEmail());
		entity.setPassword(user.getPassword());
		entity.setProfile(user.getProfile());
		entity.setCpf(user.getCpf());
		entity.setName(user.getName());
		entity.setAddress(user.getAddress());
		entity.setPhone(user.getPhone());
		
		return repository.save(user);
	}
	
	public void delete(Long id) {

		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		repository.delete(entity);
	}

	public User findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No records found for this email!"));
    }
	
}
