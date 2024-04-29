import React, { useContext, useEffect, useState } from 'react'
import { pageContext } from '../context/pizzas.context'
import PizzaCard from '../components/pizza.card'
import Header from '../components/header'

const Home: React.FC = () => {
    const pizzasContext = useContext(pageContext)
    const [pizzas, setPizzas] = useState(pizzasContext?.pizzas)
    

    const loadPizzas = () => {
        if (pizzasContext) {
            setPizzas(pizzasContext.pizzas)
        } else {
            console.log("no han cargado las pizzas")
        }
    }

    useEffect(() => {
        loadPizzas()
      }, [pizzasContext]);

    return (
        <div className='home-container'>
            <Header />
            <div className="pizzas-card-container">
                {pizzas ? pizzas.map((pizza) => (
                    <PizzaCard key={pizza.id} pizza={pizza} />
                )) : <p>Cargando pizzas...</p>}
            </div>
        </div>
    );
}

export default Home
