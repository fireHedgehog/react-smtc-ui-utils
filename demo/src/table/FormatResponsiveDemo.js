import React, {Component} from 'react'
import {Segment, Grid, Header, Button, Divider, Message, Input, Label, Icon} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class FormatResponsiveDemo extends Component {

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
                description: { // if has this param, will display a img.
                    accessor: "first_name_format",// the assessor of the img, either a Base64 or a URL
                    //prefix: "*", // we can set prefix
                    //suffix: "*",// we can set suffix

                    /*
                     * similar to in <PublicTableHeaders columnFormat={()=>this.someRenderFunction()}/>
                     * this example re-render a hidden column, with a certain format function
                     * enable format function will disable all the prefix and suffix.
                     */
                    enableColFormat : true
                },
            }
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleThresholdChange = (e, {name, value}) =>{
        const {param} = this.state;
        param.widthThreshold = value;
        this.setState({
            param: param
        });
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

    onFirstNameFormat(value, row) {
        return (
            <Label>
                <Icon name={'user'}/>
                {row.first_name + " " + row.last_name}
            </Label>
        )
    }

    render() {
        const {tableData, param, email} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={"Param: enableColFormat : "}
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
    description: { // semantic-ui default <Item.Description>
         accessor: "email",// the assessor of the img, either a Base64 or a URL
         //prefix: "", // we can set prefix
         //suffix: "",// we can set suffix
        /*
         * similar to <PublicTableHeaders columnFormat={()=>this.someRenderFunction()}/>
         * this example re-render a hidden column, with a certain format function
         * enable format function will disable all the prefix and suffix.
         */
         enableColFormat : true
    }
}

    /*-----------------------------------------------------------------------------------------
     * column format function. can be a hidden column,
     * even work when accessor does not exist. the value is undefined but row is there
     * matching accessor of <PublicTableHeaders/> and accessor of responsive param to render
     */
    onFirstNameFormat(value, row) {
        return (
            <Label>
                <Icon name={'user'}/>
                {row.first_name + " " + row.last_name}
            </Label>
        )
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
        <PublicTableHeaders
                header={'Name'}
                accessor={'first_name_format'}
                columnFormat={(value,row) => this.onFirstNameFormat(value,row)}
                isHidden
        />
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
                            <Message color={'blue'}>
                                Set responsive widthThreshold to certain pixel.
                            </Message>
                            <Input placeholder='threshold '
                                   fluid
                                   name='threshold'
                                   value={param.widthThreshold}
                                   onChange={this.handleThresholdChange}
                            />
                            <Button
                                style={{marginTop:"20px"}}
                                onClick={() => this.setResponsive()}
                                content={"Set responsive threshold"}
                                color={"blue"}
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
                                header={'Name'}
                                accessor={'first_name_format'}
                                columnFormat={(value,row) => this.onFirstNameFormat(value,row)}
                                isHidden
                            />

                        </PublicTables>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}
