// === login.js ===

// 🔐 Department access credentials
const access = {
    universalPassword: "theCreator2025", 

    om: {
        password: "superUser",
        names: ["Harry", "Juan", "Teph dy"]
    },
    
    pr: {
        password: "ecorep2025",
        names: ["Marla", "Avy", "Teph dy"]
    },
    marketing: {
        password: "evesMoneyGenerator2026",
        names: ["Ever", "Teph dy", "Gray"]
    },
    secretary: {
        password: "secret",
        names: ["Havila", "Teph dy"]
    },
    IT: {
        password: "hackerboi2499",
        names: ["Teph Dy"] 
    },
    maintenance: {
        password: "evesMaintenance2025",
        names: [] 
    },
    accounting: {
        password: "evesAccounting2025",
        names: ["Brenda", "Nitz"] 
    }
};

// === LOGIN FUNCTION ===
function login() {
    const dept = document.getElementById("dept").value;
    const accessType = document.getElementById("accessType").value;
    const name = document.getElementById("name").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    error.textContent = "";

    if (!dept) { error.textContent = "Please select a department."; return; }
    if (!accessType) { error.textContent = "Please select an access type."; return; }
    if (!name) { error.textContent = "Please enter your name."; return; }
    if (!pass) { error.textContent = "Please enter a password."; return; }

    const deptAccess = access[dept];

    const isDeptPass = deptAccess && pass === deptAccess.password;
    const isUniversalPass = deptAccess && pass === access.universalPassword;

    if (!isDeptPass && !isUniversalPass) {
        error.textContent = "Invalid department or password.";
        return;
    }

    if (isDeptPass && deptAccess.names.length > 0) {
        const isNameValid = deptAccess.names.some(
            n => n.toLowerCase() === name.toLowerCase()
        );
        if (!isNameValid) {
            error.textContent = "You are not authorized under this department.";
            return;
        }
    }
    
    localStorage.setItem("department", dept);
    localStorage.setItem("name", name);
    localStorage.setItem("accessType", accessType);

    let redirectPath = "";
    
    if (accessType === "desktop") {
        redirectPath = `${dept}/index.html`; 
    } else if (accessType === "mobile") {
        const mobilePaths = {
            "IT": "mobile_app/it/index.html",
            "secretary": "mobile_app/secretary/index.html",
            "marketing": "mobile_app/marketing/index.html",
            "om": "mobile_app/om/index.html",
            "pr": "mobile_app/pr/index.html",
            "maintenance": "mobile_app/maintenance/index.html",
            "accounting": "mobile_app/accounting/index.html"
        };
        redirectPath = mobilePaths[dept] || ""; 
    }

    if (redirectPath) {
        window.location.href = redirectPath;
    } else if (accessType === "mobile") {
        error.textContent = "Login successful. No specific mobile app path found.";
    }
}

// 🎯 NEW: ENTER KEY LISTENER
// This code waits for the page to load, then looks for the input fields
document.addEventListener("DOMContentLoaded", () => {
    const inputs = ["name", "password", "dept", "accessType"];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault(); // Prevents form refresh
                    login();
                }
            });
        }
    });
});

// 🎯 PASSWORD VISIBILITY TOGGLE
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');

    if (passwordInput && toggleIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.textContent = 'visibility'; 
        } else {
            passwordInput.type = 'password';
            toggleIcon.textContent = 'visibility_off'; 
        }
    }
}
