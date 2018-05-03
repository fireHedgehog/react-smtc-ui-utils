import React, {Component} from 'react'
import {Input, Grid, Segment, Message, Header, Divider} from 'semantic-ui-react';
import {PublicStep} from '../../../src'
import renderLinks from "./CodeSource";
import Gist from 'react-gist';


export class StepDemo extends Component {

    state = {
        step: '',
        stepOptions: [
            {
                key: 'create',
                icon: 'write',
                active: true,
                completed: false,
                title: 'Create',
                description:
                    'Create account ...'
            },
            {
                key: 'respondents',
                active: false,
                completed: false,
                icon: 'shopping bag',
                title: 'Shopping',
                description: 'Select products ...'
            },
            {
                key: 'cart',
                disabled: false,
                completed: false,
                icon: 'shop',
                title: 'Cart',
                description: 'View cart ...'
            },
            {
                key: 'payment',
                disabled: false,
                completed: false,
                icon: 'payment',
                title: 'Payment',
                description: 'Online payment ...'
            },
        ],
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    render() {

        const {
            step, stepOptions
        } = this.state;

        return (
            <Grid>
                <Grid.Row>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={'5'}>

                        <Segment>

                            <Header as={'h5'}>
                                Original Library
                            </Header>

                            <Message color={'teal'}>
                                This Step util is using Semantic-UI(react.semantic-ui.com).
                            </Message>


                        </Segment>

                        <Segment>

                            <Header as={'h5'}>
                                Step:
                            </Header>

                            <Message color={'blue'}>
                                Pass a step JSON array to initialize (see array format on semantic official page).
                                Then pass a number as current step.
                            </Message>

                            <Input placeholder='Enter a number'
                                   fluid
                                   name='step'
                                   type={'number'}
                                   value={step}
                                   onChange={this.handleChange}/>
                        </Segment>


                    </Grid.Column>

                    <Grid.Column width={'11'}>

                        <PublicStep currentStep={step} stepOptions={stepOptions}/>

                    </Grid.Column>

                </Grid.Row>


                <Grid.Row>
                    <Grid.Column width={'16'}>
                        <Divider/>
                        {renderLinks('demo/src/others/StepDemo.js')}
                        <Gist id='a01d4230f7331dff3b377df09889b792'/>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}
