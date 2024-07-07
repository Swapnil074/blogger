import { useNavigate } from "react-router-dom";
import RenderLogin from "./RenderLogin";
import { DATABASE_URL } from "../../config";
import axios from "axios";

export const Login = () => {
    console.log(DATABASE_URL)
    const navigate=useNavigate()
    async function sendRequest(type:string,postInputs) {
        console.log(postInputs)
        try {
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            console.log(response)
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            console.log(e)
            alert("Error while signing up")
        }
    }

    return (
        <RenderLogin handleSubmit={sendRequest}/>
    )
}