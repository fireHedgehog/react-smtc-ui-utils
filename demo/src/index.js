import React from 'react'
import {render} from 'react-dom'
import 'semantic-ui-css/semantic.min.css';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import MainMenu from "./menu/MainMenu";
import {BasicTableDemo} from "./table/BasicTableDemo";
import {Container} from "semantic-ui-react";
import {StepDemo} from "./others/StepDemo";
import {GetStart} from "./others/GetStart";
import {TablePropsContainer} from "./table/TablePropsContainer";
import {HomePage} from "./others/HomePage";
import {MainTitle} from "./menu/MainTitle";
import "highlight.js/styles/idea.css";
import PropsOfTable from "./table/PropsOfTable";
import {TableResponsiveContainer} from "./table/TableResponsiveContainer";


const Index = () => {
    return (
        <Router>
            <div>
                <MainMenu/>
                <Container>
                    <MainTitle/>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="/react-smtc-ui-utils/start" element={<GetStart/>}/>
                        <Route path="/react-smtc-ui-utils/table" element={<BasicTableDemo/>}/>
                        <Route path="/react-smtc-ui-utils/Props" element={<PropsOfTable/>}/>
                        <Route path="/react-smtc-ui-utils/tableProps" element={<TablePropsContainer/>}/>
                        <Route path="/react-smtc-ui-utils/responsive" element={<TableResponsiveContainer/>}/>
                        <Route path="/react-smtc-ui-utils/others" element={<StepDemo/>}/>
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

render(<Index/>, document.querySelector('#demo'));
