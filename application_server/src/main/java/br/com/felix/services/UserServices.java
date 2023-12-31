package br.com.felix.services;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.felix.exceptions.ResourceNotFoundException;
import br.com.felix.model.User;
import br.com.felix.repositories.UserRepository;
import br.com.felix.utils.PasswordUtils;

@Service
public class UserServices {

	@Autowired
	UserRepository repository;
	
	@Autowired
    private EmailService emailService;
	
	public List<User> findAll() {
		return repository.findAll();
	}
	
	public User findById(Long id) {
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
	}
	
	public User create(User user) {
		String randomPassword = generateRandomPassword();
	    user.setPassword(randomPassword);
	    emailService.sendSimpleMessage(user.getEmail(), "Bem-vindo ao LOL", "Sua senha é: " + randomPassword);
	    String salt = PasswordUtils.getSalt();
	    user.setSalt(salt);
	    user.setPassword(PasswordUtils.generateHash(user.getPassword(), salt));
		return repository.save(user);
	}
	
	public boolean checkPassword(User user, String password) {
	    String hashedPassword = PasswordUtils.generateHash(password, user.getSalt());
	    return hashedPassword.equals(user.getPassword());
	}
	
	private String generateRandomPassword() {
	    // Implemente seu gerador de senha
	    return String.valueOf(new Random().nextInt(8999) + 1000); // Senha de 4 dígitos
	}
	
	public User update(User user) {
		
		var entity = repository.findById(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No records found for this ID!"));
		
		String salt = PasswordUtils.getSalt();
	    user.setSalt(salt);
	    user.setPassword(PasswordUtils.generateHash(user.getPassword(), salt));
		
		
		entity.setEmail(user.getEmail());
		entity.setPassword(user.getPassword());
		entity.setProfile(user.getProfile());
		entity.setCpf(user.getCpf());
		entity.setName(user.getName());
		entity.setAddress(user.getAddress());
		entity.setPhone(user.getPhone());
		entity.setCep(user.getCep());
		
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
	
	public List<User> findByProfile(String profile) {
	    return repository.findByProfile(profile);
	}
	
}
