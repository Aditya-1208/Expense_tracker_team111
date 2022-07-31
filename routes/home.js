const express = require('express')
const router = express.Router()
const {
    getTransactions,
    addTransaction,
    deleteTransaction,
} = require('../controllers/transactions')

router.route('/').get(async (req, res, next) => {
    const transactions = await getTransactions(req, res, next);
    res.status(transactions.statusCode).render('./pages/index', { transactions: transactions.data, alert: {} });
});

router.route('/').post(async (req, res, next) => {
    const response = await addTransaction(req.body);
    res.status(response.statusCode).redirect('/');
})

router.route('/delete/:id').get(async (req, res, next) => {
    const response = await deleteTransaction(req, res, next);
    res.status(response.statusCode).redirect('/');
})
module.exports = router
