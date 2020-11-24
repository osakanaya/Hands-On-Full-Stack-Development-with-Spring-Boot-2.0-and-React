package com.packt.cardatabase.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.packt.cardatabase.domain.Car;

public interface CarRepository extends CrudRepository<Car, Long> {
	
	/// 
	List<Car> findByBrand(String brand);
	
	List<Car> findByColor(String color);
	
	List<Car> findByYear(int year);
	
	///
	List<Car> findByBrandAndModel(String brand, String model);

	List<Car> findByBrandOrColor(String brand, String color);
	
	///
	List<Car> findByBrandOrderByYearAsc(String brand);
	
	///
	@Query("select c from Car c where c.brand = ?1")
	List<Car> findByBrand2(String brand);
	
	///
	@Query("select c from Car c where c.brand like %?1")
	List<Car> findByBrandEndsWith(String brand);
}
