import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Step} from 'semantic-ui-react'


export default class PublicStep extends Component {

    static propTypes = {
        stepOptions: PropTypes.array.isRequired,
        currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        stepSize: PropTypes.string,

    }

    constructor(props) {
        super(props);
        this.state = {
            stepOptions: props.stepOptions,
            currentStep: props.currentStep === undefined ? 0 : parseInt(props.currentStep, 10),
            stepSize: props.stepSize === undefined ? 'small' : props.stepSize,
        }

    }

    UNSAFE_componentWillReceiveProps(props) {

        if (props.currentStep !== undefined) {
            this.setState({
                currentStep: props.currentStep,
            });
            this.triggerStepChanges(props.currentStep);
        }
        if (props.stepOptions !== this.props.stepOptions) {
            this.setState({
                stepOptions: props.stepOptions,
            });
        }
    }

    triggerStepChanges = (currentStep) => {

        const {stepOptions} = this.state;
        for (let i = 0; i < stepOptions.length; i++) {
            //stepOptions[i].onClick = this.onStepClick
            stepOptions[i].completed = false;
            stepOptions[i].active = false;
            stepOptions[i].disabled = true;
            if (i < currentStep) {
                stepOptions[i].active = false;
                stepOptions[i].completed = true;
                stepOptions[i].disabled = false;
            } else if (currentStep === i) {
                stepOptions[i].active = true;
                stepOptions[i].completed = false;
                stepOptions[i].disabled = false;
            } else if (i < currentStep) {
                stepOptions[i].active = false;
                stepOptions[i].completed = false;
                stepOptions[i].disabled = true;
            }
        }
    }

    /*  onStepClick = (event,data) => {
          if(data){
              console.log(data);
              if(data.completed){

              }
          }
      }
  */
    render() {

        const {
            stepSize,
            stepOptions
        } = this.state;

        return (
            <Step.Group
                size={stepSize}
                items={stepOptions}
            />
        )
    }
}


