import { CardSpotlight } from "./ui/card-spotlight";
import { useState , useEffect, useContext} from "react";

import {useTheme} from "../context/themeContext";
import { AccountContext } from '../context/WalletContext'
export default function CardSpotlightDemo() {
    const { getTitles, addedtitles, addTitle } = useTheme();
    const { account, setAccount,handleAccountChanged, contractAddress, contractABI } = useContext(AccountContext);
    useEffect(() => {
        getTitles();
        console.log("addedtitles", addedtitles);
        
    }
    , []);
    const [title, setTitle] = useState("");
    const [titles, setTitles] = useState([]);
    const handleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        if(account !== "0x0") {
        try{
            addTitle(title);
        }
        catch (error) {
            console.error('Title failed');
            alert('Title failed');
        }
      }
      else {
        alert("Please connect your wallet");
      }
    };


  return (
    <>
                        <h1
                        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto mx-auto">
                        Add New Title
                    </h1>
                    
<form onSubmit={handleSubmit}> 
    <label for="chat" class="sr-only">Your Title</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-black-50 dark:bg-black-700">
        
        
        <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-black-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black-800 dark:border-gray-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your new title..." value = {title} onChange={handleChange} ></textarea>
            <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span class="sr-only">Save Title</span>
        </button>
    </div>
</form>

<h1
                        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto mx-auto">
                        Title List
                    </h1>
                    {addedtitles && Array.isArray(addedtitles) && addedtitles.length > 0 && addedtitles.map((title) => (
    <CardSpotlight className="h-96 w-96">
  <h1 className="text-4xl font-bold relative z-20 mt-2 text-white mx-auto ">
    {title.title}
  </h1>
  <div className="text-neutral-200 mt-4 relative z-20">
    <h1 className="text-lg font-bold pt-4"> {/* Added padding and increased font size */}
        created at : {title.createdAt}
    </h1>
    <h1 className="text-lg font-bold pt-4"> {/* Added padding and increased font size */}
        updated at : {title.updatedAt}
    </h1>
    <h1 className="text-lg font-bold pt-4"> {/* Added padding and increased font size */}
        deleted at : {title.deletedAt}
    </h1>
    <h1 className="text-lg font-bold pt-4"> {/* Added padding and increased font size */}
        uuid : {title.uuid}
    </h1>
  </div>
</CardSpotlight>
                    ))}
</>
  );
}

const Step = ({
  title
}) => {
  return (
    (<li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>)
  );
};

const CheckIcon = () => {
  return (
    (<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0" />
    </svg>)
  );
};
