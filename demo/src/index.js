import React, {Component} from 'react'
import {render} from 'react-dom'

import {PublicTableHeaders, PublicStep, PublicTables} from '../../src'
import 'semantic-ui-css/semantic.min.css';


class Demo extends Component {
    render() {
        return <div>
            <h1>react-loading-button Demo</h1>

            <PublicTables
                data={
                    [{name: 1, age: 1}]
                }
                pagination={true}
                celled
            >
                <PublicTableHeaders
                    header={'name'}
                    accessor={'name'}
                    columnAlign={'center'}
                />
                <PublicTableHeaders
                    header={'age'}
                    accessor={'age'}
                    columnAlign={'center'}
                />

            </PublicTables>

        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
