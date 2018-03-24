import React, {Component} from 'react'
import {render} from 'react-dom'
import 'semantic-ui-css/semantic.min.css';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import MainMenu from "./menu/MainMenu";
import {BasicTableDemo} from "./table/BasicTableDemo";
import {Container} from "semantic-ui-react";
import {StepDemo} from "./others/StepDemo";
import {GetStart} from "./others/GetStart";
import {TablePropsContainer} from "./table/TablePropsContainer";
import {HomePage} from "./others/HomePage";
import {MainTitle} from "./menu/MainTitle";
import "highlight.js/styles/idea.css";

class Index extends Component {


    render() {
        return (
            <Router>

                <div>

                    <MainMenu {...this.props}/>

                    <Container>
                        <MainTitle/>
                        <Route exact path="/" component={HomePage}/>
                        <Route path={`/react-smtc-ui-utils/start`} component={GetStart}/>
                        <Route path={`/react-smtc-ui-utils/table`} component={BasicTableDemo}/>
                        <Route path={`/react-smtc-ui-utils/tableProps`} component={TablePropsContainer}/>
                        <Route path={`/react-smtc-ui-utils/others`} component={StepDemo}/>
                    </Container>

                </div>

            </Router>
        )
    }
}

/*
class Index extends Component {

    render() {

        return (
            <div>
                <Router>
                    <div>
                        <Route exact
                               path={"/"}
                               render={(props) => <Home {...props}  />}

                        />
                        <Route path={"/table"}
                               render={(props) => <BasicTableDemo {...props}  />}

                        />
                    </div>
                </Router>
            </div>
        )
    }
}
*/


render(<Index/>, document.querySelector('#demo'))
