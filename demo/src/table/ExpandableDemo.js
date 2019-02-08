import React, {Component} from 'react'
import {Divider, Grid, Header, Icon, Popup, Segment, Table} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTableHeaders, PublicTables} from '../../../src'
import _ from "lodash";
import {formatNameAndTitle} from "./BasicTableDemo";

export default class ExpandableDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData,
            openIds: [],
        }
    }


    formatExpandable(cell, row) {
        const {openIds} = this.state;
        const {id} = row;

        const exist = _.find(openIds, function (element) {
            return element === id;
        });

        return (
            <Popup
                trigger={
                    <div style={{cursor: "pointer"}} onClick={() => this.onHeaderClick(row)}>
                        <Header as={"h5"} color={"blue"} content={(
                            <div>

                                <Icon
                                    name={exist ? "minus" : "plus"}
                                    color={exist ? "orange" : "blue"}
                                />
                                {cell}
                            </div>
                        )}/>
                    </div>
                }
            >
                <p>{exist ? "Close" : "Open"}</p>
            </Popup>

        );
    }

    onHeaderClick(row) {
        const {openIds} = this.state;
        const {id} = row;

        const exist = _.find(openIds, function (element) {
            return element === id;
        });

        if (exist) {
            _.pull(openIds, id);
        } else {
            openIds.push(id);
        }

        this.setState({
            openIds: openIds,
        })
    }

    rowRender(row, index) {

        const {id, email, gender, app_bundle_id, dept} = row;

        const {openIds} = this.state;

        if (_.includes(openIds, id)) {
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        {formatNameAndTitle(index, row)}
                    </Table.Cell>
                    <Table.Cell colSpan={2}>
                        <Segment attached secondary>
                            {this.formatExpandable(email, row)}
                        </Segment>
                        <Segment attached>
                            Gender : {gender}
                            <br/>
                            App Bundle ID : {app_bundle_id}
                            <br/>
                            Department : {dept}
                            <br/>
                        </Segment>
                    </Table.Cell>
                </Table.Row>
            );
        }
    }

    render() {
        const {tableData} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'Expandable Cell Example:'}
                                subheader={"we can use re-render function to create a expandable cell !"}/>
                        <Segment compact><Highlight languages={['javascript', 'html', 'typescript']}>
                            {`// Using re-render function to re-render the cell we'v just clicked
rowRender(row, index) {
      const {id} = row;
      //use Id array as re-render flag
      const {openIds} = this.state;
      if (_.includes(openIds, id)) {
            return (
                 <Table.Row key={index}>
                     <Table.Cell colSpan={3}>
                        // bala bala bala bala bala bala
                     </Table.Cell>
                 </Table.Row>
            );
      }
}
// Using cell format function to create a clickable cell
formatExpandable(){
    const {openIds} = this.state;
    const {id} = row;

    const exist = _.find(openIds, function (element) {
        return element === id;
    });
    return (
         <Header content={(
                    <div>
                        <Icon name={exist ? "minus" : "plus"}
                              color={exist ? "orange" : "blue"}/>
                              {cell}
                    </div>
                 )}
         />
    );
}
`}
                        </Highlight>
                            <Divider/>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables
     data={dummy_data}
     rowRenderCallback={(row, index) => this.rowRender(row, index)}
>
        <PublicTableHeaders header={'Email'} accessor={'email'}  columnFormat={(cell, row) => this.formatExpandable(cell, row)}/>
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

                        <PublicTables
                            data={tableData}
                            celled
                            compact
                            unstackable
                            sortable
                            rowRenderCallback={(row, index) => this.rowRender(row, index)}
                        >
                            <PublicTableHeaders
                                collapsing
                                header={"Full Name"}
                                accessor={"first_name"}
                                columnFormat={formatNameAndTitle}
                            />
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                                columnFormat={(cell, row) => this.formatExpandable(cell, row)}
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