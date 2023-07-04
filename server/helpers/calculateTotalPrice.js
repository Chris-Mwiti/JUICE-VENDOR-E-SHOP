const calculateTotalPrice = (originalTotal, productQty, productPrice) => {
    const newTotalPrice = originalTotal + (productQty * productPrice);
    return newTotalPrice
}

module.exports = calculateTotalPrice