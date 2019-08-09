import React, {Component} from 'react'
import PropTypes from "prop-types";
import {Step} from 'semantic-ui-react'
import {getRandomNumber} from "./static/ObjectsUtils";


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
            divKey: getRandomNumber(),
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentStep, stepOptions} = this.props;

        if (currentStep !== prevProps.currentStep) {
            this.setState({
                currentStep: currentStep,
                divKey: getRandomNumber(),
            });
            this.triggerStepChanges(currentStep);
        }

        if (stepOptions !== prevProps.stepOptions) {
            this.setState({
                stepOptions: stepOptions,
                divKey: getRandomNumber(),
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
            stepOptions,
            divKey,
        } = this.state;

        return (
            <Step.Group
                key={divKey}
                size={stepSize}
                items={stepOptions}
            />
        )
    }
}


