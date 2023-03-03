import React, { useState } from 'react';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AdminHome from "./AdminHome";

function Main(props) {
  const { isLoggedIn, handleLoggedIn } = props;

  const [pathname, setPathname] = useState(window.location.pathname);

  const handleNavigation = (path) => {
    setPathname(path);
    window.history.pushState({}, '', path);
  };

  const showHome = () => {
    return isLoggedIn ? (
        <AdminHome handleNavigation={handleNavigation} asAdmin={props.asAdmin}/>
      ) : (
        <LoginForm handleLoggedIn={handleLoggedIn} handleNavigation={handleNavigation} />
      );
  };

  const showLogin = () => {
    return isLoggedIn ? (
      <AdminHome handleNavigation={handleNavigation} asAdmin={props.asAdmin}/>
    ) : (
      <LoginForm handleLoggedIn={handleLoggedIn} handleNavigation={handleNavigation} />
    );
  };

  let content;

  switch (pathname) {
    case '/':
    case '/login':
      content = showLogin();
      break;
    case '/home':
      content = showHome();
      break;
    default:
      content = <div>Page not found</div>;
      break;
  }

  return (
    <div className="main">
      {content}
    </div>
  );
}

export default Main;
