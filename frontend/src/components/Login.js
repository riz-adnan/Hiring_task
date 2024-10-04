import { Label } from "./ui/label.jsx";
import { Input } from "./ui/input.jsx";
import { cn } from "../lib/utils.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login submitted");
    const timeout = (ms) => new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), ms);
      });
    try{
        console.log(email)
        const response = await Promise.race([
            fetch('http://localhost:8000/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            }),
            timeout(5000) // Set timeout for 5 seconds
          ]);
        const data = await response.json();
        console.log(data);
        const token = data.token;
        localStorage.setItem('your-token', token);
        navigate('/home');
    }
    catch (error) {
        console.error('Login failed');
        alert('Login failed');
    }


  };
  const [showpassword, setShowPassword] = useState(false);  
  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
      (<div
        className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to GP-Vote
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to GB-Vote.
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="g.com" type="email" value={email} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* To align input and button */}
        <Input 
          id="password" 
          placeholder="••••••••" 
          type={showpassword ? "text" : "password"} 
            value={password}
            onChange={handleChange}

        />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showpassword)} 
          style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', // Button background color
            color: 'white',            // Text color for better contrast
            border: '1px solid #ccc',  // Optional: add a border for clarity
            borderRadius: '5px' }} // Add styles for visibility
        >
          {showpassword ? "Hide" : "Show"}
        </button>
      </div>
          </LabelInputContainer>
      
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit">
            Log in &rarr;
            <BottomGradient />
          </button>
      
          <div
            className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>)
);
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};