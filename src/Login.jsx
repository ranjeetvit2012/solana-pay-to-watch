import {NavbarComponent} from "./NavbarComponent"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import MintToken from "./MintToken"
export const Login = ()=>{
  const navigate = useNavigate();
  const [email,SetEmail] = useState()
  const [password,SetPassword] = useState()

  const handleLogin = ()=>{
    if(email && password){
      navigate('/dashboard');
    }else{
      alert("Enter email and password")
    }
  }
    return(
        <div className=""> 
            <NavbarComponent/>
            <div className="">
            <Card className="max-w-sm login-card">
              {/* <MintToken/> */}
            <div className="">
                <div>
                    <h3>Login</h3>
                <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" 
          onChange={(e)=>SetEmail(e.target.value)} 
          placeholder="Enter Email" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1"
           type="password" 
           onChange={(e)=>SetPassword(e.target.value)} 
           required />
        </div>
        <div className="flex items-center gap-2">
          
          <p> username- ranjeet  password -12345</p>
         
        </div>
        <Button onClick={handleLogin}>Submit</Button>
      </form>
                </div>
            </div>
     
    </Card>
            </div>
           
        </div>
    )
}