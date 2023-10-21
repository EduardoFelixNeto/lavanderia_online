package br.com.felix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.felix.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long>{

	List<Transaction> findByUserIdAndStatus(Long userId, String status);
	
	Optional<Transaction> findTopByOrderByIdDesc();
}