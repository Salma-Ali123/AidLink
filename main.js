// Complete JavaScript for the enhanced AidLink website

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('aidlink-theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('aidlink-theme', isDarkMode ? 'dark' : 'light');
});

// Modal Management
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const donateItemsModal = document.getElementById('donateItemsModal');
const donateMoneyModal = document.getElementById('donateMoneyModal');
const volunteerModal = document.getElementById('volunteerModal');
const requestAidModal = document.getElementById('requestAidModal');
const authButtons = document.getElementById('authButtons');
const userMenu = document.getElementById('userMenu');
const userAvatar = document.getElementById('userAvatar');
const dropdownMenu = document.getElementById('dropdownMenu');

// Password toggle functionality
function setupPasswordToggle(passwordInputId, toggleButtonId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleButton = document.getElementById(toggleButtonId);

    if (passwordInput && toggleButton) {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleButton.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
}

// Initialize password toggles
setupPasswordToggle('loginPassword', 'loginPasswordToggle');
setupPasswordToggle('registerPassword', 'registerPasswordToggle');

// Show modals
document.getElementById('loginBtn').addEventListener('click', () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

document.getElementById('registerBtn').addEventListener('click', () => {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

document.getElementById('forgotPassword').addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    forgotPasswordModal.classList.add('active');
});

// Close modals
document.getElementById('closeLoginModal').addEventListener('click', () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeRegisterModal').addEventListener('click', () => {
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeForgotPasswordModal').addEventListener('click', () => {
    forgotPasswordModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeDonateItemsModal').addEventListener('click', () => {
    donateItemsModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeDonateMoneyModal').addEventListener('click', () => {
    donateMoneyModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeVolunteerModal').addEventListener('click', () => {
    volunteerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('closeRequestAidModal').addEventListener('click', () => {
    requestAidModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Switch between login and register modals
document.getElementById('switchToRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

document.getElementById('backToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === donateItemsModal) {
        donateItemsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === donateMoneyModal) {
        donateMoneyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === volunteerModal) {
        volunteerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === requestAidModal) {
        requestAidModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Account type selection
const accountTypes = document.querySelectorAll('.account-type');
const accountTypeInput = document.getElementById('accountType');

accountTypes.forEach(type => {
    type.addEventListener('click', () => {
        // Remove selected class from all
        accountTypes.forEach(t => {
            t.classList.remove('selected');
            t.style.transform = 'translateY(0)';
        });
        // Add selected class to clicked
        type.classList.add('selected');
        type.style.transform = 'translateY(-5px)';
        // Update hidden input
        accountTypeInput.value = type.dataset.accountType;
    });
});

// Set default selected account type
document.querySelector('.account-type[data-account-type="donor"]').classList.add('selected');

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.remove('active');
}

// Enhanced Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Reset errors
    clearError('loginEmailError');
    clearError('loginPasswordError');

    let isValid = true;

    // Validate email
    if (!validateEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (password.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    if (isValid) {
        // Add loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            const userName = email.split('@')[0];
            const firstName = userName.charAt(0).toUpperCase() + userName.slice(1);

            // Update UI for logged in state
            authButtons.style.display = 'none';
            userMenu.classList.add('active');

            // Get initials for avatar
            const nameParts = firstName.split(' ');
            const initials = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : firstName.charAt(1) || '')).toUpperCase();
            userAvatar.textContent = initials;

            // Close modal
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Show success message
            showSuccessNotification(`Welcome back, ${firstName}! You have successfully logged in.`);

            // Store user data in localStorage
            localStorage.setItem('aidlink-user', JSON.stringify({
                name: firstName,
                email: email,
                accountType: 'donor', // Default, will be updated from registration
                loggedIn: true
            }));

            // Update dashboard
            updateDashboard();
        }, 1500);
    }
});

// Enhanced Register Form Submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const accountType = document.getElementById('accountType').value;

    // Reset errors
    clearError('registerNameError');
    clearError('registerEmailError');
    clearError('registerPasswordError');
    clearError('registerConfirmPasswordError');
    clearError('agreeTermsError');

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('registerNameError', 'Please enter your full name (at least 2 characters)');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
        showError('registerEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!validatePassword(password)) {
        showError('registerPasswordError', 'Password must be at least 8 characters with letters and numbers');
        isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
        showError('registerConfirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms agreement
    if (!agreeTerms) {
        showError('agreeTermsError', 'You must agree to the terms and conditions');
        isValid = false;
    }

    if (isValid) {
        // Add loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitButton.disabled = true;

        // Show success message
        const successMessage = document.getElementById('registerSuccess');
        successMessage.classList.add('active');

        // Simulate registration process
        setTimeout(() => {
            // Update UI for logged in state
            authButtons.style.display = 'none';
            userMenu.classList.add('active');

            // Get initials for avatar
            const nameParts = name.split(' ');
            const initials = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : nameParts[0].charAt(1) || '')).toUpperCase();
            userAvatar.textContent = initials;

            // Close modal
            registerModal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            successMessage.classList.remove('active');

            // Show welcome message
            const welcomeMessage = accountType === 'organization'
                ? `Welcome, ${name}! Your organization account has been created.`
                : `Welcome to AidLink, ${name}! Your account has been successfully created.`;

            showSuccessNotification(welcomeMessage);

            // Store user data in localStorage with correct account type
            localStorage.setItem('aidlink-user', JSON.stringify({
                name: name,
                email: email,
                accountType: accountType,
                loggedIn: true
            }));

            // Update dashboard
            updateDashboard();
        }, 2000);
    }
});

