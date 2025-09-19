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
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', function () {
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
        anchor.addEventListener('click', function (e) {
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

    // Dropdown Functions
    window.confirmLogout = function () {
        if (confirm('Are you sure you want to log out? This will clear your session.')) {
            localStorage.clear();
            window.location.href = '/login.html'; // Replace with actual logout URL
        }
    };

    window.openSettings = function () {
        alert('Settings page coming soon!');
    };

    window.viewProfile = function () {
        alert('Viewing profile...');
    };

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.dropdown-menu').style.display = 'none';
            setTimeout(() => {
                document.querySelector('.dropdown-menu').style.display = '';
            }, 300);
        });
    });
});

let likeData = JSON.parse(localStorage.getItem("likeData")) || {};
let experiencesArray = JSON.parse(localStorage.getItem("experiencesArray")) || [];
window.onload = function () {
    experiencesArray.forEach((data) => {
        createExperienceFromData(data);
    });
};
let currentCardId = 0;

function createExperience() {
    const newExperience = document.createElement("div");
    newExperience.className = "experience";

    const newdet = document.createElement("div");
    newdet.className = "det";

    const profile = document.createElement("div");
    profile.className = "profile";
    newdet.appendChild(profile);

    const name_sect = document.createElement("div");
    name_sect.className = "name-section";

    const newname = document.createElement("div");
    newname.className = "name";
    newname.textContent = document.querySelectorAll("input")[0].value;
    name_sect.appendChild(newname);

    const newinfo = document.createElement("div");
    newinfo.className = "graduation-info";
    newinfo.textContent = document.querySelectorAll("input")[1].value;
    name_sect.appendChild(newinfo);

    newdet.appendChild(name_sect);

    const likes = document.createElement("div");
    likes.className = "likes";

    // Generate unique card ID
    currentCardId++;
    const cardId = currentCardId;

    // LIKE button
    const like = document.createElement("div");
    like.className = "like";
    like.setAttribute("data-card", cardId);

    const heart = document.createElement("i");
    heart.className = "fa fa-heart";
    like.appendChild(heart);

    const cntlike = document.createElement("span");
    cntlike.className = "lc";
    cntlike.textContent = "0";
    like.appendChild(cntlike);
    likes.appendChild(like);

    // DISLIKE button
    const dislike = document.createElement("div");
    dislike.className = "dislike";
    dislike.setAttribute("data-card", cardId);

    const thumbdown = document.createElement("i");
    thumbdown.className = "fa-solid fa-thumbs-down";
    dislike.appendChild(thumbdown);

    const cntdislike = document.createElement("span");
    cntdislike.textContent = "0";
    dislike.appendChild(cntdislike);
    likes.appendChild(dislike);

    newdet.appendChild(likes);
    newExperience.appendChild(newdet);

    // Store like/dislike state
    likeData[cardId] = { likes: 0, dislikes: 0, userLiked: false, userDisliked: false };

    // Attach like/dislike only for this new card

    // DETAILS
    const newdetails = document.createElement("div");
    newdetails.className = "details";

    const jobinfo = document.createElement("div");
    jobinfo.className = "job-info";

    const company = document.createElement("div");
    company.className = "company-tag";
    company.textContent = document.querySelectorAll("input")[2].value;

    const salary = document.createElement("div");
    salary.className = "salary-tag";
    salary.textContent = document.querySelectorAll("input")[3].value;

    jobinfo.appendChild(company);
    jobinfo.appendChild(salary);
    newdetails.appendChild(jobinfo);

    const exp = document.createElement("div");
    exp.className = "exp";
    exp.textContent = document.querySelectorAll("textarea")[0].value;

    const quote = document.createElement("div");
    quote.className = "quote";
    quote.textContent = document.querySelectorAll("textarea")[1].value;

    newdetails.appendChild(exp);
    newdetails.appendChild(quote);
    newExperience.appendChild(newdetails);

    const experienceData = {
        id: Date.now(),
        name: document.querySelectorAll("input")[0].value,
        info: document.querySelectorAll("input")[1].value,
        company: document.querySelectorAll("input")[2].value,
        salary: document.querySelectorAll("input")[3].value,
        exp: document.querySelectorAll("textarea")[0].value,
        quote: document.querySelectorAll("textarea")[1].value,
        cardId: currentCardId
    };

    experiencesArray.push(experienceData);
    localStorage.setItem("experiencesArray", JSON.stringify(experiencesArray));

    document.querySelector("#sect1").appendChild(newExperience);
    showAlert('Yay!! You shared your experience..');
    attachSingleLikeDislikeListeners(cardId, newExperience);
}
function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("overlay1").style.display = "block";
}

