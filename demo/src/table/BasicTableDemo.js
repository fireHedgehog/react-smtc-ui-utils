import React, {Component} from 'react'
import {Button, Label, Icon} from 'semantic-ui-react';
import json from "json-loader!../data/MOCK_DATA.json";
import {PublicStep, PublicTables, CustomizedFooter, PublicTableHeaders} from '../../../src'


export class BasicTableDemo extends Component {


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

    render() {

        return (
            <div>
                <PublicTables
                    data={json.mock_user}
                    showAllCheck={true}
                    checkedCallBackFunction={(val) => console.log(val)}
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
                    <CustomizedFooter>
                        <Button.Group>
                            <Button color={'blue'}>Add</Button>
                            <Button.Or/>
                            <Button color={'red'}>Delete</Button>
                        </Button.Group>
                    </CustomizedFooter>

                </PublicTables>

            </div>
        )
    }
}
