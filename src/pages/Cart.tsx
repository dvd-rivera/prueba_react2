import React, { useContext, useEffect, useState } from 'react'
import { pageContext } from '../context/pizzas.context'

const Cart: React.FC = () => {
    const pizzaContext = useContext(pageContext)
    const [total, setTotal] = useState<number>(0)

    if (!pizzaContext || !pizzaContext.cartItem) {
        return <p className="parra">Error cargando el carrito</p>
    }

    const removePizza = (id: string) => {
        if (pizzaContext) {
          const newCartItems = pizzaContext.cartItem.map((pizza) => {
            if (pizza.id === id && pizza.cant > 0) { 
              return { ...pizza, cant: pizza.cant - 1 }; 
            } else {
              return pizza; 
            }
          });
      
          pizzaContext.setCartItem(newCartItems);
        }
      };

    const addPizza = (id: string) => {
        if (pizzaContext) {
            const newCartItems = pizzaContext.cartItem.map((pizza) => {
                if (pizza.id === id) {
                    return { ...pizza, cant: pizza.cant + 1 };
                } else {
                    return pizza;
                }
            });

            pizzaContext.setCartItem(newCartItems);
        }
    }

    const calcTotal = () => {
        let total = 0
        pizzaContext.cartItem.forEach((pizza) => {
            total += (pizza.cant * pizza.price)
        })
        setTotal(total)
    }

    useEffect(()=> {
        calcTotal()
    }, [pizzaContext.cartItem])

    return (
        <div className="cart-section">
            <div className="cart-container">
                <h2>Detalle del Pedido</h2>
                {pizzaContext.cartItem.length > 0 ? (
                    pizzaContext.cartItem.filter((pizza) => pizza.cant > 0).map((pizza) => (
                        <div className='cartPizza' key={pizza.id}>
                            <div className="img-container">
                                <img src={pizza.img} alt="" />
                            </div>
                            <h3 className="name">
                                {pizza.name}
                            </h3>
                            <h3>
                                $ {(pizza.price * pizza.cant).toLocaleString("cl-CL")}
                            </h3>
                            <div className="button-container">
                                <button onClick={() => removePizza(pizza.id)}>Quitar</button>
                                <div className="quantity">
                                    {pizza.cant}
                                </div>
                                <button onClick={() => addPizza(pizza.id)}>Agregar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>El carrito está vacío.</p>
                )}
                <h2 className='totalPrice'>
                    Total: $ {total.toLocaleString("cl-CL")}
                </h2>
                <button className='payBtn'>Ir a Pagar</button>
            </div>
        </div>
    )
}

export default Cart
