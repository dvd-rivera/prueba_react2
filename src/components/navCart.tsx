import React, { useContext, useEffect, useState } from 'react'
import { pageContext } from '../context/pizzas.context'

const NavCart: React.FC = () => {
    const pizzaContext = useContext(pageContext)
    const [totalPrice, setTotalPice] = useState<string | undefined>("0")

    useEffect(()=> {
        formatTotal()
    }, [pizzaContext?.totalPrice])

    const formatTotal = () => {
        let totalString = pizzaContext?.totalPrice.toLocaleString('es-CL')
        setTotalPice(totalString)
    }

    return (
        <div>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cartValue">$ {totalPrice}</span>
        </div>
    )
}

export default NavCart
