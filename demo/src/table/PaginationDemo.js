import React, {Component} from 'react'
import {Segment, Grid, Message, Header} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class PaginationDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    state = {}

    render() {
        const {tableData} = this.props;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'Pagination:'}
                                subheader={"Currently, only support 2 pagination style , pageSize can be 10, 20 ,50. Pagination customization have not implement yet"}/>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables data={dummy_data} pagination pageSize={10}>
        <PublicTableHeaders header={'Email'} accessor={'email'}/>
        <PublicTableHeaders header={'Gender'} accessor={'gender'}/>
<PublicTables/>
<!--This example is also using Semantic-UI original Props such as celled,collapsing,compact and unstackable -->
`}
                            </Highlight>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>

                    <Grid.Column width={8}>
                        <Message content={"pagination or pagination={true} or pagination={'primary'}"}/>
                        <PublicTables
                            data={tableData}
                            pageSize={10}
                            pagination={true}
                            celled
                            compact
                            unstackable
                        >
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
                            />
                        </PublicTables>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Message content={"pagination={'secondary'}"}/>
                        <PublicTables
                            data={tableData}
                            pageSize={10}
                            pagination={'secondary'}
                            celled
                            compact
                            unstackable
                        >
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
                            />
                        </PublicTables>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}