function hideAlert() {
    document.getElementById("customAlert").style.display = "none";
    document.getElementById("overlay1").style.display = "none";
}
function createExperienceFromData(data) {
    const newExperience = document.createElement("div");
    newExperience.className = "experience";

    const newdet = document.createElement("div");
    newdet.className = "det";

    const profile = document.createElement("div");
    profile.className = "profile";
    newdet.appendChild(profile);

    const name_sect = document.createElement("div");
    name_sect.className = "name-section";

    const newname = document.createElement("div");
    newname.className = "name";
    newname.textContent = data.name;
    name_sect.appendChild(newname);

    const newinfo = document.createElement("div");
    newinfo.className = "graduation-info";
    newinfo.textContent = data.info;
    name_sect.appendChild(newinfo);

    newdet.appendChild(name_sect);

    const likes = document.createElement("div");
    likes.className = "likes";

    const cardId = data.cardId;
    currentCardId = Math.max(currentCardId, cardId);

    const like = document.createElement("div");
    like.className = "like";
    like.setAttribute("data-card", cardId);

    const heart = document.createElement("i");
    heart.className = "fa fa-heart";
    like.appendChild(heart);

    const cntlike = document.createElement("span");
    cntlike.className = "lc";
    cntlike.textContent = "0";
    like.appendChild(cntlike);
    likes.appendChild(like);

    const dislike = document.createElement("div");
    dislike.className = "dislike";
    dislike.setAttribute("data-card", cardId);

    const thumbdown = document.createElement("i");
    thumbdown.className = "fa-solid fa-thumbs-down";
    dislike.appendChild(thumbdown);

    const cntdislike = document.createElement("span");
    cntdislike.textContent = "0";
    dislike.appendChild(cntdislike);
    likes.appendChild(dislike);

    newdet.appendChild(likes);
    newExperience.appendChild(newdet);

    if (!likeData[cardId]) {
    likeData[cardId] = { likes: 0, dislikes: 0, userLiked: false, userDisliked: false };
}

    const newdetails = document.createElement("div");
    newdetails.className = "details";

    const jobinfo = document.createElement("div");
    jobinfo.className = "job-info";

    const company = document.createElement("div");
    company.className = "company-tag";
    company.textContent = data.company;

    const salary = document.createElement("div");
    salary.className = "salary-tag";
    salary.textContent = data.salary;

    jobinfo.appendChild(company);
    jobinfo.appendChild(salary);
    newdetails.appendChild(jobinfo);

    const exp = document.createElement("div");
    exp.className = "exp";
    exp.textContent = data.exp;

    const quote = document.createElement("div");
    quote.className = "quote";
    quote.textContent = data.quote;

    newdetails.appendChild(exp);
    newdetails.appendChild(quote);
    newExperience.appendChild(newdetails);

    // Edit/Delete buttons
    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editExperience(data.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteExperience(data.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    newExperience.appendChild(actions);

    if (likeData[cardId]?.userLiked) {
    newExperience.querySelector(`.like[data-card="${cardId}"]`).classList.add('liked');
    newExperience.querySelector(`.like[data-card="${cardId}"] .lc`).textContent = likeData[cardId].likes;
}
if (likeData[cardId]?.userDisliked) {
    newExperience.querySelector(`.dislike[data-card="${cardId}"]`).classList.add('disliked');
    newExperience.querySelector(`.dislike[data-card="${cardId}"] span`).textContent = likeData[cardId].dislikes;
}


    document.querySelector("#sect1").appendChild(newExperience);
    attachSingleLikeDislikeListeners(cardId, newExperience);
};

function editExperience(id) {
    const exp = experiencesArray.find(e => e.id === id);
    if (!exp) return;

    document.querySelectorAll("input")[0].value = exp.name;
    document.querySelectorAll("input")[1].value = exp.info;
    document.querySelectorAll("input")[2].value = exp.company;
    document.querySelectorAll("input")[3].value = exp.salary;
    document.querySelectorAll("textarea")[0].value = exp.exp;
    document.querySelectorAll("textarea")[1].value = exp.quote;

    deleteExperience(id, false);
};

function deleteExperience(id, reload = true) {
    experiencesArray = experiencesArray.filter(e => e.id !== id);
    localStorage.setItem("experiencesArray", JSON.stringify(experiencesArray));

    const cards = document.querySelectorAll('.experience');
    cards.forEach(card => {
        const name = card.querySelector(".name").textContent;
        const data = experiencesArray.find(e => e.name === name && e.id === id);
        if (!data) card.remove();
    });

    // if (reload) location.reload();
}

document.getElementById("experienceForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
        createExperience();
        this.reset();
    } else {
        this.reportValidity();
    }
})
function attachSingleLikeDislikeListeners(cardId, experienceElement) {
    const likeBtn = experienceElement.querySelector(`.like[data-card="${cardId}"]`);
    const dislikeBtn = experienceElement.querySelector(`.dislike[data-card="${cardId}"]`);

    if (!likeBtn || !dislikeBtn) {
        console.warn(`Like/Dislike buttons not found for cardId: ${cardId}`);
        return;
    }

    const likeCountSpan = likeBtn.querySelector('.lc');
    const dislikeCountSpan = dislikeBtn.querySelector('span');

    // Same like/dislike logic
    likeBtn.onclick = function () {
        const data = likeData[cardId];

        if (data.userDisliked) {
            data.dislikes--;
            data.userDisliked = false;
            dislikeBtn.classList.remove('disliked');
            dislikeCountSpan.textContent = data.dislikes;
        }

        if (data.userLiked) {
            data.likes--;
            data.userLiked = false;
            likeBtn.classList.remove('liked');
        } else {
            data.likes++;
            data.userLiked = true;
            likeBtn.classList.add('liked');
        }

        likeCountSpan.textContent = data.likes;
        localStorage.setItem('likeData', JSON.stringify(likeData));

    };

    dislikeBtn.onclick = function () {
        const data = likeData[cardId];

        if (data.userLiked) {
            data.likes--;
            data.userLiked = false;
            likeBtn.classList.remove('liked');
            likeCountSpan.textContent = data.likes;
        }

        if (data.userDisliked) {
            data.dislikes--;
            data.userDisliked = false;
            dislikeBtn.classList.remove('disliked');
        } else {
            data.dislikes++;
            data.userDisliked = true;
            dislikeBtn.classList.add('disliked');
        }

        dislikeCountSpan.textContent = data.dislikes;
        localStorage.setItem('likeData', JSON.stringify(likeData));

    };
}

