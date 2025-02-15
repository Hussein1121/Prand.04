// بيانات المستخدمين (يمكن استبدالها بقاعدة بيانات حقيقية)
const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// عربة التسوق
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عدد العناصر في عربة التسوق
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// إضافة منتج إلى عربة التسوق
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("تمت إضافة " + productName + " إلى السلة");
}

// عرض عناصر عربة التسوق
function displayCartItems() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (cartItems && cartTotal) {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price}$</p>
                <button onclick="removeFromCart(${index})">إزالة</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = total;
    }
}

// إزالة منتج من عربة التسوق
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// إتمام الشراء
function checkout() {
    if (cart.length === 0) {
        alert("عربة التسوق فارغة!");
    } else {
        alert("تم إتمام الشراء بنجاح!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// تسجيل الدخول
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", username);
        alert("تم تسجيل الدخول بنجاح!");
        window.location.href = "index.html";
    } else {
        document.getElementById("login-message").textContent = "اسم المستخدم أو كلمة المرور غير صحيحة!";
    }
});

// تحديث رابط تسجيل الدخول
function updateLoginLink() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginLink = document.getElementById("login-link");
    if (loginLink) {
        if (loggedInUser) {
            loginLink.textContent = "تسجيل الخروج";
            loginLink.href = "#";
            loginLink.onclick = () => {
                localStorage.removeItem("loggedInUser");
                window.location.href = "index.html";
            };
        } else {
            loginLink.textContent = "تسجيل الدخول";
            loginLink.href = "login.html";
        }
    }
}

// تحديث الصفحة عند التحميل
window.onload = function () {
    updateCartCount();
    displayCartItems();
    updateLoginLink();
};
// إرسال نموذج الاتصال
document.getElementById("contactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // يمكن إضافة هنا إرسال البيانات إلى الخادم (Backend) باستخدام fetch أو axios
    // مثال:
    /*
    fetch("/submit-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage("تم إرسال الرسالة بنجاح!", "success");
        } else {
            showMessage("حدث خطأ أثناء إرسال الرسالة.", "error");
        }
    })
    .catch(error => {
        showMessage("حدث خطأ في الاتصال بالخادم.", "error");
    });
    */

    // عرض رسالة تأكيد للمستخدم
    showMessage("تم إرسال الرسالة بنجاح!", "success");

    // إعادة تعيين النموذج
    document.getElementById("contactForm").reset();
});

// عرض رسائل التأكيد أو الأخطاء
function showMessage(message, type) {
    const messageElement = document.getElementById("contact-message");
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = type; // إضافة كلاس لتنسيق الرسالة
    }
}