import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
    
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path);
    
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item
                name='characters'
                active={activeItem === 'characters'}
                onClick={handleItemClick}
                as={Link}
                to="/characters"
            />
            <Menu.Menu position='right'>
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            </Menu.Menu>
        </Menu>
    )
}


export default MenuBar;