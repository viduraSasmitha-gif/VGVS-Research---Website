// Auth Logic

const USERS_KEY = 'vgvs_users';
const SESSION_KEY = 'currentUser';

// Initialize Users if empty (Seed Data)
const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
if (existingUsers.length === 0) {
    const seedAdmins = [
        { username: 'admin', password: 'password123', email: 'admin@vgvs.com', role: 'admin' },
        { username: 'vidura', password: 'password123', email: 'vidura@vgvs.com', role: 'admin' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seedAdmins));
    console.log("Seeded admin users.");
}

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Success
            localStorage.setItem(SESSION_KEY, JSON.stringify({
                username: user.username,
                role: user.role
            }));

            // Redirect based on role
            if (user.role === 'admin' || user.role === 'uploader') {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Invalid credentials! Please try again.');
        }
    });
}

// Handle Register
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        if (users.find(u => u.username === username)) {
            alert("Username already taken!");
            return;
        }

        // Create new user (Role: viewer)
        const newUser = {
            username,
            email,
            password,
            role: 'viewer'
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Auto login
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            username: newUser.username,
            role: newUser.role
        }));

        alert("Registration successful! Welcome to VGVS Research.");
        window.location.href = 'index.html';
    });
}
