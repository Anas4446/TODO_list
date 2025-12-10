// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const quickReplies = document.querySelectorAll('.quick-reply-btn');
const typingIndicator = document.getElementById('typingIndicator');
const chatbotContainer = document.querySelector('.chatbot-container');

// Auto-resize textarea
messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

// Send message on Enter key (Shift+Enter for new line)
messageInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Send button click
sendBtn.addEventListener('click', sendMessage);

// Quick reply buttons
quickReplies.forEach(btn => {
  btn.addEventListener('click', function() {
    const message = this.getAttribute('data-message');
    messageInput.value = message;
    sendMessage();
  });
});

// Clear conversation
clearBtn.addEventListener('click', function() {
  if (confirm('Voulez-vous vraiment effacer toute la conversation ?')) {
    chatMessages.innerHTML = '';
    addBotMessage('Bonjour ! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?');
  }
});

// Minimize/Maximize
minimizeBtn.addEventListener('click', function() {
  chatbotContainer.classList.toggle('minimized');
});

// Send message function
function sendMessage() {
  const message = messageInput.value.trim();
  
  if (message === '') return;
  
  // Add user message
  addUserMessage(message);
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Simulate bot response after delay
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateBotResponse(message);
    addBotMessage(response);
  }, 1000 + Math.random() * 1000);
}

// Add user message to chat
function addUserMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  
  const time = getCurrentTime();
  
  messageDiv.innerHTML = `
    <div class="message-avatar">U</div>
    <div class="message-content">
      <div class="message-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
      <span class="message-time">${time}</span>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Add bot message to chat
function addBotMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  
  const time = getCurrentTime();
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#4A90E2"/>
        <path d="M20 10C15 10 11 14 11 19C11 22 12.5 24.5 15 26V30L19 28C19.3 28 19.7 28 20 28C25 28 29 24 29 19C29 14 25 10 20 10Z" fill="white"/>
      </svg>
    </div>
    <div class="message-content">
      <div class="message-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
      <span class="message-time">${time}</span>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  typingIndicator.style.display = 'flex';
  chatMessages.appendChild(typingIndicator);
  scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
  typingIndicator.style.display = 'none';
}

// Scroll to bottom of chat
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get current time
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Generate bot response (simple AI simulation)
function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return 'Bonjour ! Comment puis-je vous aider aujourd\'hui ? 😊';
  }
  
  // Help responses
  if (lowerMessage.includes('aide') || lowerMessage.includes('aider') || lowerMessage.includes('help')) {
    return 'Je suis là pour vous aider ! Je peux répondre à vos questions sur nos services, horaires, et bien plus encore. Que souhaitez-vous savoir ? 💡';
  }
  
  // Services responses
  if (lowerMessage.includes('service') || lowerMessage.includes('offre') || lowerMessage.includes('proposez')) {
    return 'Nous proposons une gamme complète de services professionnels :\n• Consultation personnalisée\n• Support technique 24/7\n• Formation et accompagnement\n• Solutions sur mesure\n\nSouhaitez-vous en savoir plus sur un service en particulier ? 📋';
  }
  
  // Contact responses
  if (lowerMessage.includes('contact') || lowerMessage.includes('joindre') || lowerMessage.includes('téléphone') || lowerMessage.includes('email')) {
    return 'Vous pouvez nous contacter de plusieurs façons :\n📞 Téléphone : +33 1 23 45 67 89\n✉️ Email : contact@example.com\n📍 Adresse : 123 Rue de la République, Paris\n\nNotre équipe est disponible du lundi au vendredi de 9h à 18h. 📞';
  }
  
  // Hours responses
  if (lowerMessage.includes('horaire') || lowerMessage.includes('ouvert') || lowerMessage.includes('heure')) {
    return 'Nos horaires d\'ouverture :\n🕐 Lundi - Vendredi : 9h00 - 18h00\n🕐 Samedi : 10h00 - 16h00\n🕐 Dimanche : Fermé\n\nNotre chatbot est disponible 24/7 pour répondre à vos questions ! ⏰';
  }
  
  // Price responses
  if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût') || lowerMessage.includes('combien')) {
    return 'Nos tarifs varient selon vos besoins spécifiques. Je vous recommande de contacter notre équipe commerciale pour obtenir un devis personnalisé. Souhaitez-vous que je vous mette en relation ? 💰';
  }
  
  // Thank you responses
  if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
    return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions. Je suis toujours là pour vous aider ! 😊';
  }
  
  // Goodbye responses
  if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye') || lowerMessage.includes('adieu')) {
    return 'Au revoir ! N\'hésitez pas à revenir si vous avez besoin d\'aide. Bonne journée ! 👋';
  }
  
  // Default response
  const defaultResponses = [
    'C\'est une excellente question ! Pouvez-vous m\'en dire un peu plus ? 🤔',
    'Je comprends votre demande. Notre équipe peut vous aider avec cela. Voulez-vous que je vous mette en contact avec un conseiller ? 📞',
    'Merci pour votre message. Pour mieux vous répondre, pourriez-vous préciser votre besoin ? 💬',
    'Je note votre demande. N\'hésitez pas à utiliser les suggestions rapides ci-dessous pour obtenir plus d\'informations ! 👇',
    'Intéressant ! Je peux vous aider à en savoir plus. Que souhaitez-vous savoir exactement ? ✨'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Initialize - Remove the initial bot message from HTML since we'll add it dynamically
// The initial message is already in the HTML, so no need to add it again
