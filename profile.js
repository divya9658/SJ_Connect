
    // NEW: Function to close mobile menu (global scope for onclick)
    function closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', () => {
        // --- Original Profile Page Script with Fixes ---
        let userData = JSON.parse(localStorage.getItem('userProfile')) || {
            name: 'Alex Johnson',
            bio: 'Passionate about web dev and mentorship.',
            role: 'Senior Mentor',
            skills: ['JavaScript', 'CSS Animations', 'HTML5'],
            history: ['Mentored on JS basics - 2023', 'Skill swap: Learned Python - 2024'],
            resume: null 
        };
        
        function renderProfile() {
            // Recreate name element
            const oldName = document.getElementById('user-name');
            const nameElement = document.createElement('h2');
            nameElement.id = 'user-name';
            nameElement.textContent = userData.name;
            oldName.parentNode.replaceChild(nameElement, oldName);

            // Recreate bio element
            const oldBio = document.getElementById('user-bio');
            const bioElement = document.createElement('p');
            bioElement.id = 'user-bio';
            bioElement.textContent = userData.bio;
            oldBio.parentNode.replaceChild(bioElement, oldBio);

            // Recreate role element
            const oldRole = document.getElementById('user-role');
            const roleElement = document.createElement('p');
            roleElement.id = 'user-role';
            roleElement.textContent = userData.role;
            oldRole.parentNode.replaceChild(roleElement, oldRole);

            const skillsList = document.getElementById('skills-list');
            skillsList.innerHTML = ''; 
            userData.skills.forEach(skill => {
                const li = document.createElement('li');
                const skillText = document.createElement('span');
                skillText.textContent = skill;
                li.appendChild(skillText);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = '×';
                removeBtn.classList.add('remove-skill-btn');
                removeBtn.setAttribute('title', `Remove ${skill}`);
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userData.skills = userData.skills.filter(s => s !== skill);
                    updateStorageAndReload(userData);
                });
                li.appendChild(removeBtn);
                skillsList.appendChild(li);
            });
            
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            userData.history.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                historyList.appendChild(li);
            });

            const resumeDisplay = document.getElementById('resume-display');
            if (userData.resume) {
                resumeDisplay.innerHTML = `<a href="${userData.resume}" target="_blank">View Resume</a>`;
            } else {
                resumeDisplay.textContent = 'No resume uploaded yet.';
            }

            // Ensure add skill button is always visible (no hiding based on edit mode)
            document.querySelector('.add-skill').style.display = 'block';
        }

        renderProfile();

        const resumeUpload = document.getElementById('resume-upload');
        const uploadButton = document.getElementById('upload-resume');

        uploadButton.addEventListener('click', () => resumeUpload.click());
        resumeUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    userData.resume = e.target.result; // Store base64 data URL
                    localStorage.setItem('userProfile', JSON.stringify(userData));
                    renderProfile();
                };
                reader.readAsDataURL(file);
            }
        });

        const editToggle = document.getElementById('edit-toggle');
        const saveChangesBtn = document.getElementById('save-changes-btn');
        const profileHeader = document.querySelector('.profile-header');

        let isEditMode = false;

        editToggle.addEventListener('click', () => {
            isEditMode = !isEditMode;
            if (isEditMode) {
                // Enter edit mode
                editToggle.textContent = 'Cancel';
                saveChangesBtn.style.display = 'block';

                // Replace name with input
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = userData.name;
                nameInput.classList.add('edit-mode');
                nameInput.id = 'user-name';
                nameInput.setAttribute('aria-label', 'Edit name');
                profileHeader.replaceChild(nameInput, document.getElementById('user-name'));

                // Replace bio with input
                const bioInput = document.createElement('input');
                bioInput.type = 'text';
                bioInput.value = userData.bio;
                bioInput.classList.add('edit-mode');
                bioInput.id = 'user-bio';
                bioInput.setAttribute('aria-label', 'Edit bio');
                profileHeader.replaceChild(bioInput, document.getElementById('user-bio'));

                // Replace role with input
                const roleInput = document.createElement('input');
                roleInput.type = 'text';
                roleInput.value = userData.role;
                roleInput.classList.add('edit-mode');
                roleInput.id = 'user-role';
                roleInput.setAttribute('aria-label', 'Edit role');
                profileHeader.replaceChild(roleInput, document.getElementById('user-role'));

            } else {
                // Exit without saving
                editToggle.textContent = 'Edit Profile';
                saveChangesBtn.style.display = 'none';
                renderProfile();
            }
        });

        saveChangesBtn.addEventListener('click', () => {
            const newName = document.getElementById('user-name').value.trim();
            const newBio = document.getElementById('user-bio').value.trim();
            const newRole = document.getElementById('user-role').value.trim();

            if (!newName || !newBio || !newRole) {
                alert('Please fill in all fields before saving.');
                return;
            }

            // Save changes
            userData.name = newName;
            userData.bio = newBio;
            userData.role = newRole;

            localStorage.setItem('userProfile', JSON.stringify(userData));

            // Exit edit mode
            isEditMode = false;
            editToggle.textContent = 'Edit Profile';
            saveChangesBtn.style.display = 'none';

            // Automatically reload the page to apply changes
            location.reload();
        });

        document.querySelector('.add-skill').addEventListener('click', () => {
            const newSkill = prompt('Enter new skill:');
            if (newSkill && newSkill.trim()) {
                if (!userData.skills.includes(newSkill.trim())) {
                    userData.skills.push(newSkill.trim());
                    localStorage.setItem('userProfile', JSON.stringify(userData));
                    renderProfile();
                } else {
                    alert('This skill is already on your list.');
                }
            }
        });

        // --- Availability Section: Toggle days and persist ---
        const availabilityData = document.getElementById('availability-data');
        if (availabilityData) {
            const storedAvailability = JSON.parse(localStorage.getItem('userAvailability') || '[]');
            
            // Mark stored available days as selected
            storedAvailability.forEach(day => {
                const dayButton = availabilityData.querySelector(`.day[data-day="${day}"]`);
                if (dayButton) {
                    dayButton.classList.add('selected');
                    dayButton.setAttribute('aria-pressed', 'true');
                }
            });

            availabilityData.querySelectorAll('.day').forEach(dayBtn => {
                dayBtn.addEventListener('click', () => {
                    dayBtn.classList.toggle('selected');
                    const isSelected = dayBtn.classList.contains('selected');
                    dayBtn.setAttribute('aria-pressed', isSelected.toString());

                    // Save current availability selection to localStorage
                    const selectedDays = Array.from(availabilityData.querySelectorAll('.day.selected'))
                        .map(btn => btn.dataset.day);
                    localStorage.setItem('userAvailability', JSON.stringify(selectedDays));
                });

                // Allow keyboard toggling with space/enter
                dayBtn.addEventListener('keydown', e => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        dayBtn.click();
                    }
                });
            });
        }

        function updateStorageAndReload(data) {
            localStorage.setItem('userProfile', JSON.stringify(data));
            location.reload();
        }

        // --- NEW: Header Functionality Script ---
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        overlay.addEventListener('click', closeMobileMenu);
        
        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
