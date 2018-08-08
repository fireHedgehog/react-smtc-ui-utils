import React, {Component} from 'react'
import {Grid, Message, Menu, Segment} from 'semantic-ui-react';
import {json} from "./BasicTableDemo";
import DefaultResponsiveDemo from "./DefaultResponsiveDemo";
import SimpleResponsiveDemo from "./SimpleResponsiveDemo";
import FormatResponsiveDemo from "./FormatResponsiveDemo";

export class TableResponsiveContainer extends Component {

    state = {activeItem: 'Simple example'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        let example = (<div/>);

        if (activeItem === 'Simple example') {
            example = (
                <SimpleResponsiveDemo tableData={json.mock_user_img}/>
            );
        } else if (activeItem === 'Advanced example') {
            example = (
                <DefaultResponsiveDemo tableData={json.mock_user_img}/>
            );
        } else if (activeItem === "Format column example") {
            example =(
                <FormatResponsiveDemo tableData={json.mock_user_img}/>
            )
        }

        return (
            <Grid>

                <Grid.Row>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Message
                            success
                            content='Responsive table, we can ether use default layout or re-render the row.'
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <Menu fluid vertical pointing inverted>
                            <Menu.Item
                                name='Simple example'
                                active={activeItem === 'Simple example'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Format column example'
                                active={activeItem === 'Format column example'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Advanced example'
                                active={activeItem === 'Advanced example'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={13}>
                        <Segment>
                            {example}
                        </Segment>
                    </Grid.Column>

                </Grid.Row>


            </Grid>
        )
    }
}
