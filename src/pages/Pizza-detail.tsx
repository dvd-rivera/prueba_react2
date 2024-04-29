import React, { useContext, useEffect, useState } from 'react'
import { pageContext } from '../context/pizzas.context'
import { useNavigate, useParams } from 'react-router-dom'
import Pizza from '../models/pizzas.interface'
import CartItem from '../models/cart.interface'

const PizzaDetail: React.FC = () => {
    const pizzaContext = useContext(pageContext)
    const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>(undefined)

    const params = useParams();
    const pizzaID = params.pizzaID;

    const navigate = useNavigate()

    useEffect(() => {
        if (!pizzaID && (!pizzaContext?.pizzas || pizzaContext?.pizzas.length === 0)) {
            pizzaContext?.loadPizzas();
          } else {
            selectPizza(pizzaID)
          }
    }, [pizzaID, pizzaContext?.pizzas])

    const selectPizza = (id: string | undefined) => {
        if (pizzaContext) {
            let pizza = pizzaContext.pizzas?.filter((pizza) => pizza.id == id)[0]
            setSelectedPizza(pizza)
        } else {
            console.log("inicio")
            navigate("/")
        }
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
        <div className='pizza-detail-container'>
            {selectedPizza ?
                <div className="detail-pizza-card">
                    <div className="img-container">
                        <img src={selectedPizza.img} alt={selectedPizza.name} />
                    </div>
                    <div className="detail-container">
                        <h2>{selectedPizza.name}</h2>
                        <p className='desc'>
                            {selectedPizza.desc}
                        </p>
                        <h5>
                            ingredientes:
                        </h5>
                        <ul>
                            { selectedPizza.ingredients.map((ingr, index)=>
                                <li key={index}>{ingr}</li>
                            )}
                        </ul>
                        <div className="footer">
                            <p className="price">
                                $ {selectedPizza.price.toLocaleString("cl-CL")}
                            </p>
                            <button onClick={()=> {addPizza(selectedPizza.id)}}>Agregar</button>
                        </div>
                    </div>
                </div>
                : <p></p>}

        </div>
    )
}

export default PizzaDetail
