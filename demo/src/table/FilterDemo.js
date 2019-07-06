import React, {Component} from 'react'
import {Segment, Grid, Input, Header, Dropdown} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class FilterDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    state = {email: "", gender: ""}

    handleChange = (e, {name, value}) => {
        //console.log(name, value)
        this.setState({[name]: value});
    }


    setToGreen(row) {
        //return row["id"] === 4
    }

    render() {
        const {tableData} = this.props;
        const {email, gender} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'Filter:'}
                                subheader={"Using Props 'filterContext', just pass some dynamic text from your component state "}/>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables data={dummy_data}>
        <PublicTableHeaders header={'Email'} accessor={'email'} filterContext={this.state.someText}/>
        <PublicTableHeaders header={'Gender'} accessor={'gender'} filterContext={this.state.someText}/>
<PublicTables/>
<!--This example is also using Semantic-UI original Props such as celled,collapsing,compact and unstackable -->
`}
                            </Highlight>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row verticalAlign={'middle'}>

                    <Grid.Column width={1}>
                        <Header as={'h4'}
                                content={'email :'}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Input placeholder='email filter'
                               name='email'
                               value={email}
                               onChange={this.handleChange}/>
                    </Grid.Column>

                    <Grid.Column width={1}>
                        <Header as={'h4'} content={'Dept:'}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Dropdown options={[
                            {key: "Engineering", text: "Engineering", value: "Engineering"},
                            {key: "Legal", text: "Legal", value: "Legal"},
                            {key: "Human Resources", text: "Human Resources", value: "Human Resources"},
                            {key: "Accounting", text: "Legal", value: "Accounting"},
                        ]}
                                  selection
                                  value={gender}
                                  name='gender'
                                  clearable
                                  onChange={this.handleChange}
                                  content={'email :'}/>

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                    <Grid.Column width={8}>
                        <div style={{minHeight: '220px'}}>
                            <PublicTables
                                data={tableData}
                                celled
                                compact
                                unstackable
                                sortable
                                rowHighLightFunction={(row) => this.setToGreen(row)}
                            >
                                <PublicTableHeaders
                                    header={'Email'}
                                    accessor={'email'}
                                    filterContext={email}
                                    selectable
                                    onCellSelectCallBack={(cell, row) => console.log(cell, row)}
                                />
                                <PublicTableHeaders
                                    header={'Department'}
                                    accessor={'dept'}
                                    filterContext={gender}
                                />
                            </PublicTables>
                        </div>
                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}