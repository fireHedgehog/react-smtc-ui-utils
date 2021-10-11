import React, {Component} from 'react'
import {Button, Label, Icon,Input} from 'semantic-ui-react';
import json from "json-loader!../data/MOCK_DATA.json";
import { PublicTables, CustomizedFooter, PublicTableHeaders} from '../../../src'
import renderLinks from "../others/CodeSource";
//import ReactEmbedGist from 'react-embed-gist';

export class ColumnFormatDemo extends Component {

    state={
        bundleName:'',
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

    handleChange = (e, { name, value }) => this.setState({ [name]: value })


    render() {

        const {bundleName} = this.state;

        return (
            <div>
                {/*<ReactEmbedGist gist='b66a45c2e7f0a734597b63891f7a25db'/>*/}
                {renderLinks('demo/src/table/ColumnFormatDemo.js')}

                <Input placeholder='bundle filter' name='bundleName' value={bundleName} onChange={this.handleChange} />

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

            </div>
        )
    }
}
