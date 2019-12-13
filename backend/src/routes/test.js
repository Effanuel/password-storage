request
  .post("authenticate", {
    //created in step 3
    username,
    password
  })
  .then(response => {
    if (_.isUndefined(response)) {
      ReactGA.event({
        category: "Login",
        action: "Login Failed"
      });
      return dispatch(loginFailure("Error: No response"));
    }
    let { token } = response.data; //retreiving the token sent from the node.js
    if (token) {
      ReactGA.event({
        category: "Login",
        action: "Logged Successfully"
      });
      localStorage.setItem("token", token); //storing the token in our localstorage for subsequent requests
      dispatch(loginSuccess({ token }));
      notification.success("Login successful");
      Object.assign(request.defaults, {
        headers: { "x-access-token": localStorage.getItem("token") } //Here we are retreiving the access token in our localstorage
      });
      appHistory.push("/"); //sending to the next route typically in all applications the Home Page
    } else {
      ReactGA.event({
        category: "Login",
        action: "Login Failed"
      });
      if (response.data.message) {
        notification.error(response.data.message);
      } else {
        notification.success("Wrong username or password");
      }
      localStorage.removeItem("token");
    }
  })
  .catch(error => {
    if (error) {
      return dispatch(loginFailure(error));
    }
  });