// Enhanced Forgot Password Form Submission
document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value;

    // Reset errors
    clearError('forgotEmailError');

    if (!validateEmail(email)) {
        showError('forgotEmailError', 'Please enter a valid email address');
        return;
    }

    // Add loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Show success message
    const successMessage = document.getElementById('forgotPasswordSuccess');
    successMessage.classList.add('active');

    // Simulate sending email
    setTimeout(() => {
        forgotPasswordModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('forgotPasswordForm').reset();
        successMessage.classList.remove('active');

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        showSuccessNotification(`Password reset link has been sent to ${email}. Please check your inbox.`);
    }, 2000);
});

// Donation Options Selection
function setupDonationOptions() {
    const donationOptions = document.querySelectorAll('.donation-option:not(.custom)');
    const donationAmountInput = document.getElementById('donationAmount');
    const donateAmountText = document.getElementById('donateAmountText');
    const customAmountInput = document.getElementById('customAmount');
    const customAmountOption = document.getElementById('customAmountOption');

    donationOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all
            donationOptions.forEach(opt => opt.classList.remove('selected'));
            customAmountOption.classList.remove('selected');

            // Add selected class to clicked
            option.classList.add('selected');

            // Update amount
            const amount = option.getAttribute('data-amount');
            donationAmountInput.value = amount;
            donateAmountText.textContent = '$' + amount;

            // Clear custom amount
            customAmountInput.value = '';
        });
    });

    // Custom amount handling
    customAmountInput.addEventListener('input', () => {
        const customAmount = customAmountInput.value;
        if (customAmount) {
            // Remove selected class from all
            donationOptions.forEach(opt => opt.classList.remove('selected'));
            customAmountOption.classList.add('selected');

            // Update amount
            donationAmountInput.value = customAmount;
            donateAmountText.textContent = '$' + customAmount;
        }
    });

    // Select first option by default
    if (donationOptions.length > 0) {
        donationOptions[0].click();
    }
}

// Money Donation Form Submission
document.getElementById('donateMoneyForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = document.getElementById('donationAmount').value;
    const campaign = document.getElementById('donationCampaign').value;
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;

    if (!amount || amount < 1) {
        showSuccessNotification('Please select or enter a donation amount.');
        return;
    }

    if (!campaign) {
        showSuccessNotification('Please select a campaign to support.');
        return;
    }

    if (!cardName || !cardNumber) {
        showSuccessNotification('Please fill in all payment information.');
        return;
    }

    // Add loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;

    // Show success message
    const successMessage = document.getElementById('donateMoneySuccess');
    successMessage.classList.add('active');

    // Simulate payment processing and create donation offer
    setTimeout(() => {
        donateMoneyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('donateMoneyForm').reset();
        successMessage.classList.remove('active');

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Reset donation options
        setupDonationOptions();

        // Add donation offer to organization
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        const newOffer = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            donor: userData.name || 'Anonymous Donor',
            type: 'Monetary',
            details: `$${amount} for ${campaign}`,
            organization: getOrganizationFromCampaign(campaign),
            status: 'pending',
            amount: parseFloat(amount),
            campaign: campaign
        };

        addDonationOffer(newOffer);

        // Add to user's donation history
        addUserDonation({
            date: newOffer.date,
            campaign: campaign,
            type: 'Monetary',
            amount: `$${amount}`,
            status: 'pending',
            impact: 'Processing'
        });

        showSuccessNotification(`Thank you for your donation of $${amount} to ${campaign}! The organization will review your offer.`);
    }, 2000);
});

// Get organization from campaign name
function getOrganizationFromCampaign(campaign) {
    const campaignMap = {
        'Emergency Food Supplies': 'Global Hunger Relief',
        'Medical Clinic Supplies': 'Doctors Without Borders',
        'School Rebuilding Project': 'Education for All',
        'Winter Clothing for Refugees': 'Refugee Support Network',
        'General Fund': 'AidLink General Fund'
    };
    return campaignMap[campaign] || 'Unknown Organization';
}

// Donate Items Form Submission
document.getElementById('donateItemsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const itemType = document.getElementById('itemType').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const organization = document.getElementById('itemOrganization').value;

    if (!itemType || !itemQuantity || !organization) {
        showSuccessNotification('Please fill in all required fields.');
        return;
    }

    // Add loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
    submitButton.disabled = true;

    // Show success message
    const successMessage = document.getElementById('donateItemsSuccess');
    successMessage.classList.add('active');

    // Simulate scheduling and create donation offer
    setTimeout(() => {
        donateItemsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('donateItemsForm').reset();
        successMessage.classList.remove('active');

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Add donation offer to organization
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        const newOffer = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            donor: userData.name || 'Anonymous Donor',
            type: 'Physical',
            details: `${itemQuantity} of ${itemType}`,
            organization: organization,
            status: 'pending',
            itemType: itemType,
            quantity: itemQuantity
        };

        addDonationOffer(newOffer);

        // Add to user's donation history
        addUserDonation({
            date: newOffer.date,
            campaign: `Item Donation: ${itemType}`,
            type: 'Physical',
            amount: itemQuantity,
            status: 'pending',
            impact: 'Scheduled for delivery'
        });

        showSuccessNotification('Your item donation has been scheduled! The organization will review your offer.');
    }, 2000);
});

