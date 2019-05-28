import React, {Component} from 'react'
import {Divider, Grid, Header, Icon, Label, Segment} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTableHeaders, PublicTables} from '../../../src'

export default class CustomCellDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    state = {}

    formatDepartment(cell, row) {
        return (
            <Label>
                <Icon name={'user'}></Icon>
                {row.dept}
            </Label>
        );
    }

    render() {
        const {tableData} = this.props;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'Cell Customization:'}
                                subheader={"2 param of format call back function are cell(depending on accessor) and row."}/>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html', 'typescript']}>
                                {`
formatDepartment(cell, row) {
        return (
                <Label>
                    <Icon name={'user'}></Icon>
                    {row.dept}
                </Label>
        );
}
`}
                            </Highlight>
                            <Divider/>
                            <Highlight languages={['javascript', 'html', 'typescript']}>
                                {`<PublicTables data={dummy_data}>
        <PublicTableHeaders header={'Email'} accessor={'email'}/>
        <PublicTableHeaders header={'Gender'} accessor={'gender'}/>
        <PublicTableHeaders header={'Department'} accessor={'dept'}
                            columnFormat={(cell, row) => this.formatDepartment(cell, row)}/>
<PublicTables/>
<!--This example is also using Semantic-UI original Props such as celled,collapsing,compact and unstackable -->
`}
                            </Highlight>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>

                    <Grid.Column width={8}>

                        <PublicTables
                            data={tableData}
                            celled
                            compact
                            //sortable
                            unstackable
                        >
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                                //onHeaderClickCallBack={(clicked) => console.log(clicked)}
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
                            />
                            <PublicTableHeaders
                                header={'Department'}
                                accessor={'dept'}
                                //onHeaderClickCallBack={(clicked) => console.log(clicked)}
                                columnFormat={(cell, row) => this.formatDepartment(cell, row)}
                            />
                        </PublicTables>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}