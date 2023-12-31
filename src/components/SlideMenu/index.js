import './index.css'

const SlideMenu = props => {
  const {eachMenu, isActive, activeTab} = props
  const {menuCategory, menuCategoryId} = eachMenu

  const onActive = () => {
    activeTab(menuCategoryId)
  }

  const className = isActive ? 'active-tab' : 'inactive-tab'

  return (
    <li className="tabs-container">
      <button type="button" className={className} onClick={onActive}>
        {menuCategory}
      </button>
    </li>
  )
}

export default SlideMenu
