import React, {Component} from 'react'
import {Segment, Grid, Header, Button, Divider, Message, Input, Label, Icon} from 'semantic-ui-react'
import Highlight from 'react-highlight'
import PropTypes from "prop-types";
import {PublicTables, PublicTableHeaders} from '../../../src'

export default class DefaultResponsiveDemo extends Component {

    static propTypes = {
        tableData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData,
            param: {
                widthThreshold: 0,

                //unstackable:true, // default is false

                image: { // if has this param, will display a img.
                    accessor: "user_img_base64",// the assessor of the img, either a Base64 or a URL
                    size: "tiny",// default is tiny
                },

                header: { // semantic-ui default <Item.header>
                    accessor: "email",// the assessor of the img, either a Base64 or a URL
                    //prefix: "", // we can set prefix
                    //suffix: "",// we can set suffix
                    //enableColFormat : true // similar to in <PublicTableHeaders columnFormat={()=>this.someRenderFunction()}/>
                },

                meta: { // if has this param, will display a img.
                    accessor: "ip_address",// the assessor of the img, either a Base64 or a URL
                    prefix: "IP :",// we can set prefix (it will be: "IP :" + " " + row["ip_address"])
                    //suffix: "",// we can set suffix
                    //enableColFormat : true // similar to in <PublicTableHeaders columnFormat={()=>this.someRenderFunction()}/>
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

                extra: { // if has this param, will display a img.
                    accessor: "gender",// the assessor of the img, either a Base64 or a URL
                    prefix: "|",// we can set prefix (it will be: "|" + " " + row["ip_address"])
                    suffix: "|",// we can set suffix (it will be:  row["ip_address"]+ " " + "|")
                    enableColFormat : true // similar to in <PublicTableHeaders columnFormat={()=>this.someRenderFunction()}/>
                }

            }
        }
    }

    handleThresholdChange = (e, {name, value}) => {
        const {param} = this.state;
        param.widthThreshold = value;
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
        const {tableData, param} = this.state;

        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header as={'h2'} color={'brown'} content={'An advanced example of defaultResponsiveParam : '}
                                subheader={"set a default responsive layout by simple param"}/>
                        <Segment compact><Highlight languages={['javascript', 'html', 'typescript']}>
                            {`/*
 * depending the param you pass, table will re-render the entire row.
 * the example data :
 *      {
 *          "id": 1,
 *          "first_name": "Marleen",
 *          "last_name": "Vivien",
 *          "email": "mvivien0@ox.ac.uk",
 *          "gender": "Female",
 *          "ip_address": "67.63.79.244",
 *          "user_img":"http://dummyimage.com/241x119.png/cc0000/ffffff",
 *          "user_img_2":"data:image/png;base64,(a_base_64_string)"
 *      }
 */
const defaultParam = {
    widthThreshold : '480px', //set a minimum width(default-480px) of the table(not screen size)
    image: { // if has this param, will display a img.
        accessor: "user_img_2",// the assessor of the img, either a Base64 or a URL
        size: "tiny",// default is tiny
    }
    header: { // semantic-ui default <Item.Header>
        accessor: "email",// the assessor of the img, either a Base64 or a URL
        //prefix: "", // we can set prefix
        //suffix: "",// we can set suffix
    },
    meta: { // semantic-ui default <Item.Meta>
        accessor: "ip_address",// the assessor of the img, either a Base64 or a URL
        prefix: "IP :",// we can set prefix (it will be: "IP + row["ip_address"])
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
    },
    extra: { // semantic-ui default <Item.Extra>
         accessor: "gender",// the assessor of the img, either a Base64 or a URL
         prefix: "|",// we can set prefix (it will be: "|" + row["ip_address"])
         suffix: "|",// we can set suffix (it will be:  row["ip_address"] + "|")
    }
}
/*
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
        <PublicTableHeaders header={'Gender'} accessor={'gender'}/>
        <PublicTableHeaders
                header={'Name'}
                accessor={'first_name_format'}
                columnFormat={(value,row) => this.onFirstNameFormat(value,row)}
                isHidden
        />
<PublicTables/>
<!--This example is also using Semantic-UI original Props such as
celled,collapsing,compact and unstackable -->
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
                            />
                            <PublicTableHeaders
                                header={'Gender'}
                                accessor={'gender'}
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

/*
 * "id": 1,
 * "first_name": "Marleen",
 * "last_name": "Vivien",
 * "email": "mvivien0@ox.ac.uk",
 * "gender": "Female",
 * "ip_address": "67.63.79.244",
 * "user_img":"http://dummyimage.com/241x119.png/cc0000/ffffff",
 * "user_img_2":"data:image/png;base64,(a_base_64_string)"
 */