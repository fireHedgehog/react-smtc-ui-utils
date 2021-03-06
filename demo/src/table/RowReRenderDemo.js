import React, {Component} from 'react'
import {Segment, Grid, Table, Header, Button,Divider} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders, CustomizedFooter} from '../../../src'

export default class RowReRenderDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData,
            reRender: false,
        }
    }


    rowRender(row, index) {
        const {reRender} = this.state;

        if (index === 2 && reRender) {
            return (
                <Table.Row key={index}>
                    <Table.Cell colSpan={2}>
                        <h2 style={{color: "red"}}>Has been re-rendered!</h2>
                    </Table.Cell>
                </Table.Row>

            );
        }
    }

    onReRenderClick() {
        const {reRender} = this.state;
        this.setState({reRender: !reRender});
    }

    render() {
        const {tableData} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'rowRenderCallback:'}
                                subheader={"we can totally re-render the entire row!"}/>
                        <Segment compact><Highlight languages={['javascript', 'html', 'typescript']}>
                            {`
rowRender(row, index) {
      //we can use dynamic flag in ether 'this.state' or a flag in the row,
      //like you have a dynamic action button, when click, we use foreach to change the table data
      if (index === 2) {
      // should wrap our new row, inside of <Table.Row/> of semantic for the flexibility.
      // perhaps sometimes we need colSpan={3}, sometimes we need  <Table.Cell>something</Table.Cell> without colSpan
            return (
                 <Table.Row key={index}>
                    <Table.Cell colSpan={2}>
                        <h2 style={{color: "red"}}>Has been re-rendered!</h2>
                    </Table.Cell>
                 </Table.Row>
                );
        }
}
`}
                        </Highlight>
                            <Divider/>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables
     data={dummy_data}
     rowRenderCallback={(row, index) => this.rowRender(row, index)}
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

                        <PublicTables
                            data={tableData}
                            celled
                            compact
                            unstackable
                            sortable
                            rowRenderCallback={(row, index) => this.rowRender(row, index)}
                        >
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
                            />
                            <CustomizedFooter>
                                <Button content={'re-render the 3rd row'} onClick={() => this.onReRenderClick()}/>
                            </CustomizedFooter>
                        </PublicTables>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}