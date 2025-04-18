import '../UI/documentation.css'
function SupportChatDocumentation() {
    return (
        <div style={{ backgroundColor: "white", textAlign: 'left' }}>
            <header className='doc-header' >
                <h1>Chat Support Project Documentation</h1>
            </header>

            <main style={{ padding: '20px' }}>
                <h2 style={{ color: '#0056b3' }}>Overview</h2>
                <p>This application allows product owners, clients, or support teams to handle chat support by creating and managing frequently asked questions (FAQs). Each client must sign up or log in to access the system and input their questions and answers.</p>

                <h2 style={{ color: '#0056b3' }}>Signup / Login</h2>
                <p>To use this application, clients need to sign up or log in. You can access the respective pages using the following links:</p>
                <div className="signup-login-links" style={{ margin: '20px 0' }}>
                    <ul>
                        <li><a target='_blank' href="/chatadminhome">Sign Up</a></li>
                        <li><a target='_blank' href="/chatadminhome">Log In</a></li>
                    </ul>
                </div>

                <h2 style={{ color: '#0056b3' }}>Adding Questions and Answers</h2>
                <p>Once logged in, clients can input questions and their respective answers through a user-friendly interface. Follow these steps:</p>
                <ul>
                    <li>Navigate to the "Questions" section. That is looks like this</li>
                    <img className='doc_image' src="/documentation images/chatsection.png" alt="React Image" />
                    <li>Now Locate the chat open button and click it</li>
                    <img className='doc_image' src="/documentation images/chatbutton.png" alt="React Image" />
                    <li>This is the sample of your chat which will be shown to your website later.</li>
                    <img className='doc_image' src="/documentation images/chatlooks.png" alt="React Image" />
                    <li>When you clicks on any of the option it shows the answer or its parlael questions to resolve query more frequentely or collecting data. There is back button in your chat sction will work accordingly and the same functionality you will get when you put it on your website</li>
                    <li>Not its turn to add new chat for your personal chat data</li>
                    <li>before it  you need to set blank chat section to enter your chat bot data from starting, press "Rest Chat" button on yout screen It will reset the chat now you can add new chat. and now the mid section of your page will be blank after showing you required prompets.  </li>
                    <img className='doc_image' src="/documentation images/addchat.png" alt="React Image" />
                    <li>Here you can see 2 scetion one is "Add" Button to add question in chat and a white board to write chat bot options or answeres </li>
                    <li>To add first question in your chat bot write you question in white board and click "add" button.</li>
                    <li>After adding first Question you will see it on you chat section.</li>
                    <img className='doc_image' src="/documentation images/firstadd.png" alt="React Image" />
                    <li>To adding continue chat on the same page of of chat bot just add another question in white bord and click "Add" button. It will show you your another question you droped in your chat bot</li>
                    <li>Now after adding some questions in first row of your chat section you will see somthing like this</li>
                    <img className='doc_image' src="/documentation images/firstrow.png" alt="React Image" />
                    <li>Now you want to add answers for preloaded questions or you have to add other questions realated to one of you have entered in first column. So need to select the question for which you are supose to add corresponding answer or corresponding questions and again add a new question by writing new question/answere.</li>
                    <li>When you add another question/corresponding question by selecting the preadded question it will be attached to the selected question. If you want to rearange the question you can do it with draging and droping any question to interchange the position of the questions</li>
                    <img className='doc_image' src="/documentation images/addrelatedchat.png" alt="React Image" />
                    <li>And same thing you will notice in your chat bot. In chat bot you will see corresponding questions or answere by clicking on the question in chat bot. And you can go back to the previous page by clicking on the back button in chat bot</li>
                    <li>One thing if you want to add question again in first column you need to deselect every step so you need to refreh the page once and then add a new question that will be added to the last in the first column. Later I will add button to deselect all the questions and it will be</li>
                    <li>Now after adding all the chat bot data to the application you need to add this URL in your frontend website with script tag in head section of html page. Adding this link in a script tag in html will provide you the chat bot you have created in this application to your website.</li>
                    <li> Reset Chat button will delete all the chat data you created. and it will create a blank section to add new chat data from start</li>
                    <li>Reset Sample Chat button will genrate a sample chat for an example there you can practice or it is for giving an idea how this application works</li>

                </ul>

                <h3 style={{ color: '#0056b3' }}>Video Tutorial</h3>
                <p>To better understand how use this application to set a chat bot on your website please refer to the following video tutorial:</p>
                <div className="video-tutorial" style={{ margin: '20px 0', textAlign: 'center' }}>
                    <video width="600" controls>
                        <source src="/documentation images/tutvideo.mp4" type="video/mp4" />
                    </video>
                </div>

                <h2 style={{ color: '#0056b3' }}>Embedding Chat Support on Your Website</h2>
                <p>After signing up, clients will be provided with a script tag that can be embedded in their website. This script tag allows website developers to integrate the FAQ system directly on their website, similar to how third-party CSS or scripts are used.</p>
                <p>Here is an example of the script tag:</p>
                <img className='doc_image' src="/documentation images/showlink.png" alt="React Image" />

                <p>Website developers should place this script tag in the HTML file of their website, ideally just before the closing <code>&lt;/body&gt;</code> tag, to ensure the chat support system is integrated smoothly.</p>
                <h2 style={{ color: '#0056b3' }}>Feetures to be add</h2>
                <ol>
                    <li>I will add feature for adding link, picture in the chat.</li>
                    <li>I will add live chat functionality i the chat bot on clients website</li>
                    <li>I will add a AI which will sensible to adding new chats according to the real man to man support to the perticuler chat bot.</li>
                </ol>
            </main>

            <footer style={{ textAlign: 'center', marginTop: '40px', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
                <p>&copy; 2024 Chat Support Project. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default SupportChatDocumentation

