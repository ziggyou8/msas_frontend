import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-horizontal';
import { Card } from 'reactstrap';
import GeneralForm from './GeneralForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import NomineeDetailsForm from './NomineeDetailsForm';

class Form extends Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0,
      steps: [
        {title: 'Identification'},
        {title: 'Autres informations'},
        {title: 'Personne responsable'}
      ],
      selectTypeActeur:"",
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleTypeActeur(arg){
    this.setState({selectTypeActeur: arg.toString()});

}
  render() {
    const { onSubmit, ...otherProps } = this.props;
    const { page, steps } = this.state;
     
    return (
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-white">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <Card style={{ marginTop:'-15px' }}>
                    <Stepper steps={ steps } activeStep={ page } />
                    {page === 0 && <GeneralForm {...otherProps} handleTypeActeur={this.handleTypeActeur.bind(this)} onSubmit={this.nextPage} />}
                    {page === 1 && (
                    <PersonalDetailsForm
                        typeActeur ={this.state.selectTypeActeur}
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                    )}
                    {page === 2 && (
                    <NomineeDetailsForm
                        previousPage={this.previousPage}
                        onSubmit={onSubmit}
                    />
                    )}
                </Card>
            </div>
          </div>
        </div>

    );
  }

}

Form.propTypes = {
  onSubmit: PropTypes.func
};

export default Form;
