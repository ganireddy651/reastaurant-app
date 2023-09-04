import './index.css'

const SlideMenu = props => {
  const {eachMenu, isActive, activeTab} = props
  const {menuCategory, menuCategoryId, categoryDishes} = eachMenu

  const onActive = () => {
    activeTab(menuCategoryId)
  }

  const className = isActive ? 'active-tab' : 'inactive-tab'

  console.log(isActive)

  return (
    <li className="tabs-container">
      <button type="button" className={className} onClick={onActive}>
        {menuCategory}
      </button>
    </li>
  )
}

export default SlideMenu