document.querySelectorAll('.experience').forEach(exp => {
    const likeBtn = exp.querySelector('.like');
    const dislikeBtn = exp.querySelector('.dislike');
    if (!likeBtn || !dislikeBtn) return;

    let cardId = likeBtn.getAttribute('data-card');

    if (!cardId) {
        cardId = ++currentCardId;
        likeBtn.setAttribute('data-card', cardId);
        dislikeBtn.setAttribute('data-card', cardId);
    } else {
        cardId = parseInt(cardId);
        currentCardId = Math.max(currentCardId, cardId);
    }

    if (!likeData[cardId]) {
        const savedData = localStorage.getItem('likeData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            likeData = parsedData;
        }
        if (!likeData[cardId]) {
            likeData[cardId] = {
                likes: 0,
                dislikes: 0,
                userLiked: false,
                userDisliked: false
            };
        }
    }

    const likeInfo = likeData[cardId];
    const cntlike = exp.querySelector(".cntlike");
    const cntdislike = exp.querySelector(".cntdislike");

    if (cntlike) cntlike.textContent = likeInfo.likes;
    if (cntdislike) cntdislike.textContent = likeInfo.dislikes;
    if (likeInfo.userLiked) likeBtn.classList.add("liked");
    if (likeInfo.userDisliked) dislikeBtn.classList.add("disliked");

    attachSingleLikeDislikeListeners(cardId, exp);
    localStorage.setItem('likeData', JSON.stringify(likeData));

});



