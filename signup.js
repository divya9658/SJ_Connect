
        document.getElementById('signupForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMessage = document.getElementById('errorMessage');

            // Reset error message at the start
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Password length validation (added for better UX/security)
            if (password.length < 8) {
                errorMessage.textContent = 'Password must be at least 8 characters long!';
                errorMessage.style.display = 'block';
                return;
            }

            // Password matching validation
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match!';
                errorMessage.style.display = 'block';
                return;
            }

            // Explicitly ensure error is hidden after passing validation
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Brief delay to allow DOM to update before alert
            setTimeout(() => {
                alert('Signup successful! Welcome to CampusConnect!');
                // Reset the form fields after success to clear everything
                this.reset();
                // Redirect to another page after alert is dismissed
                window.location.href = 'login.html'; // Change to your desired page, e.g., 'login.html' or 'home.html'
            }, 100); // 100ms delay for rendering

            // TODO: In a real app, submit the form data to a server using Fetch or XMLHttpRequest, e.g.:
            // fetch('/api/signup', { method: 'POST', body: new FormData(this) }).then(response => { ... });
        });
    