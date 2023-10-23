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
@Table(name = "Customer")
public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "email", nullable=false, length = 100)
	private String email;
	
	@Column(name = "password", nullable=false, length = 100)
	private String password;
	
	@Column(name = "name", nullable=false, length = 100)
	private String name;
	
	@Column(name = "cpf", nullable=false, length = 100)
	private String cpf;
	
	@Column(name = "address", nullable=false, length = 100)
	private String address;
	
	@Column(name = "phone", nullable=false, length = 100)
	private String phone;
	
	@Column(name = "profile", nullable=false, length = 20)
	private String profile;
	
	@Column(name = "createdAt", nullable=false, length = 20)
	private Date createdAt;

	public Customer() {}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	@Override
	public int hashCode() {
		return Objects.hash(address, cpf, createdAt, email, id, name, password, phone, profile);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Customer other = (Customer) obj;
		return Objects.equals(address, other.address) && Objects.equals(cpf, other.cpf)
				&& Objects.equals(createdAt, other.createdAt) && Objects.equals(email, other.email) && id == other.id
				&& Objects.equals(name, other.name) && Objects.equals(password, other.password)
				&& Objects.equals(phone, other.phone) && Objects.equals(profile, other.profile);
	}
	
	
	
	
}