// Volunteer Application Form Submission
document.getElementById('volunteerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const volunteerName = document.getElementById('volunteerName').value;
    const volunteerEmail = document.getElementById('volunteerEmail').value;
    const organization = document.getElementById('volunteerOrganization').value;

    if (!volunteerName || !volunteerEmail || !organization) {
        showSuccessNotification('Please fill in all required fields.');
        return;
    }

    // Add loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;

    // Show success message
    const successMessage = document.getElementById('volunteerSuccess');
    successMessage.classList.add('active');

    // Simulate submission and create volunteer offer
    setTimeout(() => {
        volunteerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('volunteerForm').reset();
        successMessage.classList.remove('active');

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Add volunteer offer to organization
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        const newOffer = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            donor: volunteerName,
            type: 'Volunteer',
            details: `Volunteer application for ${organization}`,
            organization: organization,
            status: 'pending',
            email: volunteerEmail
        };

        addDonationOffer(newOffer);

        showSuccessNotification('Your volunteer application has been submitted! The organization will review your application.');
    }, 2000);
});

// Request Aid Form Submission
document.getElementById('requestAidForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('aidTitle').value;
    const description = document.getElementById('aidDescription').value;
    const type = document.getElementById('aidType').value;
    const location = document.getElementById('aidLocation').value;
    const urgency = document.getElementById('aidUrgency').value;
    const quantity = document.getElementById('aidQuantity').value;

    // Add loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;

    // Show success message
    const successMessage = document.getElementById('requestAidSuccess');
    successMessage.classList.add('active');

    // Simulate submission and add to donation requests
    setTimeout(() => {
        requestAidModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('requestAidForm').reset();
        successMessage.classList.remove('active');

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Get user data
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');

        // Add to donation requests and organization dashboard
        addNewAidRequest({
            title: title,
            description: description,
            type: type,
            location: location,
            urgency: urgency,
            quantity: quantity,
            organization: userData.name || 'Your Organization'
        });

        showSuccessNotification('Your aid request has been submitted! It will appear on the Donate page and in your organization dashboard.');
    }, 2000);
});

// Success notification function
function showSuccessNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--gradient-1);
                color: white;
                padding: 16px 24px;
                border-radius: var(--border-radius-md);
                box-shadow: var(--shadow-lg);
                z-index: 9999;
                transform: translateX(150%);
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                max-width: 400px;
                display: flex;
                align-items: center;
                gap: 12px;
            `;

    notification.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                <span>${message}</span>
            `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Animate out and remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Enhanced dropdown menu
userAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userAvatar.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('active');
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();

    // Clear user data from localStorage
    localStorage.removeItem('aidlink-user');

    // Update UI
    authButtons.style.display = 'flex';
    userMenu.classList.remove('active');

    // Close dropdown
    dropdownMenu.classList.remove('active');

    // Switch to home page
    switchPage('home');

    showSuccessNotification('You have been successfully logged out.');
});

// Account dropdown links functionality
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        switchPage(pageId);

        // Close dropdown
        dropdownMenu.classList.remove('active');
    });
});

// Check if user is already logged in
function checkLoginStatus() {
    const userData = localStorage.getItem('aidlink-user');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.loggedIn) {
            authButtons.style.display = 'none';
            userMenu.classList.add('active');

            // Get initials for avatar
            const nameParts = user.name.split(' ');
            const initials = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : nameParts[0].charAt(1) || '')).toUpperCase();
            userAvatar.textContent = initials;

            // Update dashboard if needed
            updateDashboard();
        }
    }
}

// Update dashboard with user data
function updateDashboard() {
    const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');

    if (userData.loggedIn) {
        // Update dashboard welcome message
        const dashboardWelcome = document.getElementById('dashboardWelcome');
        const orgDashboardWelcome = document.getElementById('orgDashboardWelcome');
        if (dashboardWelcome) {
            dashboardWelcome.textContent = `Welcome back, ${userData.name}!`;
        }
        if (orgDashboardWelcome) {
            orgDashboardWelcome.textContent = `Welcome back, ${userData.name}!`;
        }

        // Update account type badge
        const accountTypeBadge = document.getElementById('accountTypeBadge');
        const profileAccountType = document.getElementById('profileAccountType');
        if (accountTypeBadge) {
            accountTypeBadge.textContent = userData.accountType === 'organization' ? 'Organization Account' : 'Donor Account';
        }
        if (profileAccountType) {
            profileAccountType.textContent = userData.accountType === 'organization' ? 'Organization Account' : 'Donor Account';
        }

        // Update profile page
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileFullName = document.getElementById('profileFullName');
        const profileEmailInput = document.getElementById('profileEmailInput');
        const profileAvatarLarge = document.getElementById('profileAvatarLarge');

        if (profileName) profileName.textContent = userData.name;
        if (profileEmail) profileEmail.textContent = userData.email;
        if (profileFullName) profileFullName.value = userData.name;
        if (profileEmailInput) profileEmailInput.value = userData.email;

        // Update avatar
        const nameParts = userData.name.split(' ');
        const initials = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : nameParts[0].charAt(1) || '')).toUpperCase();
        if (profileAvatarLarge) profileAvatarLarge.textContent = initials;

        // Load appropriate dashboard based on account type
        if (userData.accountType === 'organization') {
            loadOrganizationDashboard();
        } else {
            loadDonorDashboard();
        }
    }
}

// Data storage
let organizationOffers = JSON.parse(localStorage.getItem('aidlink-organization-offers') || '[]');
let userDonations = JSON.parse(localStorage.getItem('aidlink-user-donations') || '[]');
let organizationAidRequests = JSON.parse(localStorage.getItem('aidlink-organization-requests') || '[]');

