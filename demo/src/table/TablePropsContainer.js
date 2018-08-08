import React, {Component} from 'react'
import {Grid, Message, Divider} from 'semantic-ui-react';
import json from "json-loader!../data/MOCK_DATA.json";
import PaginationDemo from "./PaginationDemo";
import FilterDemo from "./FilterDemo";
import CustomCellDemo from "./CustomCellDemo";
import CheckBoxDemo from "./CheckBoxDemo";
import CustomizedFooterDemo from "./CustomizedFooterDemo";
import RowReRenderDemo from "./RowReRenderDemo";

export class TablePropsContainer extends Component {

    state = {}


    render() {


        return (
            <Grid>

                <Grid.Row>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Message
                            success
                            content='Almost support every props of react-semantic-ui except some complex function such as "structured table" '
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <FilterDemo tableData={json.mock_user_5}/>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <CustomCellDemo tableData={json.mock_user_5}/>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <CheckBoxDemo tableData={json.mock_user_5}/>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <PaginationDemo tableData={json.mock_user_21}/>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <CustomizedFooterDemo tableData={json.mock_user_5}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <RowReRenderDemo tableData={json.mock_user_5}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
