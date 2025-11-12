import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    toast.loading("logging user in account...", { id: "login-user" });

    signInUser(email, password)
      .then((result) => {
        toast.success("User Login successfully!", { id: "create-user" });
        console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password! Please try again..", { id: "login-user" });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 mt-10 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">

            <label className="label">Email</label>
            <input type="email" name="email" className="input rounded-full focus:border-0 focus:outline-gray-200" placeholder="Email" required />

            <label className="label">Password</label>
            <input type="password" name="password" className="input rounded-full focus:border-0 focus:outline-gray-200" placeholder="Password" required />
            <div> <a className="link link-hover"> Forgot password? </a> </div>
            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600"> Login </button>
          </fieldset>
        </form>

        <button onClick={handleGoogleSignIn} className="btn bg-white rounded-full text-black"><FaGoogle /> Login with Google </button>
        <p className="text-center"> New to our website? Please  <Link className="text-blue-500 hover:text-blue-800" to="/auth/register"> Register </Link> </p>
      </div>
    </div>
  );
};

export default Login;
