import React, {Component} from 'react'
import {Segment, Grid, Input, Header, Button} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders, CustomizedFooter} from '../../../src'

export default class CustomizedFooterDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }


    handleChange = (e, {name, value}) =>{
        this.setState({[name]: value});
    }


    render() {
        const {tableData} = this.props;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'CustomizedFooter:'}
                                subheader={"Wrap anything in this component"}/>
                        <Segment compact>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables data={dummy_data}>
        <PublicTableHeaders header={'Email'} accessor={'email'}/>
        <PublicTableHeaders header={'Gender'} accessor={'gender'}/>
        <CustomizedFooter>
             <Button content={'Test'}/>
             <Input/>
        </CustomizedFooter>
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
                                pageSize={10}
                                fakeDataSum={10}
                                fakePagination
                                onPageChangeCallBack={(a)=>console.log(a)}
                                pagination
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
                                    <Button content={'Test'}/>
                                    <Input/>
                                </CustomizedFooter>
                            </PublicTables>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}