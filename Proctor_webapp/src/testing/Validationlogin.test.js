import React from "react";
import {render, fireEvent,screen, waitFor} from "@testing-library/react";
import Validatelogin from "../components/Validationlogin";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
const historyMock = { push: jest.fn() };

describe("Test input validations at login page",()=>{
    test("load the login form",()=>{
        const component = render(<Validatelogin.WrappedComponent/>);
        
    });
    test("Input fields must not be empty",()=>{
        const {getByLabelText,getByText} = render(<Validatelogin.WrappedComponent/>);
        const emailInputNode = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        expect(emailInputNode.value).toMatch("");
        expect(passwordInput.value).toMatch("");
        const button = getByText("SIGN IN");
        fireEvent.click(button);
        const emailError = getByText("Please enter your email Address");
        const passwordError= getByText("Please enter your password")
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });
    test("Email input should not accept email address without correct format",()=>{
        const {getByLabelText,getByText} = render(<Validatelogin.WrappedComponent/>);
        const emailInputNode = getByLabelText("Email");
        const button = getByText("SIGN IN");
        
        expect(emailInputNode.value).toMatch("");

        //case 1: without @
        fireEvent.change(emailInputNode,{target:{value:"email"}});
        expect(emailInputNode.value).toMatch("email");
        fireEvent.click(button);
        const emailError = getByText("Please enter valid email address");
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
        const {getByLabelText,getByText} = render(<Validatelogin.WrappedComponent/>);
        const passwordInputNode = getByLabelText("Password");
        const button = getByText("SIGN IN");
        
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
    test("Password validation",async ()=>{
        const {getByLabelText,getByText} = render(<Validatelogin.WrappedComponent history={historyMock} next={'/home'} path={'proctor/login'} user={'proctor'} />)
        const emailInputNode = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        expect(emailInputNode.value).toMatch("");
        expect(passwordInput.value).toMatch("");

        fireEvent.change(emailInputNode,{target:{value:"proctor1@eng.pdn.ac.lk"}});
        fireEvent.change(passwordInput,{target:{value:"12345678a"}});
        const button = getByText("SIGN IN");
        fireEvent.click(button);
        const nextpage = await waitFor(() => screen.getByText('Network error'));
        expect(historyMock.push.mock).toEqual(['/home' ])
        expect(nextpage).toBeInTheDocument();
      
    });

})