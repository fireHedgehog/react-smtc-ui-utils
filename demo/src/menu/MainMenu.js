import React, {Component} from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";

class MainMenu extends Component {

    state = {}

    handleItemClick = (e, {name,nexturl}) => {
        this.setState(
            {
                activeItem: name
            }
        );
        const {history, match} = this.props;
        //console.log(history);
        history.push(`${match.url}/${nexturl}`);
    }

    handleClick = (e, {name,nexturl}) => {
        this.setState(
            {
                activeItem: name
            }
        );
        const {history, match} = this.props;
        console.log(history);
        history.push(`/${nexturl}`);
    }

    render() {
        const {activeItem} = this.state

        const {match} = this.props;

        console.log(match);
        return (
            <Menu inverted
                  tabular
                  size={'massive'}
                  fixed={'top'}
            >

                <Menu.Item
                    name='Home'
                    nexturl=''
                    active={activeItem === 'Home'}
                    onClick={this.handleClick}>
                    <Icon name="home"/>
                </Menu.Item>

                <Menu.Item header>react-smtc-ui-utils</Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='start'
                        nexturl='start'
                        active={activeItem === 'start'}
                        color={activeItem === 'start' ? 'blue' : 'black'}
                        onClick={this.handleClick}
                    >
                        Get Start
                    </Menu.Item>

                    <Menu.Item
                        nexturl="table"
                        name='table'
                        active={activeItem === 'table'}
                        color={activeItem === 'table' ? 'blue' : 'black'}
                        onClick={this.handleClick}
                    >
                        Table
                    </Menu.Item>

                    <Menu.Item
                        nexturl="others"
                        name='others'
                        active={activeItem === 'others'}
                        color={activeItem === 'others' ? 'blue' : 'black'}
                        onClick={this.handleClick}
                    >
                        Others
                    </Menu.Item>
                </Menu.Menu>


            </Menu>
        )
    }
}

export default withRouter(MainMenu);