package com.packt.cardatabase.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Owner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long ownerId;
	private String firstName;
	private String lastName;
	
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
//	private List<Car> cars;
	
	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "car_owner", joinColumns = {
		@JoinColumn(name = "ownerid")
	}, inverseJoinColumns = {
		@JoinColumn(name = "id")
	})
	private Set<Car> cars = new HashSet<Car>();
	
	public Owner() {}

	public Owner(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(long ownerId) {
		this.ownerId = ownerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

//	public List<Car> getCars() {
//		return cars;
//	}
//
//	public void setCars(List<Car> cars) {
//		this.cars = cars;
//	}

	public Set<Car> getCars() {
		return cars;
	}

	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}

	@Override
	public int hashCode() {
		return Objects.hash(firstName, lastName, ownerId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Owner other = (Owner) obj;
		return Objects.equals(firstName, other.firstName) && Objects.equals(lastName, other.lastName)
				&& ownerId == other.ownerId;
	}

	@Override
	public String toString() {
		return "Owner [ownerId=" + ownerId + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}
	
}
