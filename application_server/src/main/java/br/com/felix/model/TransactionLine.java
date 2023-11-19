package br.com.felix.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TransactionLine")
public class TransactionLine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "transactionId", nullable=false, length = 10)
	private Integer transactionId;
	
	@Column(name = "userId", nullable=false, length = 10)
	private Integer userId;
	
	@Column(name = "itemId", nullable=false, length = 10)
	private Integer itemId;
	
	@Column(name = "itemName", nullable=false, length = 50)
	private String itemName;
	
	@Column(name = "quantity", nullable=false, length = 10)
	private Integer quantity;
	
	@Column(name = "term", nullable=false, length = 10)
	private Integer term;
	
	@Column(name = "totalAmount", nullable=false, length = 10)
	private Double totalAmount;

	public TransactionLine() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Integer transactionId) {
		this.transactionId = transactionId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getTerm() {
		return term;
	}

	public void setTerm(Integer term) {
		this.term = term;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, itemId, itemName, quantity, term, totalAmount, transactionId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TransactionLine other = (TransactionLine) obj;
		return id == other.id && Objects.equals(itemId, other.itemId) && Objects.equals(itemName, other.itemName)
				&& Objects.equals(quantity, other.quantity) && Objects.equals(term, other.term)
				&& Objects.equals(totalAmount, other.totalAmount) && Objects.equals(transactionId, other.transactionId)
				&& Objects.equals(userId, other.userId);
	}



}
