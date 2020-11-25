package com.packt.cardatabase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.repository.CarRepository;
import com.packt.cardatabase.repository.OwnerRepository;

@SpringBootApplication
public class CardatabaseApplication {

	@Autowired
	private CarRepository carRepository;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
	}
	
	@Bean
	CommandLineRunner runner() {
		return args -> {
			Owner owner1 = new Owner("John", "Johnson");
			Owner owner2 = new Owner("Mary", "Robinson");

//			ownerRepository.save(owner1);
//			ownerRepository.save(owner2);
			
//			carRepository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000, owner1));
//			carRepository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000, owner2));
//			carRepository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000, owner2));

			Car car1 = new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000);
			Car car2 = new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000);
			Car car3 = new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000);

			owner1.getCars().add(car1);
			car1.getOwners().add(owner1);

			owner2.getCars().add(car2);
			car2.getOwners().add(owner2);
			owner2.getCars().add(car3);
			car3.getOwners().add(owner2);
			
			carRepository.save(car1);
			carRepository.save(car2);
			carRepository.save(car3);

			ownerRepository.save(owner1);
			ownerRepository.save(owner2);

		};
	}

}
