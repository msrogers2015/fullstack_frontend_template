import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { clearUserData } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";


/**
 * Easy to template logout button. By passing the buttonType, you have access to multiple different types of logout buttons
 * without needing to create a new custom component for multiple instances.
 * @param buttonType - str: Type of button. Current options include:
 *    - outline - Standard red button with only an outline
 *    - filled - Standard red button completely filled.
 * @param customClasses - str: Classes can be passed and applied as needed. This will apply either directly to the
 *                      button.
 * @returns {*}
 * @constructor
 */
function LogoutButton({buttonType, customClasses=null}) {
  const [buttonVariant, setButtonVariant] = useState(null)
  const navigate = useNavigate();


  /**
   * Clears localStorage of token and redirects the user to the login page.
   */
  const handleLogout = () => {
    clearUserData()
    navigate('/login')
  }


  /**
   * Creates a standard button, either outlined or filled with red.
   * @returns {React.JSX.Element}
   */
  const standardButton = () => (
    <Button className={customClasses} variant={buttonType === 'filled' ? 'danger' : 'outline-danger'} onClick={handleLogout}>Logout</Button>
  )

  /**
   * Logic for deciding what kind of button to return for the user.
   * @returns {React.JSX.Element}
   */
  const createButton = () => {
    switch (buttonType) {
      case 'outline':
      case 'filled':
        return (standardButton())
    }
  }

  return (createButton())
}

export default LogoutButton;