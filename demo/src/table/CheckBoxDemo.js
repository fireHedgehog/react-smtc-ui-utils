import React, {Component} from 'react'
import {Segment, Grid, Header, Label, Icon, Divider} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class CheckBoxDemo extends Component {

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
                        <Header as={'h2'} color={'brown'} content={'Check box:'}
                                subheader={"Using checkedCallBackFunction to get the checked cells (depending on checkbox accessor)"}/>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html', 'typescript']}>
                                {`
onCheckedChange(val) {
     console.log(val);
}
`}
                            </Highlight>
                            <Divider/>
                            <Highlight languages={['javascript', 'html', 'typescript']}>
                                {`
<PublicTables data={dummy_data}
              showAllCheck={true}
              checkedCallBackFunction={(val) => this.onCheckedChange(val)}>
        <PublicTableHeaders header={""}
                            accessor={"id"}
                            colAsCheckBox={true}
                            checkBoxStyle={'toggle'} />
        <PublicTableHeaders header={'Email'} accessor={'email'}/>
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
                            showAllCheck={true}
                            checkedCallBackFunction={(val) => void(0)}
                            celled
                            compact
                            unstackable
                        >
                            <PublicTableHeaders
                                header={""}
                                accessor={"id"}
                                collapsing={true}
                                textAlign={'left'}
                                colAsCheckBox={true}
                                checkBoxStyle={'toggle'}
                            />

                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                            />

                        </PublicTables>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}