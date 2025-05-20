import React from "react";
import { GoogleGenAI } from "@google/genai";


export default function TestUD() {

    const [searchTest, setSearchTest] = React.useState("");
    const [resText, setResText] = React.useState("");

    const ai = new GoogleGenAI({ apiKey: "AIzaSyC_hUT6R9hebfEniSRN-mXiqnRaFmSdueo"})

    async function getDataFromAILund(someText) {
        const res = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: someText + " Answer everything under one line."
        })

        setResText(res.text);
    }
    return <div style={{ height: "100vh", width: "100vw"}}>

        <input onChange={(e) => setSearchTest(e.target.value)} />
        <button onClick={() => getDataFromAILund(searchTest)}>Click Me daddy</button>
        {resText}

    </div>
}