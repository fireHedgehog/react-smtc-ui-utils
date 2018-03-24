import React, {Component} from 'react'
import {Header,Icon} from "semantic-ui-react";


export class MainTitle extends Component {

    render() {

        return (
            <div>

                <Header as='h2' color={'blue'}>
                    <Icon name='html5'/>
                    <Header.Content>
                        Semantic ui utils
                        <Header.Subheader>
                            Just a demo for personal interests and learning.
                        </Header.Subheader>
                    </Header.Content>
                </Header>

            </div>
        )
    }
}
