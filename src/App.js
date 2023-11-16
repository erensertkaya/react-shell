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
                setOutput([...output, `
        
Software Developer
Eleman.net · Full-time
Jul 2022 - Present · 1 yr 5 mos
Istanbul, Turkey · Hybrid

    - Creating new features and developing already existing features both on platform and crm panel.
    - New UI - UX implementations and bug fixes.
    - Third party api integrations.

    Skills: PHP · JavaScript · SQL · HTML · CSS · MySQL · Bootstrap · jQuery · Redis · Linux · Subversion
        
Software Developer
Kozmos Group · Full-time
Jul 2021 - Jun 2022 · 1 yr
Istanbul, Turkey · On-site

    - Maintaining web based ERP system modules.
    - Developing new modules for web based ERP system.
    - Integrating web based ERP system with third party api’s.
    - Developing custom jQuery plugins.
    - Developing and maintaining a winform application.
    - Creating CI/CD pipeline from scratch for winform application.
    - Enhancing winform application security and performance.
    
    Skills: PHP · JavaScript · SQL · Node.js · C# · HTML · CSS · MySQL · Codeigniter · Bootstrap · jQuery · Linux · Git · Visual Studio · Continuous Integration and Continuous Delivery (CI/CD)        
                
Software Developer
Silva · Full-time 
Feb 2021 - Jun 2021 · 5 mos 
İstanbul, Türkiye · On-site

    - Developing a modular CMS from scratch with using HMVC design pattern.
    - Implementing fully modular plugin and module system.
    - Also helping bottlenecks of company's other project which is an E-Commerce project.
    
    Skills: PHP · JavaScript · SQL · HTML · CSS · MySQL · Codeigniter · Bootstrap · jQuery · Git
                
Junior Software Developer
Skala Teknoloji Hizmetleri · Full-time
Sep 2020 - Jan 2021 · 5 mos 
İstanbul, Türkiye · On-site

    - Installing Bitrix24 On Premise to servers of our customers.
    - Developing custom modules for Bitrix24.
    - Developing web services for Bitrix24.
    
    Skills: PHP · JavaScript · SQL · HTML · CSS · MySQL · jQuery · Linux · Git
                
Junior Software Developer
Aytunga · Apprenticeship
Apr 2019 - Aug 2020 · 1 yr 5 mos 
İstanbul · Hybrid

    - Development of platform's CRM panel from scratch and it's modules.
    - Development of platform's mobile app.
    
    Skills: PHP · JavaScript · SQL · HTML · CSS · MySQL · Bootstrap · jQuery · React.js · React Native · Linux · Git

                `]);
                break;
            case 'contact.txt':
                setOutput([...output, `
                <a href="https://www.linkedin.com/in/erensertkaya" target="_blank">Linkedin</a>
                <a href="https://github.com/erensertkaya" target="_blank">Github</a>
                `]);
                break;
            case 'skills.txt':
                setOutput([...output, `
                Programming Languages: PHP, JavaScript, HTML, CSS
                Programming Frameworks: Codeigniter, Laravel, jQuery, React, Plasmo, Bootstrap
                DevOps: Linux, Docker, Git, SVN
                Database: MySQL, MongoDB, Redis
                Platform Experience: Backend , Frontend, Browser Extensions, Desktop
                Domain Experience: Production, E-commerce, Human Resource, Social Media  
                `]);
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
