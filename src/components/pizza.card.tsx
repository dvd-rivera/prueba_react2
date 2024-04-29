import React, { useContext } from 'react'
import Pizza from '../models/pizzas.interface'
import { useNavigate } from 'react-router-dom'
import { pageContext } from '../context/pizzas.context'
import CartItem from '../models/cart.interface'

interface Props {
    pizza: Pizza
}

const PizzaCard: React.FC<Props> = (props) => {
    const pizzaContext = useContext(pageContext)

    const navigate = useNavigate()

    const navigateTo = (pizzaID: string) => {
        navigate(pizzaID)
    }

    const addPizza = (id: string) => {
        if(pizzaContext) {
            let newCartItems: CartItem[] = pizzaContext.cartItem.map((pizza) => {
                if(pizza.id == id) {
                    let newCant = pizza.cant + 1
                    return {...pizza, cant: newCant}
                } else {
                    return pizza
                }
            })
    
            pizzaContext.setCartItem(newCartItems)
        }
    }


    return (
        <div className='card-pizza'>
            <img src={props.pizza.img} alt="" />
            <h2>{props.pizza.name}</h2>
            <ul>
                {props.pizza.ingredients.map((ingr, index) => (
                    <li key={index}>{ingr}</li>
                ))}
            </ul>
            <p className="price">
                $ {props.pizza.price.toLocaleString("cl-CL")}
            </p>
            <div className="btn-container">
                <button onClick={() => navigateTo(props.pizza.id)}>Ver más</button>
                <button onClick={() => addPizza(props.pizza.id)}>Añadir</button>
            </div>
        </div>
    )
}

export default PizzaCard
