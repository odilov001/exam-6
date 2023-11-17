import "../public/main.css";

/*                            DOM VARIABLES                                */
const form1: HTMLFormElement = document.forms[0];
const form2: HTMLFormElement = document.forms[1];
const inputCar: HTMLInputElement = document.querySelector(".input_cars")!;
const inputOut: HTMLInputElement = document.querySelector(".input_out")!;
const inputColor: HTMLInputElement = document.querySelector(".input_color")!;
const inputPrice: HTMLInputElement = document.querySelector(".input_price")!;

/*                            CLASS                                */

class Car {
	constructor(
		public nameCar: string,
		public tire: 4, // mashina baloni
		public color: string,
		public priceCar: string
	) {}

	run() {
		console.log(`${this.nameCar} is running...`);
	}
}

class ElectroCar extends Car {}
class PetrolCar extends Car {}
class HybridCar extends Car {}

class BYD extends ElectroCar {}
class Spark extends PetrolCar {}
class Zeekr extends HybridCar {}

interface Capacity {
	electroCar: number;
	petrolCar: number;
	hybridCar: number;
}

interface Pricing {
	electroCarPricePerMinute: number;
	petrolCarPricePerMinute: number;
	hybridCarPricePerMinute: number;
}

const capacityParking: Capacity = {
	electroCar: 4,
	petrolCar: 12,
	hybridCar: 3,
};

const pricingParking: Pricing = {
	electroCarPricePerMinute: 10,
	petrolCarPricePerMinute: 4,
	hybridCarPricePerMinute: 20,
};

class Parking<T extends Car> {
	public cars: T[] = [];
	constructor(public nameParking: string, public capacity: Capacity, public pricing: Pricing) {}

	enterCar(car: T) {
		if (this.cars.length < this.capacity.electroCar) {
			console.log(`${car.nameCar} entered the parking.`);
		} else {
			console.log(`${this.nameParking} is full by => ${car.constructor.name}s.`);
		}
	}

	logoutCar(car: T) {
		if (this.cars.length < this.capacity.electroCar) {
			console.log(`${car.nameCar} logged out from the parking.`);
		}
	}

	calculateTotalProfit() {}

	calculateTotalPricePerCar(car: T) {}

	calculateMinutes() {
		return Math.floor(Math.random() * 60);
	}
}

const parking1 = new Parking<ElectroCar>("Sebzor", capacityParking, pricingParking);
form1.addEventListener("submit", (e) => {
	e.preventDefault();

	const carValue = inputCar.value;
	const colorValue = inputColor.value;
	const priceValue = inputPrice.value;
	if (carValue === "" || colorValue === "" || priceValue === "") {
		alert("Please create car");
	} else {
		const car = new BYD(`${carValue}`, 4, `${colorValue}`, `${priceValue}`);
		console.log(car);
		parking1.enterCar(car);
		const myInterval = setInterval(myTimer, 1000);

		function myStop() {
			clearInterval(myInterval);
		}
		form2.addEventListener("submit", (e) => {
			e.preventDefault();
			if (inputOut.value === "") {
				alert("Please create car name ");
			} else {
				parking1.logoutCar(car);
				myStop();
			}
		});
	}
});

function myTimer() {
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const secund = date.getSeconds();
	console.log(hour + ":" + minute + ":" + secund);
}

console.log("-----------------------DEFAULT LOG-----------------------------------------");

const parking2 = new Parking<PetrolCar>("Chorsu", capacityParking, pricingParking);
const parking3 = new Parking<HybridCar>("Chilonzor", capacityParking, pricingParking);
console.log(parking1);
console.log(parking2);
console.log(parking3);

const car1 = new BYD("BYD", 4, "blue", "40000$");
const car2 = new Spark("Spark", 4, "green", "25000$");
const car3 = new Zeekr("Zeekr", 4, "black", "35000$");

console.log(car1);
console.log(car2);
console.log(car3);

console.log("-----------------------ENTERED CAR-----------------------------------------");

parking1.enterCar(car1);
parking2.enterCar(car2);
parking3.enterCar(car3);

console.log("-----------------------LOGGED OUT CAR-----------------------------------------");

parking1.logoutCar(car1);
parking2.logoutCar(car2);
parking3.logoutCar(car3);

console.log(`Total profit: $${parking1.calculateTotalProfit()}`);
