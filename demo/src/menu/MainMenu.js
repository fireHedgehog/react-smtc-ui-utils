import React, {Component} from 'react'
import { Menu , Icon} from 'semantic-ui-react'


export default class MainMenu extends Component {

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted borderless size={'massive'}>

                <Menu.Item>
                    <Icon name={'table'} />
                </Menu.Item>

                <Menu.Item header>react-smtc-ui-utils</Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        color={activeItem === 'Home' ? 'blue' : 'black'}
                        onClick={this.handleItemClick}
                    >
                        Home
                    </Menu.Item>

                    <Menu.Item
                        name='Table'
                        active={activeItem === 'Table'}
                        color={activeItem === 'Table' ? 'blue' : 'black'}
                        onClick={this.handleItemClick}
                    >
                        Table
                    </Menu.Item>

                    <Menu.Item
                        name='Others'
                        active={activeItem === 'Others'}
                        color={activeItem === 'Others' ? 'blue' : 'black'}
                        onClick={this.handleItemClick}
                    >
                        Others
                    </Menu.Item>
                </Menu.Menu>


            </Menu>
        )
    }
}

