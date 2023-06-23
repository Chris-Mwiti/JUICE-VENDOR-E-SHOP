import { useEffect, useMemo } from "react";
import { discountCalculator } from "../helpers/discountCalculator";

const useDiscountCalc = (discountPercentage,initiValue) => {

    const memoizedInitValue = useMemo(() => initiValue ,[initiValue])
    useEffect(() => {
        return discountCalculator(discountPercentage,memoizedInitValue)
    },[initiValue])
}

export default useDiscountCalc