// Sample donation requests
const donationRequests = [
    {
        id: 1,
        title: 'Emergency Food Supplies',
        description: 'Providing emergency food supplies to families affected by drought in East Africa. Over 500 families need immediate assistance.',
        type: 'food',
        location: 'East Africa',
        urgency: 'urgent',
        organization: 'Global Hunger Relief',
        progress: 49,
        raised: 24500,
        goal: 50000
    },
    {
        id: 2,
        title: 'Medical Clinic Supplies',
        description: 'Supplying a field hospital with essential medical equipment and supplies to treat war-related injuries.',
        type: 'medical',
        location: 'Ukraine',
        urgency: 'high',
        organization: 'Doctors Without Borders',
        progress: 78,
        raised: 78200,
        goal: 100000
    },
    {
        id: 3,
        title: 'School Rebuilding Project',
        description: 'Rebuilding a school destroyed in conflict and providing educational materials for 300 children.',
        type: 'education',
        location: 'Syria',
        urgency: 'medium',
        organization: 'Education for All',
        progress: 43,
        raised: 32000,
        goal: 75000
    },
    {
        id: 4,
        title: 'Winter Clothing for Refugees',
        description: 'Providing winter clothing and blankets to refugees at the Poland-Ukraine border as temperatures drop below freezing.',
        type: 'clothing',
        location: 'Poland-Ukraine Border',
        urgency: 'urgent',
        organization: 'Refugee Support Network',
        progress: 65,
        raised: 3250,
        goal: 5000,
        unit: 'kits'
    }
];

// Sample data for dashboard
const sampleDonations = [
    { date: '2023-10-15', campaign: 'Emergency Food Supplies', type: 'Monetary', amount: '$250', status: 'Completed', impact: '50 meals provided' },
    { date: '2023-10-10', campaign: 'Winter Clothing Drive', type: 'Physical', amount: '5 boxes', status: 'Delivered', impact: '25 people helped' },
    { date: '2023-10-05', campaign: 'Medical Clinic Supplies', type: 'Monetary', amount: '$500', status: 'Completed', impact: 'Medical kits for 10 families' },
    { date: '2023-09-28', campaign: 'School Rebuilding Project', type: 'Monetary', amount: '$100', status: 'Processing', impact: 'Educational materials' }
];

const sampleVolunteering = [
    { date: '2023-10-20', activity: 'Food Bank Sorting', organization: 'Community Food Bank', status: 'Scheduled' },
    { date: '2023-10-18', activity: 'Virtual Tutoring', organization: 'Education for All', status: 'Completed' },
    { date: '2023-10-12', activity: 'Disaster Relief Training', organization: 'Global Relief Network', status: 'Completed' }
];

// Add donation offer to organization
function addDonationOffer(offer) {
    organizationOffers.push(offer);
    localStorage.setItem('aidlink-organization-offers', JSON.stringify(organizationOffers));

    // If user is viewing organization dashboard, update it
    if (document.getElementById('organization-dashboard-page').classList.contains('active')) {
        loadOrganizationOffers();
    }
}

// Add user donation to history
function addUserDonation(donation) {
    userDonations.push(donation);
    localStorage.setItem('aidlink-user-donations', JSON.stringify(userDonations));

    // Update donation history if on that page
    if (document.getElementById('donation-history-page').classList.contains('active')) {
        loadDonationHistory();
    }

    // Update dashboard if active
    if (document.getElementById('dashboard-page').classList.contains('active')) {
        loadDonorDashboard();
    }
}

// Load donor dashboard data
function loadDonorDashboard() {
    // Load recent donations
    const recentDonationsTable = document.getElementById('recentDonations');
    if (recentDonationsTable) {
        recentDonationsTable.innerHTML = '';
        const recentDonations = [...userDonations, ...sampleDonations].slice(0, 3);
        recentDonations.forEach(donation => {
            recentDonationsTable.innerHTML += `
                        <tr>
                            <td>${donation.date}</td>
                            <td>${donation.campaign}</td>
                            <td>${donation.amount}</td>
                            <td><span class="status-badge ${donation.status === 'Completed' ? 'status-completed' : donation.status === 'pending' ? 'status-pending' : 'status-approved'}">${donation.status}</span></td>
                        </tr>
                    `;
        });
    }

    // Update stats
    const totalDonations = userDonations.reduce((sum, donation) => {
        if (donation.type === 'Monetary') {
            const amount = parseFloat(donation.amount.replace('$', '')) || 0;
            return sum + amount;
        }
        return sum;
    }, 1250); // Start with base amount

    document.getElementById('totalDonations').textContent = `$${totalDonations.toLocaleString()}`;
    document.getElementById('donationsCount').textContent = (userDonations.length + 4).toString();
}

// Load donation history
function loadDonationHistory() {
    const donationHistoryTable = document.getElementById('donationHistory');
    if (donationHistoryTable) {
        donationHistoryTable.innerHTML = '';
        const allDonations = [...userDonations, ...sampleDonations];

        if (allDonations.length > 0) {
            allDonations.forEach(donation => {
                donationHistoryTable.innerHTML += `
                            <tr>
                                <td>${donation.date}</td>
                                <td>${donation.campaign}</td>
                                <td>${donation.type}</td>
                                <td>${donation.amount}</td>
                                <td><span class="status-badge ${donation.status === 'Completed' ? 'status-completed' : donation.status === 'pending' ? 'status-pending' : donation.status === 'Processing' ? 'status-pending' : 'status-approved'}">${donation.status}</span></td>
                                <td>${donation.impact || 'Processing'}</td>
                            </tr>
                        `;
            });
            document.getElementById('emptyDonations').style.display = 'none';
        } else {
            document.getElementById('emptyDonations').style.display = 'block';
        }
    }
}

// Load organization dashboard data
function loadOrganizationDashboard() {
    // Load pending offers
    loadOrganizationOffers();

    // Load organization aid requests
    loadOrganizationAidRequests();

    // Update organization stats
    const pendingCount = organizationOffers.filter(o => o.status === 'pending').length;
    const activeRequestsCount = organizationAidRequests.length;

    document.getElementById('orgPendingOffers').textContent = pendingCount.toString();
    document.getElementById('orgActiveRequests').textContent = activeRequestsCount.toString();
}

