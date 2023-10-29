package br.com.felix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.felix.model.TransactionLine;

@Repository
public interface TransactionLineRepository extends JpaRepository<TransactionLine,Long>{
	
	Optional<TransactionLine> findTopByOrderByIdDesc();

	List<TransactionLine> findByTransactionId(Long TransactionId);
}