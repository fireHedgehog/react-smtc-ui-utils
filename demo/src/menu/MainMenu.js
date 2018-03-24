import React, {Component} from 'react'
import {Menu, Icon, Dropdown} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";

class MainMenu extends Component {

    state = {}

    handleItemClick = (e, {name, nexturl}) => {
        this.setState(
            {
                activeItem: name
            }
        );
        const {history, match} = this.props;
        //console.log(history);
        history.push(`${match.url}/${nexturl}`);
    }

    handleClick = (e, {name, nexturl}) => {
        this.setState(
            {
                activeItem: name
            }
        );
        const {history, match} = this.props;
        //console.log(history);
        history.push(`/${nexturl}`);
    }

    onRepoNameClick() {
        window.location.href = "https://github.com/fireHedgehog/react-smtc-ui-utils";
    }

    render() {
        const {activeItem} = this.state

        //const {match} = this.props;

        //console.log(match);
        return (
            <Menu inverted
                  tabular
                  stackable
                  size={'massive'}
            >

                <Menu.Item
                    name='Home'
                    nexturl='react-smtc-ui-utils'
                    active={activeItem === 'Home'}
                    color={activeItem === 'Home' ? 'blue' : 'black'}
                    onClick={this.handleClick}>
                    <Icon name="home"/>
                </Menu.Item>

                <Menu.Item
                    header
                    onClick={() => this.onRepoNameClick()}
                >
                    react-smtc-ui-utils
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='start'
                        nexturl='react-smtc-ui-utils/start'
                        active={activeItem === 'start'}
                        color={activeItem === 'start' ? 'blue' : 'black'}
                        onClick={this.handleClick}
                    >
                        Get Start
                    </Menu.Item>

                    <Dropdown item text='Data Table'>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                nexturl="react-smtc-ui-utils/table"
                                onClick={this.handleClick}>
                                Example
                            </Dropdown.Item>

                            <Dropdown.Item
                                nexturl="react-smtc-ui-utils/tableProps"
                                onClick={this.handleClick}>
                                Props
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item
                        nexturl="react-smtc-ui-utils/others"
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