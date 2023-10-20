package br.com.felix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.felix.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{}
