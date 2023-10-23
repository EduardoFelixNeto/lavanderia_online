package br.com.felix.model;

import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Transaction")
public class Transaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "customerId", nullable=false, length = 10)
	private Integer customerId;
	
	@Column(name = "status", nullable=true, length = 100)
	private String status;
	
	@Column(name = "term", nullable=true, length = 20)
	private Integer term;
	
	@Column(name = "amount", nullable=true, length = 100)
	private Double amount;
	
	@Column(name = "isPaid", nullable=false, length = 20)
	private Boolean isPaid;
	
	@Column(name = "createdAt", nullable=false, length = 10)
	private Date createdAt;

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Transaction() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public Boolean getIsPaid() {
		return isPaid;
	}

	public void setIsPaid(Boolean isPaid) {
		this.isPaid = isPaid;
	}

	@Override
	public int hashCode() {
		return Objects.hash(amount, createdAt, customerId, id, isPaid, status, term);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Transaction other = (Transaction) obj;
		return Objects.equals(amount, other.amount) && Objects.equals(createdAt, other.createdAt)
				&& Objects.equals(customerId, other.customerId) && id == other.id
				&& Objects.equals(isPaid, other.isPaid) && Objects.equals(status, other.status)
				&& Objects.equals(term, other.term);
	}
	
	
	
	
	
}
