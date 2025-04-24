async function fetchProducts() {
    const response = await fetch("/api/products");
    const products = await response.json();
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        // Ensure the correct image path is used
        const imageUrl = product.image ? `${window.location.origin}${product.image}` : "/placeholder.png";

        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> ₦${product.price}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <button class="btn edit-btn" onclick="editProduct('${product._id}', '${product.name}', '${product.price}', '${product.description}', '${product.stock}', '${product.image}')">Edit</button>
            <button class="btn delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productList.appendChild(productItem);
    });
}


document.getElementById("productForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const productId = document.getElementById("productId").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const imageFile = document.getElementById("image").files[0];

    let imageBase64 = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        await new Promise(resolve => reader.onload = () => {
            imageBase64 = reader.result;
            resolve();
        });
    }

    const data = { name, price, description, stock, image: imageBase64 };
    const method = productId ? "PUT" : "POST";
    const url = productId ? `/api/products/${productId}` : "/api/products";

    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert(`Product ${productId ? "updated" : "uploaded"} successfully`);
        document.getElementById("productForm").reset();
        document.getElementById("productId").value = "";
        fetchProducts();
    } else {
        alert("Error processing request");
    }
});


async function editProduct(id, name, price, description, stock, image) {
    document.getElementById("productId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("description").value = description;
    document.getElementById("stock").value = stock;


    if (image) {
        const imageElement = document.getElementById("imagePreview");
        if (!imageElement) {
            const img = document.createElement("img");
            img.id = "imagePreview";
            img.src = `/uploads/${image}`;
            img.style.maxWidth = "100px";
            img.style.marginTop = "10px";
            document.getElementById("productForm").appendChild(img);
        } else {
            imageElement.src = `/uploads/${image}`;
        }
    }
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete product");

        alert("Product deleted successfully");
        fetchProducts();
    } catch (error) {
        console.error("Error:", error);
        alert("Error deleting product. Please try again.");
    }
}


fetchProducts();
