import React, {Component} from 'react'
import {Segment, Grid, Header, Button, Divider, Message, Input} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class SimpleResponsiveDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData,
            email: "",
            param: {
                widthThreshold: 0,
                header: { // semantic-ui default <Item.header>
                    accessor: "email",// the assessor of the img, either a Base64 or a URL
                    //prefix: "", // we can set prefix
                    //suffix: "",// we can set suffix
                },
                meta: { // if has this param, will display a img.
                    accessor: "gender",// the assessor of the img, either a Base64 or a URL
                    prefix: "|", // we can set prefix
                    suffix: "|",// we can set suffix
                },
            }
        }
    }

    setResponsive() {
        const {param} = this.state;
        const size = _.parseInt(param.widthThreshold);

        if (size <= 10) {
            param.widthThreshold = 10000;
        } else {
            param.widthThreshold = 0;
        }
        this.setState({
            param: param
        });
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});


    render() {
        const {tableData, param, email} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={"A simple example of ' defaultResponsiveParam ' : "}
                                subheader={"set a default responsive layout by simple param"}/>
                        <Segment compact><Highlight languages={['javascript', 'html', 'typescript']}>
                            {`
const defaultParam = {
    widthThreshold : '480px',//set a minimum width (default-480px) of the table(not screen size)
    header: { // semantic-ui default <Item.Header>
        accessor: "email",// the assessor of the img, either a Base64 or a URL
        //prefix: "", // we can set prefix
        //suffix: "",// we can set suffix
    },
    meta: { // semantic-ui default <Item.Description>
         accessor: "gender",// the assessor of the img, either a Base64 or a URL
         prefix: "|", // we can set prefix
         suffix: "|",// we can set suffix
    }
}
`}
                        </Highlight>
                            <Divider/>
                            <Highlight languages={['javascript', 'html']}>
                                {`<PublicTables
     data={dummy_data}
     defaultResponsiveParam={defaultParam}
>
        <PublicTableHeaders header={'Email'} accessor={'email'}/>
        <PublicTableHeaders header={'Gender'} accessor={'gender'}/>
<PublicTables/>
<!--This example is also using Semantic-UI original
 Props such as celled,collapsing,compact and unstackable -->
`}
                            </Highlight>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>


                    <Grid.Column width={6}>
                        <Segment>
                            <Button
                                onClick={() => this.setResponsive()}
                                content={"Set responsive"}
                                color={"blue"}
                            />
                            <Divider/>
                            <Header as={'h5'}>
                                filter:
                            </Header>
                            <Message color={'blue'}>
                                Responsive mode, filter, sortable, pagination all work fine
                            </Message>
                            <Input placeholder='email'
                                   fluid
                                   name='email'
                                   value={email}
                                   onChange={this.handleChange}
                            />
                        </Segment>
                    </Grid.Column>


                    <Grid.Column width={10}>
                        <PublicTables
                            data={tableData}
                            celled
                            compact
                            unstackable
                            sortable
                            pageSize={10}
                            pagination={'secondary'}
                            defaultResponsiveParam={param}
                        >
                            <PublicTableHeaders
                                header={'Email'}
                                accessor={'email'}
                                filterContext={email}
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
