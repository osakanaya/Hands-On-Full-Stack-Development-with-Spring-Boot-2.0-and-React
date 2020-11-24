package com.packt.cardatabase.repository;

import org.springframework.data.repository.CrudRepository;

import com.packt.cardatabase.domain.Car;

public interface CarRepository extends CrudRepository<Car, Long> {
	
	
}
