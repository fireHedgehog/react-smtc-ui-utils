import React, {Component} from 'react'
import { Grid, Header,Icon,List} from 'semantic-ui-react';



export class GetStart extends Component {


    render() {


        return (
            <Grid>
                <Grid.Row></Grid.Row>

                <Grid.Row>

                    <Grid.Column>

                        <Header as='h2'>
                            <Icon name='html5' />
                            <Header.Content>
                                Semantic ui utils
                                <Header.Subheader>
                                   Just a demo for personal use interests.
                                </Header.Subheader>
                            </Header.Content>
                        </Header>

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                    <Grid.Column>

                        <List bulleted size={'huge'}>

                            <List.Item>1. Install all dependencies of react-semantic-ui</List.Item>

                            <List.Item>2. install this</List.Item>

                        </List>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}