// Load organization offers
function loadOrganizationOffers() {
    const pendingOffersTable = document.getElementById('pendingOffers');
    if (pendingOffersTable) {
        pendingOffersTable.innerHTML = '';
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        const userOrganization = userData.name || 'Your Organization';

        // Filter offers for this organization
        const organizationOffersFiltered = organizationOffers.filter(offer =>
            offer.organization === userOrganization && offer.status === 'pending'
        );

        if (organizationOffersFiltered.length === 0) {
            pendingOffersTable.innerHTML = `
                        <tr>
                            <td colspan="6" class="empty-state" style="text-align: center; padding: 40px;">
                                <i class="fas fa-inbox" style="font-size: 2rem; opacity: 0.5; margin-bottom: 15px;"></i>
                                <p>No pending offers</p>
                            </td>
                        </tr>
                    `;
        } else {
            organizationOffersFiltered.forEach(offer => {
                pendingOffersTable.innerHTML += `
                            <tr>
                                <td>${offer.date}</td>
                                <td>${offer.donor}</td>
                                <td>${offer.type}</td>
                                <td>${offer.details}</td>
                                <td><span class="status-badge status-pending">${offer.status}</span></td>
                                <td>
                                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="acceptOffer(${offer.id})">Accept</button>
                                    <button class="btn btn-light" style="padding: 6px 12px; font-size: 0.8rem; margin-left: 5px;" onclick="rejectOffer(${offer.id})">Reject</button>
                                </td>
                            </tr>
                        `;
            });
        }
    }
}

