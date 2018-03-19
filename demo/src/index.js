import React, {Component} from 'react'
import {render} from 'react-dom'
import 'semantic-ui-css/semantic.min.css';
import MainMenu from "./menu/MainMenu";
import {BasicTableDemo} from "./table/BasicTableDemo";
import {Container} from 'semantic-ui-react';
import renderLinks from "../../src/static/CodeSource";
import Gist from 'react-gist';


class Demo extends Component {

    render() {

        return (
            <div>

                <div style={{backgroundColor: 'rgb(27, 28, 29)'}}>
                    <MainMenu/>
                </div>
                <Container>
                    <Gist id='b66a45c2e7f0a734597b63891f7a25db' />
                    {renderLinks('src/index.js')}
                    <BasicTableDemo/>
                </Container>

            </div>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
