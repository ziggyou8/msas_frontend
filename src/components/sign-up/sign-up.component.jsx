import React from 'react';
import FormInput from '../share/form-input/form-input';
import CustomButton from '../share/custom-button/custom-button';
/* import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'; */
import './sign-up.style.scss'
import { withRouter } from "react-router-dom";

class SignUp extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            displayName:'',
            email: '',
            password:'',
            confirmPassword: ''
        }
    }


    /* handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        

        if(password !== confirmPassword ){
            alert('le mot de passe ne correspond pas');
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName:'',
                email: '',
                password:'',
                confirmPassword: ''
            });
            this.props.history.push("/admin/dashboard");
        }catch(error){
            alert(error.message);
        }
    } */
    render(){
        const {displayName, email, password, confirmPassword} = this.state;

        return(
            <div className="sign-up-form">
                {/* <h2>J'ai pas de compte</h2>
                <span className="title">S'enregistrer avec email et mot de pass</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="Nom complet" name="displayName" type="text" value={displayName} handleChange={this.handleChange}/>
                    <FormInput label="Email" name="email" type="email" value={email} handleChange={this.handleChange}/>
                    <FormInput label="Mot de passe" name="password" type="password" value={password} handleChange={this.handleChange}/>
                    <FormInput label="Confirme mot de pass" name="confirmPassword" type="password" value={confirmPassword} handleChange={this.handleChange}/>
                    <CustomButton type="submit">S'ENREGISTRER</CustomButton>
                </form> */}
            </div>
        )
    }
}

export default withRouter(SignUp);