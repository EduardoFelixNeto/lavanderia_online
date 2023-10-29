package br.com.felix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import br.com.felix.model.User;
import br.com.felix.services.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin( origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserServices service;
	
	@GetMapping(
			produces=MediaType.APPLICATION_JSON_VALUE)
	public List<User> findAll() throws Exception{
		return service.findAll();
	}
	@GetMapping(value = "/{id}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public User findById(@PathVariable(value="id") Long id) throws Exception{
		return service.findById(id);
	}
	@PostMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public User create(@RequestBody User user) {
		return service.create(user);
	}

	@PutMapping(
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public User update(@RequestBody User user) {
		return service.update(user);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable(value="id") Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();	
		}
	
	public static class LoginRequest {
        public String email;
        public String password;
    }

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
	    User user = service.findByEmail(loginRequest.email);

	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	    }

	    // Como mencionado anteriormente, é uma verificação simplificada.
	    // Em um cenário real, hash a senha e compare com a senha armazenada.
	    if (!user.getPassword().equals(loginRequest.password)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
	    }

	    // Excluindo a senha antes de enviar para o cliente
	    user.setPassword(null);

	    return ResponseEntity.ok(user);
	}
}

