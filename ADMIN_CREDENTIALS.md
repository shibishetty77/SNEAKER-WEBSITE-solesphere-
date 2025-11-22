# Admin Access Credentials

## 🔐 Authorized Administrators

Only **3 people** are authorized to access the admin panel.

---

## 👥 Admin Accounts

### **1. Sanjan**
- **Username:** `sanjan`
- **Password:** `sanjan@2025`
- **Role:** Administrator

### **2. Shibi**
- **Username:** `shibi`
- **Password:** `shibi@2025`
- **Role:** Administrator

### **3. Samarth**
- **Username:** `samarth`
- **Password:** `samarth@2025`
- **Role:** Administrator

---

## 🔒 Security Features

### **Access Control:**
- ✅ Only 3 authorized admins can login
- ✅ Fixed usernames and passwords
- ✅ No new admin accounts can be created
- ✅ Case-insensitive username (sanjan, Sanjan, SANJAN all work)

### **Error Messages:**
- ❌ Unauthorized username: "Access denied. You are not an authorized admin."
- ❌ Wrong password: "Incorrect password. Please try again."

### **Welcome Message:**
- ✅ Shows admin name on successful login
- ✅ Displays "Welcome back, [Name]!" in dashboard

---

## 📝 Login Instructions

### **Step 1: Navigate to Admin Login**
```
URL: /admin/login
```

### **Step 2: Enter Credentials**
```
Username: [sanjan / shibi / samarth]
Password: [corresponding password]
```

### **Step 3: Click "Sign In"**
- If credentials are correct → Redirected to Admin Dashboard
- If credentials are wrong → Error message displayed

---

## 🎯 What Happens on Login

### **Successful Login:**
1. Username and password verified
2. Admin data stored in localStorage:
   ```javascript
   {
     username: "sanjan",
     name: "Sanjan",
     isAdmin: true,
     loginTime: "2025-11-12T..."
   }
   ```
3. Admin token generated
4. Redirected to `/admin/dashboard`
5. Welcome message displayed

### **Failed Login:**
- Error message shown in red banner
- User remains on login page
- Can try again

---

## 🚪 Logout Process

### **How to Logout:**
1. Click "Logout" button in sidebar
2. Confirmation dialog appears
3. If confirmed:
   - All admin data cleared from localStorage
   - Token removed
   - Redirected to `/admin/login`

---

## 💻 Technical Implementation

### **File Location:**
```
/frontend/src/pages/admin/AdminLogin.js
```

### **Admin Credentials Object:**
```javascript
const AUTHORIZED_ADMINS = {
  'sanjan': {
    password: 'sanjan@2025',
    name: 'Sanjan'
  },
  'shibi': {
    password: 'shibi@2025',
    name: 'Shibi'
  },
  'samarth': {
    password: 'samarth@2025',
    name: 'Samarth'
  }
};
```

### **Authentication Logic:**
```javascript
// Check if username exists
if (!AUTHORIZED_ADMINS[username]) {
  → Show "Access denied" error
  → Return
}

// Verify password
if (AUTHORIZED_ADMINS[username].password !== password) {
  → Show "Incorrect password" error
  → Return
}

// Login successful
→ Store admin data
→ Navigate to dashboard
```

---

## 🔑 Password Policy

### **Current Passwords:**
- Format: `[username]@2025`
- No special requirements
- Fixed and hardcoded

### **To Change Passwords:**
1. Open `/frontend/src/pages/admin/AdminLogin.js`
2. Find `AUTHORIZED_ADMINS` object
3. Update password values
4. Save file

**Example:**
```javascript
'sanjan': {
  password: 'newPassword123',  // Change this
  name: 'Sanjan'
}
```

---

## 🛡️ Security Considerations

### **Current Security Level:**
- ✅ **Restricted Access** - Only 3 authorized users
- ✅ **No Signup** - Cannot create new admin accounts
- ✅ **Fixed Credentials** - Hardcoded in source code

### **Limitations:**
- ⚠️ Passwords visible in source code
- ⚠️ No password encryption
- ⚠️ No password reset functionality
- ⚠️ No session management

### **Recommendations for Production:**
- 🔒 Move credentials to environment variables
- 🔒 Implement password hashing (bcrypt)
- 🔒 Add JWT token authentication
- 🔒 Implement password reset via email
- 🔒 Add two-factor authentication (2FA)
- 🔒 Log login attempts
- 🔒 Add session timeout

---

## 📊 Admin Dashboard Features

### **After Login, Admins Can:**
- ✅ View total products, orders, revenue
- ✅ Add new products
- ✅ Edit product prices
- ✅ Delete products
- ✅ View all orders
- ✅ Update order status
- ✅ View store preview
- ✅ Manage inventory

---

## 🧪 Testing

### **Test Valid Login:**
```
1. Go to /admin/login
2. Enter username: sanjan
3. Enter password: sanjan@2025
4. Click "Sign In"
5. See "Welcome back, Sanjan!" ✅
6. Redirected to dashboard ✅
```

### **Test Invalid Username:**
```
1. Go to /admin/login
2. Enter username: john
3. Enter password: anything
4. Click "Sign In"
5. See error: "Access denied..." ✅
```

### **Test Wrong Password:**
```
1. Go to /admin/login
2. Enter username: sanjan
3. Enter password: wrongpass
4. Click "Sign In"
5. See error: "Incorrect password..." ✅
```

### **Test Logout:**
```
1. Login as any admin
2. Go to dashboard
3. Click "Logout" button
4. Confirm logout
5. Redirected to /admin/login ✅
6. Admin data cleared ✅
```

---

## 📱 User Interface

### **Login Page Shows:**
- 🎨 "Admin Login" heading
- 📝 "Authorized Personnel Only" subtitle
- 👤 Username input field
- 🔒 Password input field
- 💡 Hint: "Authorized admins: Sanjan, Shibi, Samarth"
- 🔵 "Sign In" button
- 🔒 Security note at bottom

### **Dashboard Shows:**
- 👋 "Welcome back, [Admin Name]!"
- 📊 Statistics cards
- 📦 Products list
- 🛍️ Orders list
- ⚙️ Quick actions

---

## 🔄 Data Storage

### **localStorage Keys:**
```javascript
{
  "adminToken": "admin-token-sanjan-1699776000000",
  "isAdmin": "true",
  "adminUser": {
    "username": "sanjan",
    "name": "Sanjan",
    "isAdmin": true,
    "loginTime": "2025-11-12T04:09:00.000Z"
  }
}
```

---

## ⚡ Quick Reference

| Admin | Username | Password | Role |
|-------|----------|----------|------|
| Sanjan | `sanjan` | `sanjan@2025` | Admin |
| Shibi | `shibi` | `shibi@2025` | Admin |
| Samarth | `samarth` | `samarth@2025` | Admin |

---

**Last Updated:** November 12, 2025  
**Security Level:** Restricted Access  
**Active Admins:** 3  
**Status:** ✅ Active
