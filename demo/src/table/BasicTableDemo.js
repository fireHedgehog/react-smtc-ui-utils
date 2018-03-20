import React, {Component} from 'react'
import {Button, Label, Icon, Input, Grid, Segment, Message, Header} from 'semantic-ui-react';
import json from "json-loader!../data/MOCK_DATA.json";
import {PublicStep, PublicTables, CustomizedFooter, PublicTableHeaders} from '../../../src'
import renderLinks from "../../../src/static/CodeSource";
import Gist from 'react-gist';


export class BasicTableDemo extends Component {

    state = {
        bundleName: '',
        checked: [],
    }

    formatNameAndTitle(cellValue, rowObject) {
        //console.log(rowObject)
        return (
            <div style={{minWidth: '200px'}}>
                <Label>
                    <Icon name={'user'}></Icon>
                    {rowObject.first_name + " " + rowObject.last_name}
                </Label>
            </div>
        );
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    onCheckBoxChange = (checked) => {
        this.setState(
            {
                checked: checked
            }
        );
    }


    render() {

        const {bundleName, checked} = this.state;

        return (
            <Grid>
                <Grid.Row>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={'5'}>

                        <Segment>

                            <Header as={'h5'}>
                                Column filter:
                            </Header>

                            <Message color={'blue'}>
                                Customized column filter, in this case, filtered column is a 'Hidden' column,
                                'Accessor' of this column is 'app_bundle_id'. Such as 'com.google.Job'.
                            </Message>

                            <Input placeholder='app_bundle_id filter example' fluid
                                   name='bundleName' value={bundleName}
                                   onChange={this.handleChange}/>
                        </Segment>

                        <Segment>

                            <Header as={'h5'}>
                                Check Box:
                            </Header>

                            <Message color={'blue'}>
                                Check Box value array depends on the given 'Accessor' of certain column.
                                In this case, Accessor is 'ID'.
                            </Message>

                            <strong>checkedCallBackFunction:</strong>
                            <pre>{JSON.stringify({checked}, null, 2)}</pre>
                        </Segment>

                    </Grid.Column>

                    <Grid.Column width={'11'}>

                        <PublicTables
                            data={json.mock_user}
                            showAllCheck={true}
                            checkedCallBackFunction={(checked) => this.onCheckBoxChange(checked)}
                            pagination={true}
                            celled
                            unstackable
                            sortable={true}
                        >

                            <PublicTableHeaders
                                header={""}
                                accessor={"id"}
                                collapsing={true}
                                textAlign={'left'}
                                colAsCheckBox={true}
                                checkBoxStyle={'slider'}
                            />

                            <PublicTableHeaders
                                collapsing
                                header={"Full Name"}
                                accessor={"first_name"}
                                columnFormat={(cellValue, rowObject) => this.formatNameAndTitle(cellValue, rowObject)}
                            />

                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                                columnAlign={'center'}
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
                                columnAlign={'center'}
                            />

                            <PublicTableHeaders
                                header={''}
                                accessor={'app_bundle_id'}
                                isHidden={true}
                                filterContext={bundleName}
                            />

                            <CustomizedFooter>
                                <Button.Group>
                                    <Button color={'blue'}>Add</Button>
                                    <Button.Or/>
                                    <Button color={'red'}>Delete</Button>
                                </Button.Group>
                            </CustomizedFooter>

                        </PublicTables>
                    </Grid.Column>

                </Grid.Row>

                {renderLinks('demo/src/table/BasicTableDemo.js')}
                <Gist id='b66a45c2e7f0a734597b63891f7a25db'/>
                <Grid.Row>
                    <Grid.Column width={'5'}>

                    </Grid.Column>
                    <Grid.Column width={'11'}>

                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}
