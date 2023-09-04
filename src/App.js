import React from 'react'
import SlideMenu from './components/SlideMenu'
import './App.css'

const apiConstraints = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends React.Component {
  state = {
    apiStatus: apiConstraints.initial,
    restaurantDetailsData: {},
    tableMenuListData: [],
    categoryDishesData: [],
    addonCat: [],
    orderCount: 0,
    active: '',
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiConstraints.in_progress})

    const response = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
    )

    const data = await response.json()

    console.log(data)

    if (response.ok === true) {
      const updatedRestaurantDetailsData = data.map(eachItem => ({
        restaurantId: eachItem.restaurant_id,
        restaurantImage: eachItem.restaurant_image,
        restaurantName: eachItem.restaurant_name,
        tableId: eachItem.table_id,
        tableName: eachItem.table_name,
      }))

      const updatedTableMenuListData = data[0].table_menu_list.map(
        eachTable => ({
          menuCategory: eachTable.menu_category,
          menuCategoryId: eachTable.menu_category_id,
          menuCategoryImage: eachTable.menu_category_image,
          categoryDishes: eachTable.category_dishes,
        }),
      )

      //   const updatedCategoryDishesData = data[0].table_menu_list.category_dishes.map(
      //     eachCategory => ({
      //       dishAvailability: eachCategory.dish_Availability,
      //       dishType: eachCategory.dish_Type,
      //       dishCalories: eachCategory.dish_calories,
      //       dishCurrency: eachCategory.dish_currency,
      //       dishDescription: eachCategory.dish_description,
      //       dishId: eachCategory.dish_id,
      //       dishImage: eachCategory.dish_image,
      //       dishName: eachCategory.dish_name,
      //       dishPrice: eachCategory.dish_price,
      //     }),
      //   )

      //   console.log(updatedCategoryDishesData)

      //   const updatedAddonCat = data[0].table_menu_list.category_dishes.addonCat.map(
      //     eachAddOn => ({
      //       addonCategory: eachAddOn.addon_category,
      //       addonCategoryId: eachAddOn.addon_category_id,
      //       addons: eachAddOn.addons,
      //     }),
      //   )
      //   console.log(updatedAddonCat)
      this.setState({
        restaurantDetailsData: updatedRestaurantDetailsData,
        tableMenuListData: updatedTableMenuListData,
        apiStatus: apiConstraints.success,
        active: updatedTableMenuListData[0].menuCategoryId,
      })
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  activeTab = menuCategoryId => {
    this.setState({active: menuCategoryId})
  }

  renderLoaderView = () => <div>Loading...</div>

  renderSuccessView = () => {
    const {
      restaurantDetailsData,
      orderCount,
      tableMenuListData,
      active,
    } = this.state

    return (
      <>
        <nav className="app-header">
          <h3 className="website-heading">
            {restaurantDetailsData[0].restaurantName}
          </h3>
          <div className="store-container">
            <p className="my-orders-text">My Orders</p>
            <div className="orders-container">
              {/* <AiOutlineShoppingCart className="store-icon" /> */}
              <div className="order-count">
                <p className="count">{orderCount}</p>
              </div>
            </div>
          </div>
        </nav>
        <ul className="tabs-list-container">
          {tableMenuListData.map(eachMenu => (
            <SlideMenu
              eachMenu={eachMenu}
              key={eachMenu.menuCategoryId}
              activeTab={this.activeTab}
              isActive={eachMenu.menuCategoryId === active}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => <div>Failure</div>

  renderRestaurantApp = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstraints.in_progress:
        return this.renderLoaderView()
      case apiConstraints.success:
        return this.renderSuccessView()
      case apiConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantApp()}</>
  }
}

export default App
