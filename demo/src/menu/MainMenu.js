import React, {useState} from 'react';
import {Dropdown, Icon, Menu} from 'semantic-ui-react';
import {useLocation, useNavigate} from 'react-router-dom';

const MainMenu = () => {
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (name, nextUrl) => {
        setActiveItem(name);
        navigate(`${location.pathname}/${nextUrl}`);
    };

    const handleClick = (name, nextUrl) => {
        setActiveItem(name);
        navigate(`/${nextUrl}`);
    };

    const onRepoNameClick = () => {
        window.location.href = "https://github.com/fireHedgehog/react-smtc-ui-utils";
    };

    return (
        <Menu inverted tabular stackable size={'massive'}>
            <Menu.Item
                name='Home'
                nexturl='react-smtc-ui-utils'
                active={activeItem === 'Home'}
                color={activeItem === 'Home' ? 'blue' : 'black'}
                onClick={(e) => handleClick('Home', 'react-smtc-ui-utils')}
            >
                <Icon name="home"/>
            </Menu.Item>

            <Menu.Item
                header
                onClick={onRepoNameClick}
            >
                react-smtc-ui-utils
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='start'
                    nexturl='react-smtc-ui-utils/start'
                    active={activeItem === 'start'}
                    color={activeItem === 'start' ? 'blue' : 'black'}
                    onClick={(e) => handleClick('start', 'react-smtc-ui-utils/start')}
                >
                    Get Start
                </Menu.Item>

                <Dropdown item text='Data Table'>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={(e) => handleClick('table', 'react-smtc-ui-utils/table')}
                        >
                            Demo
                        </Dropdown.Item>

                        <Dropdown.Item
                            onClick={(e) => handleClick('props', 'react-smtc-ui-utils/Props')}
                        >
                            Props Document
                        </Dropdown.Item>

                        <Dropdown.Item
                            onClick={(e) => handleClick('tableProps', 'react-smtc-ui-utils/tableProps')}
                        >
                            Props Examples
                        </Dropdown.Item>

                        <Dropdown.Item
                            onClick={(e) => handleClick('responsive', 'react-smtc-ui-utils/responsive')}
                        >
                            Responsive Examples
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item
                    nexturl="react-smtc-ui-utils/others"
                    name='others'
                    active={activeItem === 'others'}
                    color={activeItem === 'others' ? 'blue' : 'black'}
                    onClick={(e) => handleClick('others', 'react-smtc-ui-utils/others')}
                >
                    Others
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default MainMenu;
