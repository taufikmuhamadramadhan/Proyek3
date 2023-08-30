
let product = [
    {
      id_barang : 1,
      imgSrc: "/images/default-image.jpg",
      title: "Bunga",
      price: 4000,
      jumlah: 0
    },
    {
      id_barang : 2,
      imgSrc: "/images/default-image.jpg",
      title: "Bandeng",
      price: 5000,
      jumlah: 0
    },
    {
        id_barang : 3,
        imgSrc: "/images/default-image.jpg",
        title: "Baju",
        price: 500000,
        jumlah: 0
      },
      {
        id_barang : 4,
        imgSrc: "/images/default-image.jpg",
        title: "Jus buah",
        price: 10000,
        jumlah: 0
      },
      {
        id_barang :5,
        imgSrc: "/images/default-image.jpg",
        title: "Celana Jeans",
        price: 40000,
        jumlah: 0
      },
      {
        id_barang : 6,
        imgSrc: "/images/default-image.jpg",
        title: "Kabel USB",
        price: 15000,
        jumlah: 0
      }
  ];

  let list_cart = []

function createProductCard(product,index) {
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-4", "my-2");
  
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "w-auto");
  
    let img = document.createElement("img");
    img.src = product.imgSrc;
    img.classList.add("card-img-top", "border-1");
    img.alt = "default-image";
  
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "bg-");
  
    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = product.title;
  
    let price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = `Rp. ${product.price}`;
  
    let cardButton = document.createElement("div");
    cardButton.classList.add("card-button", "text-center");
  
    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group", "py-2", "w-auto","px-3");
    btnGroup.setAttribute("role", "group");
    btnGroup.setAttribute("aria-label", "Basic mixed styles example");
  
    let leftButton = document.createElement("button");
    leftButton.type = "button";
    leftButton.classList.add("btn", "btn-primary");
    leftButton.textContent = "-";
    leftButton.addEventListener("click", function () {
        decreaseQuantity(index);
      });
  
    let middleButton = document.createElement("button");
    middleButton.type = "button";
    middleButton.classList.add("btn", "btn-light", "disabled");
    middleButton.textContent = product.jumlah.toString();
    middleButton.id = "qty-display" + index
  
    let rightButton = document.createElement("button");
    rightButton.type = "button";
    rightButton.classList.add("btn", "btn-primary");
    rightButton.textContent = "+";
    rightButton.addEventListener("click", function () {
        increaseQuantity(index);
      });
  
    let tambahBarangLink = document.createElement("a");
    tambahBarangLink.href = "#";
    tambahBarangLink.classList.add("btn", "btn-success", "w-auto");
    tambahBarangLink.textContent = "Tambah Barang";
    tambahBarangLink.addEventListener("click", function () {
        tambahBarang(index);
      });
      
    // Menyusun elemen-elemen
    btnGroup.appendChild(leftButton);
    btnGroup.appendChild(middleButton);
    btnGroup.appendChild(rightButton);
  
    cardButton.appendChild(btnGroup);
    cardButton.appendChild(tambahBarangLink);
  
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(cardButton);
  
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
  
    colDiv.appendChild(cardDiv);
  
    return colDiv;
  }

  function crateListCart(cart) {
    let rowTable = document.createElement('tr');
  
    let tNamaBarang = document.createElement('td');
    tNamaBarang.textContent = cart.title;
  
    let tHargaBarang = document.createElement('td');
    tHargaBarang.textContent = `Rp. ${cart.price} x ${cart.jumlah_barang}`;
  
    let tJumlahHarga = document.createElement('td');
    tJumlahHarga.textContent = `Rp. ${cart.total_harga}`;
  
    rowTable.appendChild(tNamaBarang);
    rowTable.appendChild(tHargaBarang);
    rowTable.appendChild(tJumlahHarga);
  
    return rowTable;
  }

// Fungsi untuk mengurangi jumlah barang
function decreaseQuantity(index) {
    if (product[index].jumlah > 0) {
      product[index].jumlah--;
      updateQuantityDisplay(index);
    }
  }
  
  // Fungsi untuk menambah jumlah barang
  function increaseQuantity(index) {
    product[index].jumlah++;
    updateQuantityDisplay(index);
  }

  function tambahBarang(index) {
    // Dapatkan produk yang akan ditambahkan ke keranjang
    let selectedProduct = product[index];
      if(selectedProduct.jumlah != 0){
        let newItem = {
        id_barang: selectedProduct.id_barang,
        title: selectedProduct.title,
        price: selectedProduct.price,
        jumlah_barang: selectedProduct.jumlah,
        total_harga: selectedProduct.price * selectedProduct.jumlah, // Total harga awal
          };
      list_cart.push(newItem);
      }

    renderCart();
    hitungTotalBayar();
    
  }
  
  function hitungTotalBayar() {
    // Hitung total harga semua barang dalam keranjang
    let totalHarga = list_cart.reduce((total, cart) => total + cart.total_harga, 0);
  
    // Hitung pajak (11% dari total harga)
    let pajak = (11 / 100) * totalHarga;
  
    // Hitung total bayar (total harga + pajak)
    let totalBayar = totalHarga + pajak;
  
    // Perbarui tampilan total pembelian, pajak, dan total bayar
    let totalPembelianCell = document.getElementById("totalPembelian");
    let pajakCell = document.getElementById("pajak");
    let totalBayarCell = document.getElementById("totalBayar");
  
    if (totalPembelianCell && pajakCell && totalBayarCell) {
      totalPembelianCell.textContent = `Total Harga : Rp. ${totalHarga}`;
      pajakCell.textContent = `Pajak : Rp. ${pajak}`;
      totalBayarCell.textContent = `Total Bayar : Rp. ${totalBayar}`;
    }
  }
  
  
  
  
// Fungsi untuk memperbarui tampilan jumlah di tombol "Middle"
function updateQuantityDisplay(index) {
    let middleButton = document.getElementById("qty-display" + index);
    middleButton.textContent = product[index].jumlah.toString();
  }
  

  let productContainer = document.getElementById("produk-container");
  let dataCart = document.getElementById('dataCart');

  function renderCart() {
    // Hapus semua elemen dalam dataCart
    while (dataCart.firstChild) {
      dataCart.removeChild(dataCart.firstChild);
    }
  
    // Tambahkan ulang elemen-elemen dari list_cart
    list_cart.forEach(function (cart) {
      let lisDataCart = crateListCart(cart);
      dataCart.appendChild(lisDataCart);
    });
  }

product.forEach(function (product, index) { 
    let productCard = createProductCard(product, index);
    productContainer.appendChild(productCard);
  });
