import React, {Component} from 'react'
import {Grid, Header, Message, Segment} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTableHeaders, PublicTables} from '../../../src'

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
                        <Header as={'h2'}
                                color={'brown'}
                                content={'Pagination:'}
                        />
                        <p style={{
                            display: "block",
                            fontWeight: 400,
                            fontSize: "1.14285714rem",
                            padding: 0,
                            margin: 0,
                            lineHeight: "1.2em",
                            color: "rgba(0,0,0,.6)"
                        }}>
                            Currently, only support 2 pagination style:
                            <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1) primary type pageSize can be 10, 20 ,50.
                            <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 2) Secondary pageSize can be any Int.
                            <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 3) Customized pagination type have not been implemented.
                            <br/>Also support pagination props (all the props of semantic UI, like size or item components)
                        </p>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables data={dummy_data} 
              pagination 
              pageSize={10}
              paginationProps={{
                     size: "mini",
                     ellipsisItem: "..",
                     nextItem: null,
                     prevItem: null,
                     boundaryRange: 0
              }} 
>
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
                            paginationProps={{
                                size: "mini",
                                ellipsisItem: "..",
                                nextItem: null,
                                prevItem: null,
                                boundaryRange: 0
                            }}
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
                            paginationProps={{
                                size: "mini",
                                ellipsisItem: "..",
                                nextItem: null,
                                prevItem: null,
                                boundaryRange: 0
                            }}
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