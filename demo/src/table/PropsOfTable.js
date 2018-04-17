import React, {Component} from 'react'
import json from "json-loader!../data/doc.json";
import {PublicTables, PublicTableHeaders} from '../../../src';
import {Grid, Header, Divider} from "semantic-ui-react";

export default class PropsOfTable extends Component {

    static propTypes = {}

    state = {
        tableDoc: [],
        headerDoc: [],
    }

    componentDidMount() {

        this.initTableDoc();
        this.initHeaderDoc();
    }

    initTableDoc() {
        const table = json["PublicTables.js"][0]["props"]
        const tableDoc = [];
        for (let [key, value] of Object.entries(table)) {
            //console.log(k, v)
            tableDoc.push(
                {
                    name: key,
                    description: value.description,
                    typeName: value.type.name,
                    typeValue: JSON.stringify(value.type.value, null, 2),
                }
            )

        }
        this.setState({
            tableDoc: tableDoc
        });
    }

    initHeaderDoc() {
        const table = json["PublicTableHeaders.js"][0]["props"]
        const tableDoc = [];
        for (let [key, value] of Object.entries(table)) {
            //console.log(k, v)
            if (key !== "tableElementType") {
                tableDoc.push(
                    {
                        name: key,
                        description: value.description,
                        typeName: value.type.name,
                    }
                )
            }

        }

        this.setState({
            headerDoc: tableDoc
        });
    }

    render() {

        const {tableDoc,headerDoc} = this.state;

        return (
            <div style={{margin: "2%"}}>
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={'1'}>

                        </Grid.Column>
                        <Grid.Column width={'10'}>
                            <Header as={"h3"} content={"Props of PublicTableHeaders"}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={'1'}>

                        </Grid.Column>
                        <Grid.Column width={'10'}>
                            <PublicTables
                                data={tableDoc}
                                celled
                                compact
                                unstackable
                            >
                                <PublicTableHeaders
                                    header={'Name'}
                                    accessor={'name'}
                                />
                                <PublicTableHeaders
                                    header={'Type'}
                                    accessor={'typeName'}
                                />
                                <PublicTableHeaders
                                    header={'Description'}
                                    accessor={'description'}
                                />

                            </PublicTables>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={'1'}>

                        </Grid.Column>
                        <Grid.Column width={'10'}>
                            <Header as={"h3"} content={"Props of PublicTables"}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={'1'}>

                        </Grid.Column>
                        <Grid.Column width={'10'}>
                            <PublicTables
                                data={headerDoc}
                                celled
                                compact
                                unstackable
                            >
                                <PublicTableHeaders
                                    header={'Name'}
                                    accessor={'name'}
                                />
                                <PublicTableHeaders
                                    header={'Type'}
                                    accessor={'typeName'}
                                />
                                <PublicTableHeaders
                                    header={'Description'}
                                    accessor={'description'}
                                />

                            </PublicTables>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>
        )
    }
}
