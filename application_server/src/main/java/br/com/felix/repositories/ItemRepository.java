package br.com.felix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.felix.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{

}
