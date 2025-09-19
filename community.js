// Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Function to close mobile menu
        function closeMobileMenu() {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Function to remove community card
        function removeCommunityCard(closeButton) {
            const communityCard = closeButton.closest('.community-card');
            communityCard.style.transform = 'scale(0) rotate(45deg)';
            communityCard.style.opacity = '0';
            setTimeout(() => {
                communityCard.remove();
            }, 300);
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        let currentCommunity = null;
        const chatMessages = [
            {
                name: "Admin",
                avatar: "fas fa-crown",
                message: "Welcome to the community! Feel free to introduce yourself.",
                time: "2 min ago"
            },
            {
                name: "Sarah",
                avatar: "fas fa-user",
                message: "Hi everyone! Excited to be here and learn from you all.",
                time: "1 min ago"  
            }
        ];

        function joinCommunity(name, icon, memberCount) {
            currentCommunity = {
                name: name,
                icon: icon,
                memberCount: memberCount
            };

            // Show notification
            document.getElementById('notificationTitle').textContent = `Welcome to ${name}!`;
            document.getElementById('notificationText').textContent = 'You\'ve successfully joined. Start chatting now!';
            document.getElementById('chatNotification').classList.add('show');

            // Update chat sidebar
            document.getElementById('chatCommunityName').textContent = name;
            document.getElementById('chatMemberCount').textContent = memberCount;
            document.getElementById('chatAvatar').innerHTML = `<i class="${icon}"></i>`;

            // Load chat messages
            loadChatMessages();

            // Open chat sidebar
            setTimeout(() => {
                document.getElementById('chatSidebar').classList.add('active');
            }, 1000);

            // Auto close notification after 5 seconds
            setTimeout(() => {
                closeNotification();
            }, 5000);
        }

        function loadChatMessages() {
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.innerHTML = '';

            chatMessages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message';
                messageDiv.innerHTML = `
                    <div class="message-header">
                        <div class="message-avatar">
                            <i class="${message.avatar}"></i>
                        </div>
                        <span class="message-name">${message.name}</span>
                        <span class="message-time">${message.time}</span>
                    </div>
                    <div class="message-content">${message.message}</div>
                `;
                messagesContainer.appendChild(messageDiv);
            });

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (message && currentCommunity) {
                // Add message to chat
                const newMessage = {
                    name: "You",
                    avatar: "fas fa-user",
                    message: message,
                    time: "Just now"
                };
                
                chatMessages.push(newMessage);
                loadChatMessages();
                
                // Clear input
                input.value = '';
                
                // Simulate a response after 2 seconds
                setTimeout(() => {
                    const responses = [
                        "That's a great point!",
                        "Thanks for sharing!",
                        "I totally agree with you.",
                        "Interesting perspective!",
                        "Welcome to our community!"
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    const responseMessage = {
                        name: "Alex",
                        avatar: "fas fa-user",
                        message: randomResponse,
                        time: "Just now"
                    };
                    
                    chatMessages.push(responseMessage);
                    loadChatMessages();
                }, 2000);
            }
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function closeChatSidebar() {
            document.getElementById('chatSidebar').classList.remove('active');
        }

        function closeNotification() {
            document.getElementById('chatNotification').classList.remove('show');
        }

        // Close chat when clicking outside
        document.addEventListener('click', function(event) {
            const chatSidebar = document.getElementById('chatSidebar');
            const chatNotification = document.getElementById('chatNotification');
            
            if (!chatSidebar.contains(event.target) && 
                !event.target.closest('.btn-join') && 
                !chatNotification.contains(event.target)) {
                closeChatSidebar();
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.community-card, .stat-card, .member-card').forEach(el => {
            observer.observe(el);
        });