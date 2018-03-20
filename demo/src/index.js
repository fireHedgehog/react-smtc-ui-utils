import React, {Component} from 'react'
import {render} from 'react-dom'
import 'semantic-ui-css/semantic.min.css';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Home from "./Home";
import MainMenu from "./menu/MainMenu";
import {BasicTableDemo} from "./table/BasicTableDemo";
import Test from "./others/Test";
import {Container} from "semantic-ui-react";

class Index extends Component {


    render() {
        return (
            <Router>
                <div>
                    <MainMenu {...this.props}/>
                    <div style={{marginTop:'50px'}}>
                        <Container>
                            <Route exact path="/" component={Home}/>
                            <Route path={`/table`} component={BasicTableDemo}/>
                            <Route path={`/start`} component={Test}/>
                            <Route path={`/others`} component={Test}/>
                        </Container>
                    </div>
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
