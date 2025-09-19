  
        // Predefined credentials
        const correctUserUsername = "student@gmail.com";
        const correctUserPassword = "123";

        const correctAdminUsername = "sjconnect@gmail.com";
        const correctAdminPassword = "sj";

        const form = document.getElementById('loginForm');
        const message = document.getElementById('message');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');

        // Disable submit button initially
        submitBtn.disabled = true;

        // Real-time check
        function checkCredentials() {
            const enteredUsername = usernameInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            const isUserMatch = enteredUsername === correctUserUsername && enteredPassword === correctUserPassword;
            const isAdminMatch = enteredUsername === correctAdminUsername && enteredPassword === correctAdminPassword;

            if (enteredUsername && enteredPassword) {
                if (isUserMatch || isAdminMatch) {
                    submitBtn.disabled = false;
                    message.className = '';
                    message.textContent = '';
                } else {
                    submitBtn.disabled = true;
                    message.className = 'error';
                    message.textContent = 'Invalid username or password. Please try again.';
                }
            } else {
                submitBtn.disabled = true;
                message.className = '';
                message.textContent = '';
            }
        }

        usernameInput.addEventListener('input', checkCredentials);
        passwordInput.addEventListener('input', checkCredentials);

        // On form submit
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const enteredUsername = usernameInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            const isUserMatch = enteredUsername === correctUserUsername && enteredPassword === correctUserPassword;
            const isAdminMatch = enteredUsername === correctAdminUsername && enteredPassword === correctAdminPassword;

            if (isAdminMatch) {
                localStorage.setItem("userRole", "admin"); // ✅ Set as "userRole"
                message.className = 'success';
                message.textContent = 'Admin login successful!';
                window.location.href = 'Project.html';
            } else if (isUserMatch) {
                localStorage.setItem("userRole", "user"); // ✅ Set as "userRole"
                message.className = 'success';
                message.textContent = 'Login successful! Welcome.';
                window.location.href = 'Project.html';
            } else {
                message.className = 'error';
                message.textContent = 'Invalid username or password. Please try again.';
            }
        });
   