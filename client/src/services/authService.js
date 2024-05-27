import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "./../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) return alert("Enter all the details");
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(`Login Error ${error}`);
  }
};

export const handleRegister = (e, email, password, role, name, phone) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        email,
        password,
        role,
        name,
        phone,
      })
    );
  } catch (error) {
    console.log(`Register Error : ${error}`);
  }
};
