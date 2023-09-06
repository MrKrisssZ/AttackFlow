// https://github.com/orgs/community/discussions/58255
// https://www.youtube.com/watch?v=4lLL5F3TA50
// https://platform.openai.com/docs/api-reference/making-requests
// https://medium.com/@ramdassaykar7/integrating-chatgpt-with-mongodb-to-solve-queries-in-node-js-6b3e30ac9f9c

// Converting PDFs to CSF files for extracting data
// https://www.youtube.com/watch?v=ihH9hLmuVvg
import React, { useState } from 'react'
import axios from 'axios'

const ChatGPT = () => {
    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')
    const apiKey = process.env.OPENAI_API_KEY

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const client = axios.create({
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: 'Bearer ' + apiKey,
                }
            });
            const params = {
                model: 'gpt-3.5-turbo',
                messages: [{
                    'role': 'user',
                    'content': input,
                }],
                temperature: 0,
            };
            const result = await client.post('https://api.openai.com/v1/chat/completions', params);
            setResponse(result.data.text);
        } catch (error) {
            console.error(error);
            setResponse('An error occured while processing your request.');
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2" htmlFor='input'>Input:</label>
                <input
                    type='text'
                    id='input'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <button type='submit'
                    className="bg-primary text-white py-2 px-4 rounded-lg font-semibold cursor-pointer mb-4">Submit</button>
            </form>
            <div>
                <h3 className="text-lg font-semibold mb-4">Response:</h3>
                <p>{response}</p>
            </div>
        </div >
    );
};

export default ChatGPT

