import React from 'react';
import './sign-in.style.scss'
import { auth } from '../../../firebase/firebase.utils';
import FormInput from '../../../components/share/form-input/form-input';
import CustomButton from '../../../components/share/custom-button/custom-button';


class AuthPage extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: '',
        password: ''
      };
    }
  
    handleSubmit = async event => {
      event.preventDefault();
      const { email, password } = this.state;
       
      try {
        await auth.signInWithEmailAndPassword(email, password);
        this.setState({ email: '', password: '' });
        this.props.history.push("admin/dashboard")
      } catch (error) {
        console.log(error);
      }
    };
  
    handleChange = event => {
      const { value, name } = event.target;
  
      this.setState({ [name]: value });
    };
    render(){
        return (
            (
                <div className="sign-in-container">
                <div className='sign-in-form'>
                  <h2>CONNECTION</h2>
                  <span>Se Connecter avec mon compte</span>
          
                  <form onSubmit={this.handleSubmit}>
                    <FormInput
                      name='email'
                      type='email'
                      handleChange={this.handleChange}
                      value={this.state.email}
                      label='email'
                      required
                    />
                    <FormInput
                      name='password'
                      type='password'
                      value={this.state.password}
                      handleChange={this.handleChange}
                      label='password'
                      required
                    />
                    <div className='buttons'>
                      <CustomButton type='submit'> Se connecter </CustomButton>
                    </div>
                  </form>
                </div>
            </div>
              )
        )
    }
};
export default AuthPage