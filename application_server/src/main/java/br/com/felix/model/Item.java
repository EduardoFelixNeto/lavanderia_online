package br.com.felix.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Item")
public class Item implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name", nullable=false, length = 100)
	private String name;
	
	@Column(name = "term", nullable=false, length = 100)
	private Integer term;
	
	@Column(name = "amount", nullable=false, length = 100)
	private Double amount;
	
	@Column(name = "createdAt", nullable=false, length = 100)
	private Date createdAt;
	
	@Column(name = "updatedAt", nullable=false, length = 100)
	private Date updatedAt;
	
	

	public Item() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTerm() {
		return term;
	}

	public void setTerm(Integer term) {
		this.term = term;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public int hashCode() {
		return Objects.hash(amount, createdAt, id, name, term, updatedAt);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Item other = (Item) obj;
		return Objects.equals(amount, other.amount) && Objects.equals(createdAt, other.createdAt) && id == other.id
				&& Objects.equals(name, other.name) && Objects.equals(term, other.term)
				&& Objects.equals(updatedAt, other.updatedAt);
	}
	
	
}
