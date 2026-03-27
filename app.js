angular
  .module("ecommerceApp", [])
  .filter("inr", function () {
    return function (input) {
      if (!input && input !== 0) return "0";
      return Number(input).toLocaleString("en-IN");
    };
  })
  .controller("CartController", function ($scope, $timeout) {
    $scope.cart = [];
    $scope.orderPlaced = false;
    $scope.formSubmitted = false;
    $scope.orderId = null;
    $scope.lastOrder = {};
    $scope.searchQuery = "";
    $scope.paymentMethod = "card";

    $scope.checkoutForm = {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    };

    $scope.products = [
      {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        category: "Electronics",
        price: 10999,
        mrp: 16999,
        discount: 35,
        image: "Assets/Headphones.jpeg",
        rating: 4,
        reviews: 28430,
      },
      {
        id: 2,
        name: "Premium Leather Wallet",
        category: "Accessories",
        price: 2499,
        mrp: 3999,
        discount: 37,
        image: "Assets/Wallet.jpeg",
        rating: 4,
        reviews: 6120,
      },
      {
        id: 3,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 16999,
        mrp: 24999,
        discount: 32,
        image: "Assets/Watch.jpeg",
        rating: 5,
        reviews: 51200,
      },
      {
        id: 4,
        name: "Organic Scented Candle Set",
        category: "Home & Lifestyle",
        price: 1499,
        mrp: null,
        discount: null,
        image: "Assets/Candle-Set.jpeg",
        rating: 4,
        reviews: 3890,
      },
      {
        id: 5,
        name: "Stainless Steel Water Bottle",
        category: "Sports",
        price: 1299,
        mrp: 1999,
        discount: 35,
        image: "Assets/Water-Bottle.jpeg",
        rating: 5,
        reviews: 17800,
      },
      {
        id: 6,
        name: "Wireless Charging Pad",
        category: "Electronics",
        price: 1199,
        mrp: 1999,
        discount: 40,
        image: "Assets/Charging-Pad.jpeg",
        rating: 4,
        reviews: 9240,
      },
      {
        id: 7,
        name: "Minimalist Backpack",
        category: "Bags",
        price: 3499,
        mrp: 4999,
        discount: 30,
        image: "Assets/Backpack.jpeg",
        rating: 5,
        reviews: 21000,
      },
      {
        id: 8,
        name: "Bamboo Desk Organizer",
        category: "Home & Lifestyle",
        price: 899,
        mrp: 1499,
        discount: 40,
        image: "Assets/Organizer.jpeg",
        rating: 4,
        reviews: 4560,
      },
    ];

    $scope.filteredProducts = $scope.products;

    $scope.$watch("searchQuery", function (val) {
      var q = (val || "").toLowerCase().trim();
      if (!q) {
        $scope.filteredProducts = $scope.products;
      } else {
        $scope.filteredProducts = $scope.products.filter(function (p) {
          return (
            p.name.toLowerCase().indexOf(q) > -1 ||
            p.category.toLowerCase().indexOf(q) > -1
          );
        });
      }
    });

    $scope.setPaymentMethod = function (method) {
      $scope.paymentMethod = method;
      $scope.checkoutForm.cardNumber = "";
      $scope.checkoutForm.expiry = "";
      $scope.checkoutForm.cvv = "";
      $scope.checkoutForm.upiId = "";
    };

    $scope.isInCart = function (productId) {
      return $scope.cart.some(function (item) {
        return item.id === productId;
      });
    };

    $scope.addToCart = function (product) {
      var existing = $scope.cart.find(function (item) {
        return item.id === product.id;
      });
      if (existing) {
        existing.quantity += 1;
      } else {
        $scope.cart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          mrp: product.mrp,
          discount: product.discount,
          image: product.image,
          quantity: 1,
        });
      }
      product.addedAnim = true;
      $timeout(function () {
        product.addedAnim = false;
      }, 600);
    };

    $scope.removeFromCart = function (item) {
      item.removing = true;
      $timeout(function () {
        var index = $scope.cart.indexOf(item);
        if (index > -1) {
          $scope.cart.splice(index, 1);
        }
      }, 300);
    };

    $scope.updateQuantity = function (item, delta) {
      item.quantity += delta;
      if (item.quantity < 1) {
        item.quantity = 1;
      }
    };

    $scope.getTotal = function () {
      return $scope.cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
    };

    $scope.getTotalItems = function () {
      return $scope.cart.reduce(function (sum, item) {
        return sum + item.quantity;
      }, 0);
    };

    $scope.clearCart = function () {
      $scope.cart = [];
    };

    $scope.scrollToCart = function () {
      var el = document.getElementById("cart");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    $scope.submitForm = function (form) {
      $scope.formSubmitted = true;
      if (form.$invalid || $scope.cart.length === 0) {
        if (form.$invalid) {
          $timeout(function () {
            var firstError = document.querySelector(".input-error");
            if (firstError)
              firstError.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
          }, 50);
        }
        return;
      }
      $scope.lastOrder = angular.copy($scope.checkoutForm);
      $scope.lastOrder.paymentMethod = $scope.paymentMethod;
      $scope.orderId = Math.floor(100000 + Math.random() * 900000);
      $scope.orderPlaced = true;
      $scope.cart = [];
      $scope.formSubmitted = false;
      $scope.paymentMethod = "card";
      $scope.checkoutForm = {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        upiId: "",
      };
      document
        .getElementById("checkout")
        .scrollIntoView({ behavior: "smooth" });
    };

    $scope.resetOrder = function () {
      $scope.orderPlaced = false;
      $scope.orderId = null;
      $scope.lastOrder = {};
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
