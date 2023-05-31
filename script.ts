class User {
  constructor(public name: string, public email: string, public password: string) {}

  static register(username: string, email: string, password: string): User {
    return new User(username, email, password);
  }

  login(username: string, password: string): User {
    if (username === this.name && password === this.password) {
      return this;
    } else {
      throw new Error("Invalid username or password");
    }
  }
}

class Item {
  constructor(public name: string, public price: number, public image: string) {}
}

class ShoppingCart {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  removeItem(item: Item): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    for (const item of this.items) {
      totalCost += item.price;
    }
    return totalCost;
  }
}

// Create a user and login
const user = User.register("Peter", "peter@cart.com", "password");
const loggedUser = user.login("Peter", "password");

// Create items with names, prices, and image URLs
const bag = new Item("Bag", 30000, "bag.jpeg");
const clothes = new Item("Clothes", 42000, "clothes.jpeg");
const car = new Item("Car", 10000000, "car.jpeg");
const house = new Item("House", 50000000, "house.jpeg");

// Create a shopping cart
const cart = new ShoppingCart();

// Add items to the cart
cart.addItem(bag);
cart.addItem(clothes);
cart.addItem(car);
cart.addItem(house);

// Calculate the total cost
const totalCost = cart.calculateTotalCost();

// Update the HTML with the total cost and item list
const totalCostElement = document.getElementById("total-cost");
if (totalCostElement) {
  totalCostElement.textContent = `Total Cost: $${totalCost}`;
}

const itemListElement = document.getElementById("item-list");
if (itemListElement) {
  cart.items.forEach((item) => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.classList.add("item-image");
    li.appendChild(image);
    li.textContent = `${item.name} - $${item.price}`;
    itemListElement.appendChild(li);
  });
}
