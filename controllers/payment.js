const express = require('express')
const router = express.Router();
const payUMoney = require("payumoney_nodejs");

payUMoney.setProdKeys("Go93u0Sb", "8fVdKEnKPg", "ZlFA1evfR+IxbMb1Nw9MasZM8fHe3KkGy6S81N0Q/pw=");
payUMoney.setSandboxKeys("Go93u0Sb", "8fVdKEnKPg", "ZlFA1evfR+IxbMb1Nw9MasZM8fHe3KkGy6S81N0Q/pw=");
payUMoney.isProdMode(false);

router.post('/', (req, res) => {
    const pay = {
        firstname: 'kane',
        email: 'k@gmail.com',
        phone: 9876543210,
        amount: 300,
        productinfo: 'productinfo',
        txnid: Math.floor(100000 + Math.random() * 900000),
        surl: 'https://meateatr.herokuapp.com/payment/success',
        furl: 'https://meateatr.herokuapp.com/payment/failure',
    }

    payUMoney.pay(pay, (error, response) => {
        if (error) {
            console.error("makePayment error : " + error);
            // res.send(error);
        } else {
            console.log("Payment Redirection link " + response);
            res.send({ url: response });
        }
    });
});

router.post("/success", function (req, res) {
    res.json({done: 'done'});
    // const redirectUrl = "http://localhost:8100/1/cart/checkout/thanks/123";
    // res.redirect(redirectUrl);
});

router.post("/failure", function (req, res) {
    const redirectUrl = "http://localhost:8100/1/cart/checkout/";
    res.redirect(redirectUrl);
});

module.exports = router;