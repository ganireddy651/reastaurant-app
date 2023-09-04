import './index.css'

const DishesList = props => {
  const {eachDish} = props

  const {
    dishAvailability,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
  } = eachDish

  return <li className="dish-card">{(dishType, dishAvailability)}</li>
}

export default DishesList
