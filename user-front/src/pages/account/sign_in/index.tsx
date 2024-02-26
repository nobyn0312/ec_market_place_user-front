import { Container } from "@/components/Container/Container";
import React, { useState } from "react";
import styles from "@/pages/account/sign_in/index.module.css";
import { Button } from "@/components/Button/Button";

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10rem" }}>
            <p className={styles.maintitle}>ログイン</p>
            <div className={styles.container}>

              <div style={{ justifyContent: "center", display: "columns" }}>
                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.textfeild} style={{ margin: "5px 0px", width: "100%" }} placeholder="メールアドレス" type="email" /><br></br>
                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.textfeild} style={{ margin: "5px 0px", width: "100%" }} placeholder="パスワード" type="password" />
              </div>

              <div style={{ marginTop: "2rem" }}>

                <button className={styles.button}>ログイン</button>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ fontSize: "12px", marginTop: "2rem" }}>またわ</p>
                </div>
                <div style={{ height: "1px", backgroundColor: "#ebebeb", margin: "5px 0px 20px 0px" }}></div>

                <a href="/account/sign_up/form" className={styles.buttonOrange}>新規登録</a>

              </div>
            </div>
          </div>
        </form>
      </Container >
    </>
  )
}

export default index;

// //cmd click


// import React, { useState } from 'react';

// const App = () => {
//   const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
//   const [loginData, setLoginData] = useState({ email: '', password: '' });

//   const handleSignup = async () => {
//     try {
//       const response = await fetch('http://localhost:5001/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(signupData),
//       });

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error during signup:', error);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:5001/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData),
//       });

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={signupData.name}
//         onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={signupData.email}
//         onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={signupData.password}
//         onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//       />
//       <button onClick={handleSignup}>Sign Up</button>

//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={loginData.email}
//         onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={loginData.password}
//         onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default App;
