const messagesContainer = document.getElementById('messages');
const form = document.getElementById('chat-form');
const inputField = document.getElementById('input-message');
const conversationStates1 = [
    {
      input: 'hi',
      response: 'Hello!'
    },
    {
      input: 'how are you',
      response: 'I am doing well, thank you. How about you?'
    },
    {
      input: 'good',
      response: 'Glad to hear that.'
    },
    {
      input: 'bad',
      response: 'I am sorry to hear that.'
    },
    {
      input: 'options',
      response: 'Please choose an option:',
      options: [
        {
          text: 'Option 1',
          value: 'option1'
        },
        {
          text: 'Option 2',
          value: 'option2'
        }
      ]
    },
    {
      input: 'option1',
      response: 'You chose Option 1'
    },
    {
      input: 'option2',
      response: 'You chose Option 2'
    },
  ];

// Define the conversation states and responses
const conversationStates = [
  {
    input: 'hi',
    response: 'Hello!'
  },
  {
    input: 'how are you',
    response: 'I am doing well, thank you. How about you?'
  },
  {
    input: 'good',
    response: 'Glad to hear that.'
  },
  {
    input: 'bad',
    response: 'I am sorry to hear that.'
  },
  {
    input: 'options',
    response: 'Please choose an option:',
    options: [
      {
        text: 'Option 1',
        value: 'option1'
      },
      {
        text: 'Option 2',
        value: 'option2'
      }
    ]
  },
  {
    input: 'option1',
    response: 'You chose Option 1'
  },
  {
    input: 'option2',
    response: 'You chose Option 2'
  },
];

// Initialize the conversation state
let currentConversationState = conversationStates[0];

// Helper function to create and append chatbot message elements
function appendChatbotMessage(text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbot-message');
  messageElement.innerText = text;
  messagesContainer.appendChild(messageElement);
}

// Helper function to create and append user message elements
function appendUserMessage(text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.innerText = text;
  messagesContainer.appendChild(messageElement);
}

// Helper function to handle user input
function handleUserInput(event) {
  event.preventDefault();
  const userInput = inputField.value.toLowerCase();
  appendUserMessage(userInput);
  inputField.value = '';
  // Check if the user input matches a conversation state
  const matchingState = conversationStates.find(state => state.input === userInput);
  if (matchingState) {
    // If the matching state has options, display them as buttons
    if (matchingState.options) {
      currentConversationState = matchingState;
      appendChatbotMessage(currentConversationState.response);
      matchingState.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.addEventListener('click', handleOptionClick);
        messagesContainer.appendChild(button);
      });
    } else {
      currentConversationState = matchingState;
      appendChatbotMessage(currentConversationState.response);
    }
  } else {
    // If there is no matching state, display a default message
    appendChatbotMessage('Sorry, I did not understand that.');
  }
}

// Helper function to handle button clicks
function handleOptionClick(event) {
  const selectedOption = currentConversationState.options.find(option => option.text === event.target.innerText);
  currentConversationState = conversationStates.find(state => state.input === selectedOption.value);
  messagesContainer.removeChild(event.target);
  appendChatbotMessage(currentConversationState.response);
}

// Add event listener for form submission
form.addEventListener('submit', handleUserInput);

// Initialize the conversation with a greeting message
appendChatbotMessage('Hi there! How can I')
