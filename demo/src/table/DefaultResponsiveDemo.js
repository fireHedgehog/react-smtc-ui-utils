import React, {Component} from 'react'
import {Segment, Grid, Header, Button, Divider, Message, Input} from 'semantic-ui-react'
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

                image: { // if has this param, will display a img.
                    accessor: "user_img_2",// the assessor of the img, either a Base64 or a URL
                    size: "tiny",// default is tiny
                },

                header: { // semantic-ui default <Item.header>
                    accessor: "email",// the assessor of the img, either a Base64 or a URL
                    //prefix: "", // we can set prefix
                    //suffix: "",// we can set suffix
                },

                meta: { // if has this param, will display a img.
                    accessor: "ip_address",// the assessor of the img, either a Base64 or a URL
                    prefix: "IP :",// we can set prefix (it will be: "IP :" + " " + row["ip_address"])
                    //suffix: "",// we can set suffix
                },

                description: { // if has this param, will display a img.
                    accessor: "first_name",// the assessor of the img, either a Base64 or a URL
                    //prefix: "", // we can set prefix
                    //suffix: "",// we can set suffix
                },

                extra: { // if has this param, will display a img.
                    accessor: "gender",// the assessor of the img, either a Base64 or a URL
                    prefix: "|",// we can set prefix (it will be: "|" + " " + row["ip_address"])
                    suffix: "|",// we can set suffix (it will be:  row["ip_address"]+ " " + "|")
                }

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
    },
    extra: { // semantic-ui default <Item.Extra>
         accessor: "gender",// the assessor of the img, either a Base64 or a URL
         prefix: "|",// we can set prefix (it will be: "|" + row["ip_address"])
         suffix: "|",// we can set suffix (it will be:  row["ip_address"] + "|")
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
<!--This example is also using Semantic-UI original Props such as
celled,collapsing,compact and unstackable -->
`}
                            </Highlight>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>

                    <Grid.Column width={8}>
                        <Button
                            onClick={() => this.setResponsive()}
                            content={"Set responsive"}
                            color={"blue"}
                        />
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