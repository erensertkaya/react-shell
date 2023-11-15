import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');
    const [inputArr, setInputArr] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus on the input field when the component mounts or when the input state changes
        inputRef.current.focus();
    }, [input]);
    const handleInput = (event) => {
        if (event.key === 'Enter') {
            const command = event.target.value.split(" ");
            event.target.value = '';
            setOutput([...output, `$ ${command.length > 1 ? command[0] + command[1] : command}`]);
            setInputArr([...inputArr, `${command.length > 1 ? command[0]+' '+command[1] : command}`]);
            executeCommand(command);
            setInput('');
        }
    };

    const executeCommand = (command) => {
        // Handle specific commands
        switch (command[0]) {
            case 'help':
                showHelp();
                break;
            case 'cat':
                showCat(command[1]);
                break;
            case 'ls':
                showLs();
                break;
            case 'clear':
                clearCommands();
                break;
            default:
                setOutput([...output, `${command} is not recognized as a command`]);
                break;
        }
    };
    function replaceWithBr(text) {
        return text.replace(/\n/g, "<br />")
    }
    const showHelp = () => {
        setOutput([...output,
            `Available commands:

            help  - Show this help message
            cat   - Show file
            ls    - List files
            clear - Clear all commands
             `]);
    };

    const showCat = (param) => {
        switch (param) {
            case 'cv.txt':
                setOutput([...output, 'benim cv bu']);
                break;
            default:
                setOutput([...output, 'Nothing to show.']);
                break;
        }
    };

    const showLs = () => {
        setOutput([...output,
            `cv.txt
             projects.txt
             skills.txt
             contact.txt
             `]);
    };

    const clearCommands = () => {
        setOutput([]);
        setInputArr([]);
    };


    return (
        <div className="App">
            <div id="shell">
                {inputArr.map((line, index) => (
                    <div id="input-container">
                        <div id="output">
                            [master@fedora ~]$ <span className={"oldCommand"} key={index}> {line}</span>
                            {output.map((outputLine, outputIndex) => (
                                index === outputIndex ?
                                    <p key={outputIndex} dangerouslySetInnerHTML={{__html: replaceWithBr(outputLine)}} ></p> :
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
                        ref={inputRef}
                        autoFocus
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
