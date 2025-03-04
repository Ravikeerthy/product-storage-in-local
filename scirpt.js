document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("productForm")) {
        document.getElementById("productForm").addEventListener("submit", addProduct);
    }
    if (document.getElementById("searchBar")) {
        document.getElementById("searchBar").addEventListener("keyup", searchProduct);
        loadProducts();
    }
});

function addProduct(e) {
    e.preventDefault();

    let name = document.getElementById("productName").value.trim();
    let price = document.getElementById("productPrice").value;
    let quantity = document.getElementById("productQuantity").value;
    let imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !quantity || !imageFile) {
        Toastify({
            text: "Please fill all fields and select an image!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
        }).showToast();
        return;

    } 

    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function () {
        let imageUrl = reader.result;
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ name, price, quantity, imageUrl });

        localStorage.setItem("products", JSON.stringify(products));
          Toastify({
            text: "Product added successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
        }).showToast();

        document.getElementById("productForm").reset();
    };
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let tableBody = document.getElementById("productTable");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (products.length === 0) {
        document.getElementById("noProduct").classList.remove("d-none");
        return;
    } else {
        document.getElementById("noProduct").classList.add("d-none");
    }

    products.forEach((product, index) => {
        let row = `<tr>
                    <td>${index + 1}</td>
                    <td><img src="${product.imageUrl}" width="50" height="50" class="rounded"></td>
                    <td>${product.name}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("noProduct").classList.toggle("d-none", products.length > 0);
}

let toastShown = false;

function searchProduct() {
    let searchValue = document.getElementById("searchBar").value.toLowerCase();
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));

    let tableBody = document.getElementById("productTable");
    tableBody.innerHTML = "";

    if (filteredProducts.length === 0) {
        document.getElementById("noProduct").classList.remove("d-none");
        if(!toastShown){
        Toastify({
            text: "No product found!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "orange",
        }).showToast();
        toastShown = true
    }
    } else {
        document.getElementById("noProduct").classList.add("d-none");
    
    filteredProducts.forEach((product, index) => {
        let row = `<tr>
                    <td>${index + 1}</td>
                        <td><img src="${product.imageUrl}" width="50" height="50" class="rounded"></td>
                    <td>${product.name}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                </tr>`;
        tableBody.innerHTML += row;
    });
    }
}
