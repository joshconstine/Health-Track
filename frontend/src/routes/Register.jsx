import {
    faCheck,
    faInfoCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const userRef = useRef(); //reference to user input
  const errRef = useRef(); //reference to error message
  const pwdRef = useRef(); //reference to password input - not used in YT video
  const emailRef = useRef(); //reference to email input - not used in YT video

  const [user, setUser] = useState(''); //user input
  const [validName, setValidName] = useState(false); //to see if name validates
  const [userFocus, setUserFocus] = useState(false); // to see if user input is focused

  const [pwd, setPwd] = useState(''); //password input
  const [validPwd, setValidPwd] = useState(false); //to see if password validates
  const [pwdFocus, setPwdFocus] = useState(false); //to see if password input is focused

  const [matchPwd, setMatchPwd] = useState(false); //to see if password matches
  const [validMatch, setValidMatch] = useState(false); //to see if password matches
  const [matchFocus, setMatchFocus] = useState(false); //to see if password match input is focused

  const [email, setEmail] = useState(''); //email input
  const [validEmail, setValidEmail] = useState(false); //to see if email validates
  const [emailFocus, setEmailFocus] = useState(false); //to see if email input is focused

  const [errMsg, setErrMsg] = useState(''); //error message
  const [successMsg, setSuccessMsg] = useState(false); //success message

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user); //test user input against regex
    console.log(result);
    console.log(user);
    setValidName(result); //set validName to result
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //test password input against regex
    console.log(result);
    console.log(pwd);
    setValidPwd(result); //set validPwd to result
    const match = pwd === matchPwd; //test if password matches
    setValidMatch(match); //set validMatch to match
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email); //test email input against regex
    console.log(result);
    console.log(email);
    setValidEmail(result); //set validEmail to result
  }, [email]);

  useEffect(() => {
    setErrMsg(''); //clear error message
  }, [user, pwd, matchPwd, email]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form className='register-form'>
        <label htmlFor='username'>
          Username:
          <span className={validName ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off' //dont want previous values suggested
          onChange={(e) => setUser(e.target.value)} //sets user state
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id='uidnote'
          className={
            userFocus && user && !validName ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, and hyphens allowed.
        </p>

        <label htmlFor='password'>
          Password:
          <span className={validPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id='pwdnote'
          className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          At least one uppercase letter, one lowercase letter, one number, and
          one special character.
        </p>

        <label htmlFor='confirm_pwd'>
          Confirm Password:
          <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='password'
          id='confirm_pwd'
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby='confirmnote'
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id='pwdnote'
          className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
        <button type='submit' className='register-button'>
          Register
        </button>
        <Link class='link' to='/login'>
          <p className='login-link'>Sign in?</p>
        </Link>
      </form>
    </section>
  );
};

export default Register;
