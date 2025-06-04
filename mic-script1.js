(function () {
  const botTheme = "bot-theme"; // Default theme: 'light' or 'dark'
  const botFont = "bot-font"; // Default font: 'Verdana'
  const botColor = "bot-color"; // Default color: #444444
  const openByDefault = true; // Default: true to open after 2 seconds

  const css = `
      /* General Styles */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      body {
        font-family: "${botFont}", -apple-system, BlinkMacSystemFont, sans-serif;
        margin: 0;
      }
  
      /* Chat Icon Styles */
      #chat-icon {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        background: ${botColor};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        z-index: 1000;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      #chat-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0,0,0,0.2);
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      #chat-icon img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
  
      /* Chat Widget Container */
      #aichatbot {
        display: none;
        position: fixed;
        bottom: 96px;
        right: 24px;
        width: 360px;
        max-width: 90vw;
        height: 600px;
        max-height: 80vh;
        background: #FFFFFF;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        z-index: 1000;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
      }
  
      /* Dark Theme */
      #aichatbot.dark-theme {
        background: #1A1A1A;
        color: black;
      }
      #aichatbot.dark-theme .footer {
        background: #252525;
        border-top: 1px solid #333;
      }
      #aichatbot.dark-theme #header {
        color: #FFFFFF;
      }
      #aichatbot.dark-theme #chat-input {
        background: #333;
        border-color: #444;
        color: #E0E0E0;
      }
      #aichatbot.dark-theme #chat-input::placeholder {
        color: #A0A0A0;
      }
      #aichatbot.dark-theme .message-content.bot {
        background: #2A2A2A;
        color: #E0E0E0;
      }
      #aichatbot.dark-theme .user-message .message-content {
        background: #CCC1F0;
        color: #FFFFFF;
      }
      #aichatbot.dark-theme .message-time {
        color: black;
      }
      #aichatbot.dark-theme .powered-by {
        color: #A0A0A0;
        border-top: 1px solid #333;
      }
  
      /* Chat Container */
      #chat-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
      }
  
      /* Chat Header */
      #header {
        background: ${botColor};
        color: black;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chat-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .chat-title img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .chat-title h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }
      .chat-title p {
        font-size: 12px;
        opacity: 0.8;
        margin: 0;
      }
      #end-chat-button {
        background: rgba(255,255,255,0.2);
        color: #FFFFFF;
        border: none;
        padding: 8px;
        cursor: pointer;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      }
      #end-chat-button:hover {
        background: rgba(255,255,255,0.3);
      }
  
      /* Chat Messages */
      #chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: filter 0.3s ease;
      }
  
      /* Chat Footer */
      .footer {
        padding: 12px 16px;
        background: #F9FAFB;
        border-top: 1px solid #E5E7EB;
        display: flex;
        align-items: center;
        position: relative; /* Add this line */
        transition: filter 0.3s ease;
      }
      #chat-input {
        flex: 1;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        padding: 0 12px; /* Simplified padding, no need for extra space for icons */
        font-size: 14px;
        outline: none;
        height: 40px;
        line-height: 40px; /* Vertically center the placeholder */
        resize: none;
        background: #FFFFFF;
        font-family: "${botFont}", sans-serif;
        transition: border-color 0.3s ease;
      }
      #chat-input::placeholder {
        color: #9CA3AF;
        line-height: 40px; /* Match the height for vertical centering */
        font-size: 14px;
      }
      #chat-input:focus {
        border-color: #4A90E2;
      }
      #mic-button, #attachment-btn {
        background: none;
        color: #6B46C1;
        border: none;
        border-radius: 50%;
        padding: 0;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      }
      #mic-button:hover, #attachment-btn:hover {
        background: rgba(107, 70, 193, 0.1);
      }
      #mic-button svg, #attachment-btn svg {
        width: 20px;
        height: 20px;
      }
  
      /* Chat Message Styles */
      .message {
        display: flex;
        align-items: center;
        margin: 4px 0;
        animation: slideIn 0.3s ease;
      }
      @keyframes slideIn {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .user-message {
        justify-content: flex-end;
      }
      .bot-message {
        justify-content: flex-start;
      }
      .avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin: 0 8px;
      }
      .message-content {
        max-width: 70%;
        padding: 10px 14px;
        border-radius: 16px;
        background: #F1F3F5;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      .user-message .message-content {
        background: #CCC1F0;
        color: black;
        border-radius: 16px 16px 0 16px;
      }
      .bot-message .message-content {
        background: #F1F3F5;
        border-radius: 16px 16px 16px 0;
      }
      .message-text {
        margin-bottom: 4px;
        line-height: 1.4;
      }
      .message-text strong {
        font-weight: 600;
      }
      .message-text em {
        font-style: italic;
      }
      .message-text ul {
        margin: 4px 0;
        padding-left: 20px;
      }
      .message-time {
        font-size: 11px;
        opacity: 0.6;
        text-align: right;
      }
  
      /* File Upload & Preview */
      .file-upload {
        background: linear-gradient(135deg, #F9FAFB, #F3F4F6);
        border: 1px solid #E5E7EB;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        animation: fadeIn 0.3s ease;
      }
      .file-upload:hover {
        background: linear-gradient(135deg, #F3F4F6, #EDEFF2);
        border-color: #4A90E2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .file-upload.dragover {
        background: linear-gradient(135deg, #EDEFF2, #E5E7EB);
        border-color: #6B46C1;
        transform: scale(1.02);
      }
      .file-upload-icon {
        width: 36px;
        height: 36px;
        margin-bottom: 8px;
        transition: transform 0.3s ease;
      }
      .file-upload:hover .file-upload-icon {
        transform: translateY(-4px);
      }
      .file-upload p {
        font-size: 14px;
        font-weight: 500;
        color: #4B5563;
        margin: 0;
      }
      .file-upload .formats {
        font-size: 12px;
        color: #9CA3AF;
        margin-top: 4px;
      }
      #aichatbot.dark-theme .file-upload {
        background: linear-gradient(135deg, #252525, #2A2A2A);
        border-color: #444;
      }
      #aichatbot.dark-theme .file-upload:hover {
        background: linear-gradient(135deg, #2A2A2A, #333);
        border-color: #4A90E2;
      }
      #aichatbot.dark-theme .file-upload.dragover {
        background: linear-gradient(135deg, #333, #2A2A2A);
        border-color: #6B46C1;
      }
      #aichatbot.dark-theme .file-upload p {
        color: #D1D5DB;
      }
      #aichatbot.dark-theme .file-upload .formats {
        color: #9CA3AF;
      }
      #aichatbot.dark-theme .file-upload-icon {
        stroke: #D1D5DB;
      }
  
      .file-preview {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        gap: 8px;
        animation: fadeIn 0.3s ease;
      }
      .file-preview-image {
        max-width: 100%;
        max-height: 120px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #E5E7EB;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      .file-preview-content {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #F9FAFB;
        padding: 8px 12px;
        border-radius: 8px;
      }
      .file-preview-name {
        font-size: 13px;
        color: #333;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file-preview-delete {
        color: #EF4444;
        cursor: pointer;
        transition: color 0.3s ease, transform 0.3s ease;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .file-preview-delete:hover {
        color: #DC2626;
        transform: scale(1.2);
      }
      .file-preview-delete svg {
        width: 16px;
        height: 16px;
      }
      #send-file-btn {
        background: #6B46C1;
        color: #FFFFFF;
        border: none;
        border-radius: 12px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.3s ease;
        align-self: flex-end;
      }
      #send-file-btn:hover {
        background: #5A3A9E;
      }
      #aichatbot.dark-theme .file-preview {
        background: #2A2A2A;
      }
      #aichatbot.dark-theme .file-preview-content {
        background: #333;
      }
      #aichatbot.dark-theme .file-preview-name {
        color: #E0E0E0;
      }
      #aichatbot.dark-theme .file-preview-image {
        border-color: #444;
      }
  
      /* Animations for File Areas */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(10px); }
      }
      .file-preview.fade-out {
        animation: fadeOut 0.3s ease forwards;
      }
      .file-upload.fade-in {
        animation: fadeIn 0.3s ease;
      }
  
      /* Rating Modals */
      #rating-modal, #rating-modal-final {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 280px;
        z-index: 1001;
      }
      #aichatbot.modal-active #chat-messages,
      #aichatbot.modal-active .footer {
        filter: blur(3px);
      }
      .modal-content {
        background: #FFFFFF;
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      #aichatbot.dark-theme .modal-content {
        background: #2A2A2A;
        color: #E0E0E0;
      }
      .modal-content p {
        font-size: 14px;
        color: #333;
        margin-bottom: 16px;
      }
      #aichatbot.dark-theme .modal-content p {
        color: #E0E0E0;
      }
      .survey-buttons, .feedback-buttons {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      .survey-1, .app-feedback {
        background: #6B46C1;
        color: #FFFFFF;
        border: none;
        padding: 10px 20px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 14px;
      }
      .app-feedback:hover {
        background: #5A3A9E;
      }
  
      /* Powered By */
      .powered-by {
        text-align: center;
        padding: 8px;
        font-size: 12px;
        color: #6B7280;
        border-top: 1px solid #E5E7EB;
      }
      .powered-logo {
        width: 14px;
        height: 14px;
        margin-left: 4px;
      }
  
      /* Actions Menu */
      .actions-menu {
        display: none;
        position: absolute;
        bottom: 80px;
        right: 16px;
        background: #FFFFFF;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        width: 200px;
      }
      .action-item {
        padding: 12px 16px;
        border-bottom: 1px solid #F3F4F6;
        cursor: pointer;
        color: #333;
      }
      .action-item:last-child {
        border-bottom: none;
      }
  
      /* Responsive Design */
      @media screen and (max-width: 768px) {
        #aichatbot {
          width: 90vw;
          height: 80vh;
          right: 5vw;
          bottom: 80px;
        }
        #chat-icon {
          width: 48px;
          height: 48px;
          bottom: 16px;
          right: 16px;
        }
      }
      @media screen and (max-width: 480px) {
        #aichatbot {
          width: 95vw;
          height: 85vh;
          right: 2.5vw;
          bottom: 72px;
          border-radius: 12px;
        }
        #chat-icon {
          width: 44px;
          height: 44px;
          bottom: 12px;
          right: 12px;
        }
        #header {
          padding: 10px 12px;
        }
        .chat-title h3 {
          font-size: 14px;
        }
        .chat-title p {
          font-size: 11px;
        }
        #chat-messages {
          padding: 12px;
        }
        #chat-input {
          font-size: 13px;
          line-height: 36px; /* Adjust for smaller height */
          height: 36px;
          padding: 0 10px;
        }
        #chat-input::placeholder {
          line-height: 36px;
          font-size: 13px;
        }
        .footer {
          padding: 10px 12px;
          gap: 6px; /* Reduce spacing for smaller screens */
        }
        #mic-button, #attachment-btn {
          width: 28px;
          height: 28px;
        }
        #mic-button svg, #attachment-btn svg {
          width: 18px;
          height: 18px;
        }
      }
  `;
  // Add CSS for PDF and Audio display
  const pdfCSS = `
    .file-message {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
    }
    .file-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    .download-link {
      margin-left: auto;
      color: #6B46C1;
      text-decoration: none;
      font-size: 12px;
    }
    .download-link:hover {
      text-decoration: underline;
    }
    #aichatbot.dark-theme .download-link {
      color: #9F7AEA;
    }
    .audio-message {
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
    }
    .audio-message audio {
      max-width: 100%;
      border-radius: 8px;
    }
    .audio-play-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
    }
    .audio-play-btn svg {
      width: 20px;
      height: 20px;
    }
  `;

  document.head.insertAdjacentHTML("beforeend", `<style>${pdfCSS}</style>`);

  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  // Inject HTML
  const html = `
      <!-- Chat Icon -->
      <div id="chat-icon">
        <img src="bot-wot-profile-icon" alt="Chat Logo" />
      </div>
      <!-- Chat Widget -->
      <div id="aichatbot" style="display: none">
        <div id="header">
          <div class="chat-title">
            <img src="bot-wot-profile-icon" alt="AI Assistant Logo" />
            <div>
              <h3>bot-name</h3>
              <p>Support Agent</p>
            </div>
          </div>
          <button id="end-chat-button">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div id="chat-container">
          <div id="chat-messages"></div>
          <!-- Rating Modal -->
          <div id="rating-modal">
            <div class="modal-content">
              <p>Are you satisfied with our responses?</p>
              <div class="survey-buttons">
                <button class="survey-1" data-response="yes">Yes</button>
                <button class="survey-1" data-response="no">No</button>
              </div>
            </div>
          </div>
          <!-- Final Rating Modal -->
          <div id="rating-modal-final">
            <div class="modal-content">
              <p id="response-message"></p>
              <p>How would you rate your experience?</p>
              <div class="feedback-buttons">
                <button class="app-feedback">Good</button>
                <button class="app-feedback">Neutral</button>
                <button class="app-feedback">Bad</button>
              </div>
            </div>
          </div>
        </div>
        <!-- File Upload Area -->
        <div id="file-upload-area" style="display: none">
          <div class="file-upload">
            <p>Drag & drop files or click to browse</p>
            <p class="formats">Supported formats: PDF, JPG, PNG, GIF</p>
            <input type="file" id="file-input" style="display: none" />
          </div>
        </div>
        <!-- File Preview Area -->
        <div id="file-preview-area" style="display: none">
          <div class="file-preview">
            <img class="file-preview-image" src="" alt="Preview" style="display: none" />
            <div class="file-preview-content">
              <div class="file-preview-name"></div>
              <div class="file-preview-delete">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <button id="send-file-btn">Send file</button>
          </div>
        </div>
        <!-- Chat Footer -->
        <div class="footer">
          <button id="mic-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
              <path d="M17 11C17 14.31 14.31 17 11.99 17C9.67 17 7 14.31 7 11H5C5 14.93 8.06 18.22 12 18.97V22H14V18.97C17.94 18.22 21 11H17Z" fill="currentColor"/>
            </svg>
          </button>
          <textarea id="chat-input" placeholder="Type a message..."></textarea>
          <button class="action-btn" id="attachment-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="powered-by">
          Powered by <span style="color: #6B46C1; font-weight: 600;">BotWot ICX</span>
        </div>
        <!-- Actions Menu -->
        <div class="actions-menu" id="actions-menu">
          <div class="action-item" id="send-file-action">Send File</div>
        </div>
      </div>
    `;
  document.body.insertAdjacentHTML("beforeend", html);

  // Dynamically load Socket.IO from CDN if not already loaded
  function loadSocketIO(callback) {
    if (typeof io !== "undefined") {
      callback();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  // Get the current website domain
  const domain = window.location.hostname;
  const fullURL = window.location.href;

  // Send it to backend server
  fetch("application--url/bot/widget/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain: domain,
      fullURL: fullURL,
      botId: "bot-id",
      userId: "user-id",
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => {
    console.error("Widget tracking failed:", err);
  });

  // Initialize the chat widget logic
  function initChatWidget() {
    const botId = "bot-id";
    const userId = "user-id";
    const userType = "CUSTOMER";
    const applicationUrl = "application--url";
    let socket;
    let socketConnected = false;
    let chatRoomJoined = false;
    const greetingMessage = "greeting-message";

    if (userType === "CUSTOMER") {
      function connectSocket() {
        if (!socketConnected && (!socket || !socket.connected)) {
          console.log("Connecting as CUSTOMER");
          socket = io(applicationUrl, {
            query: { isWidget: "true", botId, userId, userType },
            transports: ["websocket", "polling"],
            maxHttpBufferSize: 5e6,
            pingTimeout: 60000,
            pingInterval: 25000,
          });
          socketConnected = true;

          socket.on("sessionCreated", (data) => {
            console.log("SessionId in widget", data.sessionId);
            localStorage.setItem("sessionId", data.sessionId);
            joinChatRoom();
          });

          socket.on("messageToClient", (data) => {
            console.log("Data in widget", data);
            if (data.sessionId) {
              localStorage.setItem("sessionId", data.sessionId);
            }

            if (data.messageType === "pdf") {
              const messageDiv = document.createElement("div");
              messageDiv.className = "message bot-message";

              const messageContent = document.createElement("div");
              messageContent.className = "message-content";

              const fileName = data.fileName || "document.pdf";
              const fileSize = data.fileSize || "Unknown size";

              messageContent.innerHTML = `
              <div class="file-message">
                <svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#f40f02" stroke="#f40f02"/>
                  <path d="M14 2v6h6" stroke="#f40f02"/>
                  <path d="M16 13H8M16 17H8M10 9H8" stroke="#ffffff"/>
                </svg>
                <span>${fileName} (${fileSize})</span>
                <a href="${data.pdfData}" download="${fileName}" class="download-link">Download</a>
              </div>
            `;

              messageDiv.appendChild(messageContent);
              document.getElementById("chat-messages").appendChild(messageDiv);
              document.getElementById("chat-messages").scrollTop =
                document.getElementById("chat-messages").scrollHeight;
            } else if (data.messageType === "image") {
              const messageDiv = document.createElement("div");
              messageDiv.className = "message bot-message";

              const messageContent = document.createElement("div");
              messageContent.className = "message-content";

              if (data.imageData) {
                const imgEl = document.createElement("img");
                imgEl.src = data.imageData;
                imgEl.style.maxWidth = "100%";
                imgEl.style.maxHeight = "200px";
                imgEl.style.borderRadius = "8px";
                messageContent.appendChild(imgEl);
              } else {
                messageContent.textContent =
                  data.imageTranscription || "Image received";
              }

              messageDiv.appendChild(messageContent);
              document.getElementById("chat-messages").appendChild(messageDiv);
              document.getElementById("chat-messages").scrollTop =
                document.getElementById("chat-messages").scrollHeight;
            } else if (data.messageType === "audio") {
              appendMessage(data.response, false, false, data.audioData);
            } else {
              appendMessage(
                data.response || "Umm, Sorry I didn't get it.",
                false
              );
            }
          });
        } else {
          console.log("Socket already connected");
        }
      }

      function joinChatRoom() {
        if (!chatRoomJoined) {
          const sessionId = localStorage.getItem("sessionId");
          if (sessionId) {
            socket.emit("joinSession", { botId, userId, userType, sessionId });
            console.log(
              "Joined room in widget",
              userType,
              botId,
              userId,
              sessionId
            );
            chatRoomJoined = true;
          } else {
            console.log("Cannot join chat room: sessionId not available yet.");
          }
        }
      }

      function messageToServer(
        message,
        messageType = "text",
        imageData = null,
        audioData = null
      ) {
        const sessionId = localStorage.getItem("sessionId");
        if (sessionId) {
          const payload = {
            botId,
            userId,
            userType,
            sessionId,
            message,
            messageType: messageType,
          };

          if (messageType === "image" && imageData) {
            payload.imageData = imageData;
          } else if (messageType === "audio" && audioData) {
            payload.audioData = audioData;
          }

          socket.emit("messageToServer", payload);
          console.log("Sending to server:", payload);
        }
      }

      function appendMessage(
        content,
        isUser,
        isImage = false,
        audioUrl = null
      ) {
        const chatMessages = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(
          "message",
          isUser ? "user-message" : "bot-message"
        );

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");

        if (isImage) {
          const img = document.createElement("img");
          img.src = content;
          img.style.maxWidth = "100%";
          img.style.maxHeight = "200px";
          img.style.borderRadius = "8px";
          messageContent.appendChild(img);
        } else if (typeof content === "object" && content instanceof Blob) {
          messageContent.classList.add("audio-message");
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = URL.createObjectURL(content);
          messageContent.appendChild(audio);
        } else {
          let processedContent = content
            .replace(/### (.*?)(\n|$)/g, "<strong>$1</strong><br>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>")
            .replace(/(\d+)\.\s/g, "<br>$1. ");

          messageContent.innerHTML = processedContent;

          if (!isUser && audioUrl) {
            const audioButton = document.createElement("button");
            const svgOff = `
            <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fill-rule="evenodd"/>
            </svg>
          `;
            const svgOn = `
            <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fill-rule="evenodd"/>
            </svg>
          `;
            audioButton.innerHTML = svgOff;
            audioButton.classList.add("audio-play-btn");

            let isPlaying = false;
            const audio = new Audio(audioUrl);
            audioButton.onclick = () => {
              if (isPlaying) {
                audio.pause();
                audioButton.innerHTML = svgOff;
              } else {
                audio.play();
                audioButton.innerHTML = svgOn;
              }
              isPlaying = !isPlaying;
            };
            messageContent.appendChild(audioButton);
          }
        }

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      // DOM Elements
      const chatIcon = document.getElementById("chat-icon");
      const chatWidget = document.getElementById("aichatbot");
      const chatInput = document.getElementById("chat-input");
      const endChatButton = document.getElementById("end-chat-button");
      const ratingModal = document.getElementById("rating-modal");
      const ratingModalFinal = document.getElementById("rating-modal-final");
      const responseMessageElem = document.getElementById("response-message");
      const surveyButtons = document.getElementsByClassName("survey-1");
      const feedbackButtons = document.getElementsByClassName("app-feedback");
      const attachmentBtn = document.getElementById("attachment-btn");
      const actionsMenu = document.getElementById("actions-menu");
      const sendFileBtn = document.getElementById("send-file-btn");
      const fileInput = document.getElementById("file-input");
      const fileUploadArea = document.getElementById("file-upload-area");
      const fileUploadContainer = document.querySelector(".file-upload");
      const filePreviewArea = document.getElementById("file-preview-area");

      // Microphone functionality
      let isListening = false;
      let mediaRecorder = null;
      let mediaStream = null; // Store the media stream globally
      let chunks = [];
      const micButton = document.getElementById("mic-button");

      // SVG icons for mic button states
      const micSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
        <path d="M17 11C17 14.31 14.31 17 11.99 17C9.67 17 7 14.31 7 11H5C5 14.93 8.06 18.22 12 18.97V22H14V18.97C17.94 18.22 21 11H17Z" fill="currentColor"/>
      </svg>
    `;
      const micSvgRecording = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="red"/>
        <path d="M17 11C17 14.31 14.31 17 11.99 17C9.67 17 7 14.31 7 11H5C5 14.93 8.06 18.22 12 18.97V22H14V18.97C17.94 18.22 21 11H17Z" fill="red"/>
      </svg>
    `;

      function updateMicButtonUI(isRecording) {
        micButton.innerHTML = isRecording ? micSvgRecording : micSvg;
      }

      // Check if the context is secure (HTTPS or localhost)
      function isSecureContext() {
        return (
          window.location.protocol === "https:" ||
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        );
      }

      async function checkMicrophonePermission() {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "microphone",
          });
          return permissionStatus.state; // 'granted', 'prompt', or 'denied'
        } catch (err) {
          console.warn("Permission API not supported or error:", err);
          return "prompt"; // Fallback to prompt if API is unavailable
        }
      }

      async function startRecording() {
        try {
          // Check if running in a secure context
          if (!isSecureContext()) {
            alert(
              "This application must be run in a secure context (HTTPS or localhost) to properly handle microphone permissions. Please serve the file through a local web server."
            );
            return;
          }

          // Check permission status
          const permissionState = await checkMicrophonePermission();
          if (permissionState === "denied") {
            alert(
              "Microphone access is denied. Please enable it in your browser settings (e.g., Chrome: Settings > Privacy and Security > Site Settings > Microphone)."
            );
            return;
          }

          // Only request getUserMedia if permission is not already granted
          if (permissionState !== "granted") {
            mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
          } else if (!mediaStream) {
            // If permission is granted but no stream exists, get a new stream
            mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
          }

          mediaRecorder = new MediaRecorder(mediaStream);
          mediaRecorder.start();
          chunks = [];

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/wav" });
            chunks = [];
            // Stop all tracks to release the stream
            if (mediaStream) {
              mediaStream.getTracks().forEach((track) => track.stop());
              mediaStream = null; // Clear the stream reference
            }
            handleAudioRecording(blob);
          };

          updateMicButtonUI(true);
          isListening = true;
        } catch (err) {
          console.error("Error accessing microphone:", err);
          if (err.name === "NotAllowedError") {
            alert(
              "Microphone access was denied. Please allow microphone access to use this feature."
            );
          } else if (err.name === "NotFoundError") {
            alert(
              "No microphone found. Please ensure a microphone is connected and try again."
            );
          } else {
            alert(
              "An error occurred while accessing the microphone: " + err.message
            );
          }
          isListening = false;
          updateMicButtonUI(false);
        }
      }

      function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
        updateMicButtonUI(false);
        isListening = false;
      }

      function handleAudioRecording(blob) {
        appendMessage(blob, true);
        sendAudioToServer(blob);
      }

      function sendAudioToServer(blob) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const audioData = e.target.result;
          messageToServer("Audio message", "audio", null, audioData);
        };
        reader.readAsDataURL(blob);
      }

      // Clean up stream when chat session ends
      endChatButton.addEventListener("click", () => {
        stopMediaStream(); // Clean up stream when chat is closed
        chatWidget.classList.add("modal-active");
        ratingModal.style.display = "block";
      });

      // Clean up stream on page unload to prevent memory leaks
      window.addEventListener("beforeunload", () => {
        stopMediaStream();
      });

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        micButton.addEventListener("click", async () => {
          if (!isListening) {
            await startRecording();
          } else {
            stopRecording();
          }
        });
      } else {
        console.warn("Audio recording not supported in this browser.");
        alert("Your browser does not support audio recording.");
        micButton.style.display = "none";
      }

      // Theme toggle functionality
      function toggleTheme() {
        chatWidget.classList.toggle("dark-theme");
        const isDark = chatWidget.classList.contains("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      }

      if (botTheme === "dark") {
        chatWidget.classList.add("dark-theme");
      }

      connectSocket();

      if (openByDefault) {
        setTimeout(() => {
          chatWidget.style.display = "flex";
          document.getElementById("chat-messages").innerHTML = "";
          appendMessage(greetingMessage, false);
        }, 2000);
      }

      chatIcon.addEventListener("click", () => {
        chatWidget.style.display =
          chatWidget.style.display === "flex" ? "none" : "flex";
        if (chatWidget.style.display === "flex") {
          document.getElementById("chat-messages").innerHTML = "";
          appendMessage(greetingMessage, false);
        }
      });

      function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
          appendMessage(message, true);
          messageToServer(message);
          chatInput.value = "";
        }
      }

      chatInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          if (event.shiftKey) {
            // Shift + Enter: Add a new line
          } else {
            event.preventDefault();
            sendMessage();
          }
        }
      });

      let menuVisible = false;
      attachmentBtn.addEventListener("click", function () {
        if (menuVisible) {
          actionsMenu.style.display = "none";
          menuVisible = false;
        } else {
          actionsMenu.style.display = "block";
          menuVisible = true;
        }
      });

      document
        .getElementById("send-file-action")
        .addEventListener("click", function () {
          fileUploadArea.style.display = "block";
          actionsMenu.style.display = "none";
          menuVisible = false;
        });

      fileUploadContainer.addEventListener("click", function () {
        fileInput.click();
      });

      fileUploadContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("dragover");
      });

      fileUploadContainer.addEventListener("dragleave", function () {
        this.classList.remove("dragover");
      });

      fileUploadContainer.addEventListener("drop", function (e) {
        e.preventDefault();
        this.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file) {
          fileInput.files = e.dataTransfer.files;
          const event = new Event("change");
          fileInput.dispatchEvent(event);
        }
      });

      fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
        ];
        if (!validTypes.includes(file.type)) {
          alert("Please upload an image (JPEG, PNG, GIF) or PDF file");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert("File too large (max 5MB)");
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const previewImg = document.querySelector(".file-preview-image");
          const isPDF = file.type === "application/pdf";

          if (isPDF) {
            previewImg.style.display = "none";
            const fileTypeIcon = document.createElement("div");
            fileTypeIcon.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#f40f02" stroke="#f40f02"/>
              <path d="M14 2v6h6" stroke="#f40f02"/>
              <path d="M16 13H8M16 17H8M10 9H8" stroke="#ffffff"/>
            </svg>
          `;

            const previewContent = document.querySelector(
              ".file-preview-content"
            );
            if (previewContent.querySelector(".pdf-icon")) {
              previewContent.querySelector(".pdf-icon").remove();
            }
            fileTypeIcon.classList.add("pdf-icon");
            previewContent.prepend(fileTypeIcon);
          } else {
            previewImg.src = e.target.result;
            previewImg.style.display = "block";
            const pdfIcon = document.querySelector(".pdf-icon");
            if (pdfIcon) pdfIcon.remove();
          }

          const fileSize = (file.size / 1024).toFixed(1) + " KB";
          document.querySelector(
            ".file-preview-name"
          ).textContent = `${file.name} (${fileSize})`;

          fileUploadArea.style.display = "none";
          filePreviewArea.style.display = "block";
        };
        reader.readAsDataURL(file);
      });

      document
        .querySelector(".file-preview-delete")
        .addEventListener("click", function () {
          fileInput.value = "";
          const previewImg = document.querySelector(".file-preview-image");
          previewImg.src = "";
          previewImg.style.display = "none";
          document.querySelector(".file-preview-name").textContent = "";
          filePreviewArea.classList.add("fade-out");

          setTimeout(() => {
            filePreviewArea.style.display = "none";
            fileUploadArea.style.display = "block";
            fileUploadContainer.classList.add("fade-in");
          }, 300);
        });

      sendFileBtn.addEventListener("click", function () {
        const file = fileInput.files[0];
        if (!file) return;

        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(1) + " KB";
        const isPDF = file.type === "application/pdf";

        const reader = new FileReader();
        reader.onload = function (e) {
          const fileData = e.target.result;
          const messageDiv = document.createElement("div");
          messageDiv.className = "message user-message";

          const messageContent = document.createElement("div");
          messageContent.className = "message-content";

          if (isPDF) {
            messageContent.innerHTML = `
            <div class="file-message">
              <svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#f40f02" stroke="#f40f02"/>
                <path d="M14 2v6h6" stroke="#f40f02"/>
                <path d="M16 13H8M16 17H8M10 9H8" stroke="#ffffff"/>
              </svg>
              <span>${fileName} (${fileSize})</span>
              <a href="${fileData}" download="${fileName}" class="download-link">Download</a>
            </div>
          `;
          } else {
            const imgEl = document.createElement("img");
            imgEl.src = fileData;
            imgEl.style.maxWidth = "100%";
            imgEl.style.maxHeight = "200px";
            imgEl.style.borderRadius = "8px";
            messageContent.appendChild(imgEl);
          }

          messageDiv.appendChild(messageContent);
          document.getElementById("chat-messages").appendChild(messageDiv);
          document.getElementById("chat-messages").scrollTop =
            document.getElementById("chat-messages").scrollHeight;

          const messageType = isPDF ? "pdf" : "image";
          const payload = {
            sessionId: localStorage.getItem("sessionId"),
            userId: userId,
            botId: botId,
            userType: userType,
            message: isPDF ? `PDF: ${fileName}` : `Image: ${fileName}`,
            messageType: messageType,
          };

          if (isPDF) {
            payload.pdfData = fileData;
          } else {
            payload.imageData = fileData;
          }

          socket.emit("messageToServer", payload);
          fileInput.value = "";
          filePreviewArea.style.display = "none";
          const pdfIcon = document.querySelector(".pdf-icon");
          if (pdfIcon) pdfIcon.remove();
        };

        reader.readAsDataURL(file);
      });

      endChatButton.addEventListener("click", () => {
        chatWidget.classList.add("modal-active");
        ratingModal.style.display = "block";
      });

      Array.from(surveyButtons).forEach((button) => {
        button.addEventListener("click", function () {
          ratingModal.style.display = "none";
          ratingModalFinal.style.display = "block";

          const queryResolved = this.getAttribute("data-response") === "yes";
          responseMessageElem.textContent = queryResolved
            ? "Great, Thanks for using BotWot!"
            : "Apologies we couldn't assist. Our team will connect you soon.";
          localStorage.setItem("resolveQuery", queryResolved);
        });
      });

      Array.from(feedbackButtons).forEach((button) => {
        button.addEventListener("click", function () {
          const satisfaction = this.textContent.trim();
          const resolveQuery = localStorage.getItem("reach") === "true";
          const sessionId = localStorage.getItem("sessionId");
          if (sessionId && socket) {
            socket.emit("closeSession", {
              sessionId,
              userFeedback: {
                resolveQuery,
                satisfaction,
              },
            });
          }
          chatWidget.classList.remove("modal-active");
          ratingModalFinal.style.display = "none";
          localStorage.removeItem("sessionId");
          localStorage.removeItem("resolveQuery");
          document.getElementById("chat-messages").innerHTML = "";
          chatWidget.style.display = "none";
        });
      });
    }
  }

  loadSocketIO(initChatWidget);
})();
