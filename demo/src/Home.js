import React, {Component} from 'react'
import {
    Route
} from "react-router-dom";
import {Container} from "semantic-ui-react";
import Test from "./others/Test";

export default  class Home extends Component {

    render() {
        const {match} = this.props;

        console.log(match.url);

        return (
            <div>

                <Container>
                    <Route path={`${match.url}/Test`} component={Test} />
                </Container>

            </div>
        )
    }
}
