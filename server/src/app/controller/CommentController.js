const Comment = require('../models/Comment');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'saddasdasadsasdadsas'; // Replace with your actual secret key

// Lấy các bình luận theo ProductId và bao gồm thông tin của tài khoản (Account)
exports.getCommentsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Tìm các comment theo ProductId và bao gồm thông tin của Account
    const comments = await Comment.findAll({
      where: { ProductId: productId },
      include: {
        model: Account,
        as: 'Account',
        attributes: ['Firstname', 'Lastname', 'Email', 'Username']  // Chỉ chọn những thuộc tính cần thiết từ Account
      },
    });

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this product.' });
    }

    // Trả về danh sách bình luận kèm thông tin tài khoản
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments.' });  // Lỗi server
  }
};

// Chỉnh sửa phương thức addComment
exports.addComment = async (req, res) => {
  const { ProductId, Content } = req.body;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc không có quyền truy cập.' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Token không hợp lệ.' });
    }

    const userId = decoded.userId;

    // Tạo một đối tượng bình luận mới
    const newComment = await Comment.create({
      ProductId: ProductId,
      AccountId: userId,
      Content: Content,
    });

    // Lấy thông tin tài khoản của người dùng từ Account
    const account = await Account.findByPk(userId, {
      attributes: ['Username', 'Firstname', 'Lastname', 'Email']  // Chỉ lấy các thông tin cần thiết
    });

    newComment.Account = account;  // Đảm bảo trả về tài khoản với bình luận
    // Trả về bình luận mới cùng với thông tin tài khoản
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm bình luận.' });
  }
};
