import React from 'react';
import './sign-in.style.scss';
import FormInput from '../../../components/share/form-input/form-input';
import CustomButton from '../../../components/share/custom-button/custom-button';
import axios from 'axios';


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
     
      axios.post('login', this.state).
       then(res=>{
         localStorage.setItem('token', res.data.data.token)
         this.props.history.push("admin/dashboard")
       }).catch(err=>{
         if (err) {
           document.getElementById('error').style.display="block"
         }
       })
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
                  <h2>CONNEXION</h2>
                  <span>Se connecter avec mon compte</span>
                    <p id="error" style={{ color:'red', marginTop:'10px', display:'none' }}>Email ou mot de passe incorrect</p>
                  
          
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