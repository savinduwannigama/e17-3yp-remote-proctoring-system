import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Validate from "../components/Validation";


const historyMock2 = { push: jest.fn() };

describe("Test input validations at Registeration page",()=>{
    test("load the registration form",()=>{
        const component = render(<Validate.WrappedComponent/>);
        
    });
    test("Input fields must not be empty",()=>{
        const {getByLabelText,getByText} = render(<Validate.WrappedComponent/>);
        const emailInputNode = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        const confpwdInput = getByLabelText("Confirm-Password");
        expect(emailInputNode.value).toMatch("");
        expect(passwordInput.value).toMatch("");
        expect(confpwdInput.value).toMatch("");
        const button = getByText("REGISTER");
        fireEvent.click(button);
        const emailError = getByText("Please enter your email Address");
        const passwordError= getByText("Please enter your password");
        const confpwdError= getByText("Please confirm your password")
        
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
        expect(confpwdError).toBeInTheDocument();
    });
    test("Email input should not accept email address without correct format",()=>{
        const {getByLabelText,getByText} = render(<Validate.WrappedComponent/>);
        const emailInputNode = getByLabelText("Email");
        const button = getByText("REGISTER");
        
        expect(emailInputNode.value).toMatch("");

        //case 1: without @
        fireEvent.change(emailInputNode,{target:{value:"email"}});
        expect(emailInputNode.value).toMatch("email");
        fireEvent.click(button);
        const emailError = getByText("Please enter a valid email address");
        expect(emailError).toBeInTheDocument();

        //case 2: not in correct format
        fireEvent.change(emailInputNode,{target:{value:"email@"}});
        fireEvent.click(button);
        expect(emailError).toBeInTheDocument();

        //case 3: not in correct format
        fireEvent.change(emailInputNode,{target:{value:"email@gmail"}});
        fireEvent.click(button);
        expect(emailError).toBeInTheDocument();
    });

    test("Password should be >8 chars, contain atleast one letter and one digit",()=>{
        const {getByLabelText,getByText} = render(<Validate.WrappedComponent/>);
        const passwordInputNode = getByLabelText("Password");
        const button = getByText("REGISTER");
        
        expect(passwordInputNode.value).toMatch("");

        //case 1: length<8
        fireEvent.change(passwordInputNode,{target:{value:"123"}});
        expect(passwordInputNode.value).toMatch("123");
        fireEvent.click(button);
        const pwdError = getByText("Please add at least 8 characters");
        expect(pwdError).toBeInTheDocument();

        //case 2: doesnot contain letters 
        fireEvent.change(passwordInputNode,{target:{value:"12345678"}});
        fireEvent.click(button);
        const pwdError2 = getByText("Password should contain at least one letter");
        expect(pwdError2).toBeInTheDocument();

        //case 3: doesnot contain digits
        fireEvent.change(passwordInputNode,{target:{value:"abcopqwensd"}});
        fireEvent.click(button);
        const pwdError3 = getByText("Password should contain at least one digit");
        expect(pwdError3).toBeInTheDocument();
    });
    test("Check confirm password field",()=>{
        const {getByLabelText,getByText} = render(<Validate.WrappedComponent/>);
        const cpwd = getByLabelText("Confirm-Password");
        fireEvent.change(cpwd,{target:{value:"123456789"}});
        expect(cpwd.value).toMatch("123456789");
    });

    test("Check password match",()=>{
        const {getByLabelText,getByText,getAllByText} = render(<Validate.WrappedComponent/>);
        const cpwd = getByLabelText("Confirm-Password");
        const passwordInput = getByLabelText("Password");
        expect(passwordInput.value).toMatch("");
        expect(cpwd.value).toMatch("");
        fireEvent.change(passwordInput,{target:{value:"123124"}});
        fireEvent.change(cpwd,{target:{value:"AmsdIjd@12*9"}});
        
        const button = getByText("REGISTER");
        fireEvent.click(button);
        const pwdError = getAllByText("Passwords don't match");
        expect(pwdError[0]).toBeInTheDocument();
    })
    test("If input fields are in correct format direct to home page",()=>{
        const {getByLabelText,getByText} = render(<Validate.WrappedComponent history={historyMock2}/>);
        
        const emailInputNode = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        const cpwd = getByLabelText("Confirm-Password");
        expect(emailInputNode.value).toMatch("");
        expect(passwordInput.value).toMatch("");
        expect(cpwd.value).toMatch("");

        fireEvent.change(emailInputNode,{target:{value:"e17058@eng.pdn.ac.lk"}});
        fireEvent.change(passwordInput,{target:{value:"AmsdIjd@12*9"}});
        fireEvent.change(cpwd,{target:{value:"AmsdIjd@12*9"}});
        const button = getByText("REGISTER");
        fireEvent.click(button);
       
        
        
    });

})