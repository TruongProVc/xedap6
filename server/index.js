const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; 

const authenticateJWT = require("./src/Common/Authentication");
const authorize = require("./src/Common/Authorize");

// Controller imports
const { getAllBrands, addBrand, deleteBrand, editBrand } = require("./src/app/controller/BrandController");
const { getAllProducts, addProduct, deleteProduct, getProductDetails, getProductSpecifications, searchProducts, updateProduct,getProductById } = require("./src/app/controller/ProductController");
const { getAllAccounts, getProfileAdmin,updateProfileAdmin,changePassword } = require("./src/app/controller/AccountController");
const { login,register } = require("./src/app/controller/LoginController");
const { addToCart, getCart, updateQuantity, removeFromCart } = require('./src/app/controller/CartController');
const { getCustomerData, checkout } = require('./src/app/controller/CheckoutController');
const { getCommentsByProduct , addComment } = require('./src/app/controller/CommentController');
const { getAllAccountsUser, getProfileUser,updateProfileUser,changePasswordUser } = require("./src/app/controller/AccountUserController");

app.use(cors({ origin: "http://localhost:3001", credentials: true })); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'src', 'app', 'uploads')));

// Route đăng nhập (không cần xác thực)
app.post("/privatesite/login", login);
app.post("/register", register);
app.get('/productdetails/:id', getProductDetails);
app.get('/search', searchProducts);

// 
app.post('/comments' , addComment);


// 
app.get("/brands", getAllBrands);
app.get("/products", getAllProducts);

app.get("/privatesite/brands", getAllBrands);
app.post("/privatesite/brands", authorize(["Quản trị"]), addBrand);
app.delete("/privatesite/brands/:id", authorize(["Quản trị"]), deleteBrand);
app.put("/privatesite/editbrand/:id", authorize(["Quản trị"]), editBrand);

app.get("/privatesite/products",authorize(["Quản trị"]),getAllProducts);
app.post("/privatesite/addproduct",authorize(["Quản trị"]), addProduct);

app.get("/privatesite/productById/:id",authorize(["Quản trị"]), getProductById);
app.put("/privatesite/addproduct/:id", authorize(["Quản trị"]), updateProduct);
app.delete("/privatesite/products/:id", authorize(["Quản trị"]), deleteProduct);
// Thương hiệu
app.get("/privatesite/accountmanagement", authorize(["Quản trị"]), getAllAccounts);
app.get('/privatesite/profile',authorize(["Quản trị"]), getProfileAdmin);
app.put('/privatesite/updateprofile',authorize(["Quản trị"]), updateProfileAdmin);
app.put('/privatesite/profile/changepassword', authorize(["Quản trị"]), changePassword); 
//

//public site
app.get('/products/:productId/specifications',getProductSpecifications)
app.get('/products', getAllProducts);
app.get('/brands', getAllBrands);
//
app.post('/cart/add', addToCart);
app.get('/cart', getCart);
app.post('/cart/update', updateQuantity);
app.post('/cart/remove', removeFromCart);
//thên giỏ hàng và thanh toán
app.post('/checkout',checkout);
app.get('/api/customer', getCustomerData);
//Bình luận theo sản phẩm
app.get('/comments/:productId', getCommentsByProduct);
// Profile User
// app.get("/accountmanagementUser", getAllAccountsUser);
// app.get('/profileUser', getProfileUser);
// app.put('/updateprofileUser', updateProfileUser);
// app.put('/profile/changepasswordUser', changePasswordUser); 

app.get("/accountmanagementUser", authorize(["Người dùng"]), getAllAccountsUser);
app.get('/profileUser', authorize(["Người dùng"]), getProfileUser);
app.put('/updateprofileUser', authorize(["Người dùng"]), updateProfileUser);
app.put('/profile/changepasswordUser', authorize(["Người dùng"]), changePasswordUser); 
//
app.get("/", (req, res) => {
  res.json({ message: "Server đang chạy!" });
});
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});


