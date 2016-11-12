Product = function() {
	this.sku = '';
	this.name = '';
	this.price = 0;
	this.categories = [];
};

Book = function() {
	this.isbn = '';
	this.author = '';
};
Book.prototype = new Product();

Fashion = function() {
	this.color = '';
	this.size = '';
	this.getPromoPrice = function() {
		date = new Date();
		if(date.getDay() == 6) return this.price -= this.price * 0.2; // note: ada diskon 20% setiap hari sabtu
	};
};
Fashion.prototype = new Product();

OrderLineItem = function() {
	this.product = {};
	this.totalItem = 0;
};

ProductManagerBase = function() {
	this.products = [];

	this.getAllProducts = function() {
		console.log('\nProduct List:');
		console.log(this.products);
		return this.products;
	};

	this.getProduct = function(sku) {
		console.log('\nSearch ' + sku.toString() + ':');
		var result = this.products.filter(function(product) {
			return product.sku === sku;
		})[0];
		console.log(result);
	};

	this.addProduct = function(product) {
		console.log('Adding: ' + product.name);
		return this.products.push(product);
	};

	this.removeProduct = function(product) {
		console.log('\nDelete: ' + product.sku + ', ' + product.name);
		return this.products.splice(this.products.indexOf(product), 1);
	};

	this.removeProductBySKU = function(sku) {
		var that = this;
		console.log('\nDelete by code: ' + sku.toString());
		this.products.forEach(function(product) {
			if(product.sku === sku) {
				return that.removeProduct(product);
			}
		});
	};

	this.updateProduct = function(product) {
		return; // note: javascript bersifat mutable, untuk bisa mengaktifkan fungsi ini, harus dengan encaptulation
	};
};

ProductManager = function() {};
ProductManager.prototype = new ProductManagerBase();

Cart = function() {
	this.orderLineItems = [];

	this.getAllItems = function() {
		console.log('\nItem List: ');
		console.log(this.orderLineItems);
	};

	this.addItem = function(item) {
		console.log('Add Cart: ' + item.product.name + ', ' + item.totalItem + ' items');
		this.orderLineItems.push(item);
	};

	this.removeItem = function(item) {
		console.log('\nDelete: ' + item.product.sku + ', ' + item.product.name);
		return this.orderLineItems.splice(this.orderLineItems.indexOf(item), 1);
	};

	this.checkout = function() {
		console.log('\nCheckout:');
		var totalPayment = 0;
		var subTotal = 0;
		console.log('NAME\t\t\t\t\t\tQTY\tSUBTOTAL');
		console.log('-------------------------------------------------------------------------------');
		this.orderLineItems.forEach(function(item) {
			subTotal = item.product.price * item.totalItem;
			totalPayment += subTotal;
			console.log(item.product.name + '\t\t' + item.totalItem + '\t$ ' + subTotal);
		});
		console.log('-------------------------------------------------------------------------------');
		console.log('TOTAL PAYMENT : $ ' + totalPayment);
	};
};

console.log('\nBook\n-------------------------------------------------------------------------------');
var myBook1 = new Book();
myBook1.isbn = '9788498387568';
myBook1.author = 'J.K. Rowling';
myBook1.sku = 'Book-001';
myBook1.name = 'Harry Potter and the Cursed Child';
myBook1.price = 17.98;
myBook1.categories = ['Novel', 'Fiction', 'Magic'];
console.log(myBook1.sku + ', ' + myBook1.name);

var myBook2 = new Book();
myBook2.isbn = '9781491923177';
myBook2.author = 'Jake Knapp';
myBook2.sku = 'Book-002';
myBook2.name = 'Design Sprint';
myBook2.price = 15.73;
myBook2.categories = ['Management', 'Startup'];
console.log(myBook2.sku + ', ' + myBook2.name);

console.log('\nFashion\n-------------------------------------------------------------------------------');
var myFashion1 = new Fashion();
myFashion1.color = 'Gold and Blue';
myFashion1.size = 'All Size';
myFashion1.sku = 'Fashion-001';
myFashion1.name = 'Mouawad’s 1001 Nights Diamond Purse';
myFashion1.price = 3000;
myFashion1.getPromoPrice();
myFashion1.categories = ['Bags', 'Diamond'];
console.log(myFashion1.sku + ', ' + myFashion1.name);

console.log('\nProduct Manager Base\n-------------------------------------------------------------------------------');
var myManager = new ProductManager();
myManager.addProduct(myBook1);
myManager.addProduct(myBook2);
myManager.addProduct(myFashion1);

// myManager.getAllProducts();
// myManager.getProduct('Book-001');
// myManager.removeProduct(myBook2);
// myManager.getProduct('Book-002');
// myManager.removeProductBySKU('Fashion-001');
// myManager.getProduct('Fashion-001');
myManager.getAllProducts();

// console.log('\nUpdate Product\n--------------');
// var myBook3 = myManager.getProduct('Book-001');
// myBook3.isbn = 'Kode ISBN';
// myBook3.author = 'omrobbie';
// myBook3.sku = 'Book-003';
// myBook3.name = 'Update object javascript';
// myBook3.price = 7;
// myBook3.categories = ['Demo'];
// myManager.updateProduct(myBook3);
// console.log(myManager.getAllProducts());

console.log('\nOrder Line Item\n-------------------------------------------------------------------------------');
var myOrder1 = new OrderLineItem();
myOrder1.product = myBook1;
myOrder1.totalItem = 10;
console.log(myOrder1.product.name + ', ' + myOrder1.totalItem + ' items');

var myOrder2 = new OrderLineItem();
myOrder2.product = myBook2;
myOrder2.totalItem = 5;
console.log(myOrder2.product.name + ', ' + myOrder2.totalItem + ' items');

var myOrder3 = new OrderLineItem();
myOrder3.product = myFashion1;
myOrder3.totalItem = 5;
console.log(myOrder3.product.name + ', ' + myOrder3.totalItem + ' items');

console.log('\nCart\n-------------------------------------------------------------------------------');
var myCart = new Cart();
myCart.addItem(myOrder1);
myCart.addItem(myOrder2);
myCart.addItem(myOrder3);

myCart.getAllItems();
myCart.removeItem(myOrder2);
myCart.getAllItems();
myCart.checkout();

myManager.getAllProducts();