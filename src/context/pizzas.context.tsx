import React, { useEffect } from 'react'
import Pizza from '../models/pizzas.interface'
import CartItem from '../models/cart.interface'
import { createContext, useState } from 'react'

interface Context {
    pizzas: Pizza[] | null
    setPizzas: React.Dispatch<React.SetStateAction<Pizza[]>>
    cartItem: CartItem[]
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>
    totalPrice: number
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>
    isLoadingPizzas: boolean
    loadPizzas: () => void
}

export const pageContext = createContext<Context | undefined>(undefined)

const PageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoadingPizzas, setIsLoadingPizzas] = useState(false);

    const loadPizzas = async () => { 
        setIsLoadingPizzas(true);
        try {
          const response = await fetch('src/pizzas.json');
          const data = await response.json();
          setPizzas(data); 
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingPizzas(false);
        }
      };

    const loadCart = () => {
        const pizzaCart: CartItem[] = pizzas.map((pizza) => {
            return {...pizza, cant: 0}
        })
        setCartItem(pizzaCart)
    }

    const calcTotal = () => {
        let total = 0
        cartItem.forEach((item)=> {
            total += (item.cant * item.price)
        })
        setTotalPrice(total)
    }

    useEffect(() => {
        loadPizzas()
      }, []);

      useEffect(() => {
        loadCart()
      }, [pizzas]);

    useEffect(() => {
        if(cartItem.length > 0) {
            calcTotal()
        }
      }, [cartItem]);

    return (
        <pageContext.Provider value={{pizzas, setPizzas, cartItem, setCartItem, totalPrice, setTotalPrice, isLoadingPizzas,loadPizzas}}>
            {children}
        </pageContext.Provider>
    )

}

export default PageContextProvider
