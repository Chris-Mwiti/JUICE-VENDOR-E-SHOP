export const discountCalculator = (discountPercentage,value) => {
    const newTotalValue = discountPercentage/100 * value;
    return newTotalValue
}