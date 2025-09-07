# Sunith's Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, and experience.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Profile Picture Upload**: Click on the profile area to upload your photo
- **Modern UI**: Clean, professional design with smooth animations
- **Contact Integration**: Direct links to email, GitHub, and LinkedIn
- **Firebase Ready**: Configured for easy deployment to Firebase Hosting

## Setup Instructions

### 1. Update Your Information

Edit `index.html` and update:
- Email link: Replace `your.email@example.com` with your actual email
- GitHub link: Replace `yourusername` with your GitHub username
- LinkedIn link: Replace `yourusername` with your LinkedIn username
- Add graduation year in the education section

### 2. Deploy to Firebase

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase project:
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create a new one
   - Set public directory as current directory (.)
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. Deploy:
   ```bash
   firebase deploy
   ```

### 3. Add Your Profile Picture

- Visit your deployed website
- Click on the profile picture area
- Upload your photo (it will be saved locally in the browser)

## File Structure

```
resume/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # Interactive functionality
├── firebase.json       # Firebase hosting configuration
└── README.md          # This file
```

## Customization

- **Colors**: Edit the CSS gradient colors in `style.css`
- **Sections**: Add or modify sections in `index.html`
- **Skills**: Update the skills grid with your technologies
- **Projects**: Add more projects in the projects section

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Your website will be live at: `https://your-project-name.web.app`