// Load organization aid requests
function loadOrganizationAidRequests() {
    const orgAidRequestsContainer = document.getElementById('orgAidRequests');
    if (orgAidRequestsContainer) {
        orgAidRequestsContainer.innerHTML = '';
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        const userOrganization = userData.name || 'Your Organization';

        // Get requests for this organization
        const orgRequests = [...organizationAidRequests].filter(req =>
            req.organization === userOrganization
        );

        if (orgRequests.length === 0) {
            orgAidRequestsContainer.innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1;">
                            <i class="fas fa-list" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                            <h3>No Active Aid Requests</h3>
                            <p>Create your first aid request to get started!</p>
                            <button class="btn btn-primary" style="margin-top: 25px;" onclick="showRequestAidModal()">Create Aid Request</button>
                        </div>
                    `;
        } else {
            orgRequests.forEach(request => {
                const urgencyClass = request.urgency === 'urgent' ? 'urgent' :
                    request.urgency === 'high' ? 'high' :
                        request.urgency === 'medium' ? 'medium' : 'low';

                orgAidRequestsContainer.innerHTML += `
                            <div class="request-card">
                                <div class="request-header">
                                    <span class="urgency ${urgencyClass}">${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority</span>
                                    <h3>${request.title}</h3>
                                    <p><i class="fas fa-map-marker-alt"></i> ${request.location}</p>
                                </div>
                                <div class="request-body">
                                    <p>${request.description}</p>
                                    <p><strong>Aid Type:</strong> ${request.type.charAt(0).toUpperCase() + request.type.slice(1)}</p>
                                    <p><strong>Quantity Needed:</strong> ${request.quantity}</p>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${request.progress || 0}%"></div>
                                    </div>
                                    <p><strong>${request.progress || 0}% funded</strong></p>
                                </div>
                                <div class="request-footer">
                                    <button class="btn btn-primary" onclick="editAidRequest(${request.id})">Edit</button>
                                    <button class="btn btn-light" onclick="deleteAidRequest(${request.id})" style="margin-left: 10px;">Delete</button>
                                </div>
                            </div>
                        `;
            });
        }
    }
}

// Accept donation offer
function acceptOffer(offerId) {
    const offerIndex = organizationOffers.findIndex(o => o.id === offerId);
    if (offerIndex !== -1) {
        organizationOffers[offerIndex].status = 'approved';
        localStorage.setItem('aidlink-organization-offers', JSON.stringify(organizationOffers));

        // Update user donation status
        const offer = organizationOffers[offerIndex];
        const userDonationIndex = userDonations.findIndex(d =>
            d.campaign.includes(offer.campaign || offer.details) && d.status === 'pending'
        );
        if (userDonationIndex !== -1) {
            userDonations[userDonationIndex].status = 'approved';
            userDonations[userDonationIndex].impact = 'Offer accepted by organization';
            localStorage.setItem('aidlink-user-donations', JSON.stringify(userDonations));
        }

        loadOrganizationOffers();
        showSuccessNotification(`Offer #${offerId} accepted successfully!`);
    }
}

// Reject donation offer
function rejectOffer(offerId) {
    const offerIndex = organizationOffers.findIndex(o => o.id === offerId);
    if (offerIndex !== -1) {
        organizationOffers[offerIndex].status = 'rejected';
        localStorage.setItem('aidlink-organization-offers', JSON.stringify(organizationOffers));

        // Update user donation status
        const offer = organizationOffers[offerIndex];
        const userDonationIndex = userDonations.findIndex(d =>
            d.campaign.includes(offer.campaign || offer.details) && d.status === 'pending'
        );
        if (userDonationIndex !== -1) {
            userDonations[userDonationIndex].status = 'rejected';
            userDonations[userDonationIndex].impact = 'Offer declined by organization';
            localStorage.setItem('aidlink-user-donations', JSON.stringify(userDonations));
        }

        loadOrganizationOffers();
        showSuccessNotification(`Offer #${offerId} rejected.`);
    }
}

// Add new aid request
function addNewAidRequest(request) {
    const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
    const newRequest = {
        id: Date.now(),
        title: request.title,
        description: request.description,
        type: request.type,
        location: request.location,
        urgency: request.urgency,
        quantity: request.quantity,
        organization: userData.name || 'Your Organization',
        progress: 0,
        raised: 0,
        goal: 10000, // Default goal
        date: new Date().toISOString().split('T')[0]
    };

    organizationAidRequests.push(newRequest);
    localStorage.setItem('aidlink-organization-requests', JSON.stringify(organizationAidRequests));

    // Also add to public donation requests
    donationRequests.push({
        ...newRequest,
        id: donationRequests.length + 1
    });

    // Update dashboard if active
    if (document.getElementById('organization-dashboard-page').classList.contains('active')) {
        loadOrganizationAidRequests();
    }

    showSuccessNotification('New aid request added to the system!');
}

// Edit aid request
function editAidRequest(requestId) {
    showSuccessNotification(`Editing aid request #${requestId} - This feature would open an edit form.`);
}

// Delete aid request
function deleteAidRequest(requestId) {
    if (confirm('Are you sure you want to delete this aid request?')) {
        const index = organizationAidRequests.findIndex(req => req.id === requestId);
        if (index !== -1) {
            organizationAidRequests.splice(index, 1);
            localStorage.setItem('aidlink-organization-requests', JSON.stringify(organizationAidRequests));

            // Also remove from public donation requests
            const publicIndex = donationRequests.findIndex(req => req.id === requestId);
            if (publicIndex !== -1) {
                donationRequests.splice(publicIndex, 1);
            }

            loadOrganizationAidRequests();
            showSuccessNotification('Aid request deleted successfully!');
        }
    }
}

// Load donation requests for donate page
function loadDonationRequests(filters = {}) {
    const container = document.getElementById('donationRequestsContainer');
    if (!container) return;

    let filteredRequests = [...donationRequests];

    // Apply filters
    if (filters.type && filters.type !== 'all') {
        filteredRequests = filteredRequests.filter(req => req.type === filters.type);
    }

    if (filters.location && filters.location !== 'all') {
        filteredRequests = filteredRequests.filter(req =>
            req.location.toLowerCase().includes(filters.location.toLowerCase())
        );
    }

    if (filters.urgency && filters.urgency !== 'all') {
        filteredRequests = filteredRequests.filter(req => req.urgency === filters.urgency);
    }

    if (filters.organization && filters.organization !== 'all') {
        filteredRequests = filteredRequests.filter(req =>
            req.organization.toLowerCase().includes(filters.organization.toLowerCase())
        );
    }

    container.innerHTML = '';

    if (filteredRequests.length === 0) {
        container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                        <h3>No Matching Requests Found</h3>
                        <p>Try adjusting your filters to find aid requests.</p>
                    </div>
                `;
        return;
    }

    filteredRequests.forEach(request => {
        const urgencyClass = request.urgency === 'urgent' ? 'urgent' :
            request.urgency === 'high' ? 'high' :
                request.urgency === 'medium' ? 'medium' : 'low';

        const progressText = request.unit ?
            `${request.raised} ${request.unit} collected of ${request.goal}` :
            `$${request.raised.toLocaleString()} raised of $${request.goal.toLocaleString()}`;

        container.innerHTML += `
                    <div class="request-card">
                        <div class="request-header">
                            <span class="urgency ${urgencyClass}">${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority</span>
                            <h3>${request.title}</h3>
                            <p><i class="fas fa-map-marker-alt"></i> ${request.location}</p>
                        </div>
                        <div class="request-body">
                            <p>${request.description}</p>
                            <p><strong>Aid Type:</strong> ${request.type.charAt(0).toUpperCase() + request.type.slice(1)}</p>
                            <p><strong>Organization:</strong> ${request.organization}</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${request.progress}%"></div>
                            </div>
                            <p><strong>${progressText}</strong></p>
                        </div>
                        <div class="request-footer">
                            <div>
                                <button class="btn btn-primary donate-money-btn" data-campaign="${request.title}">Donate Money</button>
                                <button class="btn btn-light donate-items-btn" style="margin-left: 10px;">Donate Items</button>
                            </div>
                        </div>
                    </div>
                `;
    });

    // Re-attach event listeners
    document.querySelectorAll('.donate-money-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const campaign = this.getAttribute('data-campaign');
            showDonateMoneyModal(campaign);
        });
    });

    document.querySelectorAll('.donate-items-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            showDonateItemsModal();
        });
    });
}

// Load volunteer opportunities
function loadVolunteerOpportunities(filter = 'all') {
    const container = document.getElementById('volunteerOpportunities');
    if (!container) return;

    const opportunities = [
        {
            title: 'Food Bank Volunteers',
            location: 'Local Community Center',
            type: 'onsite',
            description: 'Help sort and distribute food donations at our local food bank. 4-hour shifts available throughout the week.',
            commitment: '4 hours/week',
            organization: 'Community Food Bank',
            urgency: 'high'
        },
        {
            title: 'Virtual Tutoring',
            location: 'Remote',
            type: 'remote',
            description: 'Provide virtual tutoring to refugee children in math and English. Flexible hours, training provided.',
            commitment: '2-5 hours/week',
            organization: 'Education for All',
            urgency: 'medium'
        },
        {
            title: 'Disaster Relief Team',
            location: 'Various Locations',
            type: 'onsite',
            description: 'Join our rapid response team for disaster relief efforts. Training provided, must be available on short notice.',
            commitment: 'As needed',
            organization: 'Global Relief Network',
            urgency: 'urgent'
        }
    ];

    let filteredOpportunities = opportunities;

    if (filter !== 'all') {
        filteredOpportunities = opportunities.filter(opp => opp.type === filter);
    }

    container.innerHTML = '';

    filteredOpportunities.forEach(opportunity => {
        const urgencyClass = opportunity.urgency === 'urgent' ? 'urgent' :
            opportunity.urgency === 'high' ? 'high' : 'medium';

        container.innerHTML += `
                    <div class="request-card">
                        <div class="request-header">
                            <span class="urgency ${urgencyClass}">${opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} Need</span>
                            <h3>${opportunity.title}</h3>
                            <p><i class="fas fa-map-marker-alt"></i> ${opportunity.location}</p>
                        </div>
                        <div class="request-body">
                            <p>${opportunity.description}</p>
                            <p><strong>Time Commitment:</strong> ${opportunity.commitment}</p>
                            <p><strong>Organization:</strong> ${opportunity.organization}</p>
                        </div>
                        <div class="request-footer">
                            <button class="btn btn-primary volunteer-apply-btn" data-opportunity="${opportunity.title}">Apply to Volunteer</button>
                        </div>
                    </div>
                `;
    });

    // Re-attach event listeners to apply buttons
    document.querySelectorAll('.volunteer-apply-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const opportunity = this.getAttribute('data-opportunity');
            showVolunteerModal(opportunity);
        });
    });
}

// Show donate money modal
function showDonateMoneyModal(campaign = '') {
    // Check if user is logged in
    const userData = localStorage.getItem('aidlink-user');
    if (!userData || !JSON.parse(userData).loggedIn) {
        showSuccessNotification('Please log in or create an account to make a donation.');
        loginModal.classList.add('active');
        return;
    }

    // Set campaign if provided
    if (campaign) {
        document.getElementById('donationCampaign').value = campaign;
    }

    donateMoneyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Show donate items modal
function showDonateItemsModal() {
    // Check if user is logged in
    const userData = localStorage.getItem('aidlink-user');
    if (!userData || !JSON.parse(userData).loggedIn) {
        showSuccessNotification('Please log in or create an account to donate items.');
        loginModal.classList.add('active');
        return;
    }

    donateItemsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Show volunteer modal
function showVolunteerModal(opportunity) {
    // Check if user is logged in
    const userData = localStorage.getItem('aidlink-user');
    if (!userData || !JSON.parse(userData).loggedIn) {
        showSuccessNotification('Please log in or create an account to apply for volunteer opportunities.');
        loginModal.classList.add('active');
        return;
    }

    document.getElementById('volunteerModalTitle').textContent = `Apply to Volunteer: ${opportunity}`;
    document.getElementById('volunteerModalSubtitle').textContent = `Apply for the ${opportunity} position`;

    // Pre-fill with user data
    const user = JSON.parse(userData);
    document.getElementById('volunteerName').value = user.name;
    document.getElementById('volunteerEmail').value = user.email;

    volunteerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Show request aid modal
function showRequestAidModal() {
    requestAidModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Show organization aid requests
function showOrganizationAidRequests() {
    loadOrganizationAidRequests();
    showSuccessNotification('Organization aid requests loaded.');
}

// Show donation offers
function showDonationOffers() {
    loadOrganizationOffers();
    showSuccessNotification('Donation offers loaded.');
}

// Show volunteer applications
function showVolunteerApplications() {
    showSuccessNotification('Volunteer applications loaded.');
}

// View schedule function
function viewSchedule() {
    showSuccessNotification('Opening volunteer schedule...');
}

// Browse recommendations function
function browseRecommendations() {
    showSuccessNotification('Loading personalized recommendations...');
}

// Page Navigation
function switchPage(pageId) {
    // Check if user needs to be logged in for account pages
    const accountPages = ['dashboard', 'donation-history', 'volunteering', 'profile', 'organization-dashboard'];

    if (accountPages.includes(pageId)) {
        const userData = localStorage.getItem('aidlink-user');
        if (!userData || !JSON.parse(userData).loggedIn) {
            showSuccessNotification('Please log in to access this page.');
            loginModal.classList.add('active');
            return;
        }

        // Show appropriate dashboard based on account type
        const user = JSON.parse(userData);
        if (pageId === 'dashboard' && user.accountType === 'organization') {
            pageId = 'organization-dashboard';
        } else if (pageId === 'organization-dashboard' && user.accountType !== 'organization') {
            showSuccessNotification('You need an organization account to access this page.');
            return;
        }
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const pageElement = document.getElementById(`${pageId}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
    } else if (pageId === 'organization-dashboard') {
        // Create organization dashboard if it doesn't exist
        switchPage('dashboard');
        return;
    }

    // Update active nav link for main navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.style.backgroundColor = 'transparent';
    });

    // Highlight active link if it exists in main nav
    const activeLink = document.querySelector(`nav a[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }

    // Load data for specific pages
    if (pageId === 'donate') {
        loadDonationRequests();
    } else if (pageId === 'volunteering') {
        loadVolunteerOpportunities();
        loadUpcomingShifts();
    } else if (pageId === 'dashboard' || pageId === 'donation-history' || pageId === 'profile') {
        updateDashboard();
    } else if (pageId === 'organization-dashboard') {
        loadOrganizationDashboard();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Load upcoming shifts
function loadUpcomingShifts() {
    const upcomingShiftsList = document.getElementById('upcomingShiftsList');
    if (upcomingShiftsList) {
        upcomingShiftsList.innerHTML = `
                    <div style="margin-bottom: 20px; padding: 15px; background-color: rgba(138, 155, 110, 0.05); border-radius: var(--border-radius-sm);">
                        <strong>Food Bank Sorting</strong>
                        <p style="margin-top: 5px; opacity: 0.8;">Oct 20, 9:00 AM - 1:00 PM</p>
                    </div>
                    <div style="padding: 15px; background-color: rgba(138, 155, 110, 0.05); border-radius: var(--border-radius-sm);">
                        <strong>Virtual Tutoring</strong>
                        <p style="margin-top: 5px; opacity: 0.8;">Oct 25, 4:00 PM - 6:00 PM</p>
                    </div>
                `;
    }
}

// Set up navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        switchPage(pageId);
    });
});

// Set up hero buttons
document.getElementById('donateHeroBtn').addEventListener('click', () => switchPage('donate'));
document.getElementById('volunteerHeroBtn').addEventListener('click', () => {
    // Check if user is logged in
    const userData = localStorage.getItem('aidlink-user');
    if (userData && JSON.parse(userData).loggedIn) {
        switchPage('volunteering');
    } else {
        showSuccessNotification('Please log in or create an account to view volunteer opportunities.');
        loginModal.classList.add('active');
    }
});
document.getElementById('orgHeroBtn').addEventListener('click', () => {
    // Check if user is logged in
    const userData = localStorage.getItem('aidlink-user');
    if (userData && JSON.parse(userData).loggedIn) {
        if (JSON.parse(userData).accountType === 'organization') {
            switchPage('organization-dashboard');
        } else {
            showSuccessNotification('You need an organization account to access organization features.');
        }
    } else {
        // Show registration modal with organization pre-selected
        registerModal.classList.add('active');
        document.querySelector('.account-type[data-account-type="organization"]').click();
    }
});
document.getElementById('exploreMoreBtn').addEventListener('click', () => switchPage('donate'));

// Set up donation buttons
document.querySelectorAll('.donate-money-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const campaign = this.getAttribute('data-campaign');
        showDonateMoneyModal(campaign);
    });
});

document.querySelectorAll('.donate-items-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        showDonateItemsModal();
    });
});

// Set up aid type cards to navigate to donate page
document.querySelectorAll('.aid-type').forEach(card => {
    if (!card.onclick) {
        card.addEventListener('click', () => {
            switchPage('donate');
        });
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showSuccessNotification('Thank you for your message! We will respond to you within 24-48 hours.');
    e.target.reset();
});

document.getElementById('contactPageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showSuccessNotification('Thank you for contacting AidLink! Our team will get back to you soon.');
    e.target.reset();
});

// Profile form submission
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profileFullName').value;
        const email = document.getElementById('profileEmailInput').value;

        // Update user data in localStorage
        const userData = JSON.parse(localStorage.getItem('aidlink-user') || '{}');
        userData.name = name;
        userData.email = email;
        localStorage.setItem('aidlink-user', JSON.stringify(userData));

        // Update UI
        document.getElementById('profileName').textContent = name;
        document.getElementById('profileEmail').textContent = email;

        // Update avatar initials
        const nameParts = name.split(' ');
        const initials = (nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : nameParts[0].charAt(1) || '')).toUpperCase();
        userAvatar.textContent = initials;
        const profileAvatarLarge = document.getElementById('profileAvatarLarge');
        if (profileAvatarLarge) profileAvatarLarge.textContent = initials;

        showSuccessNotification('Profile updated successfully!');
    });
}

// Profile page buttons functionality
const changePasswordBtn = document.getElementById('changePasswordBtn');
if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', () => {
        showSuccessNotification('Password change feature would open here.');
    });
}

const savePreferencesBtn = document.getElementById('savePreferencesBtn');
if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener('click', () => {
        showSuccessNotification('Preferences saved successfully!');
    });
}

// Find opportunities button
const findOpportunitiesBtn = document.getElementById('findOpportunitiesBtn');
if (findOpportunitiesBtn) {
    findOpportunitiesBtn.addEventListener('click', () => {
        showSuccessNotification('Search functionality would open here to find volunteer opportunities based on your location and interests.');
    });
}

// Volunteer filter functionality
const volunteerFilter = document.getElementById('volunteerFilter');
if (volunteerFilter) {
    volunteerFilter.addEventListener('change', function () {
        loadVolunteerOpportunities(this.value);
    });
}

// Donation page filter functionality
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        const filters = {
            type: document.getElementById('filter-type').value,
            location: document.getElementById('filter-location').value,
            urgency: document.getElementById('filter-urgency').value,
            organization: document.getElementById('filter-organization').value
        };

        loadDonationRequests(filters);
        showSuccessNotification('Filters applied successfully!');
    });
}

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        document.getElementById('filter-type').value = 'all';
        document.getElementById('filter-location').value = 'all';
        document.getElementById('filter-urgency').value = 'all';
        document.getElementById('filter-organization').value = 'all';

        loadDonationRequests();
        showSuccessNotification('Filters cleared!');
    });
}

// Initialize active page and check login status
document.addEventListener('DOMContentLoaded', () => {
    // Highlight home link by default
    const homeLink = document.querySelector('nav a[data-page="home"]');
    if (homeLink) {
        homeLink.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }

    // Check if user is logged in
    checkLoginStatus();

    // Load initial data
    loadDonationRequests();
    loadVolunteerOpportunities();
    loadUpcomingShifts();
    setupDonationOptions();
    loadDonationHistory();

    // Initialize progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
});
// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Simple Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme (dark is default)
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    // Note: If savedTheme is 'dark' or doesn't exist, dark mode is default
    
    // Toggle theme when clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('light-mode')) {
                // Switch to dark mode
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                // Switch to light mode
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});