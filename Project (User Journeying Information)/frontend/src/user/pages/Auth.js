import React, { useState, useContext } from 'react'

import './Auth.css'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'


const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const authSubmitHandler = async event => {
        event.preventDefault();

        setIsLoading(true);

        if (isLoginMode) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                // console.log(responseData);

                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Something wen wrong, please try again!');
            }
        } else {
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                // console.log(responseData);

                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Something wen wrong, please try again!');
            }
        }

    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }

        setIsLoginMode(prevMode => !prevMode);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal
            error = {error}
            onClear={errorHandler}
            />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}

                <h2>{isLoginMode ? "Login" : "SignUp"} Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    ></Input>}

                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    ></Input>

                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password, at least 5 characters."
                        onInput={inputHandler}
                    ></Input>

                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                    >{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}</Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth
