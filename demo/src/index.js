import React, {Component} from 'react'
import {render} from 'react-dom'
import {Button} from 'semantic-ui-react';
import json from "json-loader!./data/MOCK_DATA.json";

import {PublicTableHeaders, PublicStep, PublicTables, CustomizedFooter} from '../../src'
import 'semantic-ui-css/semantic.min.css';


class Demo extends Component {
    /**
     * "id": 3,
     "first_name": "Kelcie",
     "last_name": "Vidgen",
     "email": "kvidgen2@goo.ne.jp",
     "gender": "Female",
     "dept": "Research and Development"
     * @returns {*}
     */

    render() {

        return <div>
            <h1>react-smtc-ui-utils Demo</h1>

            <PublicTables
                data={json.mock_user}
                showAllCheck={true}
                checkedCallBackFunction={(val) => console.log(val)}
                pagination={true}
                celled
                unstackable
                sortable={true}
            >

                <PublicTableHeaders
                    header={""}
                    accessor={"id"}
                    collapsing={true}
                    textAlign={'left'}
                    colAsCheckBox={true}
                    checkBoxStyle={'slider'}
                />

                <PublicTableHeaders
                    header={'email'}
                    accessor={'email'}
                    columnAlign={'center'}
                />
                <PublicTableHeaders
                    header={'gender'}
                    accessor={'gender'}
                    columnAlign={'center'}
                />
                <CustomizedFooter>
                    <Button/> <Button/> <Button/> <Button/>
                </CustomizedFooter>

            </PublicTables>

        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
