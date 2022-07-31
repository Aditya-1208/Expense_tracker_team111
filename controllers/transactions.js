const Transaction = require('../models/Transactions')

// @desc    Get all transactions
// @route   GET http://localhost:5000/api/v1/transactions
// @access  Public

exports.getTransactions = async () => {
  try {
    const transactions = await Transaction.find()
    return {
      success: true,
      statusCode: 200,
      count: transactions.length,
      data: transactions,
    }
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      error: 'Server Error',
    }
  }
}

// @desc    Add a transaction
// @route   POST http://localhost:5000/api/v1/transactions
// @access  Public

exports.addTransaction = async (data) => {
  try {
    const transaction = await Transaction.create(data)

    return {
      success: true,
      statusCode: 200,
      data: transaction,
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message)
      return {
        success: false,
        statusCode: 400,
        error: messages,
      }
    } else {
      return {
        success: false,
        statusCode: 400,
        error: 'Server Error',
      }
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return {
        success: false,
        statusCode: 404,
        error: 'No transaction found',
      }
    }

    await transaction.remove()

    return {
      success: true,
      statusCode: 200,
      data: {},
    }
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      error: 'Server Error',
    }
  }
}
