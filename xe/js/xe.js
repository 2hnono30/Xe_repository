class Car {
    constructor(id, carname, photo, price) {
        this.id = id;
        this.carname = carname;
        this.photo = photo;
        this.price = price;
    }
}

class Helper {
    static formatCurrency(number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
}
let cars = [];
const car_data = "car_data";
function init() {
    if (localStorage.getItem(car_data) === null) {
        cars = [
            new Car(
                1,
                "Air Blade 125/160",
                "https://cdn.honda.com.vn/motorbike-versions/May2022/UDvt2b8oUaEjVwt3fY1q.png",
                42090000 ,
            ),
            new Car(
                2,
                "Gold Wing",
                "https://cdn.honda.com.vn/motorbikes/October2021/7SAJ6CYawhmVCUh9GeIT.jpg",
                1231000000,
            ),
            new Car(
                3,
                "Vision",
                "https://cdn.honda.com.vn/motorbike-versions/December2020/osAEdqYtGQdNqAyZp64i.png",
                34942909,
            ),
            new Car(
                4,
                "Winner X",
                "https://cdn.honda.com.vn/motorbike-versions/December2021/AjAslqMuYpko2d6wmuEs.png",
                46160000,
            ),
            new Car(
                5,
                "CBR650R",
                "https://cdn.honda.com.vn/motorbike-versions/December2021/7aLu8ZyVN8rjGSHvJMZ9.png",
                254490000,
            ),
            new Car(
                6,
                "Future 125 FI",
                "https://cdn.honda.com.vn/motorbike-versions/October2021/mTuI6iTbdYCOkHBMnsNw.png",
                30328363,
            ),
        ];
        localStorage.setItem(car_data, JSON.stringify(cars));
    } else {
        cars = JSON.parse(localStorage.getItem(car_data));
    }
}

function renderCar(data) {
    // data.sort(function (car_1, car_2) {
    //         return car_2.id - car_1.id;
    //       });
    let tbCar = document.querySelector('.table>tbody');
    let htmls = data.map(function (car) {
        return `
        <tr id="tr_${car.id}">
        <td class="text-center">S-${car.id}</td>
        <td>${car.carname}</td>
        <td>
            <img class="pt" src="${car.photo}" alt="car-photo">
        </td>
        <td class="text-right">${Helper.formatCurrency(car.price)}</td>
        <td class="text-center">
            <button class="btn btn-success btn-sm " onclick='change(${car.id})'>Edit</button>
            <button class="btn btn-primary d-none" id="update-btn" onclick="updateCar(${car.id})">Update</button>
            <button class="btn btn-danger btn-sm " onclick='remove(${car.id})'>Remove</button>
        </td>
    </tr>
        `;
    });
    tbCar.innerHTML = htmls.join(" ");
}

function add_Car() {
    let carname = document.querySelector("#carname").value;
    let photo = document.querySelector("#photo").value;
    let price = Number(document.querySelector("#price").value);
    let id = findMaxId() + 1;
    let carnew = new Car(id, carname, photo, price);


    cars.push(carnew);
    localStorage.setItem(car_data, JSON.stringify(cars));
    renderCar(cars);
    clearForm();
}

function updateCar(carId) {

    let carname = document.querySelector(`#carname_${carId}`).value;
    let photo = document.querySelector(`#photo_${carId}`).value;
    let price = Number(document.querySelector(`#price_${carId}`).value);

    let car = cars.find(function (car) {
        return car.id == carId;
    });

    car.carname = carname;
    car.photo = photo;
    car.price = price;
    localStorage.setItem(car_data, JSON.stringify(cars));
    renderCar(cars);

}

function clearForm() {
    document.querySelector("#carname").value = "";
    document.querySelector("#photo").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#carId").value = "0";
}

function remove(carId) {
    let confirmed = window.confirm("Are you sure to want to remove this car?");
    if (confirmed) {
        let posistion = cars.findIndex(function (car) {
            return car.id == carId;
        });
        cars.splice(posistion, 1);
        localStorage.setItem(car_data, JSON.stringify(cars));
        renderCar(cars);
    }
}


function findMaxId() {
    let max = 0;
    for (let car of cars) {
        if (car.id > max) {
            max = car.id;
        }
    }
    return max;
}

function search(searchInput) {
    let result = cars.filter(function (car) {
        return (
            car.carname.toLowerCase().indexOf(searchInput.value.toLowerCase()) !=
            -1 ||
            car.price == Number(searchInput.value)
        );
    });
    renderCar(result);
}

function getproductById(carId) {
    return cars.find(function (car) {
        return car.id == carId;
    })
}
function change(carId) {
    let tr = document.getElementById(`tr_${carId}`);
    let car = getproductById(carId);
    tr.children[1].innerHTML = `<input id="carname_${carId}" type='text' value='${car.carname}'>`
    tr.children[2].innerHTML = `<input id="photo_${carId}" type='text' value='${car.photo}'>`
    tr.children[3].innerHTML = `<input id="price_${carId}" type='text' value='${car.price}'>`
    let action = tr.children[4];
    action.children[0].classList.add('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.remove('d-none');
}

function sort(direction, field) {
    if (direction === "asc") {
        cars.sort(function (car_1, car_2) {
            console.log(car_1[field] + " - " + car_2[field])
            if (car_1[field] > car_2[field]) {
                return 1;
            }
            if (car_1[field] < car_2[field]) {
                return -1;
            }
            return 0;
        })
    }
    else {
        cars.sort(function (car_1, car_2) {
            console.log(car_1[field] + " - " + car_2[field])
            if (car_2[field] > car_1[field]) {
                return 1;
            }
            if (car_2[field] < car_1[field]) {
                return -1;
            }
            return 0;
        })
    }
    renderCar(cars);
}
function main() {
    init();
    renderCar(cars);
}

main();
