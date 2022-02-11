import React from "react";
import "./sign-in.style.scss";
import FormInput from "../../../components/share/form-input/form-input";
import CustomButton from "../../../components/share/custom-button/custom-button";
import http from "../../../utilities/axio.config";
import Logo from "../../../assets/images/logo.svg";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    http
      .login("login", this.state)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);

        switch (res.data.data.roles[0]) {
          case "SPS Admin":
          case "EPS Admin":
            this.props.history.push("/admin/dashboard");
            break;
          case "ONG Admin":
            this.props.history.push("/admin/structures/ong");
            break;
          case "PTF Admin":
            this.props.history.push("/admin/structures/ptf");
            break;
          case "RSE Admin":
            this.props.history.push("/admin/structures/rse");
            break;
          default:
            this.props.history.push("/admin/dashboard");
            break;
        }
        console.log("✅✅", res.data.data.roles[0]);
        //this.props.history.push("admin/structures");
      })
      .catch((err) => {
        if (err) {
          document.getElementById("error").style.display = "block";
        }
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-form">
          <div class="sidebar-header bg-default mb-3">
            <img src={Logo} alt="logo" alt="MSAS" class="app-logo" />
          </div>
          <span>Identifiez vous pour accéder à votre espace</span>
          <p
            id="error"
            style={{ color: "red", marginTop: "10px", display: "none" }}
          >
            Email ou mot de passe incorrect
          </p>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              name="email"
              type="email"
              handleChange={this.handleChange}
              value={this.state.email}
              label="email"
              required
            />
            <FormInput
              name="password"
              type="password"
              value={this.state.password}
              handleChange={this.handleChange}
              label="password"
              required
            />
            <div className="buttons">
              <CustomButton type="submit"> Se connecter </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AuthPage;
