exports.addToCart = (req, res) => {
    //Lấy các phần tử trong product 
    const { ProductId, Quantity, ProductName,Discount } = req.body;  
    const UserId = req.session.user ? req.session.user.id : null;  // Lấy UserId từ session

    if (!UserId) {
        return res.status(403).json({ message: 'Vui lòng đăng nhập' });
    }

    if (!req.session.cart) {
        req.session.cart = [];  // Nếu chưa có giỏ hàng, tạo mới
    }

    // Kiểm tra sản phẩm có trong giỏ hàng không
    const existingProduct = req.session.cart.find(item => item.ProductId === ProductId);

    if (existingProduct) {
        // Nếu có, cập nhật số lượng
        existingProduct.Quantity += Quantity;
    } else {
        // Nếu không, thêm mới sản phẩm vào giỏ hàng
        req.session.cart.push({ ProductId, ProductName, Quantity,Discount });
    }

    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng!' });
};
exports.getCart = (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(404).json({ message: 'Giỏ hàng trống' });
    }

    res.status(200).json(req.session.cart);  // Trả về giỏ hàng đầy đủ thông tin
};
exports.updateQuantity = (req, res) => {
    const { ProductId, Quantity } = req.body;

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(404).json({ message: 'Giỏ hàng trống' });
    }

    // Kiểm tra xem sản phẩm có trong giỏ hàng không
    const cartItem = req.session.cart.find(item => item.ProductId === ProductId);
    if (!cartItem) {
        return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
    }

    // Cập nhật số lượng sản phẩm
    cartItem.Quantity = Quantity;

    res.status(200).json({ message: 'Cập nhật số lượng thành công', cart: req.session.cart });
};
exports.removeFromCart = (req, res) => {
    const { ProductId } = req.body;

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(404).json({ message: 'Giỏ hàng trống' });
    }

    // Kiểm tra sản phẩm có trong giỏ hàng không
    const cartItemIndex = req.session.cart.findIndex(item => item.ProductId === ProductId);
    if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    req.session.cart.splice(cartItemIndex, 1);

    res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart: req.session.cart });
};