import React, { useState } from 'react';
import './App.css';

function App() {
    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');
    const [inputArr, setInputArr] = useState([]);

    const handleInput = (event) => {
        if (event.key === 'Enter') {
            const command = event.target.value;
            event.target.value = '';
            setOutput([...output, `$ ${command}`]);
            setInputArr([...inputArr, `${command}`]);
            executeCommand(command);
        }
    };

    const executeCommand = (command) => {
        // Handle specific commands
        switch (command.toLowerCase()) {
            case 'help':
                showHelp();
                break;
            default:
                setOutput([...output, `${command} is not recognized as a command`]);
                break;
        }
    };

    const showHelp = () => {
        setOutput([...output, 'Available commands: help - Show this help message']);
    };

    return (
        <div className="App">
            <div id="shell">
                {inputArr.map((line, index) => (
                    <div id="input-container">
                        <div id="output">
                            <span key={index}>[master@fedora ~]$ {line}</span>
                            {output.map((outputLine, outputIndex) => (
                                index === outputIndex ?
                                    <p key={outputIndex}>{outputLine}</p> :
                                    ''
                            ))}
                        </div>
                    </div>
                ))}


                <div id="input-container">
                    <span>[master@fedora ~]$ </span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInput}
                        autoFocus
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
